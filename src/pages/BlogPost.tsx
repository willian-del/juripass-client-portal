import { useParams, Link, Navigate } from 'react-router-dom';
import { getArticleBySlug, blogArticles } from '@/lib/blog-data';
import { SEOHead, organizationJsonLd } from '@/components/ui/SEOHead';
import { ArrowLeft, Clock, Tag, Calendar, ArrowRight, Scale, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BRAND, openScheduling } from '@/lib/constants';

const BASE_URL = 'https://juripass-client-portal.lovable.app';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) return <Navigate to="/blog" replace />;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: { '@type': 'Organization', name: 'Juripass' },
    publisher: { '@type': 'Organization', name: 'Juripass', logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/branding/juripass-logo-full.png` } },
    mainEntityOfPage: `${BASE_URL}/blog/${article.slug}`,
    keywords: 'acolhimento jurídico, gestão de RH, riscos psicossociais, NR-01, saúde mental no trabalho',
  };

  return (
    <>
      <SEOHead
        title={`${article.title} — Juripass`}
        description={article.description}
        jsonLd={[articleJsonLd, organizationJsonLd]}
      />

      <article className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back link */}
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Voltar ao blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Tag className="h-3 w-3" /> {article.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {article.readTime}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" /> {new Date(article.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-10 leading-tight">
            {article.title}
          </h1>

          {/* Sections */}
          <div className="space-y-10">
            {article.sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed text-base">{section.content}</p>
              </section>
            ))}
          </div>

          {/* Leia também */}
          {(() => {
            const relatedArticles = (article.relatedSlugs || [])
              .map(s => blogArticles.find(a => a.slug === s))
              .filter((a): a is NonNullable<typeof a> => !!a)
              .slice(0, 3);

            return relatedArticles.length > 0 ? (
              <div className="mt-16">
                <h3 className="text-xl font-bold text-foreground mb-6">Leia também</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {relatedArticles.map(related => (
                    <Link key={related.slug} to={`/blog/${related.slug}`} className="group p-5 rounded-xl bg-muted/30 border border-border hover:border-primary/40 transition-colors">
                      <span className="text-xs text-primary font-medium">{related.category}</span>
                      <h4 className="font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors text-sm leading-snug">{related.title}</h4>
                      <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                        Ler artigo <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null;
          })()}

          {/* Páginas relacionadas */}
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <Link to="/nr-01" className="group flex items-center gap-4 p-5 rounded-xl bg-muted/30 border border-border hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">Nova NR-01 e Riscos Psicossociais</h4>
                <p className="text-xs text-muted-foreground">Entenda as obrigações da nova norma</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
            </Link>
            <Link to="/para-quem" className="group flex items-center gap-4 p-5 rounded-xl bg-muted/30 border border-border hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">Para quem a Juripass faz sentido</h4>
                <p className="text-xs text-muted-foreground">Segmentos que mais se beneficiam</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
            </Link>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center">
            <h3 className="text-xl font-bold text-foreground mb-3">
              Quer entender como a Juripass pode ajudar sua empresa?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Agende uma conversa rápida e descubra como um programa de acolhimento jurídico transforma indicadores de RH.
            </p>
            <Button size="lg" onClick={openScheduling}>
              Agende uma conversa
            </Button>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
