const steps = [
  { label: 'Colaborador', sublabel: 'com problema pessoal' },
  { label: 'Gestor', sublabel: 'tenta ajudar' },
  { label: 'RH', sublabel: 'tenta orientar' },
  { label: 'Desgaste', sublabel: 'para todos', highlight: true },
];

export function OrganizationalProblemSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            O RH não tem um problema jurídico.
            <br />
            <span className="text-primary">Tem um problema de encaminhamento.</span>
          </h2>

          {/* Flow visual with connector line */}
          <div className="relative flex flex-wrap items-center justify-center gap-3 md:gap-0 py-6">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-px bg-border -translate-y-1/2 z-0" />

            {steps.map((step, i) => (
              <div key={step.label} className="relative z-10 flex items-center">
                {i > 0 && <div className="hidden md:block w-8" />}
                <div
                  className={`px-6 py-5 rounded-2xl border text-center min-w-[130px] shadow-sm transition-all duration-200 ${
                    step.highlight
                      ? 'bg-destructive/10 border-destructive/30 shadow-destructive/10'
                      : 'bg-card border-border hover:shadow-md'
                  }`}
                >
                  <p className={`font-semibold text-sm ${step.highlight ? 'text-destructive' : 'text-foreground'}`}>
                    {step.label}
                  </p>
                  <p className={`text-xs mt-1 ${step.highlight ? 'text-destructive/70' : 'text-muted-foreground'}`}>
                    {step.sublabel}
                  </p>
                </div>
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
