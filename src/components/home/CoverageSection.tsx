import { Card } from '@/components/ui/card';
import { Check, X, ShoppingBag, Heart, Home, FileText, Shield } from 'lucide-react';

export function CoverageSection() {
  const covered = [
    {
      icon: ShoppingBag,
      title: 'Direito do Consumidor',
      items: ['Cobranças indevidas', 'Trocas e devoluções', 'Publicidade enganosa', 'Produtos defeituosos'],
      gradient: 'from-primary to-primary/60'
    },
    {
      icon: Heart,
      title: 'Família e Sucessões',
      items: ['Divórcio e separação', 'Guarda de filhos', 'Pensão alimentícia', 'Herança e inventário'],
      gradient: 'from-accent to-accent/60'
    },
    {
      icon: Home,
      title: 'Propriedade e Moradia',
      items: ['Despejo e locação', 'Problemas com vizinhança', 'Usucapião', 'Compra e venda'],
      gradient: 'from-juripass-primary-light to-primary'
    },
    {
      icon: Shield,
      title: 'Responsabilidade Civil',
      items: ['Acidentes', 'Danos morais', 'Indenizações', 'Reparação de danos'],
      gradient: 'from-juripass-accent to-primary'
    },
    {
      icon: FileText,
      title: 'Contratos',
      items: ['Análise de contratos', 'Descumprimento', 'Cláusulas abusivas', 'Rescisão'],
      gradient: 'from-primary to-juripass-primary-dark'
    }
  ];

  const notCoveredCard = {
    icon: X,
    title: 'O que NÃO cobrimos',
    items: ['Direito Trabalhista', 'Direito Criminal'],
    gradient: 'from-destructive/20 to-destructive/10',
    isNotCovered: true
  };

  return (
    <section id="cobertura" className="py-20 md:py-32 bg-muted/30 scroll-mt-16 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Áreas de Cobertura
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Apoio jurídico completo nas situações mais comuns do dia a dia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {covered.map((area, index) => (
            <Card
              key={index}
              className="group p-8 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <area.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{area.title}</h4>
                </div>
                <ul className="space-y-3">
                  {area.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/70 font-medium">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
          
          {/* Not Covered Card */}
          <Card
            className="group p-8 border-2 border-destructive/30 bg-destructive/5 backdrop-blur-sm hover:bg-destructive/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fade-in"
            style={{ animationDelay: `${covered.length * 0.05}s` }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-destructive/30 to-destructive/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <X className="w-7 h-7 text-destructive" />
                </div>
                <h4 className="font-bold text-lg text-foreground">{notCoveredCard.title}</h4>
              </div>
              <ul className="space-y-3">
                {notCoveredCard.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-foreground/70 font-medium">
                    <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
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
