import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();
  
  const clientLinks = [
    { name: 'Dashboard', href: '/client-dashboard' },
    { name: 'My Projects', href: '/client/projects' },
    { name: 'Post Project', href: '/projects/post' },
    { name: 'Messages', href: '/messages' },
    { name: 'Payments', href: '/payments' },
    { name: 'Disputes', href: '/disputes' },
  ];
  
  const freelancerLinks = [
    { name: 'Dashboard', href: '/freelancer-dashboard' },
    { name: 'My Bids', href: '/freelancer/bids' },
    { name: 'Find Work', href: '/projects' },
    { name: 'Messages', href: '/messages' },
    { name: 'Earnings', href: '/earnings' },
    { name: 'Disputes', href: '/disputes' },
  ];
  
  const links = user?.role === 'client' ? clientLinks : freelancerLinks;
  
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="h-8 w-auto text-indigo-600 font-bold text-xl">FreelanceHub</div>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {links.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="mr-3">
              <Avatar src={user?.avatar} alt={user?.username} size="sm" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {user?.username}
              </p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                View profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;