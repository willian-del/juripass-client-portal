import { Link } from 'react-router-dom';
import { useLeadForm } from '@/contexts/LeadFormContext';
import { SEOHead } from '@/components/ui/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  Calendar,
  HeartHandshake,
  Building2,
  EyeOff,
  Scale,
  Lightbulb,
  ArrowUpRight,
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  Shield,
  TrendingUp,
  Heart,
  Users,
  Award,
} from 'lucide-react';

const serviceCards = [
  {
    icon: Building2,
    title: 'Atendimento externo e sigiloso',
    description: 'O colaborador conversa com um profissional habilitado, fora da estrutura interna da empresa.',
  },
  {
    icon: Lightbulb,
    title: 'Orientação informativa sobre direitos',
    description: 'Esclarecimento claro e acessível sobre caminhos legais possíveis em cada situação.',
  },
  {
    icon: Scale,
    title: 'Organização da demanda',
    description: 'Ajudamos o colaborador a entender o problema, estruturar informações e avaliar alternativas.',
  },
  {
    icon: ArrowUpRight,
    title: 'Encaminhamento quando necessário',
    description: 'Caso deseje avançar com medida formal, o colaborador pode contratar o profissional diretamente, sem envolvimento da empresa.',
  },
];

const topics = [
  'Dívidas e finanças pessoais',
  'Conflitos e questões familiares',
  'Moradia e propriedade',
  'Golpes e fraudes digitais',
  'Direito do consumidor',
  'Saúde e acesso a serviços',
];

const steps = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'O colaborador entra em contato',
    description: 'Pelo canal da Juripass, de forma simples e direta.',
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Recebe orientação especializada',
    description: 'Esclarecimento sobre direitos e alternativas com linguagem acessível.',
  },
  {
    icon: Shield,
    number: '03',
    title: 'Compreende seus caminhos possíveis',
    description: 'Toma decisões com mais segurança e autonomia.',
  },
  {
    icon: ArrowUpRight,
    number: '04',
    title: 'Encaminhamento formal (quando aplicável)',
    description: 'Se optar por avançar, pode contratar diretamente o profissional.',
  },
];

const hrBenefits = [
  { icon: TrendingUp, text: 'Reduz a absorção informal de demandas sensíveis pelo RH' },
  { icon: Users, text: 'Diminui desgaste da liderança com questões pessoais' },
  { icon: Heart, text: 'Aumenta a percepção de cuidado real com o colaborador' },
  { icon: HeartHandshake, text: 'Contribui para saúde emocional e financeira do time' },
  { icon: Award, text: 'Fortalece a proposta de valor ao empregado (EVP)' },
];

export default function ParaSeuColaborador() {
  return (
    <>
      <SEOHead
        title="Para Seus Colaboradores — Juripass | Canal de Apoio Confidencial"
        description="A Juripass oferece um canal externo e confidencial de orientação jurídica para colaboradores. Apoio estruturado que fortalece a gestão de pessoas."
      />

      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/40 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              <HeartHandshake className="h-3.5 w-3.5 mr-1.5" />
              Para seus colaboradores
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-foreground">
              Um canal de apoio confidencial{' '}
              <span className="text-primary">para o seu time.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Quando problemas jurídicos, financeiros ou familiares ficam sem direcionamento, eles não desaparecem —{' '}
              <strong className="text-foreground">eles atravessam o dia a dia da empresa.</strong>
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              A Juripass cria um espaço seguro e externo onde o colaborador recebe orientação clara sobre seus direitos e caminhos possíveis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Button size="lg" className="rounded-full px-8 gap-2" onClick={openScheduling}>
                <Calendar className="h-5 w-5" />
                Agende uma conversa
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                <Link to="/como-funciona">
                  Entender como funciona
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* O Problema Invisível */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                Questões pessoais não resolvidas afetam o trabalho.
              </h2>
              <div className="p-6 md:p-8 rounded-2xl bg-card border border-border border-l-4 border-l-primary">
                <p className="text-muted-foreground leading-relaxed">
                  Dívidas, conflitos familiares, problemas com moradia, consumo ou saúde geram{' '}
                  <strong className="text-foreground">insegurança e desgaste emocional</strong>.
                  Sem um canal estruturado, essas situações acabam chegando informalmente ao RH ou à liderança
                  — muitas vezes sem preparo adequado para acolher ou orientar.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  A Juripass organiza esse fluxo de forma <strong className="text-foreground">preventiva, profissional e confidencial</strong>.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* O que o colaborador encontra */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Um canal externo, estruturado e confidencial.
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {serviceCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-card border border-border space-y-4 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <card.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Temas atendidos */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Situações do dia a dia que impactam o colaborador.
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {topics.map((topic, i) => (
                  <Badge key={topic} variant="secondary" className="text-sm px-4 py-2">
                    {topic}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                Sempre com orientação informativa e preventiva.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Como funciona na prática */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Fluxo simples, acolhedor e organizado.</h2>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-7 md:left-[2.15rem] top-0 bottom-0 w-px border-l-2 border-dashed border-primary/20 hidden sm:block" />

            <div className="space-y-6">
              {steps.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 0.12}>
                  <div className="flex gap-5 sm:gap-8 relative">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center z-10 shadow-md">
                        <step.icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-card border border-border flex-1 space-y-2">
                      <span className="text-xs font-bold text-primary/50 uppercase tracking-wider">Passo {step.number}</span>
                      <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.5}>
              <div className="mt-8 p-4 rounded-xl bg-accent/50 border border-border text-center">
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <EyeOff className="h-4 w-4 text-primary shrink-0" />
                  A empresa não participa do conteúdo das demandas e não tem acesso às informações individuais.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Impacto para o RH */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Cuidado estruturado que fortalece a gestão.
              </h2>
              <p className="text-muted-foreground">Ao oferecer a Juripass como benefício corporativo, a empresa:</p>
            </div>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto space-y-4 mb-10">
            {hrBenefits.map((item, i) => (
              <ScrollReveal key={item.text} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm text-foreground font-medium pt-1.5">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.5}>
            <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-dark text-primary-foreground text-center space-y-3">
              <h3 className="text-lg font-bold">Não é assessoria jurídica interna.</h3>
              <p className="text-sm text-primary-foreground/80">
                É <strong>gestão preventiva estruturada.</strong> A Juripass não substitui o jurídico da empresa
                nem atua em conflitos corporativos. É um canal independente, voltado exclusivamente às questões
                pessoais do colaborador, preservando confidencialidade e evitando sobrecarga da estrutura interna.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Saiba mais */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">Saiba mais</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <Link to="/nr-01" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Scale className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Nova NR-01</h3>
                  <p className="text-sm text-muted-foreground mb-3">Entenda as obrigações da norma sobre riscos psicossociais.</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Saiba mais <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link to="/como-funciona" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Como funciona</h3>
                  <p className="text-sm text-muted-foreground mb-3">Veja o fluxo completo do acolhimento, da ativação ao encaminhamento.</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Ver detalhes <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link to="/faq" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Perguntas frequentes</h3>
                  <p className="text-sm text-muted-foreground mb-3">Respostas para as dúvidas mais comuns de RHs e gestores.</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Ver FAQ <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/90 to-primary">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                Ofereça um canal de apoio que vai além do trabalho.
              </h2>
              <p className="text-primary-foreground/80">
                Empresas que cuidam das pessoas também cuidam do ambiente organizacional.
                A Juripass ajuda sua empresa a estruturar esse cuidado de forma profissional e sustentável.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" variant="secondary" className="rounded-full px-8 gap-2" onClick={openScheduling}>
                  <Calendar className="h-5 w-5" />
                  Levar a Juripass para minha empresa
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 bg-white/20 border-white/40 text-white hover:bg-white/30" asChild>
                  <Link to="/como-funciona">
                    Como funciona
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
