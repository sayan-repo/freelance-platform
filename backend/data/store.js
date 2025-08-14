import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const hash = async (password) => bcrypt.hash(password, 10);

export let users = [];
export let projects = [];
export let bids = [];
export let disputes = [];

// The data initialization is now an exported function
export const initializeData = async () => {
  users = [
    { id: '1', username: 'admin', email: 'admin@example.com', password: await hash('adminpass'), role: 'admin', bio: 'Site admin.', skills: ['arbitration'], rating: 5.0, completedProjects: 0, createdAt: new Date().toISOString() },
    { id: 'client-1', username: 'TechSolutions', email: 'client@example.com', password: await hash('clientpass'), role: 'client', bio: 'Innovative tech company.', skills: [], rating: 4.8, completedProjects: 1, createdAt: new Date().toISOString() },
    { id: 'freelancer-1', username: 'JaneDev', email: 'jane@example.com', password: await hash('freelancerpass'), role: 'freelancer', bio: 'Expert React developer.', skills: ['React', 'TypeScript', 'Next.js'], rating: 4.9, completedProjects: 15, createdAt: new Date().toISOString() },
    { id: 'freelancer-2', username: 'MikeDesign', email: 'mike@example.com', password: await hash('freelancerpass'), role: 'freelancer', bio: 'Creative UI/UX designer.', skills: ['Figma', 'UI/UX', 'Web Design'], rating: 5.0, completedProjects: 20, createdAt: new Date().toISOString() },
  ];

  projects = [
    { id: 'p-1', clientId: 'client-1', title: 'Build a new E-commerce Website', description: 'Modern, responsive e-commerce platform with an admin panel.', budget: 5000, deadline: new Date(Date.now() + 30 * 86400000).toISOString(), status: 'posted', skills: ['React', 'Node.js'], createdAt: new Date().toISOString() },
    { id: 'p-2', clientId: 'client-1', title: 'Mobile App Landing Page Design', description: 'Sleek and intuitive UI/UX for a new social media app.', budget: 2500, deadline: new Date(Date.now() + 15 * 86400000).toISOString(), status: 'in_progress', skills: ['Figma', 'UI/UX'], createdAt: new Date().toISOString() },
    { id: 'p-3', clientId: 'client-1', title: 'Marketing Copy for New Campaign', description: 'Compelling copy for our new product launch.', budget: 800, deadline: new Date(Date.now() + 7 * 86400000).toISOString(), status: 'completed', skills: ['Copywriting', 'Marketing'], createdAt: new Date().toISOString() },
    { id: 'p-4', clientId: 'client-1', title: 'API Integration Project', description: 'Integrate a third-party payment gateway.', budget: 1500, deadline: new Date(Date.now() + 10 * 86400000).toISOString(), status: 'disputed', skills: ['API', 'Node.js'], createdAt: new Date().toISOString() },
  ];

  bids = [
    { id: 'b-1', projectId: 'p-1', freelancerId: 'freelancer-1', amount: 4800, proposal: 'I can build this with Next.js for optimal performance.', status: 'pending', deliveryDays: 30, createdAt: new Date().toISOString() },
    { id: 'b-2', projectId: 'p-2', freelancerId: 'freelancer-2', amount: 2500, proposal: 'I will provide a full design system in Figma.', status: 'accepted', deliveryDays: 14, createdAt: new Date().toISOString() },
    { id: 'b-3', projectId: 'p-3', freelancerId: 'freelancer-1', amount: 800, proposal: 'Done.', status: 'accepted', deliveryDays: 5, createdAt: new Date().toISOString() },
    { id: 'b-4', projectId: 'p-4', freelancerId: 'freelancer-1', amount: 1400, proposal: 'I have experience with this gateway.', status: 'accepted', deliveryDays: 10, createdAt: new Date().toISOString() },
  ];

  disputes = [
      { id: 'd-1', projectId: 'p-4', initiatorId: 'client-1', reason: 'Incomplete Work', description: 'The freelancer did not complete the final module.', amount: 500, status: 'open', resolution: null, arbitratorId: null, createdAt: new Date().toISOString() },
  ];

  console.log('✅ In-memory data initialized.');
};