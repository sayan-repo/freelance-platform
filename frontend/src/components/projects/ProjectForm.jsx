import { useForm } from 'react-hook-form';
import Button from '../ui/Button';

const ProjectForm = ({ project, onSubmit, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: project || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Project Title</label>
        <input id="title" type="text" {...register('title', { required: 'Title is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" rows={5} {...register('description', { required: 'Description is required', minLength: { value: 30, message: 'Must be at least 30 characters' } })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget ($)</label>
          <input id="budget" type="number" step="0.01" {...register('budget', { required: 'Budget is required', min: { value: 1, message: 'Budget must be at least $1' } })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>}
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
          <input id="deadline" type="date" {...register('deadline', { required: 'Deadline is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          {errors.deadline && <p className="mt-1 text-sm text-red-600">{errors.deadline.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills Required (comma-separated)</label>
        <input id="skills" type="text" {...register('skills', { required: 'At least one skill is required' })} placeholder="e.g. React, Node.js, UI/UX Design" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
        {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>}
      </div>

      <div>
        <Button type="submit" disabled={loading} className="w-full justify-center">
          {loading ? 'Submitting...' : 'Post Project'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;