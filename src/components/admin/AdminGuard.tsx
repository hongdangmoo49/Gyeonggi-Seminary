import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user?.isAdmin) return <Navigate to="/" replace />;

  return children;
}
