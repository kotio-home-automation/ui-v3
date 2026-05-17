import express, { Router, Request, Response, NextFunction } from 'express';
import { config } from '../config';

export type Device = {
  id: number
  name: string
  switchedOn: boolean
}

type DevicesInput = {
  devices: Device[]
}

const fakeInput: Device[] = [
  {id: 1, name: 'first', switchedOn: false},
  {id: 2, name: 'second', switchedOn: true}
]

const router: Router = express.Router()
const devicesApiPath = `${config.apis.tellstick}/devices`
const deviceOnApiPath = `${devicesApiPath}/on`
const deviceOffApiPath = `${devicesApiPath}/off`

const getDevices = async (): Promise<Device[]> => {
  if (config.useFake) {
    return fakeInput
  }

  const response = await fetch(devicesApiPath)
  const devicesInput = await response.json() as unknown as DevicesInput
  return devicesInput.devices
}

const renderDevices = async (res: Response) => {
  const devices = await getDevices();
  res.render('devices', { devices })
}

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  await renderDevices(res)
});

router.post('/:id/on', async (req: Request, res: Response, _next: NextFunction) => {
  const id = Number(req.params.id)
  const reqBody = JSON.stringify([id])
  await fetch(deviceOnApiPath, {
    method: 'POST',
    body: reqBody,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  await renderDevices(res)
})

router.post('/:id/off', async (req: Request, res: Response, _next: NextFunction) => {
  const id = Number(req.params.id)
  const reqBody = JSON.stringify([id])
  await fetch(deviceOffApiPath, {
    method: 'POST',
    body: reqBody,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  await renderDevices(res)
})

export default router
