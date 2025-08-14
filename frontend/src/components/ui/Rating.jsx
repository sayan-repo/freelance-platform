import { StarIcon } from '@heroicons/react/24/solid';

const Rating = ({ value, max = 5, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };
  
  const filledStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(max)].map((_, i) => (
        <StarIcon
          key={i}
          className={`${sizeClasses[size]} ${
            i < filledStars 
              ? 'text-yellow-400' 
              : (i === filledStars && hasHalfStar) 
                ? 'text-yellow-400' 
                : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-500">{value.toFixed(1)}</span>
    </div>
  );
};

export default Rating;