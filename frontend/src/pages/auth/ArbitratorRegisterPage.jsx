import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { registerArbitrator } from '../../services/api';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const ArbitratorRegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await registerArbitrator(data);
            toast.success('Registration successful! Your application is under review.');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Become an Arbitrator</h1>
            <div className="bg-white p-8 shadow rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label>Username</label>
                        <input {...register('username', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" {...register('email', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" {...register('password', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label>Areas of Expertise (comma-separated)</label>
                        <input {...register('expertise', { required: true })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full justify-center">
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ArbitratorRegisterPage;