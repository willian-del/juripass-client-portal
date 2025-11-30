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
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            O que Dizem Nossos Clientes
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Empresas que confiam no Juripass para cuidar de seus colaboradores
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group p-10 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <Quote className="w-12 h-12 text-primary/20 group-hover:text-primary/30 transition-colors" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-juripass-gold text-juripass-gold" />
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed italic text-base">
                  "{testimonial.content}"
                </p>

                <div className="pt-6 border-t border-border">
                  <p className="font-bold text-lg text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground font-medium mt-1">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{testimonial.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 max-w-5xl mx-auto">
          <Card className="p-10 md:p-12 bg-white/80 backdrop-blur-sm border-primary/20 shadow-xl">
            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div className="space-y-3">
                <p className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">95%</p>
                <p className="text-base text-muted-foreground font-medium">Taxa de Satisfação</p>
              </div>
              <div className="space-y-3">
                <p className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent">48h</p>
                <p className="text-base text-muted-foreground font-medium">Tempo de Implementação</p>
              </div>
              <div className="space-y-3">
                <p className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary to-juripass-primary-dark bg-clip-text text-transparent">100+</p>
                <p className="text-base text-muted-foreground font-medium">Empresas Atendidas</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
