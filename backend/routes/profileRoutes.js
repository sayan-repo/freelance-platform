import express from 'express';
import { updateProfile, getClientDashboard, getFreelancerDashboard } from '../controllers/profileController.js';
import { authenticate, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.patch('/profile', authenticate, updateProfile);
router.get('/dashboard/client', authenticate, authorizeRole(['client']), getClientDashboard);
router.get('/dashboard/freelancer', authenticate, authorizeRole(['freelancer']), getFreelancerDashboard);

export default router;