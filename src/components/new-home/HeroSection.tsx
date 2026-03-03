import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { openScheduling } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      {/* Decorative radial gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/40 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-foreground">
            Plataforma de Suporte Jurídico{' '}
            <span className="text-primary">para Gestão de Pessoas</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            A Juripass é uma plataforma de gestão preventiva para o RH que estrutura, como política
            corporativa, um canal jurídico externo e confidencial para acolher questões pessoais sensíveis
            dos colaboradores — antes que impactem o clima, a produtividade ou evoluam para conflitos internos.
          </p>
          <div className="space-y-3 pt-4">
            <Button size="lg" className="gap-2 text-base px-8 shadow-primary" onClick={openScheduling}>
                <Calendar className="h-5 w-5" />
                Agende uma conversa
            </Button>
            <p className="text-sm text-muted-foreground">
              15 minutos para entender se faz sentido para sua empresa.
            </p>
          </div>
        </div>
      </div>
    </section>);

}