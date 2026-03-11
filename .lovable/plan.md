

## Plano: Direcionar links de materiais do chatbot para visualização direta

### Problema

Na edge function `ai-commercial/index.ts` (linha 624), quando o agente sugere materiais, os links apontam para `/avaliacao` (página executiva completa) em vez de abrir diretamente o visualizador do material.

### Solução

Alterar os paths na edge function para usar rotas dedicadas que renderizem apenas o componente do material (standalone). A forma mais simples é criar rotas públicas no React Router que renderizem `SlidesPresentation` e `OnePager` em modo standalone, sem depender de token.

### Mudanças

**1. `src/App.tsx`** — Adicionar duas rotas públicas:
- `/materiais/apresentacao` → renderiza `<SlidesPresentation standalone />`
- `/materiais/one-pager` → renderiza `<OnePager standalone />`

**2. `supabase/functions/ai-commercial/index.ts`** (linha 624) — Atualizar os paths:
- `"/avaliacao?view=onepager"` → `"/materiais/one-pager"`
- `"/avaliacao"` → `"/materiais/apresentacao"`

### Resultado
O chatbot passará a linkar diretamente para o visualizador do material, sem passar pela página executiva.

