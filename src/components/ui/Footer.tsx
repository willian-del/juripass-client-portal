import { Link } from 'react-router-dom';
import { LogoJuripass } from '@/components/ui/LogoJuripass';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Coluna 1: Logo + Descrição */}
          <div className="space-y-3">
            <Link to="/" className="inline-block">
              <LogoJuripass variant="full" size="md" format="png" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Acolhimento jurídico corporativo. Canal externo e confidencial para colaboradores.
            </p>
          </div>

          {/* Coluna 2: Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Navegação</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/nr-01" className="text-muted-foreground hover:text-primary transition-colors">NR-01</Link>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            </div>
          </div>

          {/* Coluna 3: Institucional */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Institucional</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Juripass Desenvolvimento de Software LTDA</p>
              <p>CNPJ 53.971.772/0001-37</p>
              <p>Alphaville, Barueri - SP</p>
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
