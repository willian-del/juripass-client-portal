import { useState } from 'react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLeadForm } from '@/contexts/LeadFormContext';
import { SlidesPresentation } from '@/components/avaliacao/SlidesPresentation';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { OnePager } from '@/components/avaliacao/OnePager';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Calendar,
  Presentation,
  FileText,
  User,
  Users,
  Building2,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  UserCheck,
  Unplug,
  MousePointerClick,
  BadgeCheck,
  Wallet,
  Home,
  ShoppingBag,
  HeartPulse,
  Clock,
} from 'lucide-react';

// --- Data ---

const problemSteps = [
  { label: 'Colaborador', sublabel: 'com problema pessoal', icon: User, highlight: false },
  { label: 'Gestor', sublabel: 'Gestores atuam como conselheiros informais', icon: Users, highlight: false },
  { label: 'RH', sublabel: 'O RH recebe relatos delicados fora do seu escopo', icon: Building2, highlight: false },
  { label: 'Desgaste', sublabel: 'Questões externas passam a impactar clima e operação', icon: AlertTriangle, highlight: true },
];

const solutionPillars = [
  { icon: Unplug, title: 'Canal Externo e independente', description: 'Sem vínculo com a empresa, sem conflito de interesse.' },
  { icon: MousePointerClick, title: 'Sob demanda e confidencial', description: 'O colaborador aciona quando quiser, sem intermediários.' },
  { icon: BadgeCheck, title: 'Sem custo para o colaborador', description: 'Orientação inicial gratuita, sem burocracia.' },
];

const solutionThemes = [
  { icon: Wallet, label: 'Finanças' },
  { icon: Users, label: 'Família' },
  { icon: Home, label: 'Moradia' },
  { icon: ShoppingBag, label: 'Consumo' },
  { icon: HeartPulse, label: 'Saúde' },
];

const howItWorksSteps = [
  { title: 'O Colaborador entra em contato direto', description: 'Via WhatsApp ou aplicativo, de forma simples e confidencial.' },
  { title: 'Equipe treinada acolhe e organiza a demanda', description: 'Recebe orientação informativa em linguagem clara e acessível sobre direitos e caminhos possíveis.' },
  { title: 'Situação é encaminhada adequadamente', description: 'Quando necessário, é encaminhado a advogado, sem sobrecarregar a empresa.' },
];

const impactColumns = [
  { icon: ShieldCheck, title: 'Para o RH', points: ['Menos relatos delicados no dia a dia', 'Apoio à gestão de pessoas e mediação inicial', 'Foco nas demandas estratégicas', 'Fortalecimento do employer branding'] },
  { icon: Users, title: 'Para os Gestores', points: ['Deixam de mediar problemas pessoais', 'Menos desgaste emocional', 'Relação profissional preservada', 'Aderência à prevenção de riscos psicossociais (NR-1)'] },
  { icon: UserCheck, title: 'Para os Colaboradores', points: ['Orientação sem custo no atendimento inicial', 'Decisões importantes com mais clareza', 'Canal confidencial e sem julgamento', 'Conteúdos educativos preventivos'] },
  { icon: Building2, title: 'Para a Organização', points: ['Redução de passivos trabalhistas', 'Clima organizacional mais saudável', 'Conformidade com a Nova NR-01', 'Diferencial competitivo na atração de talentos'] },
];

const faqItems = [
  { q: 'Isso é assistência jurídica?', a: 'Não. A Juripass oferece orientação inicial de caráter informativo. Não inclui elaboração de peças processuais, análise de contratos complexos ou representação judicial. Quando necessário, o colaborador é encaminhado a um advogado habilitado.' },
  { q: 'A empresa assume algum risco?', a: 'Não. A Juripass opera de forma independente. A empresa não participa das conversas nem tem acesso ao conteúdo.' },
  { q: 'Como funciona a confidencialidade?', a: 'O conteúdo dos atendimentos não é compartilhado com a empresa. A empresa recebe apenas dados estatísticos agregados e anonimizados. Os dados pertencem ao colaborador, protegidos pela LGPD, com sigilo profissional e controles de segurança da informação.' },
  { q: 'O RH deixa de apoiar o colaborador?', a: 'Não. O RH continua com seu papel. A Juripass cuida do que não cabe ao RH — situações pessoais sensíveis que precisam de orientação especializada.' },
  { q: 'Os colaboradores realmente usam?', a: 'Sim. A adesão média é de 30% nos primeiros 3 meses. Quando o canal existe e é comunicado de forma adequada, os colaboradores utilizam.' },
];

export default function Avaliacao() {
  const { open: openLeadForm } = useLeadForm();
  const [showSlides, setShowSlides] = useState(false);
  const [showOnePager, setShowOnePager] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-4">
          <ScrollReveal>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Um resumo para compartilhar internamente
            </h1>
            <p className="text-lg text-muted-foreground mt-4">
              Criamos esta página para facilitar a avaliação com diretoria, jurídico e gestão de pessoas — sem necessidade de nova reunião.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* O problema — fluxo visual */}
      <section className="py-12 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                O RH não tem um problema jurídico.
                <br />
                <span className="text-primary">Tem um problema de encaminhamento.</span>
              </h2>
            </ScrollReveal>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 py-6">
              {problemSteps.map((step, i) => (
                <div key={step.label} className="flex flex-col md:flex-row items-center">
                  {i > 0 && (
                    <>
                      <ChevronDown className="block md:hidden text-muted-foreground/40 my-1" size={20} />
                      <ChevronRight className="hidden md:block text-muted-foreground/40 mx-2" size={20} />
                    </>
                  )}
                  <ScrollReveal delay={i * 0.15}>
                    <div
                      className={`flex flex-col items-center justify-center gap-3 px-4 py-4 rounded-2xl border w-[280px] md:w-[200px] h-[140px] md:h-[180px] mx-auto shadow-md transition-all duration-200 ${
                        step.highlight
                          ? 'bg-destructive/10 border-destructive/30 shadow-destructive/10'
                          : 'bg-card border-border hover:shadow-md'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.highlight ? 'bg-destructive/10 text-destructive' : 'bg-accent text-primary'
                        }`}
                      >
                        <step.icon size={20} />
                      </div>
                      <div className="text-center">
                        <p className={`font-semibold text-sm ${step.highlight ? 'text-destructive' : 'text-foreground'}`}>
                          {step.label}
                        </p>
                        <p className={`text-xs mt-1 ${step.highlight ? 'text-destructive/70' : 'text-muted-foreground'}`}>
                          {step.sublabel}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </div>

            <ScrollReveal>
              <div className="border-t border-border/50 max-w-lg mx-auto pt-8">
                <p className="text-muted-foreground leading-relaxed text-center">
                  Gestores tentam ajudar. O RH tenta orientar.
                  <br />
                  Mas nenhum deles deveria assumir esse papel.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* O que é a Juripass */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-10">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
                O que é a Juripass
              </h2>

              <div className="max-w-3xl mx-auto space-y-6 mt-6">
                <p className="text-lg text-muted-foreground text-center leading-relaxed">
                  Um canal externo de orientação jurídica que o colaborador acessa de forma autônoma. A empresa contrata e o colaborador usa quando precisar, com sigilo total.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {solutionThemes.map((theme) => (
                    <Badge key={theme.label} variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm font-medium">
                      <theme.icon className="h-3.5 w-3.5" />
                      {theme.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {solutionPillars.map((pillar, i) => (
                <ScrollReveal key={pillar.title} delay={i * 0.15}>
                  <div
                    className="bg-card border border-border rounded-2xl p-6 text-center space-y-4 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <pillar.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-12 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-10">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">Como funciona</h2>
            </ScrollReveal>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {howItWorksSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <ScrollReveal delay={index * 0.15} className="flex-1">
                    <div className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-2 h-full">
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </ScrollReveal>
                  {index < howItWorksSteps.length - 1 && (
                    <>
                      <ChevronRight className="hidden md:block h-8 w-8 text-primary/40 shrink-0" />
                      <ChevronDown className="md:hidden h-8 w-8 text-primary/40 self-center" />
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>

            <ScrollReveal>
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span>Primeiro retorno em até 1 dia útil</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-10">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">O impacto positivo</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {impactColumns.map((col, i) => (
                <ScrollReveal key={col.title} delay={i * 0.1}>
                  <div className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-4 h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shrink-0">
                        <col.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <h3 className="font-semibold text-xl text-foreground">{col.title}</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                      {col.points.map((point) => (
                        <span key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-3xl space-y-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">Perguntas frequentes</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* CTAs finais */}
      <section className="py-12 md:py-20">
        <ScrollReveal>
          <div className="container mx-auto px-4 max-w-3xl text-center space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Próximos passos</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="outline" onClick={() => setShowSlides(true)}>
                <Presentation className="h-5 w-5 mr-2" />
                Ver apresentação completa
              </Button>
              <Button size="lg" variant="outline" onClick={() => setShowOnePager(true)}>
                <FileText className="h-5 w-5 mr-2" />
                Baixar resumo em uma página
              </Button>
              <Button size="lg" onClick={openLeadForm}>
                <Calendar className="h-5 w-5 mr-2" />
                Agende uma conversa
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {showSlides && <SlidesPresentation onClose={() => setShowSlides(false)} />}
      {showOnePager && <OnePager onClose={() => setShowOnePager(false)} />}
    </>
  );
}
