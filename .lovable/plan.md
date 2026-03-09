

# Lazy Loading de Imagens com Alt Otimizado

## Situação Atual

O projeto tem uso mínimo de imagens `<img>`:
1. **`LogoJuripass.tsx`** — Logo com `loading="eager"` (correto, above-the-fold)
2. **`JuripassCardVisual.tsx`** — Ícone do card sem lazy loading

O site é predominantemente baseado em ícones Lucide (SVG inline) e gradientes CSS, sem imagens pesadas.

## Plano

### 1. Criar componente `OptimizedImage` reutilizável
- Props: `src`, `alt`, `width`, `height`, `priority` (above-the-fold), `className`
- `loading="lazy"` por padrão, `loading="eager"` quando `priority=true`
- Atributos `width`/`height` explícitos para evitar CLS (Cumulative Layout Shift)
- `decoding="async"` para imagens não-prioritárias
- Fallback com skeleton/placeholder enquanto carrega

### 2. Atualizar `LogoJuripass.tsx`
- Usar `OptimizedImage` com `priority=true` (logo é above-the-fold)
- Alt descritivo: `"Juripass — Plataforma de suporte jurídico para gestão de pessoas"`
- Adicionar `width`/`height` explícitos

### 3. Atualizar `JuripassCardVisual.tsx`
- Usar `OptimizedImage` com `loading="lazy"` (below-the-fold)
- Alt: `"Ícone Juripass no cartão corporativo de benefício jurídico"`
- Adicionar dimensões explícitas

### 4. Adicionar `<noscript>` fallback no `index.html`
- Tag `<noscript>` com mensagem para crawlers sem JS

## Arquivos

| Arquivo | Ação |
|---|---|
| `src/components/ui/OptimizedImage.tsx` | Criar |
| `src/components/ui/LogoJuripass.tsx` | Atualizar |
| `src/components/home/JuripassCardVisual.tsx` | Atualizar |

