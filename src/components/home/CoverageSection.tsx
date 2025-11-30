import { Card } from '@/components/ui/card';
import { Check, X, ShoppingBag, Heart, Home, FileText, Shield, Briefcase } from 'lucide-react';

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
    <section id="cobertura" className="py-16 md:py-24 bg-background scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Áreas de Cobertura
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Apoio jurídico completo nas situações mais comuns do dia a dia
          </p>
        </div>

        {/* Covered Areas */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">O que cobrimos</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {covered.map((area, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <area.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground">{area.title}</h4>
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
          </div>
        </div>

        {/* Not Covered Areas */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <X className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">O que não cobrimos</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {notCovered.map((area, index) => (
              <Card
                key={index}
                className="p-6 border-destructive/20 bg-destructive/5 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <area.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-foreground">{area.title}</h4>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
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
