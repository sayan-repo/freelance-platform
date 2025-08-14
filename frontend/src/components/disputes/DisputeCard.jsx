import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/formatters';

const DisputeCard = ({ dispute }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'yellow';
      case 'in_review': return 'blue';
      case 'resolved': return 'green';
      case 'rejected': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              <Link to={`/disputes/${dispute.id}`} className="hover:text-indigo-600">
                {dispute.project.title}
              </Link>
            </h3>
            <div className="mt-1 flex items-center">
              <Badge status={dispute.status} color={getStatusColor(dispute.status)} />
              <span className="ml-2 text-sm text-gray-500">
                Dispute ID: {dispute.id.slice(0, 8)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(dispute.amount)}
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Reason:</span> {dispute.reason}
          </p>
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
            {dispute.description}
          </p>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {dispute.createdBy.name}
              </p>
              <p className="text-sm text-gray-500">
                Filed {new Date(dispute.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <Link 
            to={`/disputes/${dispute.id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DisputeCard;