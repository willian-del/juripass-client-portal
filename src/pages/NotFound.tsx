import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogoJuripass } from "@/components/ui/LogoJuripass";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-primary">
      <div className="text-center space-y-8 p-8">
        <LogoJuripass variant="full" size="xl" color="white" />
        
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-white">404</h1>
          <p className="text-2xl text-white/90 font-medium">Página não encontrada</p>
          <p className="text-white/70 max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <Button 
          onClick={() => navigate('/dashboard')}
          size="lg"
          className="bg-white text-juripass-primary hover:bg-white/90 shadow-primary"
        >
          <Home className="mr-2 h-5 w-5" />
          Voltar para o Início
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
