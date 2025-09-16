import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createProject } from '../../services/api';
import Button from '../../components/ui/Button';

const PostProjectPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const newProject = await createProject(data);
            toast.success('Project posted successfully!');
            navigate(`/projects/${newProject.id}`);
        } catch (error) {
            toast.error('Failed to post project.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Post a New Project</h1>
            <div className="bg-white p-8 shadow rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Form fields for title, description, budget, deadline, skills */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Project Title</label>
                        <input id="title" type="text" {...register('title', { required: 'Title is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" rows={5} {...register('description', { required: 'Description is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget ($)</label>
                        <input id="budget" type="number" {...register('budget', { required: 'Budget is required', min: 1 })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                        {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                        <input id="deadline" type="date" {...register('deadline', { required: 'Deadline is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                        {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                        <input id="skills" type="text" {...register('skills', { required: 'Skills are required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                        {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>}
                    </div>
                    <Button type="submit" disabled={loading} className="w-full justify-center">
                        {loading ? 'Posting...' : 'Post Project'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default PostProjectPage;