import { Card } from '@/components/ui/card';
import { Zap, Heart, Scale } from 'lucide-react';

export function SolutionSection() {
  const pillars = [
    {
      icon: Zap,
      title: 'Apoio Rápido e Descomplicado',
      description: 'Respostas ágeis sem burocracia, ajudando seus colaboradores quando mais precisam.',
      gradient: 'from-primary/20 to-primary/5'
    },
    {
      icon: Heart,
      title: 'Atendimento Humanizado',
      description: 'Acessível e especializado com agilidade e empatia, porque problemas jurídicos também são problemas humanos.',
      gradient: 'from-accent/20 to-accent/5'
    },
    {
      icon: Scale,
      title: 'Cobertura Completa',
      description: 'Desde esclarecimento de dúvidas até ajuizamento de ações em diversas áreas do direito.',
      gradient: 'from-secondary/20 to-secondary/5'
    }
  ];

  return (
    <section id="programa" className="py-16 md:py-24 bg-background scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            O Programa de Acolhimento Jurídico Juripass
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Três pilares fundamentais para proteger seus colaboradores
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center`}>
                  <pillar.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Context */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <p className="text-center text-lg md:text-xl text-foreground leading-relaxed">
              O Juripass transforma a forma como sua empresa cuida dos colaboradores, 
              oferecendo <span className="font-bold text-primary">segurança jurídica acessível e humanizada</span> que 
              reduz o estresse, aumenta a produtividade e demonstra cuidado genuíno com o bem-estar da equipe.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
