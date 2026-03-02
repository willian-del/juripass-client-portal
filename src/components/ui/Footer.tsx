import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/constants';

const navLinks = [
  { to: '/como-funciona', label: 'Como Funciona' },
  { to: '/para-quem', label: 'Para Quem' },
  { to: '/para-seus-colaboradores', label: 'Para Colaboradores' },
  { to: '/nr-01', label: 'NR-01' },
  { to: '/faq', label: 'Perguntas Frequentes' },
  { to: '/blog', label: 'Blog' },
];

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Coluna 1: Logo + Descrição */}
          <div className="space-y-3">
            <Link to="/" className="inline-block">
              <img
                src={BRAND.assets.logoHorizontal}
                alt={`${BRAND.name} logo`}
                className="h-8"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Acolhimento jurídico corporativo. Canal externo e confidencial para colaboradores.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Navegação</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Coluna 3: Institucional */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Institucional</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Alameda Rio Negro 1030 sala 2304</p>
              <p>Alphaville, Barueri - SP - 06454-000</p>
              <p className="pt-1">Juripass Desenvolvimento de Software LTDA</p>
              <p>CNPJ 53.971.772/0001-37</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Juripass. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
