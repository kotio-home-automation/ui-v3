import express, { Router, Request, Response, NextFunction } from 'express';
import {Temporal} from "@js-temporal/polyfill";
import { config } from '../config';

export type InputAirQuality = {
    id: string
    name: string
    temperature?: number
    humidity?: number
    pm25?: number
    voc?: number
    co2?: number
    last_seen: string
}

export type AirQuality = Omit<InputAirQuality, 'last_seen'> & {
    lastSeen: string
}

const fakeInput: InputAirQuality[] = [
    {id: '1', name: 'first', temperature: 20, humidity: 50, pm25: 10, co2: 415, last_seen: '20260222T11:30:00.000Z'},
    {id: '2', name: 'second', temperature: 21, humidity: 51, pm25: 11, voc: 101, last_seen: '20260222T11:30:00.000Z'},
    {id: '3', name: 'third', temperature: 22, humidity: 52, pm25: 12, voc: 102, last_seen: '20260222T11:30:00.000Z'},
    {id: '4', name: 'fourth', temperature: 23, humidity: 53, pm25: 13, voc: 103, last_seen: '20260222T11:30:00.000Z'}
]

const router: Router = express.Router()
const aqApiPath = `${config.apis.dirigera}/sensors`

const mapToAirQuality = (inputAirQuality: InputAirQuality[]): AirQuality[] => {
    return inputAirQuality.map(input => {
        const { last_seen, ...sanitizedInput } = input
        const instant = Temporal.Instant.from(last_seen)
        const output: AirQuality = {
            ...sanitizedInput,
            lastSeen: instant.toLocaleString('fi-FI')
        }

        return output
    })
}

export const getAirQuality = async (): Promise<AirQuality[]> => {
    if (config.useFake) {
        return mapToAirQuality(fakeInput)
    }

    const response = await fetch(aqApiPath)
    const inputAirQuality = await response.json() as unknown as InputAirQuality[]
    return mapToAirQuality(inputAirQuality)
}

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
    const airQuality = await getAirQuality();
    res.render('airQuality', { airQuality })
});

export default router
