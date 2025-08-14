import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LogoutButton from '../components/LogoutButton';

const FreelancerDashboard = () => {
  const { user } = useAuth();
  return (
    <div style={{padding: '50px', fontFamily: 'sans-serif'}}>
      <h1>Freelancer Dashboard</h1>
      <h2>Welcome, {user?.username || 'Freelancer'}!</h2>
      <p>This is the protected area for freelancers.</p>
      <LogoutButton />
    </div>
  );
};

export default FreelancerDashboard;