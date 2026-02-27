
# Animacoes de Scroll com Framer Motion

## Abordagem

Instalar `framer-motion` e criar um componente wrapper reutilizavel `ScrollReveal` que aplica animacoes de fade-in + slide-up quando as secoes entram no viewport. Esse wrapper sera aplicado a cada secao da homepage.

## Novo arquivo: `src/components/ui/ScrollReveal.tsx`

Componente wrapper usando `motion.div` com `whileInView` do framer-motion:
- **Animacao padrao**: fade-in (opacity 0 para 1) + slide-up (translateY 30px para 0)
- **Trigger**: `whileInView` com `once: true` (anima apenas na primeira vez)
- **Viewport margin**: `-80px` para disparar um pouco antes de entrar completamente
- **Duracao**: 0.6s com easing `easeOut`
- Props opcionais: `delay`, `direction` (up/left/right), `className`

## Alteracao: `src/pages/Index.tsx`

Envolver cada secao com `ScrollReveal`, aplicando delays escalonados onde faz sentido:

```text
<HeroSection />           -- SEM wrapper (ja visivel no load)
<ScrollReveal>
  <RecognitionSection />
</ScrollReveal>
<Suspense>
  <ScrollReveal><OrganizationalProblemSection /></ScrollReveal>
  <ScrollReveal><WhatIsJuripassSection /></ScrollReveal>
  <ScrollReveal><HowItWorksSection /></ScrollReveal>
  <ScrollReveal><ImpactSection /></ScrollReveal>
  <ScrollReveal><MidCTASection /></ScrollReveal>
  <ScrollReveal><SegmentationSection /></ScrollReveal>
  <ScrollReveal><HomeFAQSection /></ScrollReveal>
  <ScrollReveal><FinalCTASection /></ScrollReveal>
</Suspense>
```

## Detalhes tecnicos

- **Dependencia nova**: `framer-motion` (adicionar ao package.json)
- **Nenhuma alteracao** nos arquivos das secoes individuais -- o wrapper cuida de tudo
- **Performance**: `once: true` evita re-renderizacoes; animacoes sao GPU-accelerated (transform + opacity)
- **Acessibilidade**: `prefers-reduced-motion` sera respeitado via prop do framer-motion (`reducedMotion="user"`)

## Arquivos afetados

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/ui/ScrollReveal.tsx` | Novo -- componente wrapper |
| `src/pages/Index.tsx` | Envolver secoes com ScrollReveal |
| `package.json` | Adicionar framer-motion |
