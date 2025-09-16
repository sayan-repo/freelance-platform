import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  // --- THE FIX IS HERE ---
  // This tells Axios to always send data in the JSON format.
  headers: {
    'Content-Type': 'application/json',
  },
  // -----------------------
});

// This interceptor will add the authorization token to every request once you're logged in.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// This interceptor handles errors globally.
api.interceptors.response.use(
  (response) => response.data, // Return the data property directly on success
  (error) => {
    const message = error.response?.data?.error || error.message || 'An unknown error occurred';
    toast.error(message);

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Use a custom event to signal logout to avoid circular dependencies
      window.dispatchEvent(new Event('logout'));
    }
    return Promise.reject(error);
  }
);

// --- All your API functions remain the same ---

// Auth Service
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (userData) => api.post('/auth/register', userData);
export const getCurrentUser = () => api.get('/auth/me');

// Project Service
export const getProjects = (params) => api.get('/projects', { params });
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const updateProject = (id, data) => api.patch(`/projects/${id}`, data);
export const createProject = (projectData) => api.post('/projects', projectData);

// Bid Service
export const createBid = (projectId, data) => api.post(`/projects/${projectId}/bids`, data);
export const acceptBid = (bidId) => api.patch(`/bids/${bidId}/accept`);
export const getFreelancerBids = () => api.get('/bids/me');

// Arbitrator
export const registerArbitrator = (userData) => api.post('/auth/register-arbitrator', userData);

// Disputes
export const createDispute = (disputeData) => api.post('/disputes', disputeData);
export const getDisputes = () => api.get('/disputes');
export const resolveDispute = (disputeId, resolutionData) => api.patch(`/disputes/${disputeId}/resolve`, resolutionData);

// Profile & Dashboard Service
export const updateUserProfile = (data) => api.patch('/profile', data);


// Dashboard Service
export const getAdminDashboard = () => api.get('/dashboard/admin');
export const getClientDashboard = () => api.get('/dashboard/client');
export const getFreelancerDashboard = () => api.get('/dashboard/freelancer');

export const recordPayment = (projectId, data) => api.post(`/projects/${projectId}/record-payment`, data);

export default api;