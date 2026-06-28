import nock from "nock";
import { request } from "../setup";
import { InputAirQuality } from "../../routes/airQuality";
import { config } from "../../config";

const fakeAirQuality: InputAirQuality[] = [
  { id: '1', name: 'first', temperature: 20, humidity: 50, pm25: 10, co2: 401, last_seen: '20260222T11:30:00.000Z' },
  { id: '2', name: 'second', temperature: 21, humidity: 51, pm25: 11, voc: 101, last_seen: '20260222T11:30:00.000Z' },
  { id: '3', name: 'third', temperature: 22, humidity: 52, pm25: 12, voc: 102, last_seen: '20260222T11:30:00.000Z' },
  { id: '4', name: 'fourth', temperature: 23, humidity: 53, pm25: 13, voc: 103, last_seen: '20260222T11:30:00.000Z' }
]

const apiBasePath = config.apis.dirigera;
describe('When GET /air-quality', async () => {
  const path = '/air-quality';
  const apiPath = '/sensors';
  nock(apiBasePath)
    .get(apiPath)
    .reply(200, fakeAirQuality)

  it('Then array of air-quality is returned', async () => {
    const response = await request.get(path)
    expect(response.status).toBe(200)
    expect(response.type).toEqual('text/html');
  })
})
