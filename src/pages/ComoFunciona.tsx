import { Calendar, Lightbulb, ArrowUpRight, CheckCircle2, Building2, MessageSquare, Users, Clock, FileCheck, MessageCircle } from 'lucide-react';
import { SEOHead } from '@/components/ui/SEOHead';
import { BRAND } from '@/lib/constants';

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

const implantationSteps = [
  { icon: MessageSquare, title: 'Reunião de kick-off', description: 'Alinhamento inicial com o time de RH para entender o contexto da empresa.' },
  { icon: FileCheck, title: 'Material de comunicação interna', description: 'Fornecemos todo o material necessário para apresentar o benefício aos colaboradores.' },
  { icon: Users, title: 'Apoio ao RH e treinamento', description: 'Treinamento da equipe e suporte contínuo para garantir engajamento.' },
  { icon: CheckCircle2, title: 'Acompanhamento de engajamento', description: 'Monitoramento contínuo de adesão e relatórios agregados.' },
];

const ComoFunciona = () => {
  return (
    <>
      <SEOHead
        title="Como Funciona a Juripass — Acolhimento Jurídico Corporativo"
        description="Entenda como o programa de acolhimento jurídico funciona: canal confidencial via WhatsApp, equipe treinada e encaminhamento especializado para colaboradores."
      />
      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Como a Juripass funciona
            </h1>
            <p className="text-lg text-muted-foreground">
              Um canal simples, externo e confidencial. Sem burocracia para a empresa, sem exposição para o colaborador.
            </p>
          </div>
        </div>
      </section>

      {/* 3 passos expandidos */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="p-6 md:p-8 rounded-xl bg-card border border-border space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shrink-0">
                    <step.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-primary/40">Passo {step.number}</span>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">{step.title}</h2>
                  </div>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
                <ul className="space-y-2 pl-1">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span>Prazo estimado de primeiro retorno: até 1 dia útil</span>
            </div>
          </div>
        </div>
      </section>

      {/* Implantação */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Implantação simples e rápida
              </h2>
              <p className="text-muted-foreground">
                Prazo médio de ativação: até 15 dias após assinatura. <strong className="text-foreground">Sem taxa de implantação.</strong>
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {implantationSteps.map((item) => (
                <div key={item.title} className="p-6 rounded-xl bg-card border border-border space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/90 to-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              Quer entender como isso funcionaria na sua empresa?
            </h2>
            <a
              href="https://calendar.app.google/nrQvcnKBc4Fu3FzJA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-background text-foreground font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              <Calendar className="h-5 w-5" />
              Agende uma conversa
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComoFunciona;
