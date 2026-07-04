import express, { NextFunction, Request, Response, Router } from 'express'
import { config } from '../config'

export type Camera = {
  host: string
  privacy_enabled: boolean
  name: string
}

export type CamerasData = {
  status: string
  data: Camera[]
}

const fakeInput: CamerasData = {
  status: 'OK',
  data: [
    {
      host: 'localhost',
      privacy_enabled: true,
      name: 'backyard',
    },
  ],
}

const router: Router = express.Router()

const getCameras = async (): Promise<Camera[]> => {
  if (config.useFake) {
    return fakeInput.data
  }

  const response = await fetch(config.apis.tapoCamera)
  const camerasData = (await response.json()) as unknown as CamerasData
  return camerasData.data
}

const renderCameras = async (res: Response) => {
  const cameras = await getCameras()
  res.render('cameras', { cameras })
}

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  await renderCameras(res)
})

export default router
