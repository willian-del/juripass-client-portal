import { MessageCircle, Gavel, Scale, BadgePercent, ShieldCheck, CheckCircle2, Gift, BookOpen } from 'lucide-react';

const benefits = [
  {
    icon: MessageCircle,
    title: 'Atendimento rápido e sem complicações',
  },
  {
    icon: Gavel,
    title: 'Contato direto com o seu advogado',
  },
  {
    icon: Scale,
    title: 'Diferentes especialidades e áreas de atuação',
  },
  {
    icon: BadgePercent,
    title: 'Honorários apenas em casos de sucesso',
  },
  {
    icon: ShieldCheck,
    title: 'Confidencialidade e sigilo das informações',
  },
  {
    icon: CheckCircle2,
    title: 'Agilidade e praticidade',
  },
  {
    icon: Gift,
    title: 'Benefício oferecido pela empresa',
  },
  {
    icon: BookOpen,
    title: 'Educação e consciência jurídica',
  },
];

export const EmployeeBenefitsSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
            Para Colaboradores
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-fade-in [animation-delay:0.1s]">
            Vantagens para seus{' '}
            <span className="text-primary">Colaboradores</span>
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-in [animation-delay:0.2s]">
            O benefício que cuida da tranquilidade jurídica de quem faz sua empresa crescer
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${0.1 * (index + 3)}s` }}
            >
              {/* Icon circle */}
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              
              {/* Title */}
              <h3 className="text-base font-semibold text-foreground leading-tight">
                {benefit.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
