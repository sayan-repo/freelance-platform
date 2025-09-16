import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getProjectById, acceptBid, createDispute, updateProject } from '../../services/api';
import { toast } from 'react-toastify';

import Loader from '../../components/ui/Loader';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import ProjectForm from '../../components/projects/ProjectForm';
import BidList from '../../components/projects/BidList';
import BidForm from '../../components/projects/BidForm';
import DisputeForm from '../../components/disputes/DisputeForm';
import { formatCurrency } from '../../utils/formatters';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showDisputeForm, setShowDisputeForm] = useState(false);

  const fetchProject = () => {
    setLoading(true);
    getProjectById(id)
      .then(setProject)
      .catch(err => toast.error("Failed to load project details."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleUpdateProject = async (formData) => {
    try {
      const updated = await updateProject(project.id, formData);
      setProject(updated);
      setIsEditing(false);
      toast.success('Project updated successfully!');
    } catch (error) {
      toast.error('Failed to update project.');
    }
  };
  
  const handleAcceptBid = async (bidId) => {
    try {
      await acceptBid(bidId);
      toast.success("Bid accepted! The project is now in progress.");
      fetchProject();
    } catch (error) {
      toast.error("Failed to accept bid.");
    }
  };

  const handleCreateDispute = async (disputeData) => {
    try {
        await createDispute({ ...disputeData, projectId: project.id });
        toast.success("Dispute filed. An arbitrator will review it shortly.");
        setShowDisputeForm(false);
        fetchProject();
    } catch (error) {
        toast.error("Failed to file dispute.");
    }
  };

  if (loading) return <div className="flex justify-center mt-20"><Loader size="lg" /></div>;
  if (!project) return <div className="text-center py-20">Project not found.</div>;

  const isClientOwner = user?.id === project.clientId;
  const isFreelancer = user?.role === 'freelancer';
  const hiredFreelancer = project.bids.find(b => b.status === 'accepted')?.freelancer;
  const isHiredFreelancer = user?.id === hiredFreelancer?.id;
  const canRaiseDispute = isClientOwner  && ['in_progress', 'completed', 'disputed'].includes(project.status);
  const userHasBid = project.bids.some(b => b.freelancer.id === user?.id);
  const canPlaceBid = isFreelancer && project.status === 'posted' && !isClientOwner && !userHasBid;

  return (
    <div className="max-w-7xl mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">{project.title}</CardTitle>
                <CardDescription className="mt-2">
                  Posted by <span className="font-medium text-indigo-600">{project.client.username}</span> on {new Date(project.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
              {isClientOwner && project.status === 'posted' && (
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
              <div className="prose max-w-none text-gray-700">
                <p>{project.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bids ({project.bids.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <BidList 
              bids={project.bids} 
              projectStatus={project.status}
              isClientOwner={isClientOwner}
              onAcceptBid={handleAcceptBid} 
            />
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
              <span className="text-gray-500">Budget</span>
              <span className="font-semibold">{formatCurrency(project.budget)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Deadline</span>
              <span className="font-semibold">{new Date(project.deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Status</span>
              <Badge status={project.status} />
            </div>
             <div className="pt-2">
                <h4 className="font-semibold mb-2 text-gray-800">Skills Required</h4>
                <div className="flex flex-wrap gap-2">
                    {(project.skills || []).map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </div>
            </div>
          </CardContent>
        </Card>

        {canPlaceBid && (
          <Card>
            <CardHeader><CardTitle>Place Your Bid</CardTitle></CardHeader>
            <CardContent>
              <BidForm projectId={project.id} onBidSubmitted={fetchProject} />
            </CardContent>
          </Card>
        )}

        {canRaiseDispute && (
            <Card>
                <CardHeader><CardTitle>Project Conflict</CardTitle></CardHeader>
                <CardContent>
                    {showDisputeForm ? (
                        <DisputeForm onSubmit={handleCreateDispute} onCancel={() => setShowDisputeForm(false)} />
                    ) : (
                        <>
                            <p className="text-sm text-gray-600 mb-4">If you have an issue with this project, you can file a dispute for an admin to review.</p>
                            <Button variant="destructive" className="w-full" onClick={() => setShowDisputeForm(true)}>
                                Raise a Dispute
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;