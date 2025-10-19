import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  console.log('ProtectedRoute - loading:', loading, 'user:', user);

  if (loading) {
    return <Loader fullScreen />;
  }

  // Check user object directly instead of calling functions
  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'ADMIN') {
    console.log('ProtectedRoute - Not admin, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute - Access granted');
  return children;
};

export default ProtectedRoute;

