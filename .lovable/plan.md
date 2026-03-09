

# Ajuste: Cards com tamanho uniforme nos slides

## Problema
Nos slides 6 (Como funciona), 8 (Confidencialidade e LGPD) e 9 (Implantação), os cards têm alturas diferentes porque o conteúdo varia. Isso causa desalinhamento visual.

## Solução
Adicionar `h-full` aos componentes `Card` nesses slides para que preencham uniformemente o container flex/grid pai, que já usa `items-stretch` ou grid (que naturalmente estica os itens).

### Slides afetados:
1. **Slide 6 - Como funciona** (linha 252): `Card` precisa de `h-full`
2. **Slide 8 - Confidencialidade** (linha 321): `Card` precisa de `h-full`
3. **Slide 9 - Implantação** (linha 348): `Card` precisa de `h-full`

Também garantir que os slides 3 (Riscos) e 4 (O que é a Juripass) e 5 (Impacto) tenham `h-full` nos cards para consistência.

### Arquivo modificado:
- `src/components/avaliacao/SlidesPresentation.tsx` — adicionar `h-full` aos Cards em todos os slides com múltiplos cards lado a lado

