import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Sparkles } from 'lucide-react';

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
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <Badge variant="secondary" className="w-fit">
              Novo Benefício Corporativo
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Programa de Acolhimento Jurídico
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Acolhimento jurídico para cuidar de quem cuida da sua empresa
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Oferecemos apoio jurídico rápido, humano e descomplicado para ajudar seus 
                colaboradores a resolver questões do dia a dia.
              </p>
            </div>

            {/* Animated Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="text-sm py-2 px-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Atendimento Humanizado
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Users className="w-4 h-4 mr-2" />
                Cobertura Familiar
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Sparkles className="w-4 h-4 mr-2" />
                Sem Custo Inicial
              </Badge>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" onClick={scrollToContact} className="text-base">
                Solicitar Proposta
              </Button>
              <Button size="lg" variant="outline" onClick={scrollToPrograma} className="text-base">
                Conheça o Programa
              </Button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-primary/10 to-background rounded-2xl p-8 flex items-center justify-center">
                <div className="w-full max-w-sm bg-card rounded-xl shadow-lg p-8 border border-border">
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-foreground">Juripass</h3>
                      <p className="text-sm text-muted-foreground">
                        Segurança jurídica na palma da sua mão
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-primary rounded-full animate-pulse" />
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-5/6 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
