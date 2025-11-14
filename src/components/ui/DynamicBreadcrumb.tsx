import { useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { NavLink } from '@/components/NavLink';

// Mapeamento de rotas para labels
const routeLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/atendimento': 'Iniciar Atendimento',
  '/dashboard/meu-cadastro': 'Meu Cadastro',
  '/dashboard/dependentes': 'Cadastrar Dependentes',
  '/dashboard/carteirinha': 'Minha Carteirinha Juripass',
  '/dashboard/como-utilizar': 'Como Utilizar',
};

export function DynamicBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Não mostrar breadcrumb na página principal do dashboard
  if (location.pathname === '/dashboard') {
    return null;
  }

  // Construir o caminho progressivo
  const breadcrumbPaths = pathnames.map((_, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    return {
      path,
      label: routeLabels[path] || pathnames[index],
    };
  });

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {/* Home/Dashboard sempre aparece primeiro */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <NavLink to="/dashboard" className="flex items-center gap-1.5 hover:text-juripass-primary transition-colors">
              <Home className="h-3.5 w-3.5" />
              Dashboard
            </NavLink>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbPaths.length > 1 && <BreadcrumbSeparator />}

        {/* Renderizar o resto do caminho */}
        {breadcrumbPaths.slice(1).map((item, index) => {
          const isLast = index === breadcrumbPaths.length - 2;

          return (
            <BreadcrumbItem key={item.path}>
              {isLast ? (
                <BreadcrumbPage className="text-juripass-primary font-medium">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <NavLink to={item.path} className="hover:text-juripass-primary transition-colors">
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
