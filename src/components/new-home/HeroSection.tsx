import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLeadForm } from '@/contexts/LeadFormContext';

export function HeroSection() {
  const { open: openLeadForm } = useLeadForm();
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative py-16 md:py-28 overflow-hidden">
      {/* Decorative radial gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/40 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 id="hero-title" className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-foreground">
            Plataforma de prevenção e monitoramento{' '}
            <span className="text-primary">de riscos humanos</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[680px] mx-auto">
            A Juripass é uma plataforma de prevenção e monitoramento de riscos humanos para o RH. Estruturamos um canal jurídico externo e confidencial para acolher questões pessoais sensíveis dos colaboradores — antes que evoluam para conflitos internos ou impactem o clima e a produtividade.
          </p>
          <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed max-w-[640px] mx-auto">
            Os atendimentos geram indicadores agregados que ajudam o RH a identificar padrões de vulnerabilidade e antecipar fatores de risco psicossocial na organização.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <Button size="lg" className="gap-2 text-base px-8 shadow-primary" onClick={openLeadForm}>
              <Calendar className="h-5 w-5" />
              Agende uma conversa
            </Button>
            <Button variant="ghost" asChild className="gap-1 text-base text-primary hover:bg-primary/5">
              <Link to="/como-funciona">
                Saiba como funciona
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            15 minutos para entender se faz sentido para sua empresa.
          </p>
        </div>
      </div>
    </section>);

}