import express from 'express';
import { updateProfile } from '../controllers/profileController.js';
import { getAdminDashboard, getClientDashboard, getFreelancerDashboard } from '../controllers/dashboardController.js';
import { authenticate, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Profile Route (handles PATCH /api/profile)
router.patch('/profile', authenticate, updateProfile);

// Dashboard Routes (handles GET /api/dashboard/...)
router.get('/dashboard/admin', authenticate, authorizeRole(['admin']), getAdminDashboard);
router.get('/dashboard/client', authenticate, authorizeRole(['client']), getClientDashboard);
router.get('/dashboard/freelancer', authenticate, authorizeRole(['freelancer']), getFreelancerDashboard);

export default router;