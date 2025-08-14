import { useState, useEffect } from 'react';
import ProjectCard from '../../components/projects/ProjectCard';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import Loader from '../../components/ui/Loader';
import { getProjects } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import Select from '../../components/ui/Select';

const ProjectListPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minBudget: '',
    maxBudget: '',
    sort: 'newest',
    search: ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const params = {
          status: 'posted',
          ...filters
        };
        
        const data = await getProjects(params);
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger refetch automatically via useEffect
  };

  const categories = [
    'Web Development',
    'Mobile Development',
    'Design & Creative',
    'Writing & Translation',
    'Admin Support',
    'Customer Service',
    'Marketing',
    'Accounting & Consulting'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Work</h1>
          <p className="mt-1 text-gray-600">
            Browse projects that match your skills and expertise
          </p>
        </div>
        
        {user?.role === 'client' && (
          <Button as="a" href="/projects/post" variant="primary" className="mt-4 md:mt-0">
            Post a Project
          </Button>
        )}
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search Projects
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search keywords..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <Select
              id="category"
              name="category"
              className="mt-1"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
          </div>
          
          <div>
            <label htmlFor="minBudget" className="block text-sm font-medium text-gray-700">
              Min Budget
            </label>
            <input
              type="number"
              name="minBudget"
              id="minBudget"
              placeholder="$"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filters.minBudget}
              onChange={handleFilterChange}
            />
          </div>
          
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
              Sort By
            </label>
            <Select
              id="sort"
              name="sort"
              className="mt-1"
              value={filters.sort}
              onChange={handleFilterChange}
            >
              <option value="newest">Newest First</option>
              <option value="budget_high">Highest Budget</option>
              <option value="budget_low">Lowest Budget</option>
            </Select>
          </div>
          
          <div className="md:col-span-5 flex justify-end">
            <Button type="submit" variant="primary" className="mr-3">
              Apply Filters
            </Button>
            <Button 
              type="button" 
              variant="secondary"
              onClick={() => setFilters({
                category: '',
                minBudget: '',
                maxBudget: '',
                sort: 'newest',
                search: ''
              })}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : projects.length === 0 ? (
        <EmptyState 
          title="No projects found"
          description="Try adjusting your search filters to find more opportunities"
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

export default ProjectListPage;