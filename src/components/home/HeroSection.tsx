import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Sparkles } from 'lucide-react';
import { JuripassCardVisual } from './JuripassCardVisual';

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToPrograma = () => {
    const element = document.getElementById('programa');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <Badge variant="secondary" className="w-fit px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Novo Benefício Corporativo
            </Badge>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
                Programa de
                <span className="block text-gradient-primary">
                  Acolhimento Jurídico
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
                Acolhimento jurídico para cuidar de quem cuida da sua empresa
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Oferecemos apoio jurídico rápido, humano e descomplicado para ajudar seus 
                colaboradores a resolver questões do dia a dia.
              </p>
            </div>

            {/* Animated Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="text-sm py-2 px-4 border-primary/20 hover:bg-primary/5 transition-colors animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Atendimento Humanizado
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4 border-accent/20 hover:bg-accent/5 transition-colors animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Users className="w-4 h-4 mr-2" />
                Cobertura Familiar
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4 border-primary/20 hover:bg-primary/5 transition-colors animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Sparkles className="w-4 h-4 mr-2" />
                Implementação em 48h
              </Badge>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                onClick={scrollToContact} 
                className="text-base px-8 py-6 shadow-primary hover:shadow-xl transition-all"
              >
                Solicitar Proposta
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={scrollToPrograma} 
                className="text-base px-8 py-6"
              >
                Conheça o Programa
              </Button>
            </div>
          </div>

          {/* Right Column - Juripass Card Visual */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <JuripassCardVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
