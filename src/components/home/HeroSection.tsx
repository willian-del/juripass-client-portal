import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Sparkles, ArrowDown } from 'lucide-react';
import { useScrollParallax } from '@/hooks/useScrollParallax';
import { JuripassCardVisual } from '@/components/home/JuripassCardVisual';
export function HeroSection() {
  const scrollY = useScrollParallax();

  // Velocidades diferentes para criar profundidade
  const blob1Y = scrollY * 0.15;
  const blob2Y = scrollY * 0.25;
  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  const scrollToPrograma = () => {
    const element = document.getElementById('programa');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return <section className="relative bg-background py-12 md:py-20 lg:py-24">
      {/* Decorative background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" style={{
        transform: `translate(25%, -25%) translateY(${blob1Y}px)`,
        transition: 'transform 0.1s ease-out'
      }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl" style={{
        transform: `translate(-25%, 25%) translateY(${-blob2Y}px)`,
        transition: 'transform 0.1s ease-out'
      }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content - Left Column */}
          <div className="space-y-8 animate-fade-in text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-tight">
                Programa de
                <span className="block text-gradient-primary">
                  Acolhimento Jurídico
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
                Acolhimento jurídico para cuidar de quem cuida da sua empresa
              </p>
              
              {/* Frase destaque - analogia plano de saúde */}
              <div className="flex items-start justify-center lg:justify-start gap-3 p-4 bg-primary/5 rounded-xl border-l-4 border-primary animate-fade-in-up max-w-2xl mx-auto lg:mx-0" style={{
              animationDelay: '0.3s',
              opacity: 0
            }}>
                <p className="text-lg text-foreground italic text-left">
                  "É como se fosse um <span className="font-semibold text-primary">plano de saúde jurídica</span> para seus colaboradores e familiares."
                </p>
              </div>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">Oferecemos um canal de atendimento jurídico rápido, humano e descomplicado para ajudar seus colaboradores a resolver questões do dia a dia.</p>
            </div>

            {/* Animated Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <Badge variant="outline" className="text-sm py-2 px-4 bg-white/80 backdrop-blur-sm border-primary/30 shadow-sm hover:bg-primary/5 hover:border-primary/50 transition-all animate-fade-in-up" style={{
              animationDelay: '0.4s',
              opacity: 0
            }}>
                <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                Atendimento Humanizado
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4 bg-white/80 backdrop-blur-sm border-primary/30 shadow-sm hover:bg-primary/5 hover:border-primary/50 transition-all animate-fade-in-up" style={{
              animationDelay: '0.5s',
              opacity: 0
            }}>
                <Users className="w-4 h-4 mr-2 text-primary" />
                Cobertura Familiar
              </Badge>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-6">
              <Button size="lg" onClick={scrollToContact} className="text-base px-8 py-6 shadow-primary hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] hover:scale-105 transition-all duration-300">
                Solicitar Proposta
              </Button>
              <Button size="lg" variant="outline" onClick={scrollToPrograma} className="text-base px-8 py-6 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:scale-105 hover:border-primary/60 transition-all duration-300">
                Conheça o Programa
              </Button>
            </div>
          </div>

          {/* Right Column - Visual Composition */}
          <div className="flex flex-col items-center gap-5 animate-fade-in [animation-delay:0.2s]">
            {/* Cartão Flutuante - Desktop Only */}
            <div className="hidden lg:block mb-2 w-full max-w-[358px]">
              <div className="relative transform rotate-[8deg] hover:rotate-[4deg] transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 rounded-3xl blur-2xl scale-110 opacity-60" />
                <JuripassCardVisual />
              </div>
            </div>

            {/* Cartão Juripass - Mobile Only */}
            <div className="lg:hidden relative transform rotate-[-4deg] hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 rounded-3xl blur-2xl scale-110 opacity-60" />
              <div className="w-80">
                <JuripassCardVisual />
              </div>
            </div>
            {/* Pergunta Impactante */}
            <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl p-5 shadow-lg max-w-md">
              <p className="text-foreground/90 text-base md:text-lg leading-relaxed">
                Imagine se você tivesse acesso a <strong className="text-primary">advogados e especialistas</strong> a qualquer momento para esclarecer dúvidas ou ajudá-los com seus <strong className="text-primary">problemas jurídicos</strong> do dia a dia?
              </p>
            </div>

            {/* Seta Conectora */}
            <ArrowDown className="w-6 h-6 text-primary animate-bounce" />

            {/* Callout Box */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 max-w-md border-l-4 border-primary">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Chegou o seu novo <span className="text-primary">benefício jurídico</span>
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Simples e ágil para descomplicar assuntos jurídicos do dia a dia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}