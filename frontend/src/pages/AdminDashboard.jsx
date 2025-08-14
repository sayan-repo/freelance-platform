import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LogoutButton from '../components/LogoutButton';

const AdminDashboard = () => {
  const { user } = useAuth();
  return (
    <div style={{padding: '50px', fontFamily: 'sans-serif'}}>
      <h1>Admin Dashboard</h1>
      <h2>Welcome, {user?.username || 'Admin'}!</h2>
      <p>This is the protected area for administrators.</p>
      <LogoutButton />
    </div>
  );
};

export default AdminDashboard;