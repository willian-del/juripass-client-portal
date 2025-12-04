import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';

export function BlogSection() {
  const articles = [
    {
      title: 'Absenteísmo Jurídico: O Problema Silencioso nas Empresas',
      excerpt: 'Entenda como problemas jurídicos não resolvidos impactam a produtividade da sua equipe.',
      category: 'Gestão de Pessoas',
      readTime: '5 min'
    },
    {
      title: 'Benefícios Corporativos: O Que Realmente Faz Diferença',
      excerpt: 'Descubra quais benefícios têm maior impacto na retenção de talentos.',
      category: 'RH',
      readTime: '4 min'
    },
    {
      title: 'Como Implementar um Programa de Acolhimento Jurídico',
      excerpt: 'Passo a passo para oferecer apoio jurídico como benefício corporativo.',
      category: 'Implementação',
      readTime: '6 min'
    }
  ];

  return (
    <section id="blog" className="py-12 md:py-20 bg-background scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Conteúdo para RH
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Insights e recursos para gestores de pessoas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {articles.map((article, index) => (
            <Card
              key={index}
              className="group overflow-hidden bg-card/80 backdrop-blur-sm border border-border/50 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-32 bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>

                <Button variant="ghost" size="sm" className="w-full justify-between p-0 h-auto hover:bg-transparent group-hover:text-primary">
                  <span className="text-sm font-medium">Ler artigo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" className="border-border hover:border-primary hover:bg-primary/5">
            Ver todos os artigos
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
