import { Card } from '@/components/ui/card';
import { TrendingUp, DollarSign, Users, Trophy, Lock, BarChart3 } from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Redução do Absenteísmo',
      description: 'Colaboradores resolvem problemas jurídicos sem comprometer suas jornadas de trabalho',
      gradient: 'from-primary to-primary/60'
    },
    {
      icon: DollarSign,
      title: 'Custo Acessível',
      description: 'Benefício de alto valor percebido com investimento baixo e previsível',
      gradient: 'from-accent to-accent/60'
    },
    {
      icon: Users,
      title: 'Extensivo a Familiares',
      description: 'Cobertura para cônjuge e filhos, ampliando o impacto do benefício',
      gradient: 'from-juripass-primary-light to-primary'
    },
    {
      icon: Trophy,
      title: 'Diferencial Competitivo',
      description: 'Atraia e retenha talentos oferecendo um benefício único no mercado',
      gradient: 'from-juripass-gold to-yellow-600'
    },
    {
      icon: Lock,
      title: 'Confidencialidade Total',
      description: 'Sigilo absoluto entre colaborador e advogado, garantindo privacidade',
      gradient: 'from-primary to-juripass-primary-dark'
    },
    {
      icon: BarChart3,
      title: 'Relatórios de Utilização',
      description: 'Acompanhe o engajamento e satisfação sem violar a privacidade individual',
      gradient: 'from-accent to-juripass-accent'
    }
  ];

  return (
    <section id="beneficios" className="py-20 md:py-32 bg-background scroll-mt-16 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Vantagens para sua Empresa
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Investir no bem-estar jurídico dos colaboradores traz retornos mensuráveis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group p-8 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="space-y-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/70 font-medium leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <Card className="inline-block p-10 md:p-12 bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 border-primary/30 backdrop-blur-sm shadow-xl">
            <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
              Empresas que investem no bem-estar dos colaboradores{' '}
              <span className="font-bold text-primary">reduzem turnover em até 25%</span>
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
