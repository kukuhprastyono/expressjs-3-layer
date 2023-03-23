import express from 'express';
import { getOneBook } from '../../controllers/book.controller.js';
import authenticateToken from '../../middleware/authenticate.middleware.js';

const router = express.Router();
router.get('/books/:uuid', authenticateToken, getOneBook);

export default router;
