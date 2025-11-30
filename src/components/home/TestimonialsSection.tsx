import { Card } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Ana Paula Silva',
      role: 'Gerente de RH',
      company: 'Empresa de Tecnologia',
      content: 'O Juripass trouxe tranquilidade para nossa equipe. Os colaboradores sabem que têm apoio jurídico quando precisam, sem burocracia.',
      rating: 5
    },
    {
      name: 'Roberto Almeida',
      role: 'Diretor de Pessoas',
      company: 'Indústria de Grande Porte',
      content: 'Notamos redução no absenteísmo e aumento na satisfação dos colaboradores. Um investimento que realmente vale a pena.',
      rating: 5
    },
    {
      name: 'Juliana Costa',
      role: 'Head de Benefícios',
      company: 'Empresa de Serviços',
      content: 'A facilidade de implementação e o atendimento humanizado fazem toda a diferença. Nossos colaboradores adoram o benefício.',
      rating: 5
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            O que Dizem Nossos Clientes
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Empresas que confiam no Juripass para cuidar de seus colaboradores
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Quote className="w-8 h-8 text-primary/20" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="pt-4 border-t border-border">
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{testimonial.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-muted/30">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <p className="text-4xl font-bold text-primary">95%</p>
                <p className="text-sm text-muted-foreground">Taxa de Satisfação</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-accent">48h</p>
                <p className="text-sm text-muted-foreground">Tempo de Implementação</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-primary">100+</p>
                <p className="text-sm text-muted-foreground">Empresas Atendidas</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
