import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';

export function BlogSection() {
  const articles = [
    {
      title: 'Absenteísmo Jurídico: O Problema Silencioso nas Empresas',
      excerpt: 'Entenda como problemas jurídicos não resolvidos impactam a produtividade da sua equipe e o que fazer a respeito.',
      category: 'Gestão de Pessoas',
      readTime: '5 min',
      image: 'from-primary/20 to-primary/5'
    },
    {
      title: 'Benefícios Corporativos: O Que Realmente Faz Diferença',
      excerpt: 'Descubra quais benefícios têm maior impacto na retenção de talentos e satisfação dos colaboradores.',
      category: 'RH',
      readTime: '4 min',
      image: 'from-accent/20 to-accent/5'
    },
    {
      title: 'Como Implementar um Programa de Acolhimento Jurídico',
      excerpt: 'Passo a passo para oferecer apoio jurídico como benefício corporativo na sua empresa.',
      category: 'Implementação',
      readTime: '6 min',
      image: 'from-secondary/20 to-secondary/5'
    }
  ];

  return (
    <section id="blog" className="py-16 md:py-24 bg-muted/30 scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Conteúdo para RH
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Insights e recursos para gestores de pessoas que querem o melhor para suas equipes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((article, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`h-48 bg-gradient-to-br ${article.image} flex items-center justify-center`}>
                <BookOpen className="w-16 h-16 text-primary/40" />
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/5">
                  Ler artigo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Ver todos os artigos
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
