import nock from 'nock'
import { request } from '../setup'
import { TdSensor } from '../../routes/td-sensors'
import { config } from '../../config'

const fakeDevices: TdSensor[] = [
  { id: 1, name: 'first', temperature: 11.1, humidity: 22.2, outdoor: false },
  { id: 2, name: 'second', temperature: 33.3, outdoor: true }
]

const apiBasePath = config.apis.tellstick

describe('Devices', () => {
  describe('When GET /td-sensors', async () => {
    const path = '/td-sensors'
    nock(apiBasePath)
      .get('/sensors')
      .reply(200, { sensors: fakeDevices })

    it('Then array of sensors is returned', async () => {
      const response = await request.get(path)
      expect(response.status).toBe(200)
      expect(response.type).toEqual('text/html')
    })
  })
})
