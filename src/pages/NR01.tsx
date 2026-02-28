import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/constants';
import { SEOHead, organizationJsonLd } from '@/components/ui/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  Calendar,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Scale,
  HeartHandshake,
  TrendingUp,
  Clock,
  Building2,
  Users,
  Brain,
  ArrowRight,
} from 'lucide-react';

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Nova NR-01 e Riscos Psicossociais: O Que Muda Para o RH',
  description:
    'Entenda o que muda com a Nova NR-01 sobre riscos psicossociais no trabalho. Saiba como um programa de acolhimento jurídico ajuda sua empresa na conformidade e prevenção.',
  author: { '@type': 'Organization', name: 'Juripass' },
  publisher: { '@type': 'Organization', name: 'Juripass' },
  datePublished: '2025-06-01',
  dateModified: '2025-06-01',
  keywords:
    'NR-01, riscos psicossociais, saúde mental no trabalho, obrigações do empregador, acolhimento jurídico, compliance trabalhista',
};

const obligations = [
  {
    icon: BookOpen,
    title: 'Identificar riscos psicossociais',
    description:
      'Mapear situações de estresse, assédio, sobrecarga e conflitos pessoais que impactam a saúde mental dos colaboradores.',
  },
  {
    icon: TrendingUp,
    title: 'Avaliar e monitorar',
    description:
      'Manter indicadores atualizados sobre o clima organizacional e a incidência de fatores de risco psicossocial.',
  },
  {
    icon: ShieldCheck,
    title: 'Gerenciar e prevenir',
    description:
      'Implementar ações concretas de prevenção, incluindo canais de acolhimento e programas de suporte ao colaborador.',
  },
  {
    icon: Scale,
    title: 'Documentar e comprovar',
    description:
      'Registrar as ações adotadas para demonstrar conformidade em caso de fiscalização ou litígio trabalhista.',
  },
];

const juripassBenefits = [
  {
    icon: HeartHandshake,
    title: 'Canal externo e confidencial',
    description:
      'Colaboradores acessam orientação jurídica sem exposição interna, gerando confiança e adesão ao programa.',
  },
  {
    icon: Users,
    title: 'Dados anonimizados para o RH',
    description:
      'Relatórios de tendências sem identificar indivíduos, permitindo ações preventivas baseadas em dados reais.',
  },
  {
    icon: Brain,
    title: 'Prevenção ativa de riscos',
    description:
      'Ao resolver conflitos jurídicos pessoais cedo, reduz-se o estresse crônico que se torna risco psicossocial.',
  },
  {
    icon: Building2,
    title: 'Mais do que compliance',
    description:
      'Não é apenas cumprir a norma — é demonstrar cuidado genuíno com o bem-estar do colaborador.',
  },
];

const stats = [
  { value: '69%', label: 'dos brasileiros enfrentam problemas jurídicos que afetam o trabalho' },
  { value: '28%', label: 'relatam impacto direto na saúde mental por questões legais pessoais' },
  { value: '40%', label: 'dos afastamentos por saúde mental têm origem em estresse extralaboral' },
  { value: '3x', label: 'mais engajamento em empresas com programas de acolhimento' },
];

export default function NR01() {
  return (
    <>
      <SEOHead
        title="Nova NR-01 e Riscos Psicossociais — Juripass | Como Adequar Sua Empresa"
        description="Entenda o que muda com a Nova NR-01 sobre riscos psicossociais no trabalho. Saiba como um programa de acolhimento jurídico ajuda sua empresa na conformidade e prevenção."
        jsonLd={[articleJsonLd, organizationJsonLd]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-dark text-primary-foreground py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/20 text-primary-foreground border-primary-foreground/20 hover:bg-primary/30">
                <Clock className="h-3 w-3 mr-1" />
                Atualizado 2025
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Nova NR-01 e Riscos Psicossociais:{' '}
                <span className="text-primary-foreground/90">O Que Muda Para o RH</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                A norma agora exige que empresas identifiquem e gerenciem riscos psicossociais. Saiba
                como um programa de acolhimento jurídico ajuda sua organização a estar em
                conformidade.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <a
                  href={BRAND.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="h-5 w-5" />
                  Agende uma conversa
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* O que é a Nova NR-01 */}
      <section className="py-16 md:py-24 bg-background" id="o-que-e">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                O que é a Nova NR-01?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A <strong className="text-foreground">Norma Regulamentadora nº 01 (NR-01)</strong>{' '}
                foi atualizada para incluir explicitamente a obrigação de empresas identificarem,
                avaliarem e gerenciarem <strong className="text-foreground">riscos psicossociais</strong>{' '}
                no ambiente de trabalho. Isso significa que fatores como estresse, assédio, sobrecarga
                e conflitos pessoais que impactam a saúde mental dos colaboradores agora fazem parte
                do <strong className="text-foreground">Programa de Gerenciamento de Riscos (PGR)</strong>.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-4">
                O que são riscos psicossociais?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                São fatores do ambiente de trabalho — ou que afetam diretamente o desempenho
                profissional — que podem causar danos à saúde mental e emocional do trabalhador.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: AlertTriangle, text: 'Estresse crônico e burnout' },
                  { icon: AlertTriangle, text: 'Assédio moral e sexual' },
                  { icon: AlertTriangle, text: 'Conflitos familiares e pessoais' },
                  { icon: AlertTriangle, text: 'Endividamento e problemas jurídicos' },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 p-4 rounded-lg bg-accent border border-border"
                  >
                    <item.icon className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-muted border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Prazo de adequação:</strong> A fiscalização
                  sobre riscos psicossociais no PGR já está em vigor desde maio de 2025. Empresas
                  que não se adequarem estão sujeitas a multas e ações trabalhistas.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Obrigações da empresa */}
      <section className="py-16 md:py-24 bg-muted" id="obrigacoes">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Quais as obrigações da empresa?
              </h2>
              <p className="text-muted-foreground">
                A Nova NR-01 estabelece responsabilidades claras para o empregador no gerenciamento
                de riscos psicossociais.
              </p>
            </div>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
            {obligations.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-xl p-6 h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.4}>
            <div className="max-w-3xl mx-auto mt-10 p-5 rounded-xl bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-foreground">
                <strong>Consequências do não cumprimento:</strong> Multas administrativas, ações
                trabalhistas, aumento de afastamentos por saúde mental e danos à reputação
                corporativa como empregadora.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Como a Juripass ajuda */}
      <section className="py-16 md:py-24 bg-background" id="como-ajuda">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Como a Juripass ajuda na conformidade com a NR-01
              </h2>
              <p className="text-muted-foreground">
                O programa de acolhimento jurídico se conecta diretamente aos requisitos da norma,
                oferecendo uma solução prática e mensurável.
              </p>
            </div>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
            {juripassBenefits.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="flex gap-4 p-6 rounded-xl bg-accent/50 border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dados e estatísticas */}
      <section className="py-16 md:py-24 bg-gradient-dark text-primary-foreground" id="dados">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Dados que reforçam a urgência
              </h2>
              <p className="text-primary-foreground/80">
                Problemas jurídicos pessoais são um dos principais fatores de risco psicossocial —
                e poucos programas corporativos os endereçam.
              </p>
            </div>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.value} delay={i * 0.1}>
                <div className="text-center p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Conteúdo relacionado */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Conteúdo relacionado
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link to="/para-quem" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Para quem a Juripass faz sentido</h3>
                <p className="text-sm text-muted-foreground mb-3">Descubra quais segmentos mais se beneficiam do acolhimento jurídico.</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Saiba mais <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link to="/blog/nr-01-riscos-psicossociais-guia-pratico" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Guia Prático: NR-01 para RH</h3>
                <p className="text-sm text-muted-foreground mb-3">Passo a passo para adequar sua empresa à nova norma.</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Ler artigo <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link to="/blog/saude-mental-trabalho-papel-rh" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Saúde Mental e o Papel do RH</h3>
                <p className="text-sm text-muted-foreground mb-3">Como ir além do discurso e implementar ações concretas.</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Ler artigo <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-background" id="agendar">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Adeque sua empresa à Nova NR-01
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Entenda como um programa de acolhimento jurídico pode ser a peça que falta na sua
                estratégia de prevenção de riscos psicossociais.
              </p>
              <Button size="lg" asChild>
                <a
                  href={BRAND.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="h-5 w-5" />
                  Agende uma conversa
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                15 minutos para entender se faz sentido para sua empresa.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
