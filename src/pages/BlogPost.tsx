import { useParams, Link, Navigate } from 'react-router-dom';
import { getArticleBySlug, blogArticles } from '@/lib/blog-data';
import { SEOHead, organizationJsonLd } from '@/components/ui/SEOHead';
import { ArrowLeft, Clock, Tag, Calendar, ArrowRight, Scale, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center">
            <h3 className="text-xl font-bold text-foreground mb-3">
              Quer entender como a Juripass pode ajudar sua empresa?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Agende uma conversa rápida e descubra como um programa de acolhimento jurídico transforma indicadores de RH.
            </p>
            <Button size="lg" asChild>
              <a href="https://calendar.app.google/nrQvcnKBc4Fu3FzJA" target="_blank" rel="noopener noreferrer">
                Agende uma conversa
              </a>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
