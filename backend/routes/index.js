import express from 'express';
import authRoutes from './authRoutes.js';
import projectRoutes from './projectRoutes.js';
import bidRoutes from './bidRoutes.js';
import disputeRoutes from './disputeRoutes.js';
import userRoutes from './userRoutes.js'; // Import the new combined user routes

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/bids', bidRoutes);
router.use('/disputes', disputeRoutes);
router.use('/', userRoutes); 

export default router;