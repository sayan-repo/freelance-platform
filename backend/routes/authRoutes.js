import express from 'express';
import { register, login, getCurrentUser, registerArbitrator } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/register-arbitrator', registerArbitrator);
router.post('/login', login);
router.get('/me', authenticate, getCurrentUser);

export default router;