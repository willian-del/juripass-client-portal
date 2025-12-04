import { Card } from '@/components/ui/card';
import { TrendingUp, DollarSign, Users, Trophy, Lock, BarChart3 } from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Redução do Absenteísmo',
      description: 'Colaboradores resolvem problemas jurídicos sem comprometer suas jornadas de trabalho'
    },
    {
      icon: DollarSign,
      title: 'Custo Acessível',
      description: 'Benefício de alto valor percebido com investimento baixo e previsível'
    },
    {
      icon: Users,
      title: 'Extensivo a Familiares',
      description: 'Cobertura para cônjuge e filhos, ampliando o impacto do benefício'
    },
    {
      icon: Trophy,
      title: 'Diferencial Competitivo',
      description: 'Atraia e retenha talentos oferecendo um benefício único no mercado'
    },
    {
      icon: Lock,
      title: 'Confidencialidade Total',
      description: 'Sigilo absoluto entre colaborador e advogado, garantindo privacidade'
    },
    {
      icon: BarChart3,
      title: 'Relatórios de Utilização',
      description: 'Acompanhe o engajamento e satisfação sem violar a privacidade individual'
    }
  ];

  return (
    <section id="beneficios" className="py-12 md:py-20 bg-background scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vantagens para sua Empresa
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Investir no bem-estar jurídico dos colaboradores traz retornos mensuráveis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group p-6 bg-card/80 backdrop-blur-sm border border-border/50 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
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
