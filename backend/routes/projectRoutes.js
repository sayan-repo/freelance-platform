import express from 'express';
import { createProject, getProjects, getProjectById, updateProject } from '../controllers/projectController.js';
import { authenticate, authorizeRole } from '../middleware/authMiddleware.js';
import { createBid } from '../controllers/bidController.js';
import { recordPayment } from '../controllers/projectController.js';

const router = express.Router();

// This combines the GET and POST routes for the base /projects endpoint
router.route('/')
    .get(getProjects)
    .post(authenticate, authorizeRole(['client']), createProject); // ADDED: createProject handler

router.route('/:id')
    .get(getProjectById)
    .patch(authenticate, authorizeRole(['client']), updateProject);
    
router.post('/:projectId/bids', authenticate, authorizeRole(['freelancer']), createBid);

router.post('/:projectId/record-payment', authenticate, authorizeRole(['client']), recordPayment);

export default router;