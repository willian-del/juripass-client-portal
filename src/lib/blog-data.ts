export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
  sections: { heading: string; content: string }[];
  relatedSlugs?: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'absenteismo-juridico-problema-silencioso',
    title: 'Absenteísmo Jurídico: O Problema Silencioso nas Empresas',
    description: 'Descubra como questões jurídicas pessoais dos colaboradores geram absenteísmo, presenteísmo e queda de produtividade — e o que o RH pode fazer.',
    category: 'Gestão de RH',
    readTime: '6 min',
    publishedAt: '2025-05-10',
    relatedSlugs: ['nr-01-riscos-psicossociais-guia-pratico', 'saude-mental-trabalho-papel-rh', 'como-implementar-acolhimento-juridico'],
    sections: [
      {
        heading: 'O que é absenteísmo jurídico?',
        content: 'O absenteísmo jurídico é o fenômeno em que colaboradores se ausentam do trabalho — física ou mentalmente — por conta de problemas jurídicos pessoais não resolvidos. Diferente do absenteísmo tradicional, ele raramente aparece nos indicadores de RH porque o colaborador muitas vezes está presente, mas com a mente ocupada por questões como divórcio, guarda de filhos, dívidas ou conflitos de vizinhança. Pesquisas indicam que 69% dos brasileiros enfrentam ao menos um problema jurídico relevante ao longo da vida, e a maioria não tem acesso a orientação adequada.',
      },
      {
        heading: 'Impacto na produtividade e saúde mental',
        content: 'Quando um colaborador carrega o peso de um processo judicial, uma ameaça de despejo ou um conflito familiar sem resolução, sua capacidade de concentração despenca. Estudos apontam que 28% das pessoas com problemas jurídicos reportam impacto direto na saúde mental, incluindo ansiedade, insônia e sintomas depressivos. Para a empresa, isso se traduz em presenteísmo crônico, aumento de erros operacionais, conflitos interpessoais e, eventualmente, afastamentos por saúde. O custo invisível do absenteísmo jurídico pode representar até 3% da folha de pagamento.',
      },
      {
        heading: 'Por que o RH não consegue identificar',
        content: 'Questões jurídicas pessoais são, por natureza, confidenciais. O colaborador não se sente confortável para compartilhar com o gestor direto ou com o RH que está passando por um divórcio litigioso ou enfrentando uma execução fiscal. Sem um canal externo e confidencial, esses problemas permanecem invisíveis até que se manifestem como faltas, pedidos de demissão ou afastamentos médicos. O RH acaba tratando os sintomas sem conhecer a causa raiz.',
      },
      {
        heading: 'Como um programa de acolhimento jurídico resolve',
        content: 'Um programa de acolhimento jurídico como a Juripass oferece um canal externo, confidencial e acessível para que o colaborador busque orientação sobre suas questões pessoais. Ao ter acesso a advogados especializados fora do ambiente corporativo, o colaborador resolve seus problemas mais rápido, reduz o estresse e recupera o foco no trabalho. Para o RH, os dados anonimizados do programa revelam padrões — como aumento de consultas sobre endividamento em determinado período — permitindo ações preventivas e estratégicas.',
      },
      {
        heading: 'O papel estratégico do acolhimento na retenção',
        content: 'Empresas que investem em programas de acolhimento jurídico reportam redução de até 40% no absenteísmo relacionado a questões pessoais e aumento significativo no engajamento. Mais do que um benefício, é uma ferramenta de gestão que demonstra cuidado genuíno com o colaborador, fortalece a marca empregadora e contribui para a conformidade com a Nova NR-01, que exige a gestão de riscos psicossociais no ambiente de trabalho.',
      },
    ],
  },
  {
    slug: 'nr-01-riscos-psicossociais-guia-pratico',
    title: 'Nova NR-01 e Riscos Psicossociais: Guia Prático para RH',
    description: 'Guia completo sobre a atualização da NR-01 que inclui riscos psicossociais. Entenda as obrigações e como se adequar.',
    category: 'Compliance',
    readTime: '8 min',
    publishedAt: '2025-04-22',
    relatedSlugs: ['absenteismo-juridico-problema-silencioso', 'saude-mental-trabalho-papel-rh', 'como-implementar-acolhimento-juridico'],
    sections: [
      {
        heading: 'O que mudou na NR-01',
        content: 'A Norma Regulamentadora nº 01, que estabelece as diretrizes gerais de segurança e saúde no trabalho, foi atualizada para incluir explicitamente os riscos psicossociais no Programa de Gerenciamento de Riscos (PGR). Isso significa que empresas agora são obrigadas a identificar, avaliar e controlar fatores como estresse ocupacional, assédio moral, sobrecarga de trabalho e conflitos interpessoais que possam afetar a saúde mental dos trabalhadores. A mudança reflete uma tendência global de reconhecer que a saúde no trabalho vai além dos riscos físicos e químicos.',
      },
      {
        heading: 'O que são riscos psicossociais',
        content: 'Riscos psicossociais são fatores relacionados à organização do trabalho, às relações interpessoais e às condições ambientais que podem causar danos à saúde mental e física dos trabalhadores. Exemplos incluem: jornadas excessivas, falta de autonomia, assédio moral ou sexual, insegurança no emprego, conflitos com gestores e colegas, e a pressão por resultados sem suporte adequado. Esses riscos são particularmente traiçoeiros porque seus efeitos são cumulativos e muitas vezes silenciosos até se manifestarem como burnout, depressão ou doenças psicossomáticas.',
      },
      {
        heading: 'Obrigações do empregador',
        content: 'Com a atualização, as empresas devem: (1) incluir riscos psicossociais no inventário de riscos do PGR; (2) implementar medidas de prevenção e controle; (3) oferecer canais de escuta e acolhimento aos trabalhadores; (4) capacitar gestores para identificar sinais de sofrimento mental; (5) monitorar indicadores como absenteísmo, rotatividade e afastamentos por saúde mental. O descumprimento pode resultar em multas administrativas, interdições e ações trabalhistas com pedidos de indenização por danos morais.',
      },
      {
        heading: 'Como implementar na prática',
        content: 'O primeiro passo é realizar um diagnóstico organizacional para mapear os principais fatores de risco psicossocial presentes na empresa. Em seguida, é fundamental criar canais de comunicação seguros e confidenciais para que os colaboradores possam reportar situações de risco. Um programa de acolhimento jurídico funciona como parte dessa estratégia, pois muitos riscos psicossociais estão ligados a problemas pessoais que afetam o desempenho — como dívidas, processos judiciais e conflitos familiares. Ao oferecer suporte externo e especializado, a empresa atua na prevenção ativa.',
      },
      {
        heading: 'Juripass como ferramenta de conformidade',
        content: 'A Juripass se posiciona como uma solução prática para a conformidade com a Nova NR-01. O programa oferece um canal externo e confidencial de acolhimento jurídico, gerando dados anonimizados que ajudam o RH a identificar padrões de risco psicossocial. Ao resolver questões jurídicas pessoais que causam estresse e ansiedade, a Juripass contribui diretamente para a redução de riscos psicossociais no ambiente de trabalho — transformando uma obrigação legal em uma oportunidade de cuidado genuíno com os colaboradores.',
      },
    ],
  },
  {
    slug: 'beneficios-corporativos-retencao-talentos',
    title: 'Benefícios Corporativos: O Que Realmente Faz Diferença na Retenção',
    description: 'Análise dos benefícios que mais impactam a retenção de talentos e por que o acolhimento jurídico é o próximo diferencial competitivo.',
    category: 'Benefícios',
    readTime: '5 min',
    publishedAt: '2025-03-15',
    sections: [
      {
        heading: 'O cenário atual dos benefícios corporativos',
        content: 'O mercado de benefícios corporativos está cada vez mais competitivo. Plano de saúde, vale-refeição e vale-transporte já são considerados básicos. Empresas que querem se destacar na atração e retenção de talentos precisam ir além, oferecendo benefícios que realmente façam diferença no dia a dia do colaborador. A tendência é a personalização: entender as necessidades reais dos funcionários e criar pacotes que atendam às suas dores específicas.',
      },
      {
        heading: 'Por que benefícios tradicionais não bastam',
        content: 'Pesquisas mostram que o salário é apenas o quinto fator mais importante para a permanência de um profissional na empresa. Qualidade de vida, ambiente de trabalho, oportunidades de desenvolvimento e sentimento de cuidado genuíno pesam mais na decisão de ficar ou buscar novas oportunidades. Benefícios genéricos, aplicados de forma uniforme, não comunicam cuidado individualizado. O colaborador quer sentir que a empresa se preocupa com ele como pessoa, não apenas como recurso produtivo.',
      },
      {
        heading: 'O acolhimento jurídico como diferencial',
        content: 'O acolhimento jurídico é um benefício que toca diretamente nas dores reais dos colaboradores. Quando alguém está passando por um divórcio, uma disputa de guarda, problemas com o proprietário do imóvel ou dificuldades financeiras, ter acesso a orientação jurídica qualificada e confidencial faz uma diferença enorme. É um benefício que resolve problemas concretos, reduz estresse e demonstra um nível de cuidado que poucos concorrentes oferecem.',
      },
      {
        heading: 'Impacto mensurável na retenção',
        content: 'Empresas que implementaram programas de acolhimento jurídico reportam: redução de 35% no turnover voluntário, aumento de 42% no eNPS (Employee Net Promoter Score), diminuição de 28% nos afastamentos por saúde mental e melhoria significativa no clima organizacional. Esses números refletem o impacto de resolver a causa raiz da insatisfação e do estresse, em vez de apenas tratar os sintomas com benefícios superficiais.',
      },
      {
        heading: 'Como começar',
        content: 'Implementar um programa de acolhimento jurídico é mais simples do que parece. Com a Juripass, a empresa contrata um programa pronto, sem necessidade de montar estrutura interna. O colaborador acessa orientação jurídica de forma confidencial e externa à empresa, enquanto o RH recebe relatórios anonimizados com indicadores relevantes para a gestão de pessoas. É um benefício de alto impacto, custo acessível e implementação rápida.',
      },
    ],
  },
  {
    slug: 'como-implementar-acolhimento-juridico',
    title: 'Como Implementar um Programa de Acolhimento Jurídico',
    description: 'Passo a passo para implementar um programa de acolhimento jurídico na sua empresa, da decisão à mensuração de resultados.',
    category: 'Implementação',
    readTime: '7 min',
    publishedAt: '2025-02-28',
    sections: [
      {
        heading: 'O que é um programa de acolhimento jurídico',
        content: 'Um programa de acolhimento jurídico corporativo é um canal externo e confidencial que oferece orientação jurídica aos colaboradores sobre questões pessoais. Diferente de um convênio jurídico tradicional, o foco não é litígio, mas sim acolhimento: escuta ativa, orientação preventiva e encaminhamento adequado. O objetivo é resolver conflitos antes que se tornem processos judiciais e reduzir o impacto das questões pessoais na saúde mental e na produtividade do colaborador.',
      },
      {
        heading: 'Passo 1: Diagnóstico organizacional',
        content: 'Antes de implementar, é importante entender o cenário atual da empresa. Analise indicadores como absenteísmo, rotatividade, afastamentos por saúde mental e resultados de pesquisas de clima. Converse com gestores sobre os principais desafios da equipe. Muitas vezes, os sinais de problemas jurídicos pessoais estão escondidos em métricas que o RH já monitora, mas interpreta apenas como questões de engajamento ou desempenho.',
      },
      {
        heading: 'Passo 2: Escolha do parceiro',
        content: 'Busque um parceiro que ofereça: confidencialidade total (canal externo à empresa), diversidade de especialidades jurídicas, relatórios anonimizados para o RH, facilidade de acesso para o colaborador e experiência no contexto corporativo. A Juripass foi desenhada especificamente para esse propósito, combinando acolhimento jurídico com inteligência de dados para gestão de pessoas.',
      },
      {
        heading: 'Passo 3: Comunicação interna',
        content: 'A comunicação é crucial para o sucesso do programa. O colaborador precisa entender que o serviço é confidencial, externo e sem custo para ele. Use múltiplos canais: e-mail de lançamento, apresentação em reuniões de equipe, material físico nos espaços comuns e lembretes periódicos. Destaque que questões como direito de família, consumidor, trabalhista, imobiliário e financeiro são atendidas. Quanto mais o colaborador confiar na confidencialidade, mais efetivo será o programa.',
      },
      {
        heading: 'Passo 4: Mensuração de resultados',
        content: 'Acompanhe indicadores quantitativos (taxa de adesão, número de atendimentos, categorias mais procuradas) e qualitativos (satisfação dos usuários, feedback espontâneo). Compare com indicadores organizacionais como absenteísmo, turnover e clima. Os primeiros resultados costumam aparecer entre 3 e 6 meses após a implementação, com estabilização dos indicadores em 12 meses. A análise contínua permite ajustar a estratégia e demonstrar ROI para a liderança.',
      },
    ],
  },
  {
    slug: 'saude-mental-trabalho-papel-rh',
    title: 'Saúde Mental no Trabalho: O Papel do RH na Prevenção',
    description: 'Como o RH pode atuar na prevenção de problemas de saúde mental, indo além do discurso e implementando ações concretas.',
    category: 'Saúde Mental',
    readTime: '6 min',
    publishedAt: '2025-01-20',
    sections: [
      {
        heading: 'O panorama da saúde mental no trabalho',
        content: 'O Brasil é o segundo país com mais casos de burnout no mundo e lidera o ranking de ansiedade. No ambiente corporativo, os números são alarmantes: 72% dos trabalhadores brasileiros reportam algum nível de estresse no trabalho, e os afastamentos por transtornos mentais cresceram 30% nos últimos cinco anos. O custo para as empresas vai além do absenteísmo: inclui queda de produtividade, aumento de erros, conflitos interpessoais e deterioração do clima organizacional.',
      },
      {
        heading: 'Além do discurso: ações concretas',
        content: 'Muitas empresas falam sobre saúde mental, mas poucas implementam ações estruturais. Colocar um cartaz sobre "Setembro Amarelo" ou oferecer uma palestra anual não constitui uma estratégia de prevenção. O RH precisa atuar em três frentes: (1) prevenção primária — reduzir fatores de risco no ambiente de trabalho; (2) prevenção secundária — identificar sinais precoces e oferecer suporte; (3) prevenção terciária — apoiar o retorno ao trabalho após afastamentos.',
      },
      {
        heading: 'O elo entre problemas jurídicos e saúde mental',
        content: 'Um fator frequentemente ignorado na saúde mental dos colaboradores são os problemas jurídicos pessoais. Pesquisas mostram que pessoas envolvidas em litígios têm 3 vezes mais chances de desenvolver sintomas de ansiedade e depressão. Um divórcio litigioso, uma execução de dívida ou uma disputa de guarda são fontes de estresse crônico que acompanham o colaborador para o ambiente de trabalho. Sem um canal adequado de suporte, esse estresse se acumula e pode resultar em burnout ou afastamento.',
      },
      {
        heading: 'Estratégias práticas para o RH',
        content: 'O RH pode implementar ações como: mapear fatores de risco psicossocial (obrigatório pela Nova NR-01), criar canais de escuta seguros e confidenciais, treinar gestores para identificar sinais de sofrimento, oferecer programas de acolhimento (psicológico, jurídico, financeiro), flexibilizar políticas para momentos de crise pessoal e monitorar indicadores de saúde mental regularmente. A chave é criar um ambiente onde o colaborador sinta que pode buscar ajuda sem julgamento.',
      },
      {
        heading: 'Acolhimento jurídico como ferramenta de prevenção',
        content: 'Um programa de acolhimento jurídico atua diretamente na prevenção de problemas de saúde mental ao resolver uma das principais fontes de estresse dos colaboradores. Quando o trabalhador tem acesso a orientação jurídica confidencial e qualificada, ele resolve seus problemas mais rápido, reduz a ansiedade e recupera a capacidade de se concentrar no trabalho. Para o RH, é uma ferramenta que complementa os programas de saúde mental existentes, atacando uma causa raiz frequentemente invisível.',
      },
    ],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}
