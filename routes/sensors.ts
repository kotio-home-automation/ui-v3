import express, { Router, Request, Response, NextFunction } from 'express';

const router: Router = express.Router()

router.get('/', async (req: Request, res: Response, _next: NextFunction) => {
    res.render('sensors');
});

export default router
