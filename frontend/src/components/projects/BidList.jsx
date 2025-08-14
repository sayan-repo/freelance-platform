import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/formatters';

const BidList = ({ bids, projectId, clientId, status }) => {
  const { user } = useAuth();
  const [acceptedBid, setAcceptedBid] = useState(null);
  
  const isClient = user?.role === 'client';
  const isProjectOwner = user?.id === clientId;
  const canAcceptBid = isClient && isProjectOwner && status === 'posted';

  const handleAcceptBid = (bidId) => {
    setAcceptedBid(bidId);
    // In a real app, this would call an API to accept the bid
    console.log(`Accepting bid ${bidId} for project ${projectId}`);
  };

  if (bids.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No bids have been placed yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {bids.map((bid) => (
          <li key={bid.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="truncate text-sm font-medium text-indigo-600">
                    {bid.freelancer.name}
                  </p>
                  <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span className="font-medium">{formatCurrency(bid.amount)}</span>
                      <span className="ml-1">bid</span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>Delivery in {bid.deliveryDays} days</span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>Rating: {bid.freelancer.rating}/5</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  {acceptedBid === bid.id ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                      Accepted
                    </span>
                  ) : canAcceptBid ? (
                    <Button
                      size="sm"
                      onClick={() => handleAcceptBid(bid.id)}
                      disabled={acceptedBid !== null}
                    >
                      Accept
                    </Button>
                  ) : bid.status === 'accepted' ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                      Accepted
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  {bid.proposal}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BidList;