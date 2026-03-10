

## Plano: Corrigir 3 problemas nos slides

### 1. Slide 6 — Cards "Como funciona" com alturas diferentes
Os 3 cards têm conteúdo de tamanhos variados, causando alturas desiguais. Solução: adicionar `min-h-[220px]` (ou equivalente) ao Card e usar `flex flex-col justify-between` para distribuir o conteúdo uniformemente.

**Arquivo:** `SlidesPresentation.tsx`, linhas 246-268
- Adicionar classe de altura mínima uniforme nos cards do slide 6

### 2. Slide 4 — Remover "Temas frequentemente atendidos" e corrigir alinhamento
- Remover o bloco de "Temas frequentemente atendidos" e os chips (linhas 187-194)
- O slide 4 usa layout `space-y-8` com conteúdo alinhado ao topo. Os outros slides com título centralizado usam `text-center` no título. O slide 4 tem o título alinhado à esquerda, o que é intencional, mas o label "A SOLUÇÃO" fica deslocado para cima quando há muito conteúdo. Remover os chips já alivia bastante e permite o conteúdo centralizar melhor verticalmente.

**Arquivo:** `SlidesPresentation.tsx`, linhas 187-194 — deletar bloco

### 3. Slide 2 — Sincronizar com conteúdo da home
Atualizar os sublabels dos cards para refletir as mudanças da `OrganizationalProblemSection`:

| Card | Slide atual | Home (correto) |
|------|------------|-----------------|
| Gestor | "Atua como conselheiro informal" | "Gestores atuam como conselheiros informais" |
| RH | "Recebe relatos fora do seu escopo" | "O RH recebe relatos delicados fora do seu escopo" |
| Desgaste | "Impacto em clima e operação" | "Questões pessoais começam a afetar clima e operação." |

Também atualizar o texto inferior para: "Gestores tentam ajudar. O RH tenta orientar. Mas nenhum deles foi estruturado para assumir esse papel."

**Arquivo:** `SlidesPresentation.tsx`, linhas 91-125

### Resumo
- 1 arquivo editado: `SlidesPresentation.tsx`
- 3 correções pontuais: altura uniforme nos cards, remoção de conteúdo denso, sincronização de copy

