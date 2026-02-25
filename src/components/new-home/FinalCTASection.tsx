import { MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function FinalCTASection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-2xl md:text-3xl font-bold text-foreground leading-relaxed">
            A decisão não é contratar um benefício.
            <br />
            É definir se essas situações continuarão sendo tratadas internamente
            — ou terão um encaminhamento estruturado.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="font-semibold text-base px-8">
              <a
                href="https://wa.me/5511999999999?text=Olá! Gostaria de entender como a Juripass pode ajudar minha empresa."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Conversar rapidamente
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
