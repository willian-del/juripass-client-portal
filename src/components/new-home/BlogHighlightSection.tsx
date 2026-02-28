import { Link } from 'react-router-dom';
import { blogArticles } from '@/lib/blog-data';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BlogHighlightSection() {
  const featured = blogArticles.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
            Blog
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Conteúdo para Profissionais de RH
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Artigos educativos sobre gestão de pessoas, compliance e saúde mental no trabalho.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-1 bg-gradient-to-r from-primary to-primary/60" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <Tag className="h-3 w-3" /> {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {article.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link to="/blog">
              Ver todos os artigos <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
