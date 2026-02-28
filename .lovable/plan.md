

# Incorporar textos de consequencia nos cards do fluxo

## Objetivo
Unificar os cards do fluxo com os textos de consequencia, eliminando a lista separada e criando um layout mais coeso.

## Mudancas

### Dados dos steps
Atualizar o array `steps` para incluir os textos de consequencia nos 3 ultimos cards (Gestor, RH, Desgaste), substituindo os sublabels atuais:

| Card | Label atual | Sublabel atual | Novo sublabel (consequencia) |
|------|------------|----------------|-------------------------------|
| Colaborador | Colaborador | com problema pessoal | (mantido) |
| Gestor | Gestor | tenta ajudar | Gestores atuam como conselheiros informais |
| RH | RH | tenta orientar | O RH recebe relatos delicados fora do seu escopo |
| Desgaste | Desgaste | para todos | Questoes externas passam a impactar clima e operacao |

### Layout dos cards
- Aumentar a altura dos cards para acomodar textos mais longos (de `h-[140px]` para `h-auto min-h-[160px]`)
- Aumentar a largura para melhor leitura (de `w-[180px] md:w-[150px]` para `w-[220px] md:w-[200px]`)
- Manter o icone circular no topo e o texto abaixo

### Remover lista separada
- Remover completamente o bloco de consequencias (linhas 62-78), ja que o conteudo foi absorvido pelos cards

## Arquivo alterado

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/OrganizationalProblemSection.tsx` | Atualizar sublabels dos steps com textos de consequencia, ajustar dimensoes dos cards, remover bloco de lista separada |

