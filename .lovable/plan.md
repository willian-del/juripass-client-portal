

# Remover FAQ e Blog da Home

## Mudanças em `src/pages/Index.tsx`

1. Remover imports lazy de `HomeFAQSection` e `BlogHighlightSection` (linhas 14-15)
2. Remover os dois blocos `<ScrollReveal>` que renderizam essas seções (linhas 51-56)

A seção "Saiba Mais" (`LearnMoreSection`) já contém links para Blog e FAQ, então o acesso continua disponível.

Arquivo: `src/pages/Index.tsx`

