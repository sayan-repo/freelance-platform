import Button from './Button';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  title = 'No items found', 
  description = 'Get started by creating a new item.',
  actionText = 'Create New',
  actionPath 
}) => {
  return (
    <div className="text-center py-12">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {actionPath && (
        <div className="mt-6">
          <Button as={Link} to={actionPath} variant="primary">
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;