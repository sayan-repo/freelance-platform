import { users, projects, bids } from '../data/store.js';

export const updateProfile = (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  const { skills, ...otherUpdates } = req.body;
  if(skills) otherUpdates.skills = typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills;

  Object.assign(user, otherUpdates);
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
};

export const getClientDashboard = (req, res) => {
    const myProjects = projects.filter(p => p.clientId === req.user.id);
    const activeProjects = myProjects.filter(p => p.status === 'posted' || p.status === 'in_progress').length;
    const openDisputes = myProjects.filter(p => p.status === 'disputed').length;
    const totalSpent = myProjects.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.budget, 0);

    // THE FIX: We now add the bidsCount to each project before sending it.
    const projectsWithDetails = myProjects
      .map(p => ({
        ...p,
        bidsCount: bids.filter(b => b.projectId === p.id).length
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.json({
        activeProjects,
        openDisputes,
        totalSpent,
        projects: projectsWithDetails,
    });
};

export const getFreelancerDashboard = (req, res) => {
    const myAcceptedBids = bids.filter(b => b.freelancerId === req.user.id && b.status === 'accepted');
    const myAcceptedProjectIds = myAcceptedBids.map(b => b.projectId);
    
    const myProjects = projects.filter(p => myAcceptedProjectIds.includes(p.id));
    const activeProjects = myProjects.filter(p => p.status === 'in_progress').length;
    const completedProjects = myProjects.filter(p => p.status === 'completed').length;
    const totalEarnings = myProjects.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.budget, 0);

    const openBids = bids.filter(b => b.freelancerId === req.user.id && b.status === 'pending').length;
    const recommendedProjects = projects
      .filter(p => p.status === 'posted')
      .map(p => ({...p, client: { username: users.find(u => u.id === p.clientId)?.username || 'Unknown' }}))
      .slice(0, 3);
    
    res.json({
        activeProjects,
        openBids,
        completedProjects,
        totalEarnings,
        rating: req.user.rating,
        recommendedProjects,
    });
};