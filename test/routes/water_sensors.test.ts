import nock from "nock";
import { request } from "../setup";
import { InputWaterSensor } from "../../routes/water_sensors";
import { config } from "../../config";

const fakeWaterSensors: InputWaterSensor[] = [
  { id: '1', name: 'first', has_leak: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
  { id: '2', name: 'second', has_leak: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
  { id: '3', name: 'third', has_leak: false, battery: 100, last_seen: '20260222T11:30:00.000Z' },
  { id: '4', name: 'fourth', has_leak: false, battery: 100, last_seen: '20260222T11:30:00.000Z' }
]

const apiBasePath = config.apis.dirigera;
describe('When GET /water-sensors', async () => {
  const path = '/water_sensors';
  nock(apiBasePath)
    .get(path)
    .reply(200, fakeWaterSensors)

  it('Then array of water sensors is returned', async () => {
    const response = await request.get('/water-sensors')
    expect(response.status).toBe(200)
    expect(response.type).toEqual('text/html');
  })
})
