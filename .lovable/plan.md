

# Auditoria Visual: Espacamento, Tipografia e Refinamento Estetico

## Diagnostico Geral

O site tem uma base solida e limpa, mas falta sofisticacao visual. As secoes sao muito similares em ritmo (mesmo padding, mesmas grids 3-col), criando monotonia. Faltam respiros visuais adequados, hierarquia tipografica mais clara e elementos que criem profundidade e premium feel.

---

## 1. Hero - Falta Impacto e Espaco Vertical

**Problema:** O hero tem `py-24 md:py-36` que e adequado, mas o titulo (text-4xl/text-5xl) compete com o subtitulo (text-xl/text-2xl) — a diferenca de escala e pequena. O botao CTA usa `py-6` customizado mas o `size="lg"` ja define tamanho. No mobile, o titulo ocupa quase a tela inteira sem respiro.

**Solucao:**
- Aumentar titulo para `text-4xl md:text-6xl` (de 5xl para 6xl no desktop)
- Subtitulo reduzir para `text-lg md:text-xl` para criar mais contraste hierarquico
- Adicionar `py-28 md:py-40` ao hero para mais presenca
- Remover `py-6` redundante do botao (ja tem `size="lg"`)

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/HeroSection.tsx` | Ajustar escala tipografica e padding |

---

## 2. Secoes Alternadas Sem Ritmo Visual

**Problema:** As secoes alternam entre `bg-accent/30`, `bg-background` e `bg-muted/20` mas com paddings muito parecidos (`py-16 md:py-24`, `py-12 md:py-20`). Isso cria uma monotonia visual — tudo parece ter o mesmo "peso". A SegmentationSection e HomeFAQSection usam `py-12 md:py-20` (mais compactas) sem razao clara.

**Solucao:** Padronizar o ritmo vertical:
- Secoes com fundo colorido: `py-20 md:py-28` (mais respiro)
- Secoes com fundo branco: `py-16 md:py-24` (padrao)
- MidCTA (destaque): manter `py-16 md:py-24` (mais compacto, e impactante)

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/RecognitionSection.tsx` | `py-16 md:py-24` para `py-20 md:py-28` |
| `src/components/new-home/WhatIsJuripassSection.tsx` | `py-16 md:py-24` para `py-20 md:py-28` |
| `src/components/new-home/ImpactSection.tsx` | `py-16 md:py-24` para `py-20 md:py-28` |
| `src/components/new-home/SegmentationSection.tsx` | `py-12 md:py-20` para `py-16 md:py-24` |
| `src/components/new-home/HomeFAQSection.tsx` | `py-12 md:py-20` para `py-16 md:py-24` |
| `src/components/new-home/BlogHighlightSection.tsx` | Manter `py-16 md:py-24` |

---

## 3. Titulos de Secao Sem Espaco Para Respirar

**Problema:** Em todas as secoes, o titulo e o conteudo abaixo estao em `space-y-10` ou `space-y-8`. O titulo nao tem espaco suficiente antes do conteudo, especialmente nas secoes com grids de cards. O olho nao "descansa" entre o titulo e os cards.

**Solucao:** Aumentar gap entre titulo e conteudo para `space-y-12` nas secoes com grids de cards. Manter `space-y-8` para secoes de texto puro (FAQ, CTA).

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/HowItWorksSection.tsx` | `space-y-10` para `space-y-12` |
| `src/components/new-home/ImpactSection.tsx` | `space-y-10` para `space-y-12` |
| `src/components/new-home/SegmentationSection.tsx` | `space-y-10` para `space-y-12` |
| `src/components/new-home/BlogHighlightSection.tsx` | `mb-12` do titulo ja esta bom |

---

## 4. Cards Sem Profundidade Suficiente

**Problema:** Os cards usam `shadow-sm` e `hover:shadow-md` — muito sutis. No site B2B moderno, cards precisam de mais profundidade para parecerem "elevados". A borda `border-border` e muito sutil tambem.

**Solucao:** 
- Subir shadow de `shadow-sm` para `shadow-md` no estado padrao
- Hover para `shadow-lg` com `shadow-primary/5` para dar um toque de cor
- Remover `hover:-translate-y-1` dos cards de RecognitionSection (grid 3x3, ficam "pulando" de forma confusa) mas manter nos cards de 3 colunas

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/RecognitionSection.tsx` | Remover hover translate, manter shadow |
| `src/components/new-home/HowItWorksSection.tsx` | `shadow-sm` para `shadow-md`, hover `shadow-lg` |
| `src/components/new-home/ImpactSection.tsx` | `shadow-sm` para `shadow-md`, hover `shadow-lg` |
| `src/components/new-home/WhatIsJuripassSection.tsx` | `shadow-sm` para `shadow-md`, hover `shadow-lg` (nos pilares) |

---

## 5. RecognitionSection - Grid Muito Apertado no Mobile

**Problema:** O grid 3x3 de items usa `grid-cols-2` no mobile, criando uma ultima linha com 1 item solitario (9 items / 2 = 4.5 linhas). Gap de `gap-4` e apertado para touch.

**Solucao:** 
- Usar `grid-cols-1 sm:grid-cols-2 md:grid-cols-3` para empilhar no mobile pequeno
- OU manter `grid-cols-2` mas garantir que o 9o item ocupe `col-span-2` no mobile

A opcao mais limpa: manter `grid-cols-2 md:grid-cols-3` e adicionar `gap-3 md:gap-4`.

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/RecognitionSection.tsx` | Ajustar gap mobile |

---

## 6. FinalCTASection - Texto Muito Longo sem Hierarquia

**Problema:** O paragrafo do CTA final e uma frase de 3 linhas sem destaque visual. A frase-chave "encaminhamento estruturado" deveria ter mais enfase.

**Solucao:** Destacar "encaminhamento estruturado" com `text-primary font-semibold`. Reduzir tamanho do texto de `text-2xl md:text-3xl` para `text-xl md:text-2xl` para dar mais elegancia.

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/FinalCTASection.tsx` | Adicionar destaque e ajustar escala |

---

## 7. Header Desktop - Nav Items Muito Juntos

**Problema:** O header desktop usa `gap-8` entre 7 itens de navegacao. No viewport de 1280px, os itens ficam um pouco apertados. O font-size `text-sm` esta correto mas o gap poderia ser maior.

**Solucao:** Reduzir para 6 itens no header agrupando "FAQ" dentro de outra pagina, ou simplesmente ajustar `gap-6` (ligeiramente menor mas com `px-2` em cada item para area de clique melhor).

Opcao simples: manter como esta, nao e critico.

---

## 8. OrganizationalProblemSection - Cards Fixos Demais

**Problema:** Os cards usam `w-[220px] md:w-[200px]` com largura fixa. No mobile, 220px para 4 cards empilhados funciona, mas no tablet (768px-1024px) o layout fica apertado. Tambem `min-h-[160px]` cria espaco vazio nos cards menores.

**Solucao:** Trocar largura fixa por largura responsiva: `w-full md:w-[200px]` para os cards, e remover `min-h-[160px]` (deixar conteudo definir a altura).

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/OrganizationalProblemSection.tsx` | Usar largura responsiva |

---

## 9. Espacamento do Footer

**Problema:** Footer com `py-10` e adequado. Mas o espaco entre a ultima secao e o footer (FinalCTASection com `py-16 md:py-24`) cria muito branco. A secao final nao tem bg diferenciada, entao o footer parece "perdido".

**Solucao:** Adicionar `border-t` mais visivel ou um bg sutil na FinalCTASection. O footer ja tem `bg-muted/30` o que ajuda. Nenhuma mudanca critica necessaria.

---

## Resumo de Prioridades

| Prioridade | Item | Impacto Visual |
|------------|------|----------------|
| Alta | Hero: escala tipografica e padding | Primeira impressao |
| Alta | Padronizar ritmo vertical entre secoes | Sofisticacao |
| Alta | Cards: aumentar profundidade (shadows) | Premium feel |
| Media | Titulos: mais espaco antes do conteudo | Respiro visual |
| Media | FinalCTA: hierarquia do texto | Clareza |
| Media | OrganizationalProblem: cards responsivos | Mobile/tablet |
| Baixa | RecognitionSection: grid mobile | UX mobile |

## Estimativa
7 arquivos modificados, apenas ajustes de classes CSS Tailwind. Nenhum componente novo.

