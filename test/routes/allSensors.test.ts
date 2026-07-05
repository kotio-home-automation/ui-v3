import nock from 'nock'
import { request } from '../setup'
import { config } from '../../config'
import { InputAirQuality, InputRuuvitag, Sensor } from '../../routes/allSensors'

const airQualitySensor: InputAirQuality = {
  id: '1',
  name: 'air-quality',
  temperature: 20,
  humidity: 50,
  pm25: 1,
  voc: 43,
  last_seen: '20260222T11:30:00.000Z',
}
const ruuvitagSensor: InputRuuvitag = {
  name: 'ruuvitag',
  data: { id: '2', temperature: 21, humidity: 51, outdoor: false, pressure: 1001 },
}
const tdSensor: Sensor = {
  id: '3',
  name: 'td-sensor',
  temperature: 19,
  humidity: 49,
  outdoor: false,
}

describe('When GET /all-sensors', async () => {
  nock(config.apis.dirigera).get('/sensors').reply(200, [airQualitySensor])
  nock(config.apis.ruuvitag).get('').reply(200, [ruuvitagSensor])
  nock(config.apis.tellstick).get('/sensors').reply(200, [tdSensor])

  it('Then array of sensors is returned', async () => {
    const response = await request.get('/all-sensors')
    expect(response.status).toBe(200)
    expect(response.type).toEqual('text/html')
    expect(response.text.includes('air-quality')).toBeTruthy()
    expect(response.text.includes('ruuvitag')).toBeTruthy()
    expect(response.text.includes('td-sensor')).toBeTruthy()
  })
})
