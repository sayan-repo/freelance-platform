import { useForm } from 'react-hook-form';
import Button from '../ui/Button';

const DisputeForm = ({ projectId, onSubmit, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Reason for Dispute
        </label>
        <input
          id="reason"
          type="text"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.reason ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          placeholder="Briefly describe the reason for your dispute"
          {...register('reason', { 
            required: 'Reason is required',
            minLength: { value: 10, message: 'Reason must be at least 10 characters' }
          })}
        />
        {errors.reason && (
          <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount in Dispute ($)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            step="0.01"
            id="amount"
            className={`block w-full pl-7 pr-12 py-2 border ${
              errors.amount ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            placeholder="0.00"
            {...register('amount', { 
              required: 'Amount is required',
              min: { value: 1, message: 'Amount must be at least $1' }
            })}
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Detailed Description
        </label>
        <textarea
          id="description"
          rows={6}
          className={`mt-1 block w-full py-2 px-3 border ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          placeholder="Explain the issue in detail, including any relevant information that will help us resolve this dispute..."
          {...register('description', { 
            required: 'Description is required',
            minLength: { value: 50, message: 'Description must be at least 50 characters' }
          })}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="evidence" className="block text-sm font-medium text-gray-700">
          Supporting Evidence (Optional)
        </label>
        <input
          type="file"
          id="evidence"
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
          {...register('evidence')}
        />
        <p className="mt-1 text-sm text-gray-500">
          Upload screenshots, documents, or any other evidence to support your claim
        </p>
      </div>

      <div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full justify-center"
        >
          {loading ? 'Submitting Dispute...' : 'File Dispute'}
        </Button>
      </div>
    </form>
  );
};

export default DisputeForm;