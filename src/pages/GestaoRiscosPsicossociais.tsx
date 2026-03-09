import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/constants';
import { useLeadForm } from '@/contexts/LeadFormContext';
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
  Users,
  Brain,
  ArrowRight,
  Building2,
  FileWarning,
  BarChart3,
  Lightbulb,
} from 'lucide-react';

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Gestão de Riscos Psicossociais na NR-01: Como Empresas Podem Estruturar Esse Processo',
  description:
    'Guia completo sobre gestão de riscos psicossociais conforme a NR-01. Entenda o que são, por que importam e como estruturar esse processo na sua empresa.',
  author: { '@type': 'Organization', name: 'Juripass' },
  publisher: { '@type': 'Organization', name: 'Juripass' },
  datePublished: '2026-03-01',
  dateModified: '2026-03-01',
  keywords:
    'riscos psicossociais, NR-01, gestão de riscos, saúde mental no trabalho, RH, compliance trabalhista',
};

const riskExamples = [
  { icon: AlertTriangle, title: 'Sobrecarga e pressão excessiva', description: 'Metas irreais, jornadas extensas e falta de pausas adequadas geram estresse crônico.' },
  { icon: Brain, title: 'Assédio moral e conflitos', description: 'Relações tóxicas entre colegas ou com gestores deterioram o clima organizacional.' },
  { icon: FileWarning, title: 'Problemas jurídicos pessoais', description: 'Divórcios, dívidas e disputas familiares acompanham o colaborador ao trabalho.' },
  { icon: Scale, title: 'Insegurança e instabilidade', description: 'Medo de demissão, falta de perspectiva de carreira e contratos precários.' },
];

const structureSteps = [
  { icon: BarChart3, title: 'Diagnóstico e mapeamento', description: 'Identificar quais riscos psicossociais estão presentes na realidade da empresa, usando pesquisas de clima, análise de indicadores e escuta ativa.' },
  { icon: ShieldCheck, title: 'Política de prevenção', description: 'Criar diretrizes claras sobre como a empresa atua na prevenção, incluindo canais de escuta, programas de suporte e treinamento de lideranças.' },
  { icon: HeartHandshake, title: 'Canais de acolhimento', description: 'Disponibilizar canais externos e confidenciais para que colaboradores busquem ajuda — jurídica, psicológica e financeira.' },
  { icon: TrendingUp, title: 'Monitoramento contínuo', description: 'Acompanhar indicadores como absenteísmo, turnover, afastamentos e satisfação para ajustar a estratégia ao longo do tempo.' },
];

export default function GestaoRiscosPsicossociais() {
  const { open: openLeadForm } = useLeadForm();
  return (
    <>
      <SEOHead
        title="Gestão de Riscos Psicossociais na NR-01 — Juripass | Guia para Empresas"
        description="Entenda o que são riscos psicossociais, o que muda com a NR-01 e como empresas podem estruturar a gestão desses riscos. Guia prático para profissionais de RH."
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
                <ShieldCheck className="h-3 w-3 mr-1" />
                NR-01 · Riscos Psicossociais
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Gestão de Riscos Psicossociais na NR-01:{' '}
                <span className="text-primary-foreground/90">Como Empresas Podem Estruturar Esse Processo</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                A NR-01 exige que empresas identifiquem e gerenciem riscos psicossociais. Entenda o que isso significa na prática e como estruturar esse processo.
              </p>
              <Button size="lg" variant="secondary" onClick={openLeadForm}>
                <Calendar className="h-5 w-5" />
                Agende uma conversa
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* O que são riscos psicossociais */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                O que são riscos psicossociais?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Riscos psicossociais são fatores do ambiente de trabalho — ou que impactam diretamente o desempenho profissional — capazes de causar danos à saúde mental, emocional e física dos colaboradores. Diferente de riscos físicos ou químicos, os riscos psicossociais são frequentemente invisíveis e cumulativos.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Eles incluem desde a organização do trabalho (sobrecarga, metas irreais, falta de autonomia) até fatores externos que o colaborador carrega consigo (dívidas, conflitos familiares, processos judiciais). A Nova NR-01 reconhece que todos esses fatores precisam ser gerenciados como parte do <strong className="text-foreground">Programa de Gerenciamento de Riscos (PGR)</strong>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* O que muda com a NR-01 */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                O que muda com a NR-01?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A atualização da NR-01 torna obrigatória a inclusão de riscos psicossociais no PGR. Antes, a norma focava em riscos físicos, químicos, biológicos e ergonômicos. Agora, fatores como estresse ocupacional, assédio, conflitos interpessoais e outros aspectos que afetam a saúde mental fazem parte do escopo de gerenciamento.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Isso significa que empresas precisam <strong className="text-foreground">identificar, avaliar, controlar e documentar</strong> esses riscos — da mesma forma que já fazem com riscos de segurança física. A fiscalização já está ativa, e o descumprimento pode gerar multas, ações trabalhistas e danos à reputação.
              </p>
              <div className="p-5 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-foreground">
                  <strong>Atenção:</strong> A fiscalização sobre riscos psicossociais no PGR está em vigor. Empresas que não se adequaram estão sujeitas a penalidades.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Por que o RH precisa estruturar */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Por que o RH precisa estruturar a gestão desses riscos?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A gestão de riscos psicossociais não é apenas uma obrigação legal — é uma necessidade estratégica. Empresas que ignoram esses fatores enfrentam aumento de absenteísmo, turnover elevado, queda de produtividade e deterioração do clima organizacional.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                O RH é o setor com maior visibilidade sobre esses indicadores e, portanto, o mais preparado para liderar essa transformação. Estruturar a gestão de riscos psicossociais significa criar processos formais de identificação, canais de suporte e monitoramento contínuo — não basta uma ação pontual.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Além disso, empresas com programas estruturados de prevenção reportam até <strong className="text-foreground">3x mais engajamento</strong> e redução significativa nos custos relacionados a afastamentos e processos trabalhistas.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Exemplos de riscos */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Exemplos de riscos psicossociais nas empresas
              </h2>
              <p className="text-muted-foreground">
                Riscos psicossociais se manifestam de diferentes formas no ambiente corporativo.
              </p>
            </div>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
            {riskExamples.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-xl p-6 h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Como estruturar suporte */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Como empresas podem estruturar suporte
              </h2>
              <p className="text-muted-foreground">
                Um processo eficaz de gestão de riscos psicossociais envolve quatro etapas fundamentais.
              </p>
            </div>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
            {structureSteps.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="flex gap-4 p-6 rounded-xl bg-accent/50 border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Como a Juripass ajuda */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Como a Juripass pode ajudar o RH a organizar riscos humanos
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A Juripass oferece um <strong className="text-foreground">canal externo e confidencial de acolhimento jurídico</strong> que se integra à estratégia de gestão de riscos psicossociais da empresa. Ao resolver conflitos jurídicos pessoais dos colaboradores — como dívidas, disputas familiares e problemas imobiliários — a Juripass atua diretamente na prevenção de estresse crônico que se transforma em risco psicossocial.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  'Canal externo e confidencial para orientação jurídica',
                  'Dados anonimizados para o RH identificar padrões',
                  'Prevenção ativa de riscos psicossociais',
                  'Documentação para comprovar conformidade com a NR-01',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
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
              <Link to="/como-funciona" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Como funciona a Juripass</h3>
                <p className="text-sm text-muted-foreground mb-3">Entenda o modelo de acolhimento jurídico corporativo.</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Saiba mais <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link to="/para-quem" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Para quem é a Juripass</h3>
                <p className="text-sm text-muted-foreground mb-3">Descubra quais segmentos mais se beneficiam.</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Saiba mais <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link to="/nr-01" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">NR-01 e o papel do RH</h3>
                <p className="text-sm text-muted-foreground mb-3">Guia completo sobre a Nova NR-01.</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Saiba mais <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Conheça como a Juripass ajuda o RH a organizar riscos humanos
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Descubra como um programa de acolhimento jurídico pode ser a peça que falta na sua estratégia de gestão de riscos psicossociais.
              </p>
              <Button size="lg" onClick={openLeadForm}>
                <Calendar className="h-5 w-5" />
                Agende uma conversa
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
