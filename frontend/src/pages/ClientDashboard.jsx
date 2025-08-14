import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LogoutButton from '../components/LogoutButton';

const ClientDashboard = () => {
  const { user } = useAuth();
  return (
    <div style={{padding: '50px', fontFamily: 'sans-serif'}}>
      <h1>Client Dashboard</h1>
      <h2>Welcome, {user?.username || 'Client'}!</h2>
      <p>This is the protected area for clients.</p>
      <LogoutButton />
    </div>
  );
};

export default ClientDashboard;