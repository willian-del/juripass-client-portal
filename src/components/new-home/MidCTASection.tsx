import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BRAND } from '@/lib/constants';

export function MidCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-dark relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-2xl mx-auto space-y-8">
          <p className="text-2xl md:text-3xl font-semibold text-primary-foreground leading-relaxed">
            Se hoje essas situações chegam até você, vale uma conversa.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white text-primary hover:bg-white/90 font-semibold text-base px-8 shadow-lg"
          >
            <a
              href="https://calendar.app.google/nrQvcnKBc4Fu3FzJA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calendar className="h-5 w-5" />
              Agende uma conversa
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
