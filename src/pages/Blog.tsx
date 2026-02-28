import { Link } from 'react-router-dom';
import { blogArticles } from '@/lib/blog-data';
import { SEOHead, organizationJsonLd } from '@/components/ui/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Clock, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  return (
    <>
      <SEOHead
        title="Conteúdo para RH | Juripass — Artigos sobre Gestão de Pessoas e NR-01"
        description="Artigos educativos sobre gestão de pessoas, riscos psicossociais, Nova NR-01, benefícios corporativos e saúde mental no trabalho. Conteúdo para profissionais de RH."
        jsonLd={[organizationJsonLd]}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
            Blog
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 max-w-3xl mx-auto leading-tight">
            Conteúdo Educativo para Profissionais de RH
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Artigos sobre gestão de pessoas, compliance trabalhista, saúde mental no trabalho e o papel do acolhimento jurídico na estratégia de RH.
          </p>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article, i) => (
              <ScrollReveal key={article.slug}>
                <Link
                  to={`/blog/${article.slug}`}
                  className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  {/* Color accent bar */}
                  <div className="h-1.5 bg-gradient-to-r from-primary to-primary/60" />

                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        <Tag className="h-3 w-3" />
                        {article.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                      {article.description}
                    </p>

                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      Ler artigo <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
