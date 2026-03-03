

# Header + Secao "Saiba Mais" no lugar dos links do Footer

## 1. Botao "Portal Cliente" no Header

Adicionar um botao no canto direito do header (desktop e mobile) que abre `https://app.juripass.com.br` em nova aba.

**`HomeHeader.tsx`**:
- Desktop: depois dos navItems, adicionar um `<a>` estilizado como botao (variant outline ou secondary) com texto "Portal Cliente" e `target="_blank"`
- Mobile: adicionar o mesmo link no menu mobile, ao final da lista

## 2. Remover links NR-01/FAQ/Blog do Footer

**`Footer.tsx`**:
- Remover a coluna 2 (Navegacao com os 3 links)
- Simplificar para 2 colunas: Logo+descricao | Institucional
- Layout passa de `md:grid-cols-3` para `md:grid-cols-2`

## 3. Nova secao "Saiba Mais" antes do FinalCTA

Criar componente `src/components/new-home/LearnMoreSection.tsx` com:
- Titulo "Saiba Mais" centralizado
- 3 cards lado a lado (grid 1→3 colunas) com icones, titulo curto e link:
  - **NR-01** — "Entenda a nova norma e como se adequar" → `/nr-01`
  - **FAQ** — "Tire suas dúvidas sobre o Juripass" → `/faq`
  - **Blog** — "Artigos sobre gestão de pessoas" → `/blog`
- Cards com `rounded-2xl`, hover com borda primary, padding `py-16 md:py-24`

**`Index.tsx`**: adicionar `LearnMoreSection` entre `BlogHighlightSection` e `FinalCTASection`.

## Arquivos
- Editar: `HomeHeader.tsx`, `Footer.tsx`, `Index.tsx`
- Criar: `src/components/new-home/LearnMoreSection.tsx`

