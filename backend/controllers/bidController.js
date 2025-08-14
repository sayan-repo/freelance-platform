import { v4 as uuidv4 } from 'uuid';
import { projects, bids, users } from '../data/store.js';

export const createBid = (req, res) => {
    const { projectId } = req.params;
    const { amount, proposal, deliveryDays } = req.body;
    const project = projects.find(p => p.id === projectId);
    
    if (!project) return res.status(404).json({ error: 'Project not found' });
    if (project.clientId === req.user.id) return res.status(403).json({ error: 'Cannot bid on your own project' });
    if (project.status !== 'posted') return res.status(400).json({ error: 'Project is not accepting bids' });

    const newBid = { id: uuidv4(), projectId, freelancerId: req.user.id, amount: parseFloat(amount), proposal, deliveryDays: parseInt(deliveryDays), status: 'pending', createdAt: new Date().toISOString() };
    bids.push(newBid);
    res.status(201).json(newBid);
};

export const acceptBid = (req, res) => {
    const bid = bids.find(b => b.id === req.params.id);
    if (!bid) return res.status(404).json({ error: 'Bid not found' });
    
    const project = projects.find(p => p.id === bid.projectId);
    if (project.clientId !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
    if (project.status !== 'posted') return res.status(400).json({ error: 'Project is no longer accepting bids' });

    bid.status = 'accepted';
    bids.forEach(otherBid => {
        if (otherBid.projectId === bid.projectId && otherBid.id !== bid.id) {
            otherBid.status = 'rejected';
        }
    });
    project.status = 'in_progress';
    res.json({ message: 'Bid accepted successfully' });
};

export const getFreelancerBids = (req, res) => {
    const myBids = bids.filter(b => b.freelancerId === req.user.id).map(b => {
        const project = projects.find(p => p.id === b.projectId);
        const client = users.find(u => u.id === project.clientId);
        return { ...b, project: { id: project.id, title: project.title, client: { id: client.id, username: client.username }}};
    }).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(myBids);
};