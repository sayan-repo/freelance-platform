import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFreelancerBids } from '../../services/api';
import Loader from '../ui/Loader';
import Badge from '../ui/Badge';
import { formatCurrency } from '../../utils/formatters';

const FreelancerBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFreelancerBids()
      .then(data => setBids(data))
      .catch(err => console.error("Failed to fetch bids", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  if (bids.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">You haven't placed any bids yet.</p>
        <Link to="/projects" className="text-primary hover:underline mt-2 inline-block">
          Find a project to bid on
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Project</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Bid</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-background divide-y divide-border">
          {bids.map((bid) => (
            <tr key={bid.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                <Link to={`/projects/${bid.project.id}`} className="hover:text-primary hover:underline">
                  {bid.project.title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{formatCurrency(bid.amount)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Badge status={bid.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{new Date(bid.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FreelancerBids;