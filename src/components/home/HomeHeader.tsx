import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LogoJuripass } from '@/components/ui/LogoJuripass';
import { useNavigate, useLocation } from 'react-router-dom';
export function HomeHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  const handleNav = (target: string) => {
    setMobileMenuOpen(false);
    if (target.startsWith('/')) {
      navigate(target);
    } else if (isHome) {
      const element = document.getElementById(target);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/', { state: { scrollTo: target } });
    }
  };

  const navItems = [
    { label: 'Início', target: '/' },
    { label: 'Como Funciona', target: '/como-funciona' },
    { label: 'Para Quem', target: '/para-quem' },
    { label: 'NR-01', target: '/nr-01' },
    { label: 'FAQ', target: '/faq' },
    { label: 'Blog', target: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => navigate('/')}>
            <LogoJuripass variant="full" size="md" format="png" clickable={false} />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.target)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.target)}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
