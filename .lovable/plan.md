
# Redesign da Pagina "Como Funciona" com Fluxo Visual

## Objetivo
Transformar a pagina atual `/como-funciona` de um layout simples de cards empilhados para um fluxo visual conectado e envolvente, mostrando claramente a jornada do colaborador e o processo de implantacao.

## O que muda

### 1. Hero com mais impacto
- Adicionar badge "Simples e confidencial" no topo
- Subtitulo mais descritivo com destaque em bold para termos-chave
- Dois botoes: CTA primario "Agende uma conversa" e secundario "Ver para quem" (link para /para-quem)
- Background com gradiente e formas decorativas (mesmo padrao visual da pagina NR-01)

### 2. Fluxo visual dos 3 passos (jornada do colaborador)
Substituir os cards empilhados por um layout com **linha conectora vertical** entre os passos, criando uma sensacao de fluxo/timeline:
- Cada passo tem um circulo numerado conectado por uma linha vertical tracejada
- Icone grande a esquerda, conteudo a direita
- Detalhes em bullet points mantidos
- Animacao de entrada com `ScrollReveal` e delay progressivo
- Badge de "Primeiro retorno em ate 1 dia util" ao final da timeline

### 3. Secao "Por que externo e confidencial?"
Nova secao entre os passos e a implantacao, com 3 cards lado a lado explicando:
- **Externo**: o colaborador nao precisa se expor internamente
- **Confidencial**: a empresa nao recebe informacoes individuais
- **Sem conflito**: o canal nao gera passivo para a empresa

### 4. Implantacao com timeline horizontal
Transformar o grid 2x2 atual em uma **timeline horizontal** com 4 etapas conectadas por setas:
- Cada etapa com icone, titulo e descricao
- Indicador de prazo "Ate 15 dias" com icone de relogio
- Badge "Sem taxa de implantacao" em destaque

### 5. Secao de links internos
Adicionar secao "Saiba mais" antes do CTA final, com cards linkando para:
- Pagina NR-01 ("Entenda a Nova NR-01")
- Pagina Para Quem ("Descubra se faz sentido para sua empresa")
- Artigo do blog sobre implementacao

### 6. CTA final mantido
Mesmo padrao atual com gradiente primario.

## Detalhes tecnicos

| Arquivo | Acao |
|---------|------|
| `src/pages/ComoFunciona.tsx` | Reescrever com fluxo visual, timeline, nova secao de diferenciais, links internos e ScrollReveal |

- Usa `ScrollReveal` para animacoes de entrada (mesmo padrao de NR01.tsx)
- Usa `Link` do react-router-dom para links internos
- Usa `Badge` de shadcn para tags
- Usa `Button` de shadcn para CTAs
- Todos os imports de icones do lucide-react
- URL de agendamento via `BRAND.calendarUrl`
- Nao cria arquivos novos, apenas reescreve a pagina existente
