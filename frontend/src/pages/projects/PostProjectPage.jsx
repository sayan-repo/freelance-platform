import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../../components/projects/ProjectForm';
import { createProject } from '../../services/api';
import { toast } from 'react-toastify';

const PostProjectPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (projectData) => {
    try {
      setLoading(true);
      const newProject = await createProject(projectData);
      toast.success('Project posted successfully!');
      // Navigate to the new project's detail page
      navigate(`/projects/${newProject.id}`);
    } catch (error) {
      // Toast is already handled by api service
      console.error('Failed to post project', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post a Project</h1>
        <p className="mt-2 text-gray-600">
          Fill out the form below to find the perfect freelancer for your job.
        </p>
      </div>
      
      <div className="bg-white p-8 shadow rounded-lg">
        <ProjectForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default PostProjectPage;