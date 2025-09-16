import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProjectListPage from './pages/projects/ProjectListPage';
import ProjectDetailPage from './pages/projects/ProjectDetailPage';
import ProfilePage from './pages/profile/ProfilePage';
// Import the new dashboards
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import FreelancerDashboard from './pages/dashboard/FreelancerDashboard';
import PostProjectPage from './pages/projects/PostProjectPage'; // Import the new page
import ArbitratorRegisterPage from './pages/auth/ArbitratorRegisterPage';
import DisputesPage from './pages/disputes/DisputesPage';

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/register-arbitrator" element={<ArbitratorRegisterPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            {/* Add the new dashboard routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
            <Route path="/projects/new" element={<PostProjectPage />} />
            <Route path="/disputes" element={<DisputesPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}

export default App;