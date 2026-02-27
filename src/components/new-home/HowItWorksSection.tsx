import { MessageCircle, Lightbulb, ArrowUpRight, Clock } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Colaborador entra em contato direto',
    description: 'Via WhatsApp ou aplicativo, de forma simples e confidencial.',
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Equipe treinada acolhe e organiza a demanda',
    description: 'Recebe orientação informativa em linguagem clara e acessível sobre direitos e caminhos possíveis.',
  },
  {
    icon: ArrowUpRight,
    number: '03',
    title: 'Situação é encaminhada adequadamente',
    description: 'Quando necessário, é encaminhado a advogado habilitado, sem sobrecarregar a empresa.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            Como funciona
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{step.number}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>Primeiro retorno em até 1 dia útil</span>
          </div>
        </div>
      </div>
    </section>
  );
}
