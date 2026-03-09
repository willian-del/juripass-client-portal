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
  Lightbulb,
  Wallet,
  Home,
  UserX,
  MessageCircle,
} from 'lucide-react';

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Gestão de Riscos Humanos: Como o RH pode estruturar prevenção e suporte aos colaboradores',
  description:
    'Guia sobre gestão de riscos humanos no ambiente corporativo. Entenda como problemas pessoais impactam o trabalho e como o RH pode estruturar canais de suporte.',
  author: { '@type': 'Organization', name: 'Juripass' },
  publisher: { '@type': 'Organization', name: 'Juripass' },
  datePublished: '2026-03-01',
  dateModified: '2026-03-01',
  keywords:
    'riscos humanos, gestão de pessoas, problemas pessoais trabalho, conflitos familiares, riscos psicossociais, acolhimento jurídico',
};

const personalProblems = [
  { icon: Scale, title: 'Problemas jurídicos', description: 'Processos judiciais, disputas de guarda, ações de despejo e outros conflitos legais que consomem energia mental e tempo.' },
  { icon: Wallet, title: 'Endividamento financeiro', description: 'Dívidas, execuções fiscais e instabilidade financeira que geram ansiedade e comprometem a concentração.' },
  { icon: Home, title: 'Conflitos familiares', description: 'Divórcios, separações, disputas de pensão alimentícia e outros conflitos domésticos que afetam o equilíbrio emocional.' },
  { icon: UserX, title: 'Conflitos relacionais', description: 'Problemas com vizinhos, conflitos comunitários e disputas interpessoais fora do ambiente de trabalho.' },
];

const riskCategories = [
  { title: 'Riscos psicossociais', description: 'Fatores ligados à organização do trabalho que afetam a saúde mental: sobrecarga, assédio, falta de autonomia, insegurança.' },
  { title: 'Riscos relacionais', description: 'Conflitos interpessoais no ambiente de trabalho — com gestores, colegas ou clientes — que deterioram o clima organizacional.' },
  { title: 'Riscos pessoais externos', description: 'Problemas da vida pessoal do colaborador que impactam seu desempenho: questões jurídicas, financeiras, familiares e de saúde.' },
];

export default function GestaoRiscosHumanos() {
  return (
    <>
      <SEOHead
        title="Gestão de Riscos Humanos para RH — Juripass | Prevenção e Suporte"
        description="Como o RH pode estruturar a gestão de riscos humanos: problemas pessoais, conflitos familiares, riscos psicossociais e a importância de canais de orientação."
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
                <Users className="h-3 w-3 mr-1" />
                Gestão de Pessoas
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Gestão de Riscos Humanos:{' '}
                <span className="text-primary-foreground/90">Como o RH Pode Estruturar Prevenção e Suporte</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Problemas pessoais dos colaboradores impactam diretamente o trabalho. Entenda como o RH pode criar canais estruturados de orientação e prevenção.
              </p>
              <Button size="lg" variant="secondary" onClick={openScheduling}>
                <Calendar className="h-5 w-5" />
                Agende uma conversa
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Problemas pessoais que impactam o trabalho */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Problemas pessoais que impactam o trabalho
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Todo colaborador carrega consigo uma vida pessoal que, quando em crise, inevitavelmente afeta o desempenho profissional. Pesquisas indicam que <strong className="text-foreground">69% dos brasileiros</strong> enfrentam pelo menos um problema jurídico relevante ao longo da vida — e a maioria não tem acesso a orientação adequada. Esses problemas não ficam na porta da empresa: eles entram junto com o colaborador.
              </p>
            </div>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
            {personalProblems.map((item, i) => (
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

      {/* Conflitos familiares e financeiros */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Conflitos familiares e financeiros: o impacto silencioso
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Conflitos familiares — como divórcios, disputas de guarda e problemas com pensão alimentícia — são fontes de estresse crônico que acompanham o colaborador por meses ou anos. Da mesma forma, o endividamento e a insegurança financeira geram ansiedade constante que compromete a concentração e a tomada de decisão no trabalho.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                O impacto é silencioso porque o colaborador raramente compartilha essas questões com o gestor ou o RH. Sem um canal adequado de suporte, esses problemas se acumulam até se manifestarem como <strong className="text-foreground">faltas, queda de produtividade, conflitos interpessoais ou afastamentos por saúde mental</strong>.
              </p>
              <div className="p-5 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Dado relevante:</strong> 28% das pessoas com problemas jurídicos pessoais reportam impacto direto na saúde mental, incluindo ansiedade, insônia e sintomas depressivos.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Categorias de riscos */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Riscos psicossociais e riscos relacionais
              </h2>
              <div className="space-y-6">
                {riskCategories.map((item) => (
                  <div key={item.title} className="p-6 rounded-xl bg-accent/50 border border-border">
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                A gestão eficaz de riscos humanos exige que o RH olhe para <strong className="text-foreground">todas essas categorias de forma integrada</strong>. A Nova NR-01 reforça essa visão ao incluir riscos psicossociais no Programa de Gerenciamento de Riscos, mas a abordagem mais eficaz vai além do compliance: envolve criar uma cultura de cuidado e prevenção.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* A importância de canais estruturados */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                A importância de ter canais estruturados de orientação
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Sem um canal externo e confidencial, o colaborador enfrenta seus problemas sozinho. Isso gera um ciclo negativo: o problema pessoal causa estresse → o estresse afeta o trabalho → o baixo desempenho gera mais pressão → a pressão agrava o problema pessoal.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Canais estruturados de orientação — como programas de acolhimento jurídico — quebram esse ciclo ao oferecer <strong className="text-foreground">suporte especializado, acessível e sem exposição interna</strong>. O colaborador resolve seu problema mais rápido, reduz o estresse e recupera a capacidade produtiva.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Confidencialidade total — canal externo à empresa',
                  'Acesso rápido a orientação especializada',
                  'Dados anonimizados para o RH tomar decisões',
                  'Prevenção de riscos antes que se tornem crises',
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
                <p className="text-sm text-muted-foreground mb-3">Segmentos que mais se beneficiam.</p>
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
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Estruture a gestão de riscos humanos na sua empresa
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Conheça como a Juripass pode ser o canal de acolhimento que seus colaboradores precisam — e que o RH precisa para gerenciar riscos humanos.
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
