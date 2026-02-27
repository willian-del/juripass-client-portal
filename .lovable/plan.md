
# Igualar tamanho dos cards no fluxo organizacional

## Problema
Os cards tem tamanhos diferentes porque o conteudo varia (ex: "com problema pessoal" vs "para todos"). O `min-w-[140px]` define um minimo mas nao forca todos ao mesmo tamanho.

## Solucao
Trocar `min-w-[140px]` por `w-[150px]` (largura fixa) e adicionar `h-[140px] justify-center` para forcar altura uniforme tambem. Isso garante que todos os 4 cards fiquem identicos em dimensao.

No mobile (flex-col), usar `w-[180px]` para cards mais largos e confortaveis.

## Alteracao

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/OrganizationalProblemSection.tsx` | No card (linha 35): trocar `min-w-[140px]` por `w-[180px] md:w-[150px] h-[140px] justify-center` |
