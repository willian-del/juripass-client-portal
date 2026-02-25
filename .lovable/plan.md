
# Reposicionamento Completo do Site Juripass

## Resumo

Recriacao total do conteudo e arquitetura do site Juripass, passando de "beneficio juridico corporativo" para "canal externo de encaminhamento de situacoes pessoais sensiveis dos colaboradores". Manter cores, header, footer e logo. Criar 5 paginas novas e preservar a versao atual em rota oculta.

---

## Estrutura de Paginas

| Rota | Pagina |
|------|--------|
| `/` | Home (nova) |
| `/como-funciona` | Como funciona |
| `/para-quem` | Segmentacao por ICP |
| `/faq` | FAQ completo |
| `/avaliacao` | Pagina oculta de fechamento |
| `/site-anterior` | Versao atual preservada |

---

## Etapa 1 -- Preservar versao atual

- Renomear `Index.tsx` para `LegacyHome.tsx`
- Criar rota `/site-anterior` apontando para `LegacyHome`
- Manter todos os componentes antigos intactos em `src/components/home/`

## Etapa 2 -- Atualizar roteamento

Atualizar `App.tsx` com as novas rotas:
- `/` -> nova Home
- `/como-funciona` -> ComoFunciona
- `/para-quem` -> ParaQuem
- `/faq` -> FAQ
- `/avaliacao` -> Avaliacao
- `/site-anterior` -> LegacyHome

## Etapa 3 -- Atualizar Header

Alterar navegacao do `HomeHeader.tsx`:
- Links: "Como Funciona", "Para Quem", "FAQ"
- CTA principal: "Conversar rapidamente" (link WhatsApp ou formulario)
- Manter botao "Area do Cliente"
- Adaptar para funcionar tanto com scroll (Home) quanto com rotas (outras paginas)

## Etapa 4 -- Nova Home (`src/pages/Index.tsx`)

Criar com as seguintes secoes (novos componentes em `src/components/new-home/`):

1. **HeroSection** -- Titulo: "Alguns problemas pessoais dos colaboradores nao sao da empresa. Mas acabam chegando ate ela." + subtitulo + CTA "Conversar rapidamente" + imagem gerada por IA (gestor sendo abordado por colaborador preocupado)

2. **RecognitionSection** -- "O que costuma chegar ao RH -- mesmo nao sendo tema do RH" com bullets (dividas, separacao, moradia, plano de saude, conflitos familiares, decisoes financeiras)

3. **OrganizationalProblemSection** -- "O RH nao tem um problema juridico. Tem um problema de encaminhamento." + fluxo visual (colaborador -> gestor -> RH -> desgaste)

4. **WhatIsJuripassSection** -- Canal externo e confidencial + bullets de esclarecimento + frase destaque

5. **HowItWorksSection** -- 3 passos simples com diagrama visual

6. **ImpactSection** -- 3 colunas: Para o RH / Para gestores / Para colaboradores

7. **MidCTASection** -- "Se hoje essas situacoes chegam ate voce, vale uma conversa."

8. **SegmentationSection** -- Blocos para Industria, Varejo, Call center

9. **HomeFAQSection** -- 5 perguntas resumidas com respostas curtas

10. **FinalCTASection** -- Texto de fechamento + CTA principal + CTA secundario para `/avaliacao`

## Etapa 5 -- Pagina `/como-funciona`

Pagina dedicada com detalhamento dos 3 passos, diagrama de fluxo visual, e explicacao do modelo de atendimento.

## Etapa 6 -- Pagina `/para-quem`

Segmentacao por ICP com blocos expandidos:
- Industria: "Quando a vida pessoal impacta o turno"
- Varejo: "O cliente percebe primeiro"
- Call center: "O supervisor nao deveria ser apoio emocional"

Cada bloco com 3 linhas explicativas e contexto.

## Etapa 7 -- Pagina `/faq`

FAQ completo com as perguntas especificadas + perguntas adicionais. Tom tranquilizador, respostas curtas.

## Etapa 8 -- Pagina `/avaliacao`

Pagina oculta para compartilhamento interno:
- Resumo do problema
- Como funciona
- Impacto organizacional
- FAQ completo
- Investimento (~R$5 mil/mes)
- Botoes: "Baixar resumo" e "Ver apresentacao comercial"

## Etapa 9 -- Apresentacao navegavel

Componente de slides navegavel dentro do site (nao PDF) com 8-12 slides cobrindo: fenomeno, impacto, falha atual, Juripass, funcionamento, reducao de risco, piloto.

## Etapa 10 -- One-pager

Pagina de resumo de 1 tela com: problema, o que a Juripass faz, como funciona, piloto, investimento. Com botao para download/impressao.

## Etapa 11 -- Atualizar Footer e constantes

- Atualizar tagline em `constants.ts`
- Atualizar meta description
- Footer permanece igual

---

## Detalhes Tecnicos

- **Novos arquivos**: ~15-20 componentes em `src/components/new-home/` + 4 novas paginas em `src/pages/`
- **Componentes reutilizados**: Header (adaptado), Footer, Button, Card, Accordion, LogoJuripass
- **Imagem IA**: Gerar imagem do hero usando Lovable AI (google/gemini-2.5-flash-image)
- **Design system**: Manter padroes existentes (cores, tipografia, espacamento, hover effects)
- **Navegacao**: react-router-dom para paginas, scroll suave para secoes dentro da Home
- **Tom de voz**: Humano, operacional, sem linguagem juridica tecnica
- **Responsividade**: Mobile-first como o site atual

### Ordem de implementacao sugerida

Dado o tamanho, recomendo implementar em 3-4 rodadas:
1. Preservar site antigo + nova Home (secoes 1-6)
2. Home (secoes 7-10) + Header atualizado
3. Paginas /como-funciona, /para-quem, /faq
4. Pagina /avaliacao + apresentacao + one-pager
