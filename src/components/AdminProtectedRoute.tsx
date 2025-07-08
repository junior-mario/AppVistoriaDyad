import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useProfile } from '@/hooks/use-profile';
import { useToast } from './ui/use-toast';
import { useEffect } from 'react';

const AdminProtectedRoute = () => {
  const { profile, isLoading } = useProfile();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && profile && profile.role !== 'admin') {
      toast({
        title: "Acesso Negado",
        description: "Você não tem permissão para acessar esta página.",
        variant: "destructive",
      });
    }
  }, [isLoading, profile, toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile || profile.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;