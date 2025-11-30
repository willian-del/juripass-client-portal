import { Card } from '@/components/ui/card';
import { Zap, Heart, Scale } from 'lucide-react';

export function SolutionSection() {
  const pillars = [
    {
      icon: Zap,
      title: 'Apoio Rápido e Descomplicado',
      description: 'Respostas ágeis sem burocracia, ajudando seus colaboradores quando mais precisam.',
      gradient: 'from-primary via-primary/80 to-primary/60'
    },
    {
      icon: Heart,
      title: 'Atendimento Humanizado',
      description: 'Acessível e especializado com agilidade e empatia, porque problemas jurídicos também são problemas humanos.',
      gradient: 'from-accent via-accent/80 to-accent/60'
    },
    {
      icon: Scale,
      title: 'Cobertura Completa',
      description: 'Desde esclarecimento de dúvidas até ajuizamento de ações em diversas áreas do direito.',
      gradient: 'from-juripass-primary-light via-primary to-juripass-primary-dark'
    }
  ];

  return (
    <section id="programa" className="py-20 md:py-32 bg-muted/30 scroll-mt-16 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            O Programa de Acolhimento Jurídico Juripass
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Três pilares fundamentais para proteger seus colaboradores
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden p-8 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fade-in border-2 border-transparent hover:border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative space-y-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <pillar.icon className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Context */}
        <div className="mt-20 max-w-4xl mx-auto">
          <Card className="p-10 md:p-14 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-primary/20 backdrop-blur-sm shadow-xl">
            <p className="text-center text-xl md:text-2xl text-foreground leading-relaxed font-medium">
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
