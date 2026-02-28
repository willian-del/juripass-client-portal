import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { openScheduling } from '@/lib/constants';
import { SlidesPresentation } from '@/components/avaliacao/SlidesPresentation';
import { OnePager } from '@/components/avaliacao/OnePager';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Calendar,
  Lightbulb,
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
  Users,
  UserCheck,
  Presentation,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
} from 'lucide-react';

const faqItems = [
  { q: 'A empresa assume algum risco ao oferecer a Juripass?', a: 'Não. A Juripass opera como canal externo e independente. A empresa não participa das conversas e não recebe informações sobre os colaboradores.' },
  { q: 'O colaborador pode processar a empresa por causa da Juripass?', a: 'Não. O canal é externo e confidencial. A empresa oferece o benefício, mas não tem qualquer envolvimento no conteúdo das orientações.' },
  { q: 'Quanto custa?', a: 'Valor fixo mensal de aproximadamente R$5 mil, sem cobrança por colaborador ou por utilização. Sem surpresas.' },
  { q: 'Como é feita a implementação?', a: 'Simples: a empresa comunica o benefício aos colaboradores e a Juripass cuida do resto. Sem integração técnica, sem burocracia.' },
  { q: 'Os colaboradores realmente usam?', a: 'Sim. A adesão média é de 30% nos primeiros 3 meses. O canal via WhatsApp elimina barreiras de acesso.' },
];

export default function Avaliacao() {
  const [showSlides, setShowSlides] = useState(false);
  const [showOnePager, setShowOnePager] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Um resumo para compartilhar internamente
          </h1>
          <p className="text-lg text-muted-foreground">
            Criamos esta página para facilitar a avaliação com diretoria, financeiro e jurídico — sem necessidade de nova reunião.
          </p>
        </div>
      </section>

      {/* O problema */}
      <section className="py-12 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="p-6 md:p-8 rounded-xl bg-card border border-border space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-destructive/80 to-destructive/60 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">O que acontece hoje</h2>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />Colaboradores trazem situações pessoais delicadas para o RH e gestores</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />O RH vira conselheiro informal sem preparo ou respaldo</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />Gestores mediam conflitos pessoais consumindo tempo estratégico</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />A empresa se expõe a riscos ao se envolver informalmente</li>
            </ul>
          </div>
        </div>
      </section>

      {/* A solução */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="p-6 md:p-8 rounded-xl bg-card border border-border space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">O que a Juripass faz</h2>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Canal externo e confidencial via WhatsApp</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Orientação inicial sobre a situação do colaborador</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Encaminhamento a profissional especializado quando necessário</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Empresa não participa e não recebe informações</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-12 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">Como funciona</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: MessageCircle, number: '01', title: 'Colaborador entra em contato direto', desc: 'Via WhatsApp, de forma simples e confidencial.' },
              { icon: Lightbulb, number: '02', title: 'Recebe orientação inicial clara', desc: 'Entende o que está acontecendo e quais caminhos existem.' },
              { icon: ArrowUpRight, number: '03', title: 'Situação é encaminhada adequadamente', desc: 'Com direcionamento profissional, sem sobrecarregar a empresa.' },
            ].map((step) => (
              <div key={step.number} className="p-6 rounded-xl bg-card border border-border hover:-translate-y-1 transition-transform space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-3xl font-bold text-primary/20">{step.number}</span>
                </div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">O impacto na organização</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: 'Para o RH', points: ['Menos relatos delicados no dia a dia', 'Menos aconselhamento informal', 'Foco nas demandas estratégicas'] },
              { icon: Users, title: 'Para gestores', points: ['Deixam de mediar problemas pessoais', 'Menos desgaste emocional', 'Relação profissional preservada'] },
              { icon: UserCheck, title: 'Para colaboradores', points: ['Alguém acessível para orientar', 'Decisões importantes com mais clareza', 'Canal confidencial e sem julgamento'] },
            ].map((col) => (
              <div key={col.title} className="p-6 rounded-xl bg-card border border-border hover:-translate-y-1 transition-transform space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <col.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">{col.title}</h3>
                <ul className="space-y-2">
                  {col.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ resumido */}
      <section className="py-12 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-3xl space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">Perguntas frequentes</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl bg-card border border-border px-6">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Piloto */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="p-6 md:p-8 rounded-xl bg-card border border-border space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Piloto de 90 dias</h2>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Duração de 90 dias para validação</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Sem compromisso de continuidade</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Implementação em até 2 semanas</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />Relatório de utilização ao final do período</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Investimento */}
      <section className="py-12 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="p-6 md:p-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 space-y-3 text-center">
            <DollarSign className="h-10 w-10 text-primary mx-auto" />
            <h2 className="text-2xl font-bold text-foreground">Investimento</h2>
            <p className="text-lg text-foreground">
              Para o porte da sua empresa: aproximadamente <strong>R$5 mil mensais</strong>
            </p>
            <p className="text-muted-foreground">
              Valor fixo, sem cobrança por colaborador ou utilização.
            </p>
          </div>
        </div>
      </section>

      {/* CTAs finais */}
      <section className="py-12 md:py-20">
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
            <Button size="lg" asChild>
              <a href={BRAND.calendarUrl} target="_blank" rel="noopener noreferrer">
                <Calendar className="h-5 w-5 mr-2" />
                Agende uma conversa
              </a>
            </Button>
          </div>
        </div>
      </section>

      {showSlides && <SlidesPresentation onClose={() => setShowSlides(false)} />}
      {showOnePager && <OnePager onClose={() => setShowOnePager(false)} />}
    </>
  );
}
