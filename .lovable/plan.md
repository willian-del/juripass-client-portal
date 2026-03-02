

# Corrigir Cards no Mobile: Tamanho Uniforme

## 1. RecognitionSection — Cards com tamanho uniforme

**Arquivo:** `src/components/new-home/RecognitionSection.tsx`

- Trocar "Endividamento e nome sujo" por "Dividas e nome sujo" (linha 4)
- Uniformizar altura e largura dos cards: trocar layout de `flex items-start` para `flex flex-col items-center text-center` com altura fixa `h-[100px]` no mobile, garantindo que todos os 9 cards fiquem iguais
- Centralizar icone e texto verticalmente dentro do card

## 2. OrganizationalProblemSection — Cards com tamanho uniforme

**Arquivo:** `src/components/new-home/OrganizationalProblemSection.tsx`

- Adicionar altura minima fixa nos cards mobile: `min-h-[140px]` para que todos os 4 cards (Colaborador, Gestor, RH, Desgaste) tenham a mesma altura, independente do tamanho do sublabel
- Manter `w-full` no mobile e `md:w-[200px] md:min-h-[160px]` no desktop

## Resumo
2 arquivos, apenas ajustes de classes Tailwind e 1 texto trocado.
