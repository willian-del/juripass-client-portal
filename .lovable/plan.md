
# Redesign da secao "O que e a Juripass"

## Objetivo
Recriar a secao com o novo conteudo fornecido, destacando frases de impacto e criando um layout sofisticado e visualmente atraente.

## Novo conteudo estruturado

O texto sera dividido em 3 blocos visuais distintos:

1. **Titulo + Definicao principal** (paragrafo de abertura com destaque)
2. **Card de destaque** com a frase de impacto central (quote estilizado)
3. **Tres pilares** em cards menores mostrando os beneficios-chave

## Layout proposto

```text
+--------------------------------------------------+
|            O que e a Juripass                     |
|                                                   |
|  "A Juripass e uma plataforma de gestao           |
|   preventiva que oferece as empresas um           |
|   canal externo, confidencial e estruturado..."   |
|                                                   |
|  +--------------------------------------------+  |
|  |  QUOTE CARD (gradient dark)                |  |
|  |  "Organiza o encaminhamento das demandas,  |  |
|  |   facilita o acesso a profissionais         |  |
|  |   habilitados e contribui para um ambiente  |  |
|  |   de trabalho mais saudavel, produtivo      |  |
|  |   e seguro para todos."                     |  |
|  +--------------------------------------------+  |
|                                                   |
|  [ Canal externo ]  [ Orientacao ]  [ Ambiente ]  |
|  [ confidencial  ]  [ especializ ]  [ saudavel ]  |
+--------------------------------------------------+
```

## Detalhes de implementacao

### Bloco 1 - Titulo e texto principal
- Titulo h2 centralizado com "O que e a Juripass"
- Paragrafo principal com destaque em **negrito + cor primary** nas frases-chave:
  - "canal externo, confidencial e estruturado"
  - "antes que se transformem em problemas internos"

### Bloco 2 - Quote card
- Card com `bg-gradient-dark` e `rounded-2xl`
- Frase final do texto como citacao de impacto
- Icone ShieldCheck + texto de sigilo

### Bloco 3 - Tres pilares (grid 3 colunas)
- Icones: Shield (canal confidencial), Users (orientacao especializada), Heart (ambiente saudavel)
- Cada pilar com icone circular, titulo curto e descricao de 1 linha
- Cards com `bg-card border rounded-2xl`

### Categorias dos temas mencionados
- Financas, familia, moradia, consumo e saude serao listados como tags/badges dentro do texto

## Arquivo alterado

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/new-home/WhatIsJuripassSection.tsx` | Redesign completo com novo conteudo, frases destacadas, quote card e grid de pilares |
