import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  keywords?: string;
}

const BASE_URL = 'https://www.juripass.com.br';

export function SEOHead({ title, description, canonical, ogImage, jsonLd, noindex, keywords }: SEOHeadProps) {
  const { pathname } = useLocation();
  const url = canonical || `${BASE_URL}${pathname}`;
  const image = ogImage || `${BASE_URL}/images/branding/juripass-og-1200x630.png`;
  const defaultKeywords = 'plataforma suporte jurídico RH, gestão de riscos psicossociais, Nova NR-01, política corporativa preventiva, gestão de pessoas, suporte jurídico colaboradores, compliance NR-01, juripass';
  const finalKeywords = keywords || defaultKeywords;

  useEffect(() => {
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', finalKeywords);
    setMeta('name', 'author', 'Juripass');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'Juripass');
    setMeta('property', 'og:locale', 'pt_BR');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
    
    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    } else {
      setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);

    // JSON-LD
    const existingScripts = document.querySelectorAll('script[data-seo-jsonld]');
    existingScripts.forEach((s) => s.remove());

    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((item) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-jsonld', 'true');
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
      });
    }

    return () => {
      const scripts = document.querySelectorAll('script[data-seo-jsonld]');
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, url, image, jsonLd, noindex, finalKeywords]);

  return null;
}

// Reusable JSON-LD schemas
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Juripass',
  url: BASE_URL,
  logo: `${BASE_URL}/images/branding/juripass-logo-full.png`,
  description: 'Plataforma de suporte jurídico para gestão de pessoas. Solução preventiva e estruturada como política corporativa, em conformidade com a Nova NR-01 para gestão de riscos psicossociais.',
  sameAs: [],
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Juripass',
  url: BASE_URL,
  description: 'Plataforma de gestão de suporte jurídico para RH. Solução preventiva alinhada à Nova NR-01 para gestão de riscos psicossociais.',
};
