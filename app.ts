import createError from 'http-errors';
import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import lightsRouter from './routes/lights';
import magnetsRouter from './routes/magnets';
import waterSensorsRouter from './routes/water_sensors';
import airQualityRouter from './routes/airQuality';
import ruuvitagRouter from './routes/ruuvitag';
import sensorsRouter from './routes/sensors';
import devicesRouter from './routes/devices';
import lightDevicesRouter from './routes/lights-devices'
import tdSensorsRouter from './routes/td-sensors';
import camerasRouter from './routes/cameras';
import camerasWrapperRouter from './routes/cameras-wrapper';

const app: Express = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/lights', lightsRouter);
app.use('/magnets', magnetsRouter);
app.use('/water-sensors', waterSensorsRouter);
app.use('/air-quality', airQualityRouter);
app.use('/devices', devicesRouter);
app.use('/ruuvitag', ruuvitagRouter);
app.use('/sensors', sensorsRouter);
app.use('/lights-devices', lightDevicesRouter);
app.use('/td-sensors', tdSensorsRouter);
app.use('/cameras-wrapper', camerasWrapperRouter);
app.use('/cameras', camerasRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
