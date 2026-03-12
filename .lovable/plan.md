

## Plano: Corrigir problemas de indexação no Google Search Console

### Análise dos problemas

| Problema | Qtd | Causa provável |
|----------|-----|----------------|
| Erro soft 404 | 9 | SPA retorna HTTP 200 para URLs inexistentes. O NotFound renderiza conteúdo de "404" mas o status HTTP é 200 — Google classifica como "soft 404" |
| Redirecionamento | 3 | Os 3 redirects 301 em `_redirects` (`/dashboard`, `/admin`, `/old-page`) |
| Tag noindex | 2 | Páginas que herdaram a meta `noindex` do NotFound (bug do SPA: meta tags via useEffect podem "vazar" entre navegações) |
| Rastreada não indexada | 26 | Google ainda avaliando — não é erro, é decisão do algoritmo |

### Correções

**1. Adicionar `noindex` a páginas internas/privadas**

Páginas que não devem ser indexadas mas não têm `noindex`:
- `/avaliacao` — material interno de avaliação
- `/site-anterior` — versão antiga
- `/admin/*` — painel administrativo
- `/materiais/*` — apresentação e one-pager standalone
- `/m/:token` — visualizador de materiais

Adicionar `<SEOHead noindex={true} .../>` a cada uma dessas páginas.

**2. Melhorar sinalização do NotFound para crawlers**

Adicionar um `<meta name="prerender-status-code" content="404">` no componente NotFound. Alguns serviços de prerendering e crawlers respeitam essa tag. Também garantir que o cleanup do `useEffect` no SEOHead remova a meta `robots` ao desmontar, evitando vazamento da tag `noindex` para páginas válidas.

**3. Limpar `_redirects`**

Remover redirects desnecessários (`/dashboard`, `/old-page`) que geram ruído no Search Console. Manter apenas o catch-all `/* /index.html 200`.

**4. Atualizar `robots.txt`**

Adicionar bloqueios explícitos para rotas privadas:
```
Disallow: /admin
Disallow: /m/
Disallow: /materiais/
Disallow: /avaliacao
```

### Arquivos afetados

- `src/pages/Avaliacao.tsx` — adicionar SEOHead com noindex
- `src/pages/NotFound.tsx` — adicionar meta prerender-status-code
- `src/components/ui/SEOHead.tsx` — garantir cleanup correto da meta robots
- `public/_redirects` — limpar redirects obsoletos
- `public/robots.txt` — adicionar Disallow para rotas internas

### Nota sobre "soft 404"

Em SPAs puras (sem SSR), não é possível retornar HTTP 404 real para URLs inexistentes — o servidor sempre responde 200 com o `index.html`. A melhor mitigação é:
1. Garantir que o NotFound tenha `noindex`
2. Bloquear padrões no `robots.txt`
3. Não incluir URLs inexistentes no sitemap

As 26 páginas "rastreadas mas não indexadas" são decisão do Google e tendem a resolver-se com o tempo à medida que o site ganha autoridade.

