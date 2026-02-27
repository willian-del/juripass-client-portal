import { ShieldCheck } from 'lucide-react';

export function WhatIsJuripassSection() {
  return (
    <section className="py-16 md:py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            O que é a Juripass
          </h2>

          <p className="text-lg text-muted-foreground text-center leading-relaxed">
            A Juripass é uma plataforma de acolhimento, organização de demandas e
            facilitação de acesso a profissionais habilitados, que permite aos
            colaboradores obterem orientação informativa sobre direitos e caminhos
            legais possíveis em situações do dia a dia.
          </p>

          <div className="bg-gradient-dark rounded-2xl p-10 text-center space-y-4">
            <p className="text-xl md:text-2xl font-semibold text-primary-foreground leading-relaxed italic">
              "A Juripass não cria demanda.
              <br />
              Ela organiza uma demanda que já existe."
            </p>
            <div className="flex items-center justify-center gap-2 text-primary-foreground/60 text-sm">
              <ShieldCheck className="h-4 w-4" />
              <span>Sigilo profissional e controles de segurança da informação</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
