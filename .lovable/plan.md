
# Rodada 3 -- Paginas /como-funciona, /para-quem e /faq

## Resumo

Criar 3 paginas dedicadas e registrar as rotas em `App.tsx`. Cada pagina usa o layout padrao (HomeHeader + Footer) e expande o conteudo que ja aparece resumido na Home.

---

## 1. Pagina `/como-funciona` (`src/pages/ComoFunciona.tsx`)

Estrutura em 3 blocos:

**Hero compacto**
- Titulo: "Como a Juripass funciona"
- Subtitulo: "Um canal simples, externo e confidencial. Sem burocracia para a empresa, sem exposicao para o colaborador."

**3 passos expandidos** (reutiliza conceito do HowItWorksSection, porem com mais detalhe)
- Passo 1 -- "Colaborador entra em contato direto"
  - Via WhatsApp, sem precisar passar pelo RH
  - Canal disponivel em horario estendido
  - Sem cadastro, sem app, sem complicacao
- Passo 2 -- "Recebe orientacao inicial clara"
  - Entende o que esta acontecendo na sua situacao
  - Recebe informacoes sobre caminhos possiveis
  - Sabe o que pode e o que nao pode fazer
- Passo 3 -- "Situacao e encaminhada adequadamente"
  - Se necessario, e direcionado a um profissional especializado
  - A empresa nao participa e nao recebe informacoes
  - O colaborador segue com autonomia

**Secao "O que a empresa precisa fazer"**
- Comunicar o beneficio aos colaboradores
- Nenhuma integracao tecnica necessaria
- Nenhum envolvimento do RH nas conversas

**CTA final** -- "Conversar rapidamente" (WhatsApp)

---

## 2. Pagina `/para-quem` (`src/pages/ParaQuem.tsx`)

Estrutura:

**Hero compacto**
- Titulo: "Para quem a Juripass faz mais sentido"
- Subtitulo: "Empresas onde situacoes pessoais dos colaboradores ja impactam a operacao -- mesmo que ninguem fale sobre isso."

**3 blocos de segmento expandidos** (expande o SegmentationSection)

Cada bloco com:
- Icone + titulo do segmento
- Subtitulo
- 3 pontos de dor (ja existentes)
- Paragrafo adicional de contexto (~2 frases)
- Exemplo real anonimizado

| Segmento | Contexto adicional |
|----------|-------------------|
| Industria | "Em operacoes com turnos, um colaborador desestabilizado representa risco. Mas ninguem sabe como encaminhar sem parecer invasivo." |
| Varejo | "A rotatividade ja e alta. Quando um colaborador esta lidando com algo pessoal grave, a produtividade cai antes de qualquer aviso." |
| Call center | "A pressao do atendimento ja e intensa. Quando somada a problemas pessoais nao resolvidos, o resultado e absenteismo e turnover." |

**Secao "Tambem atendemos"**
- Logistica e transporte
- Servicos (facilities, seguranca)
- Tecnologia (startups em crescimento)
Texto: "Qualquer empresa com mais de 200 colaboradores, onde o RH ja percebe que situacoes pessoais impactam o dia a dia."

**CTA final** -- "Conversar rapidamente"

---

## 3. Pagina `/faq` (`src/pages/FAQ.tsx`)

Estrutura:

**Hero compacto**
- Titulo: "Perguntas frequentes"
- Subtitulo: "Respostas claras para as duvidas mais comuns de RHs e gestores sobre a Juripass."

**FAQ completo com Accordion** -- 10+ perguntas organizadas em categorias:

**Sobre o servico**
1. "O que exatamente a Juripass faz?" -- Canal externo de orientacao e encaminhamento para situacoes pessoais sensiveis.
2. "Isso e assistencia juridica?" -- Nao. E orientacao e encaminhamento, nao representacao legal.
3. "A Juripass substitui o RH?" -- Nao. O RH continua com seu papel. A Juripass cuida do que nao cabe ao RH.

**Sobre riscos e confidencialidade**
4. "A empresa assume algum risco?" -- Nao. A Juripass opera de forma independente.
5. "O colaborador pode processar a empresa por causa da Juripass?" -- Nao. O canal e externo e confidencial.
6. "A empresa tem acesso ao conteudo das conversas?" -- Nao. Nenhuma informacao e compartilhada com a empresa.

**Sobre implementacao**
7. "Como e feita a implementacao?" -- Simples: a empresa comunica o beneficio e a Juripass cuida do resto.
8. "Precisa de integracao com sistemas internos?" -- Nao. Funciona via WhatsApp, sem nenhuma integracao.
9. "Quanto tempo leva para comecar?" -- O piloto pode comecar em ate 2 semanas apos a contratacao.

**Sobre resultados**
10. "Os colaboradores realmente usam?" -- Sim. Adesao media de 30% nos primeiros 3 meses.
11. "Como medir o resultado?" -- Relatorios anonimizados de utilizacao, sem expor colaboradores.
12. "Qual o investimento?" -- Valor fixo mensal, sem cobranca por colaborador ou utilizacao.

**CTA final** -- "Ainda tem duvidas? Conversar rapidamente"

---

## 4. Atualizar roteamento (`src/App.tsx`)

Adicionar 3 novas rotas com lazy loading:

```text
/como-funciona -> ComoFunciona
/para-quem     -> ParaQuem
/faq           -> FAQ
```

---

## Detalhes tecnicos

- Cada pagina segue o layout: `HomeHeader` + conteudo + `Footer`
- Design system mantido: `py-12 md:py-20`, `text-3xl md:text-4xl`, cards com glassmorphism
- Accordion reutilizado do shadcn/ui para o FAQ
- Todas as paginas lazy-loaded via `React.lazy`
- WhatsApp placeholder `5511999999999` mantido
- Sem dependencias novas
- 3 novos arquivos em `src/pages/`, 0 novos componentes (reutiliza os existentes)
