import { ArrowRight } from 'lucide-react';

const steps = [
  { label: 'Colaborador', sublabel: 'com problema pessoal' },
  { label: 'Gestor', sublabel: 'tenta ajudar' },
  { label: 'RH', sublabel: 'tenta orientar' },
  { label: 'Desgaste', sublabel: 'para todos', highlight: true },
];

export function OrganizationalProblemSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            O RH não tem um problema jurídico.
            <br />
            <span className="text-primary">Tem um problema de encaminhamento.</span>
          </h2>

          {/* Flow visual */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 py-6">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 md:gap-4">
                <div
                  className={`px-5 py-4 rounded-xl border text-center min-w-[120px] ${
                    step.highlight
                      ? 'bg-destructive/10 border-destructive/30'
                      : 'bg-card border-border'
                  }`}
                >
                  <p className={`font-semibold text-sm ${step.highlight ? 'text-destructive' : 'text-foreground'}`}>
                    {step.label}
                  </p>
                  <p className={`text-xs mt-1 ${step.highlight ? 'text-destructive/70' : 'text-muted-foreground'}`}>
                    {step.sublabel}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Gestores tentam ajudar. O RH tenta orientar.
            <br />
            Mas nenhum deles deveria assumir esse papel.
          </p>
        </div>
      </div>
    </section>
  );
}
