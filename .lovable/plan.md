

# Animar cards da seção "Problema de Encaminhamento"

Adicionar `ScrollReveal` com delay escalonado nos 4 cards do fluxo, igual ao padrão usado nas demais seções.

## Alteração

**`src/components/new-home/OrganizationalProblemSection.tsx`**
- Importar `ScrollReveal` de `@/components/ui/ScrollReveal`
- Envolver o título `h2` com `<ScrollReveal>`
- Envolver cada card do fluxo com `<ScrollReveal delay={index * 0.15}>`
- Envolver o texto final (abaixo do fluxo) com `<ScrollReveal>`

1 arquivo editado.

