import { HomeHeader } from '@/components/home/HomeHeader';
import { Footer } from '@/components/ui/Footer';
import { MessageCircle, Lightbulb, ArrowUpRight, CheckCircle2, Building2, MessageSquare } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Colaborador entra em contato direto',
    description: 'O primeiro passo é simples: o colaborador manda uma mensagem.',
    details: [
      'Via WhatsApp, sem precisar passar pelo RH',
      'Canal disponível em horário estendido',
      'Sem cadastro, sem app, sem complicação',
    ],
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Recebe orientação inicial clara',
    description: 'Um profissional analisa a situação e orienta com clareza.',
    details: [
      'Entende o que está acontecendo na sua situação',
      'Recebe informações sobre caminhos possíveis',
      'Sabe o que pode e o que não pode fazer',
    ],
  },
  {
    icon: ArrowUpRight,
    number: '03',
    title: 'Situação é encaminhada adequadamente',
    description: 'Se necessário, o colaborador é direcionado ao profissional certo.',
    details: [
      'Se necessário, é direcionado a um profissional especializado',
      'A empresa não participa e não recebe informações',
      'O colaborador segue com autonomia',
    ],
  },
];

const companySteps = [
  {
    icon: MessageSquare,
    text: 'Comunicar o benefício aos colaboradores',
  },
  {
    icon: CheckCircle2,
    text: 'Nenhuma integração técnica necessária',
  },
  {
    icon: Building2,
    text: 'Nenhum envolvimento do RH nas conversas',
  },
];

const ComoFunciona = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main>
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
                <div
                  key={step.number}
                  className="p-6 md:p-8 rounded-xl bg-card/80 backdrop-blur-sm border border-border space-y-4"
                >
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
            </div>
          </div>
        </section>

        {/* O que a empresa precisa fazer */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
                O que a empresa precisa fazer
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {companySteps.map((item) => (
                  <div
                    key={item.text}
                    className="p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto">
                      <item.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <p className="font-medium text-foreground">{item.text}</p>
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
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-background text-foreground font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="h-5 w-5" />
                Conversar rapidamente
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ComoFunciona;
