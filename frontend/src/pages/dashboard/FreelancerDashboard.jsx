import { useState, useEffect } from 'react';
import { getFreelancerDashboard } from '../../services/api';
import Loader from '../../components/ui/Loader';

const StatCard = ({ title, value }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg p-5">
        <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
);

const FreelancerDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFreelancerDashboard()
            .then(setData)
            .catch(err => console.error("Failed to fetch freelancer dashboard", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex justify-center mt-12"><Loader size="lg" /></div>;
    if (!data) return <p className="text-center text-red-500">Could not load dashboard data.</p>;

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Freelancer Dashboard</h1>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Active Projects" value={data.activeProjects} />
                <StatCard title="Completed Projects" value={data.completedProjects} />
                <StatCard title="Total Earnings" value={`$${data.totalEarnings}`} />
                <StatCard title="Your Rating" value={`${data.userRating} / 5.0`} />
            </div>
             <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">My Recent Bids</h2>
                {/* You can build a component to list recent bids here */}
                <p>You have {data.pendingBids} pending bid(s).</p>
            </div>
        </div>
    );
};

export default FreelancerDashboard;