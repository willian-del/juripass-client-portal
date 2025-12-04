import { Card } from '@/components/ui/card';
import { Check, X, ShoppingBag, Heart, Home, FileText, Shield } from 'lucide-react';

export function CoverageSection() {
  const covered = [
    {
      icon: ShoppingBag,
      title: 'Direito do Consumidor',
      items: ['Cobranças indevidas', 'Trocas e devoluções', 'Publicidade enganosa', 'Produtos defeituosos']
    },
    {
      icon: Heart,
      title: 'Família e Sucessões',
      items: ['Divórcio e separação', 'Guarda de filhos', 'Pensão alimentícia', 'Herança e inventário']
    },
    {
      icon: Home,
      title: 'Propriedade e Moradia',
      items: ['Despejo e locação', 'Problemas com vizinhança', 'Usucapião', 'Compra e venda']
    },
    {
      icon: Shield,
      title: 'Responsabilidade Civil',
      items: ['Acidentes', 'Danos morais', 'Indenizações', 'Reparação de danos']
    },
    {
      icon: FileText,
      title: 'Contratos',
      items: ['Análise de contratos', 'Descumprimento', 'Cláusulas abusivas', 'Rescisão']
    }
  ];

  const notCoveredCard = {
    title: 'O que NÃO cobrimos',
    items: ['Direito Trabalhista', 'Direito Criminal', 'Código de Ética']
  };

  return (
    <section id="cobertura" className="py-12 md:py-20 bg-background scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Áreas de Cobertura
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Apoio jurídico completo nas situações mais comuns do dia a dia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {covered.map((area, index) => (
            <Card
              key={index}
              className="group p-6 bg-card/80 backdrop-blur-sm border border-border/50 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <area.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{area.title}</h4>
                </div>
                <ul className="space-y-2">
                  {area.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
          
          {/* Not Covered Card */}
          <Card
            className="group p-6 bg-destructive/5 border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${covered.length * 0.05}s` }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <X className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-foreground">{notCoveredCard.title}</h4>
              </div>
              <ul className="space-y-2">
                {notCoveredCard.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
