import nock from 'nock'
import { request } from '../setup'
import { InputLight } from '../../routes/lights'
import { config } from '../../config'

const fakeLights: InputLight[] = [
  { id: '1', name: 'first', is_on: false, last_seen: '20260222T11:30:00.000Z', level: 100 },
  { id: '2', name: 'second', is_on: false, last_seen: '20260222T11:30:00.000Z', level: 100 },
  { id: '3', name: 'third', is_on: false, last_seen: '20260222T11:30:00.000Z', level: 100 },
  { id: '4', name: 'fourth', is_on: false, last_seen: '20260222T11:30:00.000Z', level: 100 },
]

const apiBasePath = config.apis.dirigera
const apiLightsPath = '/lights'

describe('Lights', () => {
  describe('When GET /lights', async () => {
    const path = '/lights'
    nock(apiBasePath).get(apiLightsPath).reply(200, fakeLights)

    it('Then array of lights is returned', async () => {
      const response = await request.get(path)
      expect(response.status).toBe(200)
      expect(response.type).toEqual('text/html')
    })
  })

  describe('When POST /lights/:id', async () => {
    const path = '/lights/1/on'
    const nonExistingPath = '/lights/2/on'

    beforeEach(() => {
      nock(apiBasePath).get(apiLightsPath).reply(200, fakeLights)
    })

    describe('And given light exists', () => {
      nock(apiBasePath).post('/lights/on').reply(200, fakeLights)

      it('Then HTTP 200 is returned', async () => {
        const response = await request.post(path)
        expect(response.status).toBe(200)
      })
    })

    describe('And given light does not exist', () => {
      it('Then HTTP 404 is returned', async () => {
        const response = await request.post(nonExistingPath)
        expect(response.status).toBe(404)
      })
    })
  })
})
