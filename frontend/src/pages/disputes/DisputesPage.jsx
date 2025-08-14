import { useEffect, useState } from 'react';
import { getDisputes } from '../../services/api';
import Loader from '../../components/ui/Loader';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const DisputesPage = () => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDisputes()
      .then(data => setDisputes(data))
      .catch(err => console.error("Failed to fetch disputes", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader className="mt-20" />;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dispute Center</h1>
        <p className="mt-1 text-muted-foreground">Review and manage project disputes.</p>
      </div>

      {disputes.length > 0 ? (
        <div className="space-y-4">
          {disputes.map(dispute => (
            <Card key={dispute.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Project: {dispute.project.title}</CardTitle>
                  <Badge status={dispute.status} />
                </div>
                <CardDescription>
                  Filed by {dispute.initiator.username} on {new Date(dispute.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Reason: {dispute.reason}</p>
                <p className="text-muted-foreground mt-2">{dispute.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-dashed border-2 rounded-lg">
          <h3 className="text-xl font-semibold">No Disputes Found</h3>
          <p className="mt-2 text-muted-foreground">You are not involved in any disputes.</p>
        </div>
      )}
    </div>
  );
};

export default DisputesPage;