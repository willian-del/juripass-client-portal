

# Revisao de conteudo: Hero + O que e a Juripass

## Problema atual

A Hero tem um paragrafo generico e corporativo. A secao "O que e a Juripass" repete parte da mesma mensagem. O conteudo novo do usuario e mais claro e direto — precisa ser distribuido entre as duas secoes sem redundancia.

## Distribuicao do conteudo

**Hero (HeroSection.tsx)** — O que somos + o que fazemos (direto ao ponto)
- H1 mantido: "Plataforma de Suporte Jurídico para Gestão de Pessoas"
- Paragrafo reescrito com as 2 primeiras frases do conteudo fornecido:
  - "A Juripass é uma plataforma de gestão preventiva para o RH."
  - "Oferecemos às empresas um canal jurídico externo, confidencial e estruturado para acolher colaboradores em questões pessoais sensíveis — antes que se transformem em conflitos internos, afastamentos ou passivos trabalhistas."

**O que e a Juripass (WhatIsJuripassSection.tsx)** — Como funciona + integracao corporativa
- Primeiro paragrafo: o trecho sobre atendimento especializado e orientacao (3a frase do conteudo)
- Segundo paragrafo: integracao a politica corporativa, riscos psicossociais, NR-01 (4a frase)
- Badges de temas, quote card e 3 pilares permanecem

## Alteracoes

### `src/components/new-home/HeroSection.tsx`
- Substituir o paragrafo (linhas 20-24) pelo novo conteudo: definicao direta + proposta de valor

### `src/components/new-home/WhatIsJuripassSection.tsx`
- Substituir os 2 paragrafos (linhas 42-57) pelo conteudo sobre atendimento especializado e conformidade NR-01

### `src/pages/Index.tsx` e `index.html`
- Atualizar meta description para alinhar com o novo paragrafo da hero

2-4 arquivos editados.

