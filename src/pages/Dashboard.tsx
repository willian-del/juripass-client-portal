import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  MessageSquare, 
  User, 
  Users, 
  CreditCard, 
  HelpCircle 
} from 'lucide-react';
import { LogoJuripass } from '@/components/ui/LogoJuripass';
import { Footer } from '@/components/ui/Footer';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const menuItems = [
    {
      title: 'Iniciar Novo Atendimento',
      icon: MessageSquare,
      path: '/dashboard/atendimento',
      color: 'bg-juripass-primary',
    },
    {
      title: 'Meu Cadastro',
      icon: User,
      path: '/dashboard/meu-cadastro',
      color: 'bg-juripass-primary',
    },
    ...(usuario?.tipo_usuario === 'principal' ? [{
      title: 'Meus Dependentes',
      icon: Users,
      path: '/dashboard/dependentes',
      color: 'bg-juripass-primary-dark',
    }] : []),
    {
      title: 'Minha Carteirinha Juripass',
      icon: CreditCard,
      path: '/dashboard/carteirinha',
      color: 'bg-juripass-accent',
    },
    {
      title: 'Dúvidas e Orientações',
      icon: HelpCircle,
      path: '/dashboard/como-utilizar',
      color: 'bg-juripass-primary',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border py-4 px-6">
        <div className="container mx-auto">
          <LogoJuripass variant="horizontal" size="md" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Bem-vindo ao seu novo benefício!
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Por onde você gostaria de começar? Selecione uma das opções abaixo.
            </p>
          </div>

          {/* Menu Cards */}
          <div className="space-y-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.path}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer border-border"
                  onClick={() => navigate(item.path)}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0',
                      item.color
                    )}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                      <h3 className="font-medium text-juripass-primary">
                        {item.title}
                      </h3>
                    </div>

                    {/* Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-juripass-primary text-juripass-primary hover:bg-juripass-primary hover:text-white transition-colors"
                    >
                      Acessar
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
