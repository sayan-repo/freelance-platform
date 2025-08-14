import classNames from 'classnames';

const statusMap = {
  draft: {
    text: 'Draft',
    color: 'bg-gray-100 text-gray-800'
  },
  posted: {
    text: 'Posted',
    color: 'bg-blue-100 text-blue-800'
  },
  in_progress: {
    text: 'In Progress',
    color: 'bg-yellow-100 text-yellow-800'
  },
  completed: {
    text: 'Completed',
    color: 'bg-green-100 text-green-800'
  },
  disputed: {
    text: 'Disputed',
    color: 'bg-red-100 text-red-800'
  },
  accepted: {
    text: 'Accepted',
    color: 'bg-green-100 text-green-800'
  },
  rejected: {
    text: 'Rejected',
    color: 'bg-red-100 text-red-800'
  },
  pending: {
    text: 'Pending',
    color: 'bg-yellow-100 text-yellow-800'
  },
  open: {
    text: 'Open',
    color: 'bg-yellow-100 text-yellow-800'
  },
  in_review: {
    text: 'In Review',
    color: 'bg-blue-100 text-blue-800'
  },
  resolved: {
    text: 'Resolved',
    color: 'bg-green-100 text-green-800'
  }
};

const Badge = ({ status, color }) => {
  const statusInfo = statusMap[status] || { text: status, color: color || 'bg-gray-100 text-gray-800' };
  
  return (
    <span className={classNames(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      statusInfo.color
    )}>
      {statusInfo.text}
    </span>
  );
};

export default Badge;