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
      gradient: 'from-primary/90 via-primary/70 to-primary/50'
    },
    {
      title: 'Benefícios Corporativos: O Que Realmente Faz Diferença',
      excerpt: 'Descubra quais benefícios têm maior impacto na retenção de talentos e satisfação dos colaboradores.',
      category: 'RH',
      readTime: '4 min',
      gradient: 'from-accent/90 via-accent/70 to-accent/50'
    },
    {
      title: 'Como Implementar um Programa de Acolhimento Jurídico',
      excerpt: 'Passo a passo para oferecer apoio jurídico como benefício corporativo na sua empresa.',
      category: 'Implementação',
      readTime: '6 min',
      gradient: 'from-juripass-primary-light/90 via-primary/70 to-juripass-primary-dark/50'
    }
  ];

  return (
    <section id="blog" className="py-20 md:py-32 bg-background scroll-mt-16 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Conteúdo para RH
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Insights e recursos para gestores de pessoas que querem o melhor para suas equipes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((article, index) => (
            <Card
              key={index}
              className="group overflow-hidden bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`relative h-56 bg-gradient-to-br ${article.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full blur-2xl" />
                </div>
                <BookOpen className="w-20 h-20 text-white/80 group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-medium">{article.readTime}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/5 group-hover:text-primary transition-all">
                  <span className="font-semibold">Ler artigo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="px-8 py-6 text-base border-2 hover:border-primary hover:bg-primary/5">
            Ver todos os artigos
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
