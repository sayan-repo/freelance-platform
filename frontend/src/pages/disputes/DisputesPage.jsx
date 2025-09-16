import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getDisputes, resolveDispute } from '../../services/api';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';
import { toast } from 'react-toastify';

const DisputesPage = () => {
    const { user } = useAuth();
    const [disputes, setDisputes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDisputes = async () => {
        try {
            const data = await getDisputes();
            setDisputes(data);
        } catch (error) {
            toast.error("Failed to load disputes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDisputes();
    }, []);

    const handleResolve = async (disputeId, resolution) => {
        try {
            await resolveDispute(disputeId, { 
                status: 'resolved', 
                resolution: `Resolved in favor of ${resolution}.` 
            });
            toast.success("Dispute resolved!");
            fetchDisputes(); // Refresh the list
        } catch (error) {
            toast.error("Failed to resolve dispute.");
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-5xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dispute Management</h1>
            <div className="bg-white p-6 shadow rounded-lg">
                {disputes.length === 0 ? (
                    <p>No active disputes.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {disputes.map(dispute => (
                            <li key={dispute.id} className="py-4">
                                <p><strong>Project ID:</strong> {dispute.projectId}</p>
                                <p><strong>Reason:</strong> {dispute.reason}</p>
                                <p><strong>Status:</strong> {dispute.status}</p>
                                {user.role === 'admin' && dispute.status === 'open' && (
                                    <div className="mt-4 space-x-2">
                                        <Button size="sm" onClick={() => handleResolve(dispute.id, 'Client')}>Resolve for Client</Button>
                                        <Button size="sm" onClick={() => handleResolve(dispute.id, 'Freelancer')}>Resolve for Freelancer</Button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DisputesPage;