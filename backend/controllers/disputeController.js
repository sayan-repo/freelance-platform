import { v4 as uuidv4 } from 'uuid';
import { disputes, projects, bids } from '../data/store.js';

export const createDispute = (req, res) => {
  const { projectId, reason, description } = req.body;
  const project = projects.find(p => p.id === projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  const acceptedBid = bids.find(b => b.projectId === projectId && b.status === 'accepted');
  const freelancerId = acceptedBid ? acceptedBid.freelancerId : null;

  if (req.user.id !== project.clientId && req.user.id !== freelancerId) {
    return res.status(403).json({ message: 'Only project participants can create a dispute.' });
  }

  const newDispute = { id: uuidv4(), projectId, initiatorId: req.user.id, reason, description, status: 'open', createdAt: new Date().toISOString() };
  disputes.push(newDispute);
  project.status = 'disputed';
  res.status(201).json(newDispute);
};

export const resolveDispute = (req, res) => {
  const { resolution, status } = req.body;
  const { disputeId } = req.params;
  const dispute = disputes.find(d => d.id === disputeId);
  if (!dispute) return res.status(404).json({ message: 'Dispute not found' });

  dispute.status = status; // 'resolved' or 'rejected'
  dispute.resolution = resolution;
  dispute.arbitratorId = req.user.id;
  
  const project = projects.find(p => p.id === dispute.projectId);
  if (project) {
      project.status = status === 'resolved' ? 'completed' : 'in_progress';
  }
  res.json({ message: 'Dispute updated successfully' });
};

export const getDisputes = (req, res) => {
  // Admins/Arbitrators see all disputes, others see only their own.
  if (req.user.role === 'admin' || req.user.role === 'arbitrator') {
    return res.json(disputes);
  }
  const userDisputes = disputes.filter(d => {
      const project = projects.find(p => p.id === d.projectId);
      const bid = bids.find(b => b.projectId === d.projectId && b.status === 'accepted');
      return project.clientId === req.user.id || (bid && bid.freelancerId === req.user.id);
  });
  res.json(userDisputes);
};