import express from 'express';
import authRouter from './auth.router.js';
// import bookRouter from './book.router.js';
// import bookCategoryRouter from './bookCategory.router.js';

const router = express.Router();

router.use('/', authRouter);
// router.use('/', bookRouter);
// router.use('/', bookCategoryRouter);

export default router;
