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
  Clock,
  Lightbulb,
  ClipboardList,
  FileCheck,
} from 'lucide-react';

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'NR-01 e Riscos Psicossociais: O que muda para as empresas em 2026',
  description:
    'Entenda as mudanças da NR-01 sobre riscos psicossociais que passam a vigorar em 2026 e como preparar sua empresa.',
  author: { '@type': 'Organization', name: 'Juripass' },
  publisher: { '@type': 'Organization', name: 'Juripass' },
  datePublished: '2026-03-01',
  dateModified: '2026-03-01',
  keywords:
    'NR-01, riscos psicossociais, 2026, compliance, gestão de riscos, saúde mental no trabalho',
};

const whatChanges = [
  { icon: ClipboardList, title: 'Inclusão no PGR', description: 'Riscos psicossociais devem ser incluídos no Programa de Gerenciamento de Riscos, ao lado de riscos físicos, químicos e ergonômicos.' },
  { icon: ShieldCheck, title: 'Obrigação de prevenção', description: 'Empresas precisam implementar medidas concretas de prevenção, não apenas identificação.' },
  { icon: FileCheck, title: 'Documentação comprobatória', description: 'É necessário documentar todas as ações adotadas para demonstrar conformidade em caso de fiscalização.' },
  { icon: TrendingUp, title: 'Monitoramento contínuo', description: 'Indicadores de saúde mental, absenteísmo e clima devem ser acompanhados regularmente.' },
];

const riskExamples = [
  'Estresse crônico e burnout por sobrecarga de trabalho',
  'Assédio moral ou sexual no ambiente corporativo',
  'Conflitos interpessoais com gestores e colegas',
  'Insegurança financeira e problemas jurídicos pessoais',
  'Falta de autonomia e microgerenciamento excessivo',
  'Isolamento social no trabalho remoto',
];

const rhSteps = [
  { icon: Brain, title: 'Mapear riscos', description: 'Realizar diagnóstico organizacional para identificar os principais fatores de risco psicossocial presentes na empresa.' },
  { icon: HeartHandshake, title: 'Criar canais de suporte', description: 'Disponibilizar canais externos e confidenciais para acolhimento jurídico, psicológico e financeiro.' },
  { icon: Users, title: 'Treinar lideranças', description: 'Capacitar gestores para identificar sinais precoces de sofrimento e encaminhar adequadamente.' },
  { icon: Building2, title: 'Integrar à cultura', description: 'Transformar a gestão de riscos psicossociais em parte da cultura organizacional, não apenas um checklist de compliance.' },
];

export default function NR01RiscosPsicossociais() {
  const { open: openLeadForm } = useLeadForm();
  return (
    <>
      <SEOHead
        title="NR-01 e Riscos Psicossociais em 2026 — Juripass | O Que Muda"
        description="Entenda o que muda com a NR-01 sobre riscos psicossociais a partir de 2026. Saiba o que empresas precisarão gerenciar e como o RH pode se preparar."
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
                Atualizado 2026
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                NR-01 e Riscos Psicossociais:{' '}
                <span className="text-primary-foreground/90">O Que Muda Para as Empresas em 2026</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                A norma regulamentadora agora exige gestão formal de riscos psicossociais. Entenda as mudanças e como preparar sua empresa.
              </p>
              <Button size="lg" variant="secondary" onClick={openLeadForm}>
                <Calendar className="h-5 w-5" />
                Agende uma conversa
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* O que é a NR-01 */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                O que é a NR-01?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A <strong className="text-foreground">Norma Regulamentadora nº 01 (NR-01)</strong> estabelece as disposições gerais sobre segurança e saúde no trabalho no Brasil. Ela é a base para todas as demais normas regulamentadoras e define que todo empregador deve implementar um <strong className="text-foreground">Programa de Gerenciamento de Riscos (PGR)</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Historicamente, o PGR focava em riscos físicos, químicos, biológicos e ergonômicos. Com a atualização que ganha força em 2026, os <strong className="text-foreground">riscos psicossociais</strong> passam a fazer parte formalmente do escopo de gerenciamento.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* O que muda a partir de 2026 */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                O que muda a partir de 2026?
              </h2>
              <p className="text-muted-foreground">
                As principais mudanças que empresas precisam conhecer.
              </p>
            </div>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
            {whatChanges.map((item, i) => (
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

      {/* O que empresas precisarão gerenciar */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                O que empresas precisarão gerenciar?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A norma exige que empresas identifiquem e gerenciem todos os fatores que possam afetar a saúde mental dos colaboradores no contexto do trabalho. Isso inclui tanto fatores internos (organização do trabalho, relações interpessoais) quanto fatores externos que impactam o desempenho (problemas pessoais, financeiros, jurídicos).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                O foco não é apenas identificar, mas <strong className="text-foreground">implementar ações preventivas e documentar</strong> o que foi feito. A fiscalização avaliará se a empresa tem processos estruturados, não apenas se preencheu formulários.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Exemplos de riscos */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Exemplos de riscos psicossociais
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {riskExamples.map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                    <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Como o RH pode se preparar */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Como o RH pode estruturar processos de gestão
              </h2>
              <p className="text-muted-foreground">
                Quatro passos fundamentais para preparar sua empresa.
              </p>
            </div>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
            {rhSteps.map((item, i) => (
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

      {/* Conteúdo relacionado */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Conteúdo relacionado
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link to="/" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Conheça a Juripass</h3>
                <p className="text-sm text-muted-foreground mb-3">Plataforma de gestão de suporte jurídico para RH.</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Visitar <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link to="/como-funciona" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Como funciona</h3>
                <p className="text-sm text-muted-foreground mb-3">Entenda o modelo de acolhimento jurídico.</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Saiba mais <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link to="/gestao-riscos-psicossociais-nr01" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Gestão de riscos psicossociais</h3>
                <p className="text-sm text-muted-foreground mb-3">Como estruturar esse processo na empresa.</p>
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
                Prepare sua empresa para a NR-01
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Entenda como um programa de acolhimento jurídico pode ser parte da sua estratégia de conformidade com a NR-01.
              </p>
              <Button size="lg" onClick={openScheduling}>
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
