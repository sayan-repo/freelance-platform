import api from './api';

export const loginUser = async (credentials) => {
    const data = await api.post('/auth/login', credentials);
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
};

export const registerUser = async (userData) => {
    const data = await api.post('/auth/register', userData);
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
};

export const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        return await api.get('/auth/me');
    } catch (error) {
        localStorage.removeItem('token');
        return null;
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};