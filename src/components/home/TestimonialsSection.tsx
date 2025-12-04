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

  const stats = [
    { value: '95%', label: 'Satisfação' },
    { value: '48h', label: 'Implementação' },
    { value: '100+', label: 'Empresas' }
  ];

  return (
    <section className="py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que Dizem Nossos Clientes
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Empresas que confiam no Juripass para cuidar de seus colaboradores
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-10">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group p-6 bg-card/80 backdrop-blur-sm border border-border/50 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Quote className="w-8 h-8 text-primary/30" />
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-juripass-gold text-juripass-gold" />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="pt-4 border-t border-border">
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role} • {testimonial.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Compact Stats */}
        <div className="flex justify-center gap-8 md:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
