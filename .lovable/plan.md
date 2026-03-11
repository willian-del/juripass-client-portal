

## Plano: Corrigir impressão (cores e múltiplas páginas)

### Problemas identificados

1. **Apenas 1 página**: O CSS `body * { visibility: hidden }` esconde tudo, e `[data-poster-root] { position: relative }` não é suficiente — os posters ficam empilhados fora do fluxo visível. O container pai dos posters também precisa estar visível.

2. **Sem cores**: O CSS de impressão usa `visibility: hidden` em tudo e depois restaura apenas nos posters. Mas os backgrounds aplicados via `style={{ backgroundColor }}` e `className` podem ser perdidos. Precisamos de `-webkit-print-color-adjust: exact; print-color-adjust: exact;` para forçar cores na impressão.

### Correção em `src/components/avaliacao/PostersViewer.tsx`

Reescrever o bloco `<style>` de impressão (linhas 317-326):

```css
@media print {
  /* Hide everything except posters */
  body > *:not(#root) { display: none !important; }
  .print\\:hidden { display: none !important; }
  
  /* Make poster containers visible and in flow */
  [data-poster-root] {
    position: relative;
    break-after: page;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  @page { size: A4 portrait; margin: 0; }
}
```

Também adicionar um `id="posters-container"` ao wrapper div e usar uma abordagem mais robusta: em vez de `visibility: hidden` em tudo (que quebra o layout), usar `display: none` apenas nos elementos que não são posters.

**Abordagem final simplificada**: Remover a estratégia `visibility: hidden` e usar apenas classes `print:hidden` nos elementos que devem sumir, mantendo o fluxo normal do documento na impressão. Os posters já têm `pageBreakAfter: 'always'` no inline style.

Mudanças:
1. **Linha 291** (container principal): remover `bg-muted/40` na impressão
2. **Linhas 317-326**: reescrever CSS de print para não usar `visibility: hidden`, e sim esconder apenas navbar/sidebar/etc via seletores mais específicos, forçar cores, e garantir page breaks entre posters.

