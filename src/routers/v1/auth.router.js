import express from 'express';
import { login, register, me } from '../../controllers/auth.controller.js';
import authenticateToken from '../../middleware/authenticate.middleware.js';

const router = express.Router();
router.post('/auth/login', login);
router.post('/auth/register', register);
router.get('/auth/me', authenticateToken, me);

export default router;
