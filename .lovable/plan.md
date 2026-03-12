

## Plano: Adicionar novo artigo ao sitemap.xml

### Resumo

Adicionar entrada do novo artigo `nr-01-riscos-psicossociais-2026-rh` ao `public/sitemap.xml` e atualizar a data de modificação da página `/blog`.

### Mudanças

**`public/sitemap.xml`**

1. Atualizar `lastmod` da página `/blog` (linha 59) para `2026-03-12`
2. Adicionar nova entrada de URL após o último artigo (após linha 110):

```xml
  <url>
    <loc>https://www.juripass.com.br/blog/nr-01-riscos-psicossociais-2026-rh</loc>
    <lastmod>2026-03-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
```

### Após implementação

O sitemap terá 20 URLs indexáveis (11 páginas + 9 artigos). O Googlebot detectará a mudança no próximo crawl e indexará o novo artigo.

