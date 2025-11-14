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
import { DynamicBreadcrumb } from '@/components/ui/DynamicBreadcrumb';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

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
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full bg-muted/30 flex flex-col">
        {/* Header fixo */}
        <header className="bg-white border-b border-border shadow-sm h-16 flex-shrink-0">
          <div className="container mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Desktop - Sidebar Toggle */}
              <SidebarTrigger className="hidden lg:flex transition-transform hover:scale-110" />
              
              {/* Mobile - Menu Toggle */}
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

        <div className="flex flex-1 w-full" style={{ height: 'calc(100vh - 4rem)' }}>
          {/* Sidebar - Desktop (Collapsible) */}
          <div className="hidden lg:block">
            <AppSidebar />
          </div>

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
          <main className="flex-1 overflow-auto p-6 transition-all duration-300 ease-in-out">
            <DynamicBreadcrumb />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
