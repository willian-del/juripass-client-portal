

# Revisao Geral da Hero Section

## Achados

### Layout e Espaçamento
1. **Padding vertical excessivo no mobile** -- `py-28 md:py-40` resulta em muito espaço vazio acima e abaixo, especialmente no mobile (py-28 = 7rem = 112px de cada lado). Reduzir para `py-16 md:py-28` para melhor aproveitamento de tela.
2. **H1 quebra em 3 linhas no desktop** -- O título "Plataforma de Suporte Jurídico para Gestão de Pessoas" quebra de forma deselegante. Ampliar `max-w-3xl` para `max-w-4xl` no container de texto resolve a quebra.
3. **Parágrafo descritivo** -- `max-w-2xl` está adequado, mas pode ser ajustado para `max-w-[680px]` para evitar quebras indesejadas.

### Acessibilidade e Semântica
4. **Falta `aria-label` ou `role` na section** -- Adicionar `aria-labelledby` com id no h1 para melhor acessibilidade.
5. **Botão CTA** -- Indentação inconsistente (espaços extras nas linhas 27-28). Limpeza de formatação.

### SEO
6. **Meta description no SEOHead vs Hero** -- A descrição do SEOHead no Index.tsx e o parágrafo da Hero são praticamente idênticos, o que é bom para consistência. Sem problemas aqui.
7. **Falta de link interno** -- A Hero tem apenas um CTA externo (Google Calendar). Adicionar um link secundário tipo "Saiba mais" apontando para `/como-funciona` ou scroll para a próxima seção fortaleceria a navegação interna e o link juice.

### Discrepancias
8. **Tagline no BRAND.meta vs H1** -- `BRAND.tagline` diz "Segurança jurídica na palma da sua mão" mas o H1 diz "Plataforma de Suporte Jurídico para Gestão de Pessoas". São mensagens diferentes mas servem propósitos distintos (alt text vs headline), sem conflito real.

### Redundancia
9. **Duas HeroSections** -- Existe `src/components/home/HeroSection.tsx` (legado) e `src/components/new-home/HeroSection.tsx` (atual). O legado não é usado em Index.tsx, mas pode gerar confusão. Pode ser removido se não estiver em uso em `LegacyHome.tsx`.

---

## Plano de Mudancas

### 1. Ajustar espaçamentos e largura (`new-home/HeroSection.tsx`)
- Padding: `py-28 md:py-40` → `py-16 md:py-28`
- Container de texto: `max-w-3xl` → `max-w-4xl`
- Adicionar `id="hero"` na section e `id="hero-title"` no h1 com `aria-labelledby`

### 2. Adicionar link interno secundario
- Incluir um botao/link `variant="ghost"` abaixo do CTA principal, com texto como "Saiba como funciona →" apontando para `/como-funciona`, fortalecendo a interligacao interna

### 3. Limpeza de formatacao
- Corrigir indentacao inconsistente no bloco do Button

