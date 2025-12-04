import { Card } from '@/components/ui/card';
import { Zap, Heart, Scale } from 'lucide-react';

export function SolutionSection() {
  const pillars = [
    {
      icon: Zap,
      title: 'Apoio Rápido e Descomplicado',
      description: 'Respostas ágeis sem burocracia, ajudando seus colaboradores quando mais precisam.'
    },
    {
      icon: Heart,
      title: 'Atendimento Humanizado',
      description: 'Acessível e especializado com agilidade e empatia, porque problemas jurídicos também são problemas humanos.'
    },
    {
      icon: Scale,
      title: 'Cobertura Completa',
      description: 'Desde esclarecimento de dúvidas até ajuizamento de ações em diversas áreas do direito.'
    }
  ];

  return (
    <section id="programa" className="py-12 md:py-20 bg-muted/20 scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O Programa de Acolhimento Jurídico
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Três pilares fundamentais para proteger seus colaboradores
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <Card
              key={index}
              className="group p-6 bg-card/80 backdrop-blur-sm border border-border/50 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <pillar.icon className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
