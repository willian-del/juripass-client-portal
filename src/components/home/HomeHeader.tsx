import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LogoJuripass } from '@/components/ui/LogoJuripass';
import { Button } from '@/components/ui/button';

interface HomeHeaderProps {
  onLoginClick: () => void;
}

export function HomeHeader({ onLoginClick }: HomeHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <LogoJuripass variant="full" size="md" format="png" clickable={false} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('programa')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              O Programa
            </button>
            <button
              onClick={() => scrollToSection('beneficios')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Benefícios
            </button>
            <button
              onClick={() => scrollToSection('cobertura')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Cobertura
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Blog
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLoginClick}
              className="text-muted-foreground hover:text-foreground"
            >
              Área do Cliente
            </Button>
            <Button
              size="sm"
              onClick={() => scrollToSection('contato')}
            >
              Solicitar Proposta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('programa')}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
              >
                O Programa
              </button>
              <button
                onClick={() => scrollToSection('beneficios')}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
              >
                Benefícios
              </button>
              <button
                onClick={() => scrollToSection('cobertura')}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
              >
                Cobertura
              </button>
              <button
                onClick={() => scrollToSection('blog')}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
              >
                Blog
              </button>
              <div className="pt-2 border-t border-border flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLoginClick}
                  className="justify-start"
                >
                  Área do Cliente
                </Button>
                <Button
                  size="sm"
                  onClick={() => scrollToSection('contato')}
                >
                  Solicitar Proposta
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
