

# Diagnóstico: Produção não atualiza — react-snap falha no build

## Problema

O código-fonte já está correto — todos os CTAs chamam `openLeadForm()` e não há nenhum link para Google Calendar. O site publicado está desatualizado porque o passo `postbuild: react-snap` falha silenciosamente durante o deploy, impedindo que a nova versão seja publicada.

O `react-snap` tenta pré-renderizar as páginas em um navegador headless, mas falha ao processar:
- `react-markdown` v10 (ESM puro, incompatível com o headless renderer)
- `ChatWidget` com APIs de browser (`sessionStorage`, `fetch` streaming)

A correção anterior (lazy loading do ChatWidget) pode não ser suficiente se o build continua falhando.

## Solução proposta

### 1. Remover `react-snap` do build de produção

O `react-snap` está causando mais problemas do que benefícios. A aplicação é uma SPA com rotas dinâmicas e componentes que dependem de APIs de browser — a pré-renderização não é viável sem adaptações extensas.

**Arquivo: `package.json`**
- Remover a linha `"postbuild": "react-snap"` dos scripts
- Remover a configuração `"reactSnap": { ... }` inteira
- Remover `react-snap` das dependências

### 2. Manter SEO sem react-snap

O projeto já tem:
- `SEOHead` component com meta tags dinâmicas
- `sitemap.xml` e `robots.txt` configurados
- `public/_redirects` para SPA routing

Isso é suficiente para SEO em uma SPA moderna. Se pré-renderização for necessária no futuro, pode-se usar uma solução mais robusta (como prerender.io ou similar) que não interfere no build.

### Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `package.json` | Remover `postbuild`, config `reactSnap`, e dependência `react-snap` |

Após essa mudança, o próximo publish deve funcionar e o site ficará atualizado com os CTAs corretos.

