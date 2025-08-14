import { 
    BriefcaseIcon, 
    CurrencyDollarIcon, 
    LightBulbIcon, 
    UserGroupIcon,
    ClockIcon,
    ChartBarIcon,
    StarIcon
  } from '@heroicons/react/24/outline';
  
  const StatsCard = ({ title, value, change, icon, isRating = false }) => {
    const getIcon = () => {
      switch(icon) {
        case 'projects': return <BriefcaseIcon className="h-6 w-6 text-indigo-500" />;
        case 'spent': return <CurrencyDollarIcon className="h-6 w-6 text-indigo-500" />;
        case 'disputes': return <LightBulbIcon className="h-6 w-6 text-indigo-500" />;
        case 'earnings': return <CurrencyDollarIcon className="h-6 w-6 text-indigo-500" />;
        case 'bids': return <UserGroupIcon className="h-6 w-6 text-indigo-500" />;
        case 'rating': return <StarIcon className="h-6 w-6 text-indigo-500" />;
        case 'time': return <ClockIcon className="h-6 w-6 text-indigo-500" />;
        default: return <ChartBarIcon className="h-6 w-6 text-indigo-500" />;
      }
    };
  
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {getIcon()}
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {title}
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {isRating ? `${value}/5.0` : value}
                  </div>
                  {change && (
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      {change}
                    </div>
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatsCard;