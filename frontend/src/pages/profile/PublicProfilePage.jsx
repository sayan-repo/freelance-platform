import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicProfile } from '../../services/api';
import Loader from '../../components/ui/Loader';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Rating from '../../components/ui/Rating';

const PublicProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicProfile(username)
      .then(setProfile)
      .catch(err => console.error("Failed to fetch profile", err))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <Loader className="mt-20" />;
  if (!profile) return <div className="text-center py-20">User not found.</div>;

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <CardTitle>{profile.username}</CardTitle>
          <CardDescription className="capitalize">{profile.role}</CardDescription>
          <div className="flex justify-center mt-2">
            <Rating value={profile.rating} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <h4 className="font-semibold mb-2">About</h4>
            <p className="text-muted-foreground">{profile.bio || 'No bio provided.'}</p>
          </div>
          <div className="mt-6 text-center">
            <h4 className="font-semibold mb-2">Skills</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {profile.skills?.length > 0 ? profile.skills.map(skill => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              )) : (
                <p className="text-sm text-muted-foreground">No skills listed.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicProfilePage;