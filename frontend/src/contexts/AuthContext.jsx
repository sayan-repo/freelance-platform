import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/api';
import Loader from '../components/ui/Loader'; // Ensure you have this component

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.getCurrentUser()
        .then(userData => setUser(userData))
        .catch(() => handleLogout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    window.addEventListener('logout', handleLogout);
    return () => window.removeEventListener('logout', handleLogout);
  }, [handleLogout]);

  const navigateByRole = (role) => {
    switch (role) {
      case 'client':
        navigate('/client-dashboard');
        break;
      case 'freelancer':
        navigate('/freelancer-dashboard');
        break;
      case 'admin':
        navigate('/projects');
        break;
      default:
        navigate('/');
    }
  };

  const login = async (credentials) => {
    // 'data' is the flat object from the API: { token, id, role, ... }
    const data = await authService.loginUser(credentials);
    localStorage.setItem('token', data.token);

    // CORRECTED: Create the user state object from the 'data' itself, minus the token.
    const { token, ...userPayload } = data;
    setUser(userPayload);
    
    // CORRECTED: Use the role directly from the 'data' object for navigation.
    navigateByRole(data.role); 
  };

  const register = async (userData) => {
    // 'data' is also a flat object from the API on successful registration
    const data = await authService.registerUser(userData);
    localStorage.setItem('token', data.token);

    // CORRECTED: Create the user state object from the 'data' itself
    const { token, ...userPayload } = data;
    setUser(userPayload);

    // CORRECTED: Use the role directly from the 'data' object
    navigateByRole(data.role);
  };
  
  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const value = { user, isAuthenticated: !!user, loading, login, register, logout: handleLogout, updateUser };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};