import { MessageCircle, Lightbulb, ArrowUpRight } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Colaborador entra em contato direto',
    description: 'Via WhatsApp, de forma simples e confidencial.',
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Recebe orientação inicial clara',
    description: 'Entende o que está acontecendo e quais caminhos existem.',
  },
  {
    icon: ArrowUpRight,
    number: '03',
    title: 'Situação é encaminhada adequadamente',
    description: 'Com direcionamento profissional, sem sobrecarregar a empresa.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            Como funciona
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative p-6 rounded-xl bg-card border border-border hover:-translate-y-1 transition-transform space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-3xl font-bold text-primary/20">{step.number}</span>
                </div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
