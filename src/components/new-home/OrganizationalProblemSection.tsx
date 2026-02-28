import { User, Users, Building2, AlertTriangle, ChevronRight, ChevronDown } from 'lucide-react';

const steps = [
  { label: 'Colaborador', sublabel: 'com problema pessoal', icon: User, highlight: false },
  { label: 'Gestor', sublabel: 'Gestores atuam como conselheiros informais', icon: Users, highlight: false },
  { label: 'RH', sublabel: 'O RH recebe relatos delicados fora do seu escopo', icon: Building2, highlight: false },
  { label: 'Desgaste', sublabel: 'Questões externas passam a impactar clima e operação', icon: AlertTriangle, highlight: true },
];

export function OrganizationalProblemSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            O RH não tem um problema jurídico.
            <br />
            <span className="text-primary">Tem um problema de encaminhamento.</span>
          </h2>

          {/* Flow visual */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0 py-6">
            {steps.map((step, i) => (
              <div key={step.label} className="flex flex-col md:flex-row items-center">
                {/* Chevron separator */}
                {i > 0 && (
                  <>
                    <ChevronDown className="block md:hidden text-muted-foreground/40 my-1" size={20} />
                    <ChevronRight className="hidden md:block text-muted-foreground/40 mx-2" size={20} />
                  </>
                )}

                {/* Card */}
                <div
                  className={`flex flex-col items-center justify-center gap-3 px-5 py-5 rounded-2xl border w-[220px] md:w-[200px] h-auto min-h-[160px] shadow-sm transition-all duration-200 ${
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
              </div>
            ))}
          </div>

          {/* Consequências */}
          <div className="max-w-lg mx-auto space-y-4 text-left">
            {[
              'Gestores atuam como conselheiros informais',
              'O RH recebe relatos delicados fora do seu escopo',
              'Questões externas passam a impactar clima e operação',
            ].map((text) => (
              <div
                key={text}
                className="flex items-center gap-4 px-5 py-4 rounded-xl bg-destructive/5 border border-destructive/15"
              >
                <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="text-destructive" size={16} />
                </div>
                <p className="text-base text-foreground/80 font-medium">{text}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 max-w-lg mx-auto pt-8">
            <p className="text-muted-foreground leading-relaxed text-center">
              Gestores tentam ajudar. O RH tenta orientar.
              <br />
              <span className="text-primary font-medium">Mas nenhum deles deveria assumir esse papel.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
