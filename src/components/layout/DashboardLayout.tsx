import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  MessageSquare, 
  User, 
  Users, 
  HelpCircle, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { LogoJuripass } from '@/components/ui/LogoJuripass';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { usuario, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const menuItems = [
    {
      path: '/dashboard/atendimento',
      icon: MessageSquare,
      label: 'Iniciar Atendimento',
    },
    {
      path: '/dashboard/meu-cadastro',
      icon: User,
      label: 'Meu Cadastro',
    },
    ...(usuario?.tipo_usuario === 'principal' ? [{
      path: '/dashboard/dependentes',
      icon: Users,
      label: 'Cadastrar Dependentes',
    }] : []),
    {
      path: '/dashboard/como-utilizar',
      icon: HelpCircle,
      label: 'Como Utilizar',
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
            <div className="hidden sm:block">
              <LogoJuripass variant="horizontal" size="md" clickable />
            </div>
            <div className="sm:hidden">
              <LogoJuripass variant="icon" size="md" clickable />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{usuario?.nome}</p>
              <p className="text-xs text-muted-foreground">{usuario?.numero_cliente}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[250px_1fr] gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block">
            <Card className="p-4 sticky top-24">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </Card>
          </aside>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden">
              <Card className="absolute left-4 right-4 top-20 p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </Card>
            </div>
          )}

          {/* Main Content */}
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
