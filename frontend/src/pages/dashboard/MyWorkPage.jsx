import { useEffect, useState } from 'react';
import { getMyFreelancerWork } from '../../services/api';
import ProjectCard from '../../components/projects/ProjectCard';
import Loader from '../../components/ui/Loader';

const MyWorkPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyFreelancerWork()
      .then(data => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader className="mt-20" />;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Work</h1>
        <p className="mt-1 text-muted-foreground">Track your active and completed jobs.</p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-dashed border-2 rounded-lg">
          <h3 className="text-xl font-semibold">You don't have any active jobs.</h3>
          <p className="mt-2 text-muted-foreground">Find your next opportunity on the project board.</p>
        </div>
      )}
    </div>
  );
};

export default MyWorkPage;