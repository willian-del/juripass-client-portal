import { AlertCircle, Brain, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function ProblemSection() {
  const stats = [
    {
      icon: Users,
      value: '69%',
      label: 'da população enfrentou problemas jurídicos nos últimos 2 anos',
      color: 'text-primary'
    },
    {
      icon: AlertCircle,
      value: '13%',
      label: 'conseguiu resolver esses problemas sem ajuda especializada',
      color: 'text-destructive'
    },
    {
      icon: Brain,
      value: '28%',
      label: 'sofreu impacto na saúde mental devido a esses problemas',
      color: 'text-accent'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Question Bubble */}
          <div className="relative">
            <Card className="p-8 md:p-12 bg-card border-2 border-primary/20 shadow-lg">
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-primary rounded-full" />
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-primary rounded-full" />
              <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                Imagine se seus colaboradores tivessem acesso a{' '}
                <span className="font-bold text-primary">
                  advogados e especialistas a qualquer momento
                </span>{' '}
                para esclarecer dúvidas ou ajudá-los com seus problemas jurídicos do dia a dia?
              </p>
            </Card>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <p className={`text-4xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Source */}
          <p className="text-center text-sm text-muted-foreground italic">
            Fonte: Pesquisa MelhorRH, 2023
          </p>

          {/* Impact Message */}
          <Card className="p-8 bg-accent/10 border-accent/20">
            <p className="text-center text-lg md:text-xl text-foreground font-medium">
              Problemas jurídicos não resolvidos causam{' '}
              <span className="font-bold text-accent">absenteísmo, estresse e redução de produtividade</span>{' '}
              em sua equipe.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
