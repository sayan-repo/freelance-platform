import { useState, useEffect } from 'react';
import { getClientDashboard } from '../../services/api';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg p-5">
        <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
);

const ClientDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getClientDashboard()
            .then(setData)
            .catch(err => console.error("Failed to fetch client dashboard", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex justify-center mt-12"><Loader size="lg" /></div>;
    if (!data) return <p className="text-center text-red-500">Could not load dashboard data.</p>;

    return (
        <div className="py-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
                {/* THE FIX: We pass the 'to' prop directly to our Button component. */}
                <Button to="/projects/new" variant="primary" className="mt-4 sm:mt-0">
                    Post a New Project
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Active Projects" value={data.activeProjects} />
                <StatCard title="Open for Bids" value={data.openProjects} />
                <StatCard title="Completed Projects" value={data.completedProjects} />
                <StatCard title="Total Spent" value={`$${data.totalSpent}`} />
            </div>
            <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">My Recent Projects</h2>
                <ul>
                    {data.projects.length > 0 ? data.projects.map(p => (
                        <li key={p.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                            <Link to={`/projects/${p.id}`} className="font-medium text-indigo-600 hover:underline">{p.title}</Link>
                            <span className="text-sm text-gray-500">{p.bidsCount} Bids</span>
                        </li>
                    )) : <p className="text-gray-500">You haven't posted any projects yet.</p>}
                </ul>
            </div>
        </div>
    );
};

export default ClientDashboard;