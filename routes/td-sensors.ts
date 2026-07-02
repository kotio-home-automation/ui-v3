import express, {NextFunction, Request, Response, Router} from 'express';
import { config } from '../config';

export type TdSensor = {
  id: number
  name: string
  temperature: number
  outdoor: boolean
  humidity?: number
}

const fakeInput: TdSensor[] = [
  {id: 1, name: 'first', temperature: 22.2, outdoor: true},
  {id: 2, name: 'second', temperature: 11.1, humidity: 33, outdoor: false}
]

const router: Router = express.Router()
const tdSensorsApiPath = `${config.apis.tellstick}/sensors`

const getTdSensors = async (): Promise<TdSensor[]> => {
  if (config.useFake) {
    return fakeInput
  }

  const response = await fetch(tdSensorsApiPath)
  return await response.json() as unknown as TdSensor[]
}

router.get('/', async (req: Request, res: Response, _next: NextFunction) => {
  const sensors = await getTdSensors();
  res.render('td-sensors', { sensors })
});

export default router
