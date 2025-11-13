import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading, isSuperAdmin, isAdminEmpresa } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/login');
      } else if (isSuperAdmin || isAdminEmpresa) {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, isLoading, isSuperAdmin, isAdminEmpresa, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-primary">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-white mx-auto" />
        <p className="mt-4 text-white text-lg">Carregando...</p>
      </div>
    </div>
  );
};

export default Index;
