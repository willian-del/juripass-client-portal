import { Card } from '@/components/ui/card';
import { Check, X, ShoppingBag, Heart, Home, FileText, Shield, Briefcase } from 'lucide-react';

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

  const notCovered = [
    {
      icon: Briefcase,
      title: 'Direito Trabalhista',
      description: 'Questões relacionadas a vínculo empregatício'
    },
    {
      icon: Shield,
      title: 'Direito Criminal',
      description: 'Processos criminais e defesas penais'
    }
  ];

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

        {/* Covered Areas */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
              <Check className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-foreground">O que cobrimos</h3>
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
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Not Covered Areas */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-destructive to-destructive/60 flex items-center justify-center shadow-lg">
              <X className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-foreground">O que não cobrimos</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {notCovered.map((area, index) => (
              <Card
                key={index}
                className="p-8 border-2 border-destructive/20 bg-destructive/5 backdrop-blur-sm hover:bg-destructive/10 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
                    <area.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-lg text-foreground">{area.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
