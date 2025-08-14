import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getProjectById, updateProject } from '../../services/api';
import { toast } from 'react-toastify';

import Loader from '../../components/ui/Loader';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import ProjectForm from '../../components/projects/ProjectForm';
import BidList from '../../components/projects/BidList';
import BidForm from '../../components/projects/BidForm';
import { formatCurrency } from '../../utils/formatters';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProject = () => {
    setLoading(true);
    getProjectById(id)
      .then(setProject)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleUpdateProject = async (formData) => {
    try {
      const updated = await updateProject(project.id, formData);
      setProject(updated); // Update local state with the returned project
      setIsEditing(false);
      toast.success('Project updated successfully!');
    } catch (error) {
      toast.error('Failed to update project.');
    }
  };

  if (loading) return <Loader className="mt-20" />;
  if (!project) return <div className="text-center py-20">Project not found.</div>;

  const isOwner = user?.id === project.client.id;

  return (
    <div className="container py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">{project.title}</CardTitle>
                <CardDescription className="mt-2">
                  Posted by <Link to={`/profile/${project.client.username}`} className="font-medium text-primary hover:underline">{project.client.username}</Link> on {new Date(project.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
              {isOwner && (
                <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Cancel' : 'Edit Project'}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <ProjectForm project={project} onSubmit={handleUpdateProject} />
            ) : (
              <div className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p>{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bids ({project.bids.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <BidList bids={project.bids} project={project} onBidAccepted={fetchProject} />
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-8 lg:sticky lg:top-24">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Budget</span>
              <span className="font-semibold">{formatCurrency(project.budget)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Deadline</span>
              <span className="font-semibold">{new Date(project.deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge status={project.status} />
            </div>
          </CardContent>
        </Card>

        {user?.role === 'freelancer' && project.status === 'posted' && (
          <Card>
            <CardHeader>
              <CardTitle>Place Your Bid</CardTitle>
            </CardHeader>
            <CardContent>
              <BidForm projectId={project.id} onBidSubmitted={fetchProject} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;