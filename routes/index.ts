import express, { Router, Request, Response, NextFunction } from 'express';

const router: Router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, _next: NextFunction) => {
  res.render('index')
});

export default router;
