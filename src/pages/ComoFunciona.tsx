import { Calendar, Lightbulb, ArrowUpRight, CheckCircle2, Building2, MessageSquare, Users, Clock, FileCheck, MessageCircle, ShieldCheck, EyeOff, Scale, ChevronRight, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/ui/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BRAND, openScheduling } from '@/lib/constants';

const steps = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Colaborador entra em contato direto',
    description: 'O primeiro passo é simples: o colaborador manda uma mensagem.',
    details: [
      'Via WhatsApp ou aplicativo, sem precisar passar pelo RH',
      'Canal disponível em horário estendido',
      'Acesso simples, sem complicação',
    ],
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Equipe treinada acolhe e organiza a demanda',
    description: 'Profissionais treinados analisam a situação e orientam com linguagem clara e acessível.',
    details: [
      'Entende o que está acontecendo na sua situação',
      'Recebe orientação informativa sobre direitos e caminhos possíveis',
      'Sabe o que pode e o que não pode fazer',
    ],
  },
  {
    icon: ArrowUpRight,
    number: '03',
    title: 'Situação é encaminhada adequadamente',
    description: 'Se necessário, o colaborador é direcionado a advogado habilitado.',
    details: [
      'Encaminhamento a profissional especializado quando necessário',
      'A empresa não participa e não recebe informações',
      'O colaborador segue com autonomia',
    ],
  },
];

const confidentialityCards = [
  {
    icon: Building2,
    title: 'Externo',
    description: 'O colaborador não precisa se expor internamente. O canal é operado fora da empresa.',
  },
  {
    icon: EyeOff,
    title: 'Confidencial',
    description: 'A empresa não recebe informações individuais. Apenas dados agregados e anônimos.',
  },
  {
    icon: Scale,
    title: 'Sem conflito',
    description: 'O canal não gera passivo para a empresa. Atua na prevenção e no acolhimento.',
  },
];

const implantationSteps = [
  { icon: MessageSquare, title: 'Kick-off', description: 'Alinhamento inicial com o time de RH para entender o contexto da empresa.' },
  { icon: FileCheck, title: 'Comunicação', description: 'Fornecemos todo o material necessário para apresentar o benefício aos colaboradores.' },
  { icon: Users, title: 'Treinamento', description: 'Treinamento da equipe e suporte contínuo para garantir engajamento.' },
  { icon: CheckCircle2, title: 'Acompanhamento', description: 'Monitoramento contínuo de adesão e relatórios agregados.' },
];

const ComoFunciona = () => {
  return (
    <>
      <SEOHead
        title="Como Funciona a Juripass — Acolhimento Jurídico Corporativo"
        description="Entenda como o programa de acolhimento jurídico funciona: canal confidencial via WhatsApp, equipe treinada e encaminhamento especializado para colaboradores."
      />

      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
              Simples e confidencial
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Como a Juripass funciona
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Um canal <strong className="text-foreground">simples, externo e confidencial</strong>. Sem burocracia para a empresa, sem exposição para o colaborador.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button size="lg" className="rounded-full px-8" onClick={openScheduling}>
                <Calendar className="h-5 w-5 mr-2" />
                Agende uma conversa
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                <Link to="/para-quem">
                  Ver para quem
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline dos 3 passos */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">A jornada do colaborador</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Do primeiro contato ao encaminhamento — tudo acontece de forma simples e sigilosa.</p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto relative">
            {/* Linha conectora vertical */}
            <div className="absolute left-7 md:left-[2.15rem] top-0 bottom-0 w-px border-l-2 border-dashed border-primary/20 hidden sm:block" />

            <div className="space-y-8">
              {steps.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 0.15}>
                  <div className="flex gap-5 sm:gap-8 relative">
                    {/* Número / ícone */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center z-10 shadow-md">
                        <step.icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="p-6 rounded-2xl bg-card border border-border flex-1 space-y-3">
                      <span className="text-xs font-bold text-primary/50 uppercase tracking-wider">Passo {step.number}</span>
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                      <ul className="space-y-2 pt-1">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Badge de prazo */}
            <ScrollReveal delay={0.5}>
              <div className="flex items-center justify-center gap-2 mt-8">
                <Badge variant="outline" className="text-sm px-4 py-1.5 border-primary/30">
                  <Clock className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  Primeiro retorno em até 1 dia útil
                </Badge>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Por que externo e confidencial? */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Por que externo e confidencial?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Um canal pensado para proteger o colaborador e a empresa ao mesmo tempo.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {confidentialityCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.12}>
                <div className="p-6 rounded-2xl bg-card border border-border space-y-4 text-center h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto">
                    <card.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Implantação — timeline horizontal */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Implantação simples e rápida</h2>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Badge variant="outline" className="border-primary/30 px-4 py-1.5">
                  <Clock className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  Até 15 dias após assinatura
                </Badge>
                <Badge className="bg-primary/10 text-primary border-0 px-4 py-1.5">
                  Sem taxa de implantação
                </Badge>
              </div>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {implantationSteps.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.1}>
                  <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-bold text-primary/50 mb-1">Etapa {i + 1}</span>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                    {i < implantationSteps.length - 1 && (
                      <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30 z-10" />
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Saiba mais — links internos */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Saiba mais</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { to: '/nr-01', title: 'Entenda a Nova NR-01', desc: 'Como a norma impacta sua empresa e o que fazer agora.' },
              { to: '/para-quem', title: 'Para quem é a Juripass?', desc: 'Descubra se faz sentido para o seu tipo de empresa.' },
              { to: '/blog', title: 'Conteúdos e artigos', desc: 'Temas sobre saúde jurídica, RH e bem-estar organizacional.' },
            ].map((link, i) => (
              <ScrollReveal key={link.to} delay={i * 0.1}>
                <Link to={link.to} className="group block p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors h-full">
                  <div className="flex items-start justify-between mb-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/90 to-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              Quer entender como isso funcionaria na sua empresa?
            </h2>
            <Button size="lg" variant="secondary" className="rounded-full px-8" onClick={openScheduling}>
              <Calendar className="h-5 w-5 mr-2" />
              Agende uma conversa
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComoFunciona;
