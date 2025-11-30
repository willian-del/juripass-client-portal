import { AlertCircle, Brain, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function ProblemSection() {
  const stats = [
    {
      icon: Users,
      value: '69%',
      label: 'da população enfrentou problemas jurídicos nos últimos 2 anos',
      color: 'text-white'
    },
    {
      icon: AlertCircle,
      value: '13%',
      label: 'conseguiu resolver esses problemas sem ajuda especializada',
      color: 'text-juripass-gold'
    },
    {
      icon: Brain,
      value: '28%',
      label: 'sofreu impacto na saúde mental devido a esses problemas',
      color: 'text-juripass-accent'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-juripass-primary-dark via-juripass-primary to-juripass-primary-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Question Bubble */}
          <div className="relative animate-fade-in">
            <Card className="p-8 md:p-12 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full shadow-lg" />
              <div className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-white rounded-full shadow-lg" />
              <p className="text-xl md:text-3xl text-foreground leading-relaxed font-medium">
                Imagine se seus colaboradores tivessem acesso a{' '}
                <span className="font-bold text-juripass-primary">
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
                className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="space-y-3">
                    <p className={`text-5xl md:text-6xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="text-sm md:text-base text-white/90 leading-relaxed font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Source */}
          <p className="text-center text-sm text-white/80 italic">
            Fonte: Pesquisa MelhorRH, 2023
          </p>

          {/* Impact Message */}
          <Card className="p-8 md:p-12 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <p className="text-center text-lg md:text-2xl text-foreground font-bold leading-relaxed">
              Problemas jurídicos não resolvidos causam{' '}
              <span className="text-juripass-primary">absenteísmo, estresse e redução de produtividade</span>{' '}
              em sua equipe.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
