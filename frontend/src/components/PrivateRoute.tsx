import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const user = localStorage.getItem('user');

  if (!user) {
    return <Navigate to="/register" replace />;
  }

  return <>{children}</>;
}
