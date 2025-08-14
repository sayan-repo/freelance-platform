import express from 'express';
import { createDispute, resolveDispute, getDisputes } from '../controllers/disputeController.js';
import { authenticate, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(authenticate, getDisputes)
    .post(authenticate, authorizeRole(['client', 'freelancer']), createDispute);

router.patch('/:id/resolve', authenticate, authorizeRole(['admin']), resolveDispute);

export default router;