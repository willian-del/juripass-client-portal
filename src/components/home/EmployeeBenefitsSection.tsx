import { Card } from '@/components/ui/card';
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
    <section className="py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vantagens para <span className="text-primary">Colaboradores</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            O benefício que cuida da tranquilidade jurídica de quem faz sua empresa crescer
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group p-5 bg-card/80 backdrop-blur-sm border border-border/50 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
