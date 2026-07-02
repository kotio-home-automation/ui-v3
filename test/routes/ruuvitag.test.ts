import nock from "nock";
import { request } from "../setup";
import { Ruuvitag } from "../../routes/ruuvitag";
import { config } from "../../config";

const fakeRuuvitag: Ruuvitag[] = [
  { name: 'living_room', data: { id: '1', temperature: 22.5, humidity: 45.2, pressure: 1013.25, outdoor: false } },
  { name: 'bedroom', data: { id: '2', temperature: 20.1, humidity: 52.8, pressure: 1012.85 , outdoor: false} },
  { name: 'kitchen', data: { id: '3', temperature: 23.8, humidity: 38.9, outdoor: false } },
  { name: 'bathroom', data: { id: '4', temperature: 24.2, humidity: 65.1, pressure: 1014.12, outdoor: false } }
]

const apiBasePath = config.apis.ruuvitag;
describe('When GET /ruuvitag', async () => {
  nock(apiBasePath)
    .get('')
    .reply(200, fakeRuuvitag)

  it('Then array of ruuvitag is returned', async () => {
    const response = await request.get('/ruuvitag');
    expect(response.status).toBe(200)
    expect(response.type).toEqual('text/html');
  })
})
