import { v4 as uuidv4 } from 'uuid';
import { disputes, projects, bids } from '../data/store.js';

export const createDispute = (req, res) => {
  const { projectId, reason, description, amount } = req.body;
  const project = projects.find(p => p.id === projectId);
  if (!project) return res.status(404).json({ error: 'Project not found' });

  const acceptedBid = bids.find(b => b.projectId === projectId && b.status === 'accepted');
  const freelancerId = acceptedBid ? acceptedBid.freelancerId : null;

  if (req.user.id !== project.clientId && req.user.id !== freelancerId) {
    return res.status(403).json({ error: 'Only project participants can create a dispute.' });
  }

  const newDispute = { id: uuidv4(), projectId, initiatorId: req.user.id, reason, description, amount: parseFloat(amount), status: 'open', resolution: null, arbitratorId: null, createdAt: new Date().toISOString() };
  disputes.push(newDispute);
  project.status = 'disputed';
  res.status(201).json(newDispute);
};

export const resolveDispute = (req, res) => {
  const { resolution, status } = req.body;
  const dispute = disputes.find(d => d.id === req.params.id);
  if (!dispute) return res.status(404).json({ error: 'Dispute not found' });

  dispute.status = status;
  dispute.resolution = resolution;
  dispute.arbitratorId = req.user.id;
  
  const project = projects.find(p => p.id === dispute.projectId);
  if (project) {
      project.status = status === 'resolved' ? 'completed' : 'in_progress';
  }

  res.json({ message: 'Dispute updated successfully' });
};

export const getDisputes = (req, res) => {
  res.json(disputes);
};