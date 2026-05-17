import nock from "nock";
import { request } from "../setup";
import { config } from "../../config";
import {CamerasData} from "../../routes/cameras";

const fakeCamerasData: CamerasData = {
  status: 'OK', data: [
    {
      host: 'localhost',
      privacy_enabled: true,
      name: 'backyard'
    }
  ]
}

const apiBasePath = config.apis.tapoCamera;
describe('When GET /privacy', async () => {
  nock(apiBasePath)
    .get('')
    .reply(200, fakeCamerasData)

  it('Then array of cameras are returned', async () => {
    const response = await request.get('/cameras');
    expect(response.status).toBe(200)
    expect(response.type).toEqual('text/html');
  })
})
