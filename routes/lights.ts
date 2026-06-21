import express, { Router, Request, Response, NextFunction } from 'express';
import {Temporal} from "@js-temporal/polyfill";
import { config } from '../config';

export type InputLight = {
  id: string
  name: string
  level: number
  is_on: boolean
  last_seen: string
}

export type Light = Omit<InputLight, 'is_on' | 'last_seen'>  & {
  isOn: boolean
  lastSeen: string
}

const fakeInput: InputLight[] = [
  {id: '1', name: 'first', is_on: false, last_seen: '20260222T11:30:00.000Z', level: 100},
  {id: '2', name: 'second', is_on: false, last_seen: '20260222T11:30:00.000Z', level: 100},
  {id: '3', name: 'third', is_on: false, last_seen: '20260222T11:30:00.000Z', level: 100},
  {id: '4', name: 'fourth', is_on: false, last_seen: '20260222T11:30:00.000Z', level: 100}
]

const router: Router = express.Router()
const lightsApiPath = `${config.apis.dirigera}/lights`
const lightsOnApiPath = `${config.apis.dirigera}/lights/on`
const lightsOffApiPath = `${config.apis.dirigera}/lights/off`

const mapToLights = (inputLights: InputLight[]): Light[] => {
  return inputLights.map(input => {
    const { is_on, last_seen, ...sanitizedInput } = input
    const instant = Temporal.Instant.from(last_seen)
    const output: Light = {
      ...sanitizedInput,
      isOn: is_on,
      lastSeen: instant.toLocaleString('fi-FI')
    }

    return output
  })
}

const getLights = async (): Promise<Light[]> => {
  if (config.useFake) {
    return mapToLights(fakeInput)
  }

  const response = await fetch(lightsApiPath)
  const inputLights = await response.json() as unknown as InputLight[]
  return mapToLights(inputLights)
}

const renderLights = async (res: Response) => {
  const lights = await getLights();
  res.render('lights', { lights })
}

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  await renderLights(res)
});

router.post('/:id/on', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id
  const reqBody = JSON.stringify(id)
  await fetch(lightsOnApiPath, {
    method: 'POST',
    body: reqBody,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  await renderLights(res)
})

router.post('/:id/off', async (req: Request, res: Response, _next: NextFunction) => {
  const id = req.params.id
  const reqBody = JSON.stringify(id)
  await fetch(lightsOffApiPath, {
    method: 'POST',
    body: reqBody,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  await renderLights(res)
})

export default router
