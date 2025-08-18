import { v4 as uuidv4 } from 'uuid';
import { projects, bids, users } from '../data/store.js';

// GET /api/projects
export const getProjects = (req, res) => {
    // ... (existing getProjects function remains the same)
    const projectsWithDetails = projects.map(p => {
        const client = users.find(u => u.id === p.clientId);
        return {
            ...p,
            bidsCount: bids.filter(b => b.projectId === p.id).length,
            client: { id: client.id, username: client.username }
        };
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(projectsWithDetails);
};

// GET /api/projects/:id
export const getProjectById = (req, res) => {
    // ... (existing getProjectById function remains the same)
    const project = projects.find(p => p.id === req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    const client = users.find(u => u.id === project.clientId);
    const projectBids = bids.filter(b => b.projectId === project.id).map(b => {
        const freelancer = users.find(u => u.id === b.freelancerId);
        return { ...b, freelancer: { id: freelancer.id, username: freelancer.username, rating: freelancer.rating } };
    });
    const { password, ...clientData } = client;
    res.json({ ...project, client: clientData, bids: projectBids });
};

// --- NEW FUNCTION TO ADD ---
// POST /api/projects
export const createProject = (req, res) => {
    const { title, description, budget, deadline, acceptanceCriteria, skills } = req.body;

    // Basic validation
    if (!title || !description || !budget || !deadline || !skills) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const newProject = {
        id: uuidv4(),
        clientId: req.user.id, // Get the client's ID from the authenticated user
        title,
        description,
        budget: parseFloat(budget),
        deadline,
        status: 'posted', // New projects are immediately open for bids
        acceptanceCriteria: acceptanceCriteria || 'N/A',
        skills: typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills,
        createdAt: new Date().toISOString()
    };
    
    projects.unshift(newProject); // Add to the beginning of the array
    console.log(`Project created: ${title} by user ${req.user.username}`);
    res.status(201).json(newProject);
};
// ----------------------------

// PATCH /api/projects/:id
export const updateProject = (req, res) => {
    // ... (existing updateProject function remains the same)
    const index = projects.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Project not found' });
    if (projects[index].clientId !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
    
    const { skills, ...otherUpdates } = req.body;
    if(skills && typeof skills === 'string') otherUpdates.skills = skills.split(',').map(s => s.trim());

    projects[index] = { ...projects[index], ...otherUpdates };
    res.json(projects[index]);
};

export const recordPayment = (req, res) => {
  const { projectId } = req.params;
  const { txHash } = req.body;

  const project = projects.find(p => p.id === projectId);
  if (!project) return res.status(404).json({ error: 'Project not found' });

  // In a real database, you would save the txHash and update the status
  project.paymentTxHash = txHash;
  project.status = 'paid'; // Or a similar status

  console.log(`Payment recorded for project ${projectId}. TxHash: ${txHash}`);
  res.status(200).json({ message: 'Payment recorded successfully', project });
};