import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MidCTASection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-dark">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-2xl md:text-3xl font-semibold text-primary-foreground leading-relaxed">
            Se hoje essas situações chegam até você, vale uma conversa.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white text-primary hover:bg-white/90 font-semibold text-base px-8"
          >
            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de entender como a Juripass pode ajudar minha empresa."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              Conversar rapidamente
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
