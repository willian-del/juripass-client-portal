import { useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, Link2 } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { NavLink } from '@/components/NavLink';

const adminRouteLabels: Record<string, { label: string; icon: any }> = {
  '/admin/dashboard': { label: 'Dashboard', icon: LayoutDashboard },
  '/admin/usuarios': { label: 'Usuários', icon: Users },
  '/admin/empresas': { label: 'Empresas', icon: Building2 },
  '/admin/convites': { label: 'Convites', icon: Link2 },
};

export function AdminBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/admin/dashboard') {
    return null;
  }

  const breadcrumbPaths = pathnames.map((_, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    const routeInfo = adminRouteLabels[path];
    return {
      path,
      label: routeInfo?.label || pathnames[index],
      icon: routeInfo?.icon,
    };
  });

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <NavLink 
              to="/admin/dashboard" 
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Admin
            </NavLink>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbPaths.length > 1 && <BreadcrumbSeparator />}

        {breadcrumbPaths.slice(1).map((item, index) => {
          const isLast = index === breadcrumbPaths.length - 2;
          const Icon = item.icon;

          return (
            <BreadcrumbItem key={item.path}>
              {isLast ? (
                <BreadcrumbPage className="text-primary font-medium flex items-center gap-1.5">
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <NavLink 
                      to={item.path} 
                      className="flex items-center gap-1.5 hover:text-primary transition-colors"
                    >
                      {Icon && <Icon className="h-3.5 w-3.5" />}
                      {item.label}
                    </NavLink>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
