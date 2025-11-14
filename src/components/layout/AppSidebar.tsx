import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { 
  MessageSquare, 
  User, 
  Users, 
  HelpCircle
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function AppSidebar({ className }: { className?: string }) {
  const { usuario } = useAuth();
  const location = useLocation();
  const { open } = useSidebar();

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
    <Sidebar 
      collapsible="icon" 
      className={cn(
        "border-r md:top-16 md:h-[calc(100svh-4rem)] h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out z-40",
        className
      )}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link
                        to={item.path}
                        className={cn(
                          'flex items-center gap-3 transition-colors',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span className="transition-opacity duration-300 group-data-[collapsible=icon]:opacity-0">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
