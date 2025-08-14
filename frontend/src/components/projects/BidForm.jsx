import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from '../ui/Button'
import { createBid } from '../../services/api'

const BidForm = ({ projectId }) => {
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      setSubmitting(true)
      const bidData = {
        ...data,
        amount: parseFloat(data.amount),
        deliveryDays: parseInt(data.deliveryDays)
      }
      
      await createBid(projectId, bidData)
      toast.success('Bid submitted successfully!')
      reset()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit bid')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Bid Amount ($)
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
              required: 'Bid amount is required',
              min: { value: 1, message: 'Bid must be at least $1' }
            })}
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="deliveryDays" className="block text-sm font-medium text-gray-700">
          Delivery Time (days)
        </label>
        <input
          type="number"
          id="deliveryDays"
          className={`mt-1 block w-full py-2 px-3 border ${
            errors.deliveryDays ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          {...register('deliveryDays', { 
            required: 'Delivery time is required',
            min: { value: 1, message: 'Must be at least 1 day' }
          })}
        />
        {errors.deliveryDays && (
          <p className="mt-1 text-sm text-red-600">{errors.deliveryDays.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="proposal" className="block text-sm font-medium text-gray-700">
          Your Proposal
        </label>
        <textarea
          id="proposal"
          rows={4}
          className={`mt-1 block w-full py-2 px-3 border ${
            errors.proposal ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          placeholder="Describe your approach, relevant experience, and why you're the best fit for this project..."
          {...register('proposal', { 
            required: 'Proposal is required',
            minLength: { value: 50, message: 'Proposal must be at least 50 characters' }
          })}
        />
        {errors.proposal && (
          <p className="mt-1 text-sm text-red-600">{errors.proposal.message}</p>
        )}
      </div>

      <div>
        <Button
          type="submit"
          disabled={submitting}
          className="w-full justify-center"
        >
          {submitting ? 'Submitting...' : 'Place Bid'}
        </Button>
      </div>
    </form>
  )
}

export default BidForm