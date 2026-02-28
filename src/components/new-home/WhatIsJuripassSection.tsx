import { Shield, Users, Heart, ShieldCheck, Wallet, Home, ShoppingBag, HeartPulse } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const pillars = [
  {
    icon: Shield,
    title: 'Canal confidencial',
    description: 'Externo à empresa, com sigilo profissional garantido.',
  },
  {
    icon: Users,
    title: 'Orientação especializada',
    description: 'Acesso facilitado a profissionais habilitados.',
  },
  {
    icon: Heart,
    title: 'Ambiente saudável',
    description: 'Mais produtividade e segurança para todos.',
  },
];

const themes = [
  { icon: Wallet, label: 'Finanças' },
  { icon: Users, label: 'Família' },
  { icon: Home, label: 'Moradia' },
  { icon: ShoppingBag, label: 'Consumo' },
  { icon: HeartPulse, label: 'Saúde' },
];

export function WhatIsJuripassSection() {
  return (
    <section className="py-16 md:py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Título */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            O que é a Juripass
          </h2>

          {/* Texto principal com destaques */}
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg text-muted-foreground text-center leading-relaxed">
              A Juripass é uma plataforma de gestão preventiva que oferece às empresas um{' '}
              <strong className="text-primary font-semibold">
                canal externo, confidencial e estruturado
              </strong>{' '}
              para acolher e orientar colaboradores em questões pessoais sensíveis{' '}
              <strong className="text-primary font-semibold">
                antes que se transformem em problemas internos
              </strong>.
            </p>

            <p className="text-base text-muted-foreground text-center leading-relaxed">
              Por meio de um atendimento especializado, os colaboradores recebem orientação
              informativa sobre seus direitos e possíveis caminhos legais em situações do dia a dia
              — evitando que essas demandas sejam absorvidas informalmente pelo RH ou pela liderança.
            </p>

            {/* Badges de temas */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
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

          {/* Quote card */}
          <div className="bg-gradient-dark rounded-2xl p-10 text-center space-y-4">
            <p className="text-xl md:text-2xl font-semibold text-primary-foreground leading-relaxed italic">
              "Organiza o encaminhamento das demandas, facilita o acesso a profissionais
              habilitados e contribui para um ambiente de trabalho mais saudável, produtivo
              e seguro para todos."
            </p>
            <div className="flex items-center justify-center gap-2 text-primary-foreground/60 text-sm">
              <ShieldCheck className="h-4 w-4" />
              <span>Sigilo profissional e controles de segurança da informação</span>
            </div>
          </div>

          {/* Três pilares */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-card border border-border rounded-2xl p-6 text-center space-y-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
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
