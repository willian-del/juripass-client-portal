

# Micro-animacao nos cards da secao Saiba Mais

Envolver cada card do `LearnMoreSection` com o componente `ScrollReveal` ja existente, usando `delay` escalonado (0, 0.15, 0.3s) para que os 3 cards aparecam em sequencia.

## Alteracao

**`src/components/new-home/LearnMoreSection.tsx`**
- Importar `ScrollReveal` de `@/components/ui/ScrollReveal`
- Envolver cada `<Link>` card com `<ScrollReveal delay={index * 0.15}>`
- O titulo h2 tambem recebe um `ScrollReveal` sem delay

1 arquivo editado, reutiliza infraestrutura existente.

