import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, Link2, Upload, Shield } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

export function AdminSidebar() {
  const location = useLocation();
  const { state, isMobile } = useSidebar();
  const { isSuperAdmin } = useAuth();

  const menuItems = [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: LayoutDashboard,
      showForAll: true,
    },
    {
      title: 'Usuários',
      url: '/admin/usuarios',
      icon: Users,
      showForAll: true,
    },
    {
      title: 'Empresas',
      url: '/admin/empresas',
      icon: Building2,
      showForAll: false, // Apenas super_admin
    },
    {
      title: 'Links de Convite',
      url: '/admin/convites',
      icon: Link2,
      showForAll: true,
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.showForAll || isSuperAdmin
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "border-r md:top-16 md:h-[calc(100svh-4rem)] z-40 transition-all duration-300 ease-in-out",
      )}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {state === 'expanded' && <span>Administração</span>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {state === 'expanded' && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
