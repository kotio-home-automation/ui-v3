import nock from 'nock'
import { request } from '../setup'
import { InputMagnet } from '../../routes/magnets'
import { config } from '../../config'

const fakeMagnets: InputMagnet[] = [
  { id: '1', name: 'first', is_open: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
  { id: '2', name: 'second', is_open: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
  { id: '3', name: 'third', is_open: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
  { id: '4', name: 'fourth', is_open: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
]

const apiBasePath = config.apis.dirigera
describe('When GET /magnets', async () => {
  const path = '/magnets'
  nock(apiBasePath).get(path).reply(200, fakeMagnets)

  it('Then array of magnets is returned', async () => {
    const response = await request.get(path)
    expect(response.status).toBe(200)
    expect(response.type).toEqual('text/html')
  })
})
