import express from 'express';
import authRoutes from './authRoutes.js';
import projectRoutes from './projectRoutes.js';
import bidRoutes from './bidRoutes.js';
import disputeRoutes from './disputeRoutes.js';
import profileRoutes from './profileRoutes.js';
import dashboardRoutes from './dashboardRoutes.js'; // Import new routes

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/bids', bidRoutes);
router.use('/disputes', disputeRoutes);
router.use('/profile', profileRoutes);
router.use('/dashboard', dashboardRoutes); // Use new routes

export default router;