import express, { NextFunction, Request, Response, Router } from 'express'
import { Temporal } from '@js-temporal/polyfill'
import { config } from '../config'

type InputAirQuality = {
  id: string
  name: string
  temperature: number
  humidity: number
  pm25?: number
  voc?: number
  co2?: number
  last_seen: string
}

type InputRuuvitag = {
  name: string
  data: {
    id: string
    temperature: number
    humidity: number
    outdoor: boolean
    pressure?: number
  }
}

export type Sensor = {
  id: number | string
  name: string
  outdoor: boolean
  temperature: number
  humidity?: number
  pressure?: number
  pm25?: number
  voc?: number
  co2?: number
  lastSeen?: string
}

export type SensorOutput = {
  outdoorSensors: Sensor[]
  indoorSensors: Sensor[]
}

const router: Router = express.Router()
const airQualityApiPath = `${config.apis.dirigera}/sensors`
const tdSensorsApiPath = `${config.apis.tellstick}/sensors`
const ruuvitagApiPath = config.apis.ruuvitag

const mapAirQuality = (inputAirQuality: InputAirQuality[]): Sensor[] => {
  return inputAirQuality.map((input) => {
    const { last_seen, ...sanitizedInput } = input
    const instant = Temporal.Instant.from(last_seen)
    const output: Sensor = {
      ...sanitizedInput,
      outdoor: false,
      lastSeen: instant.toLocaleString('fi-FI'),
    }

    return output
  })
}

const mapRuuvitag = (inputRuuvitags: InputRuuvitag[]): Sensor[] => {
  return inputRuuvitags.map((inputRuuvitag) => {
    const output: Sensor = {
      name: inputRuuvitag.name,
      ...inputRuuvitag.data,
    }

    return output
  })
}

const sortByName = (inputSensors: Sensor[]): Sensor[] => {
  return [...inputSensors].sort((a, b) => a.name.localeCompare(b.name))
}

const getSensors = async (): Promise<SensorOutput> => {
  const airQualityResponse = await fetch(airQualityApiPath)
  const inputAirQuality = (await airQualityResponse.json()) as InputAirQuality[]
  const airQualitySensors = mapAirQuality(inputAirQuality)

  const tdSensorResponse = await fetch(tdSensorsApiPath)
  const tdSensors: Sensor[] = (await tdSensorResponse.json()) as Sensor[]

  const ruuvtagResponse = await fetch(ruuvitagApiPath)
  const inputRuuvitag = (await ruuvtagResponse.json()) as InputRuuvitag[]
  const ruuvitagSensors: Sensor[] = mapRuuvitag(inputRuuvitag)

  const sensors = [...airQualitySensors, ...tdSensors, ...ruuvitagSensors]
  const outdoorSensors = sortByName(sensors.filter((sensor) => sensor.outdoor))
  const indoorSensors = sortByName(sensors.filter((sensor) => !sensor.outdoor))

  return { outdoorSensors, indoorSensors }
}

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  const sensors = await getSensors()
  res.render('all-sensors', { sensors })
})

export default router
