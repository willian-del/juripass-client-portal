import { ChevronRight, ChevronDown, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

const steps = [
  {
    title: 'Colaborador entra em contato direto',
    description: 'Via WhatsApp ou aplicativo, de forma simples e confidencial.',
  },
  {
    title: 'Equipe treinada acolhe e organiza a demanda',
    description: 'Recebe orientação informativa em linguagem clara e acessível sobre direitos e caminhos possíveis.',
  },
  {
    title: 'Situação é encaminhada adequadamente',
    description: 'Quando necessário, é encaminhado a advogado habilitado, sem sobrecarregar a empresa.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            Como funciona
          </h2>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex-1 p-6 rounded-2xl bg-card border border-border shadow-md space-y-2">
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <>
                    <ChevronRight className="hidden md:block h-8 w-8 text-primary/40 shrink-0" />
                    <ChevronDown className="md:hidden h-8 w-8 text-primary/40 self-center" />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span>Primeiro retorno em até 1 dia útil</span>
            </div>
            <Link to="/como-funciona" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              Ver fluxo completo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
