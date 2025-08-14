import { useEffect, useState } from 'react';
import { getMyClientProjects } from '../../services/api';
import ProjectCard from '../../components/projects/ProjectCard';
import Loader from '../../components/ui/Loader';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const MyProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyClientProjects()
      .then(data => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader className="mt-20" />;

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Projects</h1>
          <p className="mt-1 text-muted-foreground">Manage all the projects you have posted.</p>
        </div>
        <Link to="/projects/create">
          <Button>Post a New Project</Button>
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-dashed border-2 rounded-lg">
          <h3 className="text-xl font-semibold">You haven't posted any projects yet.</h3>
          <p className="mt-2 text-muted-foreground">Ready to get started?</p>
          <Link to="/projects/create" className="mt-4 inline-block">
            <Button>Post Your First Project</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyProjectsPage;