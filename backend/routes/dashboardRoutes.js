import express from 'express';
import { getAdminDashboard, getClientDashboard, getFreelancerDashboard } from '../controllers/dashboardController.js';
import { authenticate, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/admin', authenticate, authorizeRole(['admin']), getAdminDashboard);
router.get('/client', authenticate, authorizeRole(['client']), getClientDashboard);
router.get('/freelancer', authenticate, authorizeRole(['freelancer']), getFreelancerDashboard);

export default router;