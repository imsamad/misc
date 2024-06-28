import { Router } from 'express';
import userRouter from './user.routes.js';
import creditRouter from './credit.routes.js';

export const router = Router();

router.use('/user', userRouter);
router.use('/credit', creditRouter);
