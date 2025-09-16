import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';

const DisputeForm = ({ onSubmit, onCancel }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (data) => {
        setLoading(true);
        await onSubmit(data);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Dispute</label>
                <input 
                    id="reason" 
                    type="text" 
                    {...register('reason', { required: 'A brief reason is required.' })} 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
                {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>}
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Detailed Description</label>
                <textarea 
                    id="description" 
                    rows={4} 
                    {...register('description', { required: 'A detailed description is required.' })} 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
            <div className="flex justify-end space-x-2 pt-2">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit" variant="destructive" disabled={loading}>
                    {loading ? 'Submitting...' : 'File Dispute'}
                </Button>
            </div>
        </form>
    );
};

export default DisputeForm;