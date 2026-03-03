

# Análise e Proposta: Simplificar "O que é a Juripass"

## Diagnóstico de redundância

Analisando o fluxo da página, há sobreposição clara:

- **Hero** já diz: "canal jurídico externo e confidencial", "gestão preventiva para o RH", "questões pessoais sensíveis"
- **OrganizationalProblem** já menciona: "conformidade com a nova NR-01", "gestão de riscos psicossociais", "fluxo técnico, preventivo e independente"
- **WhatIsJuripass** repete tudo isso: NR-01, riscos psicossociais, canal confidencial, demandas absorvidas pelo RH

Os 3 pilares (Canal confidencial, Orientação especializada, Ambiente saudável) são genéricos e não adicionam informação nova. O quote card é longo e repete os pilares com outras palavras. Os badges de temas (Finanças, Família, etc.) são o único conteúdo realmente novo.

## Proposta: seção enxuta e objetiva

Reduzir a seção a **3 blocos simples**:

1. **Título** — manter "O que é a Juripass"
2. **Um parágrafo direto** — sem repetir Hero/Problem, focando no *como funciona* (o diferencial mecânico): "Um canal externo de orientação jurídica que o colaborador acessa de forma autônoma. A empresa contrata; o colaborador usa quando precisar — com sigilo total."
3. **Badges de temas** — manter como estão (são informativos e visuais)
4. **3 pilares reformulados** — trocar por diferenciais concretos que não foram ditos antes:
   - **Externo e independente** — Sem vínculo com a empresa, sem conflito de interesse
   - **Sob demanda** — O colaborador aciona quando quiser, sem intermediários
   - **Sem custo para o colaborador** — Atendimento inicial gratuito, sem burocracia

**Remover**: quote card (redundante) e o segundo parágrafo sobre NR-01 (já coberto antes).

## Mudanças técnicas

**Arquivo**: `src/components/new-home/WhatIsJuripassSection.tsx`

- Reescrever `pillars` com os 3 novos diferenciais
- Substituir os 2 parágrafos por 1 parágrafo curto e direto
- Remover o bloco do quote card (linhas 73-84)
- Manter badges de temas
- Manter grid 3 colunas dos pilares com mesmo styling

