import express from 'express';
import { login, getNonce, refreshToken, logout } from '../controllers/AuthController.js';

const router = express.Router();

router.get('/:address/nonce', getNonce); // ✅

router.post('/login', login); // ✅

router.get('/refresh_token', refreshToken);

router.get('/logout', logout);

export default router;