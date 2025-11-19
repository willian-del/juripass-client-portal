import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LogoJuripass } from '@/components/ui/LogoJuripass';

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
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <LogoJuripass variant="full" size="xl" color="white" format="png" />
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="h-2 w-2 bg-white rounded-full animate-bounce" />
        </div>
        <p className="text-white text-lg font-medium">Carregando...</p>
      </div>
    </div>
  );
};

export default Index;
