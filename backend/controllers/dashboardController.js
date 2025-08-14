import { users, projects, bids, disputes } from '../data/store.js';

// GET /api/dashboard/admin
export const getAdminDashboard = (req, res) => {
    res.json({
        totalUsers: users.length,
        totalProjects: projects.length,
        totalBids: bids.length,
        openDisputes: disputes.filter(d => d.status === 'open').length,
        recentUsers: users.slice(-5).reverse(),
        recentProjects: projects.slice(-5).reverse(),
    });
};

// GET /api/dashboard/client
export const getClientDashboard = (req, res) => {
    const myProjects = projects.filter(p => p.clientId === req.user.id);
    const projectsWithBids = myProjects.map(p => ({
        ...p,
        bidsCount: bids.filter(b => b.projectId === p.id).length
    })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
        activeProjects: myProjects.filter(p => p.status === 'in_progress').length,
        openProjects: myProjects.filter(p => p.status === 'posted').length,
        completedProjects: myProjects.filter(p => p.status === 'completed').length,
        totalSpent: myProjects.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.budget, 0),
        projects: projectsWithBids,
    });
};

// GET /api/dashboard/freelancer
export const getFreelancerDashboard = (req, res) => {
    const myBids = bids.filter(b => b.freelancerId === req.user.id);
    const acceptedBids = myBids.filter(b => b.status === 'accepted');
    const acceptedProjectIds = acceptedBids.map(b => b.projectId);
    const myProjects = projects.filter(p => acceptedProjectIds.includes(p.id));

    res.json({
        activeProjects: myProjects.filter(p => p.status === 'in_progress').length,
        completedProjects: myProjects.filter(p => p.status === 'completed').length,
        totalEarnings: myProjects.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.budget, 0),
        pendingBids: myBids.filter(b => b.status === 'pending').length,
        userRating: req.user.rating,
        recentBids: myBids.slice(-5).reverse(),
    });
};