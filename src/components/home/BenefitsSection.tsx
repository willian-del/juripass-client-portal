import { Card } from '@/components/ui/card';
import { TrendingUp, DollarSign, Users, Trophy, Lock, BarChart3 } from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Redução do Absenteísmo',
      description: 'Colaboradores resolvem problemas jurídicos sem comprometer suas jornadas de trabalho',
      color: 'text-primary'
    },
    {
      icon: DollarSign,
      title: 'Custo Acessível',
      description: 'Benefício de alto valor percebido com investimento baixo e previsível',
      color: 'text-accent'
    },
    {
      icon: Users,
      title: 'Extensivo a Familiares',
      description: 'Cobertura para cônjuge e filhos, ampliando o impacto do benefício',
      color: 'text-primary'
    },
    {
      icon: Trophy,
      title: 'Diferencial Competitivo',
      description: 'Atraia e retenha talentos oferecendo um benefício único no mercado',
      color: 'text-accent'
    },
    {
      icon: Lock,
      title: 'Confidencialidade Total',
      description: 'Sigilo absoluto entre colaborador e advogado, garantindo privacidade',
      color: 'text-primary'
    },
    {
      icon: BarChart3,
      title: 'Relatórios de Utilização',
      description: 'Acompanhe o engajamento e satisfação sem violar a privacidade individual',
      color: 'text-accent'
    }
  ];

  return (
    <section id="beneficios" className="py-16 md:py-24 bg-muted/30 scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Vantagens para sua Empresa
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Investir no bem-estar jurídico dos colaboradores traz retornos mensuráveis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform ${benefit.color}`}>
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground">
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

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="inline-block p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <p className="text-lg md:text-xl font-medium text-foreground">
              Empresas que investem no bem-estar dos colaboradores{' '}
              <span className="font-bold text-primary">reduzem turnover em até 25%</span>
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
