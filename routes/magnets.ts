import express, { Router, Request, Response, NextFunction } from 'express'
import { Temporal } from '@js-temporal/polyfill'
import { config } from '../config'

export type InputMagnet = {
  id: string
  name: string
  is_open: boolean
  battery: number
  last_seen: string
}

export type Magnet = Omit<InputMagnet, 'is_open' | 'last_seen'> & {
  isOpen: boolean
  lastSeen: string
}

const fakeInput: InputMagnet[] = [
  { id: '1', name: 'first', is_open: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
  { id: '2', name: 'second', is_open: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
  { id: '3', name: 'third', is_open: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
  { id: '4', name: 'fourth', is_open: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
]

const router: Router = express.Router()
const magnetsApiPath = `${config.apis.dirigera}/magnets`

const mapToMagnets = (inputMagnets: InputMagnet[]): Magnet[] => {
  return inputMagnets.map((input) => {
    const { is_open, last_seen, ...sanitizedInput } = input
    const instant = Temporal.Instant.from(last_seen)
    const output: Magnet = {
      ...sanitizedInput,
      isOpen: is_open,
      lastSeen: instant.toLocaleString('fi-FI'),
    }

    return output
  })
}

const getMagnets = async (): Promise<Magnet[]> => {
  if (config.useFake) {
    return mapToMagnets(fakeInput)
  }

  const response = await fetch(magnetsApiPath)
  const inputMagnets = (await response.json()) as unknown as InputMagnet[]
  return mapToMagnets(inputMagnets)
}

/* GET users listing. */
router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  const magnets = await getMagnets()
  res.render('magnets', { magnets })
})

export default router
