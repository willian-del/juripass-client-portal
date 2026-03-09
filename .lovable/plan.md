

# Adicionar ScrollReveal à página /avaliacao

Import `ScrollReveal` de `@/components/ui/ScrollReveal` e envolver as seções e elementos-chave com animações de entrada, seguindo o mesmo padrão da homepage.

## Arquivo: `src/pages/Avaliacao.tsx`

### Alterações:
1. **Import**: Adicionar `import { ScrollReveal } from '@/components/ui/ScrollReveal';`

2. **Hero** (seção ~linha 88): Envolver o bloco de texto com `<ScrollReveal>`

3. **O problema** (~linha 100):
   - Envolver o `<h2>` com `<ScrollReveal>`
   - Envolver cada card do `problemSteps` com `<ScrollReveal delay={i * 0.15}>`
   - Envolver o parágrafo de fechamento com `<ScrollReveal>`

4. **O que é a Juripass** (~linha 157):
   - Envolver o `<h2>` + descrição com `<ScrollReveal>`
   - Envolver cada pilar card com `<ScrollReveal delay={i * 0.15}>`

5. **Como funciona** (~linha 197):
   - Envolver o `<h2>` com `<ScrollReveal>`
   - Envolver cada step card com `<ScrollReveal delay={i * 0.15}>`

6. **Impacto** (~linha 228):
   - Envolver o `<h2>` com `<ScrollReveal>`
   - Envolver cada impact card com `<ScrollReveal delay={i * 0.1}>`

7. **FAQ** (~linha 258):
   - Envolver o `<h2>` com `<ScrollReveal>`
   - Envolver o `<Accordion>` com `<ScrollReveal delay={0.1}>`

8. **CTAs finais** (~linha 277):
   - Envolver o bloco com `<ScrollReveal>`

