import { Link } from 'react-router-dom';
import { LogoJuripass } from '@/components/ui/LogoJuripass';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Coluna 1: Logo + Descrição */}
          <div className="space-y-3">
            <Link to="/" className="inline-block">
              <LogoJuripass variant="full" size="md" format="png" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Acolhimento jurídico corporativo. Canal externo e confidencial para colaboradores.
            </p>
          </div>

          {/* Coluna 2: Institucional */}
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
