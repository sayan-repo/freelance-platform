import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';
import Button from '../ui/Button';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { account, connectWallet } = useWallet();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/admin-dashboard';
      case 'client': return '/client-dashboard';
      case 'freelancer': return '/freelancer-dashboard';
      default: return '/';
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center text-xl font-bold text-indigo-600">
              FreelanceHub
            </Link>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/projects" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Browse Projects
              </Link>
              {isAuthenticated && (
                <>
                  <Link to={getDashboardPath()} className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Dashboard
                  </Link>
                  {/* THE FIX: Added Disputes link for logged-in users */}
                  <Link to="/disputes" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Disputes
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  Welcome, {user.username}
                </span>
                {account ? (
                  <div className="border rounded-full px-3 py-1 text-sm text-gray-600 bg-gray-100">
                    {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                  </div>
                ) : (
                  <Button onClick={connectWallet} variant="secondary" size="sm">Connect Wallet</Button>
                )}
                <span className="text-sm font-medium text-gray-700 hidden md:block">Welcome, {user.username}</span>
                <Button variant="secondary" size="sm" onClick={logout}>Logout</Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button as={Link} to="/login" variant="secondary" size="sm">Sign In</Button>
                <Button as={Link} to="/register" variant="primary" size="sm">Sign Up</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;