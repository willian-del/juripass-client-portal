import { Calendar, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/constants';

export function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      {/* Top separator */}
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto mb-12">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="text-2xl md:text-3xl font-bold text-foreground leading-relaxed">
            A decisão não é contratar um benefício.
            <br />
            É definir se essas situações continuarão sendo tratadas internamente
            — ou terão um encaminhamento estruturado.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="font-semibold text-base px-8 shadow-primary">
              <a
                href="https://calendar.app.google/nrQvcnKBc4Fu3FzJA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="h-5 w-5" />
                Agende uma conversa
              </a>
            </Button>

            <Button size="lg" variant="outline" asChild className="font-semibold text-base px-8">
              <Link to="/avaliacao">
                <Share2 className="h-5 w-5" />
                Compartilhar internamente
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
