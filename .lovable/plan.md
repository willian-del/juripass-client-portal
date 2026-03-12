

## Plano: Publicar novo artigo no blog

### Resumo

Adicionar o artigo "NR-01 e riscos psicossociais: o que muda para o RH a partir de 2026" ao arquivo `blog-data.ts`. O artigo será automaticamente exibido na listagem do blog e acessível via `/blog/nr-01-riscos-psicossociais-2026-rh`.

### Mudanças

**`src/lib/blog-data.ts`**

Adicionar novo objeto ao array `blogArticles` (após o último artigo existente):

```typescript
{
  slug: 'nr-01-riscos-psicossociais-2026-rh',
  title: 'NR-01 e riscos psicossociais: o que muda para o RH a partir de 2026',
  description: 'A atualização da NR-01 amplia a responsabilidade das empresas na gestão de riscos psicossociais e coloca o RH no centro da governança organizacional.',
  category: 'Compliance',
  readTime: '8 min',
  publishedAt: '2026-03-12',
  relatedSlugs: ['nr-01-riscos-psicossociais-guia-pratico', 'saude-mental-trabalho-papel-rh', 'absenteismo-juridico-problema-silencioso'],
  sections: [
    {
      heading: 'Introdução',
      content: 'A Norma Regulamentadora nº 1 (NR-01), que trata das disposições gerais sobre segurança e saúde no trabalho, passou por atualizações importantes nos últimos anos. Entre as mudanças mais relevantes está o fortalecimento da necessidade de identificação e gestão de riscos psicossociais dentro das organizações. Essa mudança amplia o papel do RH e das áreas de compliance, que passam a atuar de forma mais direta na gestão preventiva de riscos humanos. Mas o que exatamente muda na prática?'
    },
    {
      heading: 'O que são riscos psicossociais',
      content: 'Riscos psicossociais são fatores relacionados à organização do trabalho que podem afetar a saúde mental, o bem-estar e as relações dentro da empresa. Entre os exemplos mais comuns estão: assédio moral, conflitos entre colaboradores, pressão excessiva por metas, insegurança nas relações de trabalho, ambiente organizacional hostil, falhas de comunicação entre liderança e equipe. Esses fatores podem gerar impactos relevantes, tanto para os colaboradores quanto para a empresa.'
    },
    {
      heading: 'Por que esse tema ganhou importância',
      content: 'Nos últimos anos, o aumento de processos trabalhistas relacionados a assédio, ambiente de trabalho e saúde mental levou a uma maior atenção regulatória sobre o tema. Com isso, as empresas passaram a ser incentivadas a adotar medidas que vão além da reação a problemas já existentes. A tendência é que as organizações adotem cada vez mais uma abordagem de gestão preventiva de riscos humanos.'
    },
    {
      heading: 'O desafio prático para o RH',
      content: 'Na prática, muitas empresas possuem ferramentas importantes, como: código de ética, canal de denúncias, treinamentos de compliance, políticas internas. Esses instrumentos são essenciais, mas geralmente atuam quando o problema já aconteceu. O grande desafio está em identificar sinais de risco antes que eles se transformem em conflitos ou passivos trabalhistas.'
    },
    {
      heading: 'O RH como gestor de risco organizacional',
      content: 'Com esse novo cenário, o RH passa a desempenhar um papel cada vez mais estratégico. Além da gestão de pessoas, o RH também se torna responsável por: identificar riscos psicossociais, monitorar padrões de conflito organizacional, apoiar a governança corporativa, fortalecer a cultura de prevenção. Essa mudança aproxima o RH de áreas como compliance, jurídico e gestão de riscos.'
    },
    {
      heading: 'Conclusão',
      content: 'A evolução regulatória aponta para uma mudança importante: as empresas precisarão desenvolver mecanismos mais estruturados de gestão de risco humano. Organizações que adotarem uma postura preventiva tendem a reduzir conflitos, melhorar o ambiente de trabalho e fortalecer sua governança.'
    },
    {
      heading: 'Quer entender como identificar riscos humanos dentro da sua organização?',
      content: 'Conheça o Relatório de Inteligência de Riscos Humanos da Juripass, uma ferramenta que ajuda o RH a transformar dados em prevenção.'
    }
  ]
}
```

### Link para publicação no LinkedIn

Após a implementação, o artigo estará disponível em:
`https://juripass-client-portal.lovable.app/blog/nr-01-riscos-psicossociais-2026-rh`

