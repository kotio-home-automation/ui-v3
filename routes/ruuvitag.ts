import express, { Router, Request, Response, NextFunction } from 'express';
import { config } from '../config';

export type Ruuvitag = {
    name: string,
    data: {
        id: string
        temperature: number
        humidity: number
        outdoor: boolean
        pressure?: number
    }
}

const fakeInput: Ruuvitag[] = [
    {name: 'living_room', data: {id: '1', temperature: 22.5, humidity: 45.2, outdoor: false, pressure: 1013.25}},
    {name: 'bedroom', data: {id: '2', temperature: 20.1, humidity: 52.8, outdoor: false, pressure: 1012.85}},
    {name: 'kitchen', data: {id: '3', temperature: 23.8, humidity: 38.9, outdoor: false}},
    {name: 'bathroom', data: {id: '4', temperature: 24.2, humidity: 65.1, outdoor: false, pressure: 1014.12}}
]

const router: Router = express.Router()

const getRuuvitags = async (): Promise<Ruuvitag[]> => {
    if (config.useFake) {
        return fakeInput
    }

    const response = await fetch(config.apis.ruuvitag)
    return await response.json() as unknown as Ruuvitag[]
}

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
    const ruuvitags = await getRuuvitags()
    res.render('ruuvitag', { ruuvitags })
});

export default router
