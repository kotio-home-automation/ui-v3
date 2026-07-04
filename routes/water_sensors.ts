import express, { Router, Request, Response, NextFunction } from 'express'
import { Temporal } from '@js-temporal/polyfill'
import { config } from '../config'

export type InputWaterSensor = {
  id: string
  name: string
  has_leak: boolean
  battery: number
  last_seen: string
}

export type WaterSensor = Omit<InputWaterSensor, 'has_leak' | 'last_seen'> & {
  hasLeak: boolean
  lastSeen: string
}

const fakeInput: InputWaterSensor[] = [
  { id: '1', name: 'first', has_leak: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
  { id: '2', name: 'second', has_leak: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
  { id: '3', name: 'third', has_leak: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
  { id: '4', name: 'fourth', has_leak: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
]

const router: Router = express.Router()
const wsApiPath = `${config.apis.dirigera}/water_sensors`

const mapToWaterSensors = (inputWaterSensors: InputWaterSensor[]): WaterSensor[] => {
  return inputWaterSensors.map((input) => {
    const { has_leak, last_seen, ...sanitizedInput } = input
    const instant = Temporal.Instant.from(last_seen)
    const output: WaterSensor = {
      ...sanitizedInput,
      hasLeak: has_leak,
      lastSeen: instant.toLocaleString('fi-FI'),
    }

    return output
  })
}

const getWaterSensors = async (): Promise<WaterSensor[]> => {
  if (config.useFake) {
    return mapToWaterSensors(fakeInput)
  }

  const response = await fetch(wsApiPath)
  const inputWaterSensors = (await response.json()) as unknown as InputWaterSensor[]
  return mapToWaterSensors(inputWaterSensors)
}

router.get('/', async (req: Request, res: Response, _next: NextFunction) => {
  const waterSensors = await getWaterSensors()
  res.render('water_sensors', { waterSensors })
})

export default router
