import nock from 'nock'
import { request } from '../setup'
import { Device } from '../../routes/devices'
import { config } from '../../config'

const fakeDevices: Device[] = [
  { id: 1, name: 'first', switchedOn: false },
  { id: 2, name: 'second', switchedOn: true },
  { id: 3, name: 'third', switchedOn: false },
  { id: 4, name: 'fourth', switchedOn: true },
]

const apiBasePath = config.apis.tellstick

describe('Devices', () => {
  describe('When GET /devices', async () => {
    const path = '/devices'
    nock(apiBasePath).get('/devices').reply(200, { devices: fakeDevices })

    it('Then array of devices is returned', async () => {
      const response = await request.get(path)
      expect(response.status).toBe(200)
      expect(response.type).toEqual('text/html')
    })
  })

  describe('When POST /devices/:id/on', async () => {
    const path = '/devices/1/on'
    nock(apiBasePath).post('/devices/on').reply(200)
    nock(apiBasePath).get('/devices').reply(200, { devices: fakeDevices })

    it('Then HTTP 200 is returned', async () => {
      const response = await request.post(path)
      expect(response.status).toBe(200)
    })
  })
})
