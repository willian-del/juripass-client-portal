
# Rodada 4 -- Pagina /avaliacao

## Resumo

Criar a pagina oculta `/avaliacao` para compartilhamento interno dentro da empresa cliente. Esta pagina consolida o pitch da Juripass em formato executivo, pensado para diretoria, financeiro e juridico avaliarem sem necessidade de reuniao.

Tambem inclui uma apresentacao navegavel (slides) e um one-pager para impressao/download.

---

## Arquivos a criar

### 1. `src/pages/Avaliacao.tsx`

Pagina principal com layout `HomeHeader + Footer`. Estrutura em blocos:

**Hero compacto**
- Titulo: "Um resumo para compartilhar internamente"
- Subtitulo: "Criamos esta pagina para facilitar a avaliacao com diretoria, financeiro e juridico — sem necessidade de nova reuniao."

**Bloco 1 -- O problema**
- Card com titulo "O que acontece hoje"
- Resumo: situacoes pessoais chegam ao RH/gestores sem canal adequado
- 3-4 bullets curtos

**Bloco 2 -- A solucao**
- Card com titulo "O que a Juripass faz"
- Canal externo, confidencial, sem envolvimento da empresa
- 3-4 bullets

**Bloco 3 -- Como funciona**
- 3 passos visuais (reutiliza conceito do HowItWorksSection)

**Bloco 4 -- Impacto organizacional**
- 3 colunas: RH, Gestores, Colaboradores (reutiliza conceito do ImpactSection)

**Bloco 5 -- FAQ resumido**
- 5 perguntas mais relevantes para decisores (risco, custo, implementacao)

**Bloco 6 -- Piloto**
- Card destacado com informacoes sobre o piloto
- Duracao: 90 dias
- Sem compromisso de continuidade
- Relatorio de utilizacao ao final

**Bloco 7 -- Investimento**
- Card com fundo destacado
- "Para o porte da sua empresa: aproximadamente R$5 mil mensais"
- "Valor fixo, sem cobranca por colaborador ou utilizacao."

**Bloco 8 -- CTAs finais**
- Botao: "Ver apresentacao completa" (abre componente de slides)
- Botao: "Baixar resumo em uma pagina" (abre one-pager para impressao)
- Botao: "Conversar rapidamente" (WhatsApp)

---

### 2. `src/components/avaliacao/SlidesPresentation.tsx`

Componente de apresentacao navegavel com 8 slides:

1. Capa -- "Juripass: Canal externo para situacoes pessoais dos colaboradores"
2. O fenomeno -- Situacoes pessoais que chegam ao RH
3. O impacto -- Desgaste em RH e gestores
4. Por que acontece -- Falta de canal adequado
5. A falha atual -- Tentativas informais de resolver
6. A Juripass -- O que e e como funciona
7. Reducao de risco -- Beneficios organizacionais
8. Piloto -- Proposta de teste de 90 dias

Navegacao: botoes Anterior/Proximo + indicadores de slide. Estilo minimalista e profissional.

---

### 3. `src/components/avaliacao/OnePager.tsx`

Pagina unica otimizada para impressao (`@media print`):

- Logo Juripass no topo
- O problema (3 linhas)
- O que a Juripass faz (3 linhas)
- Como funciona (3 passos)
- Piloto (duracao + condicoes)
- Investimento (~R$5 mil/mes)
- Contato (WhatsApp)

Botao "Imprimir / Salvar como PDF" que aciona `window.print()`.

---

## Arquivo a editar

### `src/App.tsx`

Adicionar rota lazy-loaded:
```
const Avaliacao = lazy(() => import("./pages/Avaliacao"));
// ...
<Route path="/avaliacao" element={<Avaliacao />} />
```

---

## Detalhes tecnicos

- Design system mantido: glassmorphism cards, `py-12 md:py-20`, tipografia padrao
- Slides usam estado local (`useState` para slide ativo), sem dependencia externa
- One-pager usa classes `print:` do Tailwind para ocultar header/footer na impressao
- WhatsApp placeholder `5511999999999` mantido
- Sem dependencias novas
- 3 novos arquivos, 1 arquivo editado
