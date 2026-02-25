
# Rodada 2 -- Secoes 7-10 da Home

## O que sera criado

Quatro novos componentes em `src/components/new-home/`:

### 1. MidCTASection.tsx
- Fundo com gradiente escuro (azul Juripass)
- Texto: "Se hoje essas situacoes chegam ate voce, vale uma conversa."
- Botao "Conversar rapidamente" com icone WhatsApp
- Layout centralizado, compacto

### 2. SegmentationSection.tsx
- Titulo: "Quem mais sente isso no dia a dia"
- Tres blocos (cards) lado a lado:
  - **Industria**: "Quando a vida pessoal impacta o turno" + 3 linhas explicativas
  - **Varejo**: "O cliente percebe primeiro" + 3 linhas explicativas
  - **Call center**: "O supervisor nao deveria ser apoio emocional" + 3 linhas explicativas
- Icones: Factory, ShoppingBag, Headphones (lucide)
- Estilo consistente com os cards existentes (glassmorphism, hover:-translate-y-1)

### 3. HomeFAQSection.tsx
- Titulo: "Perguntas frequentes"
- 5 perguntas com respostas curtas e tranquilizadoras usando Accordion:
  1. "Isso e assistencia juridica?" -- Nao. E um canal de orientacao e encaminhamento.
  2. "A empresa assume risco?" -- Nao. A Juripass opera de forma independente.
  3. "O colaborador pode processar a empresa por causa da Juripass?" -- Nao. O canal e externo e confidencial.
  4. "O RH deixa de apoiar o colaborador?" -- Nao. O RH continua com seu papel. A Juripass cuida do que nao cabe ao RH.
  5. "Os colaboradores realmente usam?" -- Sim. A adesao media e de 30% nos primeiros 3 meses.
- Reutiliza os componentes Accordion existentes

### 4. FinalCTASection.tsx
- Texto de fechamento: "A decisao nao e contratar um beneficio. E definir se essas situacoes continuarao sendo tratadas internamente ou terao um encaminhamento estruturado."
- CTA principal: "Conversar rapidamente" (WhatsApp)
- CTA secundario: "Compartilhar internamente" (link para /avaliacao)
- Fundo neutro, tipografia impactante

## Alteracao em arquivo existente

### src/pages/Index.tsx
Adicionar os 4 novos componentes apos ImpactSection, na ordem:
1. MidCTASection
2. SegmentationSection
3. HomeFAQSection
4. FinalCTASection

## Detalhes tecnicos
- Todos os componentes seguem o design system existente (padding py-12 md:py-20, tipografia text-3xl md:text-4xl, cards com bg-card/80 backdrop-blur-sm border hover)
- WhatsApp placeholder mantido como `5511999999999`
- Link do CTA secundario aponta para `/avaliacao` (pagina sera criada na Rodada 4)
- Sem dependencias novas
