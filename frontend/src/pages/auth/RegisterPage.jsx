import RegisterForm from '../../components/auth/RegisterForm';
import { Link, useLocation } from 'react-router-dom';

const RegisterPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role');
  
  const roleTitle = role === 'client' 
    ? 'Hire the Best Freelancers' 
    : 'Find Great Work';
    
  const roleDescription = role === 'client'
    ? 'Access top talent to get your projects done.'
    : 'Build your career with exciting freelance opportunities.';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {roleTitle || 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {roleDescription || 'Join our community of professionals and clients'}
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <RegisterForm />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;