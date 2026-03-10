import { Unplug, HandHeart, BarChart3, Wallet, Users, Home, ShoppingBag, HeartPulse } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const pillars = [
  {
    icon: Unplug,
    title: 'Canal externo e independente',
    description: 'Um canal jurídico externo que garante sigilo, autonomia e ausência de conflito de interesses.'
  },
  {
    icon: HandHeart,
    title: 'Acolhimento de questões pessoais sensíveis',
    description: 'Colaboradores podem buscar orientação sobre temas como finanças, família, moradia e consumo.'
  },
  {
    icon: BarChart3,
    title: 'Inteligência preventiva para o RH',
    description: 'Os atendimentos geram indicadores agregados que ajudam o RH a monitorar riscos humanos e psicossociais.'
  }
];

const themes = [
  { icon: Wallet, label: 'Finanças' },
  { icon: Users, label: 'Família' },
  { icon: Home, label: 'Moradia' },
  { icon: ShoppingBag, label: 'Consumo' },
  { icon: HeartPulse, label: 'Saúde' }
];

export function WhatIsJuripassSection() {
  return (
    <section className="py-20 md:py-28 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            Como a Juripass ajuda o RH a prevenir riscos humanos?
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg text-muted-foreground text-center leading-relaxed">
              A Juripass estrutura, como política corporativa, um canal jurídico externo e confidencial para que colaboradores possam tratar questões pessoais sensíveis com segurança e autonomia.
            </p>
            <p className="text-base text-muted-foreground/80 text-center leading-relaxed">
              Ao mesmo tempo, os atendimentos geram indicadores agregados que ajudam o RH a identificar padrões de vulnerabilidade e antecipar fatores de risco psicossocial na organização.
            </p>

            <div className="space-y-2 pt-2">
              <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider text-center">
                Principais temas atendidos
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {themes.map((theme) => (
                  <Badge
                    key={theme.label}
                    variant="secondary"
                    className="gap-1.5 px-3 py-1.5 text-sm font-medium"
                  >
                    <theme.icon className="h-3.5 w-3.5" />
                    {theme.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-card border border-border rounded-2xl p-6 text-center space-y-4 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <pillar.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}