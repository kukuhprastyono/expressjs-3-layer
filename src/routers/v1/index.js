import express from 'express';
import authRouter from './auth.router.js';
import bookRouter from './book.router.js';

const router = express.Router();

router.use('/', authRouter);
router.use('/', bookRouter);

export default router;
