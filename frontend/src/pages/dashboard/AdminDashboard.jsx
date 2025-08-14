import { useState, useEffect } from 'react';
import { getAdminDashboard } from '../../services/api';
import Loader from '../../components/ui/Loader';

const StatCard = ({ title, value }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg p-5">
        <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAdminDashboard()
            .then(data => setStats(data))
            .catch(err => console.error("Failed to fetch admin stats", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex justify-center mt-12"><Loader size="lg" /></div>;
    if (!stats) return <p className="text-center text-red-500">Could not load dashboard data.</p>;

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Users" value={stats.totalUsers} />
                <StatCard title="Total Projects" value={stats.totalProjects} />
                <StatCard title="Total Bids" value={stats.totalBids} />
                <StatCard title="Open Disputes" value={stats.openDisputes} />
            </div>
            {/* Here you could add tables for recent users, projects, etc. */}
        </div>
    );
};

export default AdminDashboard;