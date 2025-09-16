import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/formatters';

const BidList = ({ bids, projectStatus, isClientOwner, onAcceptBid }) => {
  if (!bids || bids.length === 0) {
    return <p className="text-gray-500 text-center py-4">No bids have been placed yet.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {bids.map((bid) => (
        <li key={bid.id} className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">{bid.freelancer.username}</p>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <span>{formatCurrency(bid.amount)} in {bid.deliveryDays} days</span>
                <span className="mx-2">·</span>
                <span>Rating: {bid.freelancer.rating}/5.0</span>
              </div>
            </div>
            {isClientOwner && projectStatus === 'posted' && (
              <Button size="sm" onClick={() => onAcceptBid(bid.id)}>
                Accept Bid
              </Button>
            )}
            {bid.status !== 'pending' && <Badge status={bid.status} />}
          </div>
          <p className="mt-2 text-sm text-gray-600">{bid.proposal}</p>
        </li>
      ))}
    </ul>
  );
};

export default BidList;