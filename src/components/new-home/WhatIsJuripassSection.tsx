import { Check } from 'lucide-react';

const clarifications = [
  'A empresa não participa da conversa',
  'A empresa não recebe conteúdo',
  'Não substitui o RH',
  'Não é assessoria jurídica corporativa',
];

export function WhatIsJuripassSection() {
  return (
    <section className="py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            O que é a Juripass
          </h2>

          <p className="text-lg text-muted-foreground text-center leading-relaxed">
            A Juripass é um canal externo e confidencial onde o colaborador pode entender
            o que fazer diante de uma situação pessoal sensível.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {clarifications.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-dark rounded-2xl p-8 text-center">
            <p className="text-lg md:text-xl font-semibold text-primary-foreground leading-relaxed">
              "A Juripass não cria demanda.
              <br />
              Ela organiza uma demanda que já existe."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
