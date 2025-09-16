import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const hash = async (password) => bcrypt.hash(password, 10);

export let users = [];
export let projects = [];
export let bids = [];
export let disputes = [];

// The data initialization is now an exported async function
export const initializeData = async () => {
  users = [
    { id: '1', username: 'admin', email: 'admin@example.com', password: await hash('adminpass'), role: 'admin' },
    { id: 'arbitrator-1', username: 'JudgeJudy', email: 'judy@example.com', password: await hash('arbitratorpass'), role: 'arbitrator', expertise: ['Web Development', 'Contract Law'] },
    { 
      id: 'client-1', 
      username: 'TechSolutions', 
      email: 'client@example.com', 
      password: await hash('clientpass'), 
      role: 'client',
      walletAddress: '0x1111111111111111111111111111111111111111', 
    },
    { 
      id: 'freelancer-1', 
      username: 'JaneDev', 
      email: 'jane@example.com', 
      password: await hash('freelancerpass'), 
      role: 'freelancer',
      walletAddress: '0x2222222222222222222222222222222222222222', 
    },
  ];

  projects = [
    { 
      id: 'p-1', 
      clientId: 'client-1', 
      title: 'Build a new E-commerce Website', 
      description: 'Modern, responsive e-commerce platform with an admin panel.', 
      budget: 5000, 
      deadline: new Date(Date.now() + 30 * 86400000).toISOString(), 
      status: 'posted', 
      skills: ['React', 'Node.js', 'PostgreSQL'], // Has skills
      createdAt: new Date().toISOString() 
    },
    { 
      id: 'p-2', 
      clientId: 'client-1', 
      title: 'Mobile App Landing Page Design', 
      description: 'Sleek and intuitive UI/UX for a new social media app.', 
      budget: 2500, 
      deadline: new Date(Date.now() + 15 * 86400000).toISOString(), 
      status: 'in_progress', 
      skills: ['Figma', 'UI/UX', 'Web Design'], // Has skills
      createdAt: new Date().toISOString() 
    },
    { 
      id: 'p-3', 
      clientId: 'client-1', 
      title: 'API Integration Project', 
      description: 'Integrate a third-party payment gateway.', 
      budget: 1500, 
      deadline: new Date(Date.now() + 10 * 86400000).toISOString(), 
      status: 'disputed', 
      skills: ['API', 'Node.js', 'Stripe'], 
      createdAt: new Date().toISOString() 
    },
    { 
      id: 'p-4', 
      clientId: 'client-1', 
      title: 'Internal Dashboard Cleanup', 
      description: 'Refactor and clean up our internal admin dashboard.', 
      budget: 1000, 
      deadline: new Date(Date.now() + 20 * 86400000).toISOString(), 
      status: 'completed', 
      skills: [],
      createdAt: new Date().toISOString() 
    },
  ];

  bids = [
    { id: 'b-1', projectId: 'p-1', freelancerId: 'freelancer-1', amount: 4800, status: 'pending', deliveryDays: 30 },
    { id: 'b-2', projectId: 'p-2', freelancerId: 'freelancer-1', amount: 2500, status: 'accepted', deliveryDays: 14 },
    { id: 'b-3', projectId: 'p-3', freelancerId: 'freelancer-1', amount: 800, status: 'accepted', deliveryDays: 5 },
  ];
  
  disputes = [];
  console.log('✅ In-memory data initialized.');
};