import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '../ui/Button';
import { createBid } from '../../services/api';

const BidForm = ({ projectId, onBidSubmitted }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createBid(projectId, {
        ...data,
        amount: parseFloat(data.amount),
        deliveryDays: parseInt(data.deliveryDays)
      });
      toast.success('Bid submitted successfully!');
      reset();
      if (onBidSubmitted) onBidSubmitted();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit bid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Bid Amount ($)</label>
        <input
          type="number"
          step="0.01"
          id="amount"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          {...register('amount', { required: 'Amount is required', min: { value: 1, message: 'Bid must be at least $1' } })}
        />
        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
      </div>
      <div>
        <label htmlFor="deliveryDays" className="block text-sm font-medium text-gray-700">Delivery Time (days)</label>
        <input
          type="number"
          id="deliveryDays"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          {...register('deliveryDays', { required: 'Delivery time is required', min: { value: 1, message: 'Must be at least 1 day' } })}
        />
        {errors.deliveryDays && <p className="mt-1 text-sm text-red-600">{errors.deliveryDays.message}</p>}
      </div>
      <div>
        <label htmlFor="proposal" className="block text-sm font-medium text-gray-700">Your Proposal</label>
        <textarea
          id="proposal"
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          {...register('proposal', { required: 'Proposal is required', minLength: { value: 20, message: 'Must be at least 20 characters' } })}
        />
        {errors.proposal && <p className="mt-1 text-sm text-red-600">{errors.proposal.message}</p>}
      </div>
      <Button type="submit" disabled={loading} className="w-full justify-center">
        {loading ? 'Submitting...' : 'Place Bid'}
      </Button>
    </form>
  );
};

export default BidForm;