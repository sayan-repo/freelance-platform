import express from 'express';
import { acceptBid, getFreelancerBids } from '../controllers/bidController.js';
import { authenticate, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authenticate, authorizeRole(['freelancer']), getFreelancerBids);
router.patch('/:id/accept', authenticate, authorizeRole(['client']), acceptBid);

export default router;