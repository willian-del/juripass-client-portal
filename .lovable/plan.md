

# Atualizar sitemap.xml para o domínio definitivo

## Problema
O `public/sitemap.xml` e o `public/robots.txt` usam `https://juripass-client-portal.lovable.app` como base. O Google Search Console espera URLs com `https://www.juripass.com.br`.

## Mudanças

### 1. `public/sitemap.xml`
Substituir todas as ocorrências de `https://juripass-client-portal.lovable.app` por `https://www.juripass.com.br`.

### 2. `public/robots.txt`
Atualizar a linha do Sitemap para `https://www.juripass.com.br/sitemap.xml`.

### 3. `src/components/ui/SEOHead.tsx`
Atualizar a constante `BASE_URL` de `https://juripass-client-portal.lovable.app` para `https://www.juripass.com.br`.

### 4. `index.html`
Atualizar as meta tags `og:image` e `twitter:image` para usar URLs absolutas com o domínio correto.

