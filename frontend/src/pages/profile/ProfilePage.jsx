import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// Corrected import: 'getUserProfile' is changed to 'getCurrentUser'
import { getCurrentUser, updateUserProfile } from '../../services/api'; 
import { useAuth } from '../../hooks/useAuth';

import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';
import Rating from '../../components/ui/Rating';


const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Corrected function call: Using getCurrentUser()
        const profileData = await getCurrentUser(); 
        reset(profileData); // Populate the form with fetched data
        updateUser(profileData); // Also update the context
      } catch (err) {
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [reset, updateUser]);

  const onSubmit = async (data) => {
    try {
      setSaving(true);
      const updatedProfile = await updateUserProfile(data);
      updateUser(updatedProfile); // Update user in context
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader className="mt-12" />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-2 text-gray-600">Update your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="h-full">
            <div className="p-6">
              <div className="flex flex-col items-center">
                <Avatar src={user.avatar} alt={user.username} size="xl" className="mb-4" />
                <h2 className="text-lg font-medium text-gray-900">{user.username}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                
                <div className="mt-4">
                  <Rating value={user.rating} />
                  <p className="text-sm text-center text-gray-500 mt-1">
                    {user.completedProjects} projects completed
                  </p>
                </div>
                
                <div className="mt-6 w-full">
                  <h3 className="text-sm font-medium text-gray-900">Skills</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {user.skills?.map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {skill}
                      </span>
                    ))}
                    {(!user.skills || user.skills.length === 0) && (
                      <p className="text-sm text-gray-500">No skills added</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                 {/* Username and Email fields */}
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" {...register('username', { required: 'Username is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                        {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input id="email" type="email" {...register('email', { required: 'Email is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                </div>
                
                {/* Bio field */}
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea id="bio" rows={3} {...register('bio')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"></textarea>
                </div>

                {/* Skills field */}
                <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                    <input type="text" id="skills" {...register('skills')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <Button type="button" variant="secondary" onClick={() => reset()} className="mr-3">
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;