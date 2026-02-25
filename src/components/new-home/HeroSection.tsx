import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import heroImage from '@/assets/hero-rh-situation.jpg';

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              Alguns problemas pessoais dos colaboradores não são da empresa.{' '}
              <span className="text-primary">Mas acabam chegando até ela.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              A Juripass cria um canal externo e confidencial para orientar essas situações
              antes que se tornem demandas internas ao RH ou aos gestores.
            </p>
            <div className="space-y-2">
              <Button size="lg" className="gap-2" asChild>
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
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt="Gestor sendo abordado por colaborador preocupado em ambiente corporativo"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
