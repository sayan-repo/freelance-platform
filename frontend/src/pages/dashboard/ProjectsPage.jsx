import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ProjectCard from '../../components/projects/ProjectCard';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import Loader from '../../components/ui/Loader';
import { getProjects } from '../../services/api';

const ProjectsPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const params = {};
        if (user.role === 'client') {
          params.clientId = user.id;
        }
        if (filter !== 'all') {
          params.status = filter;
        }
        
        const data = await getProjects(params);
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [user.id, user.role, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getFilterOptions = () => {
    if (user.role === 'client') {
      return [
        { value: 'all', label: 'All Projects' },
        { value: 'draft', label: 'Drafts' },
        { value: 'posted', label: 'Open' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
        { value: 'disputed', label: 'Disputed' }
      ];
    }
    
    return [
      { value: 'all', label: 'All Projects' },
      { value: 'posted', label: 'Open for Bidding' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' }
    ];
  };

  const filterOptions = getFilterOptions();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user.role === 'client' ? 'My Projects' : 'Available Projects'}
          </h1>
          <p className="mt-1 text-gray-600">
            {user.role === 'client' 
              ? 'Manage your posted projects' 
              : 'Find projects that match your skills'}
          </p>
        </div>
        
        {user.role === 'client' && (
          <Button as="a" href="/projects/post" variant="primary" className="mt-4 md:mt-0">
            Post a Project
          </Button>
        )}
      </div>
      
      {/* Filter Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange(option.value)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                filter === option.value
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </nav>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      ) : projects.length === 0 ? (
        <EmptyState 
          title={user.role === 'client' ? 'No projects found' : 'No projects available'}
          description={user.role === 'client' 
            ? 'Get started by posting your first project' 
            : 'Check back later for new opportunities'}
          actionText={user.role === 'client' ? 'Post Project' : 'Browse Projects'}
          actionPath={user.role === 'client' ? '/projects/post' : '/projects'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;