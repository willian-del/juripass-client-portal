import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-foreground">
            Alguns problemas pessoais dos colaboradores não são da empresa.{' '}
            <span className="text-primary">Mas acabam chegando até ela.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            A Juripass cria um canal externo e confidencial para orientar essas situações
            antes que se tornem demandas internas ao RH ou aos gestores.
          </p>
          <div className="space-y-3 pt-4">
            <Button size="lg" className="gap-2 text-base px-8 py-6" asChild>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Conversar rapidamente
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">
              15 minutos para entender se faz sentido para sua empresa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
