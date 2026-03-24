

## Plano: Corrigir botao "Baixar PDF" da apresentacao

### Problema

O container de impressao (`.slides-print-container`) usa a classe `hidden` do Tailwind (`display: none`). O CSS de impressao so altera `visibility`, mas `display: none` tem precedencia — os slides nunca aparecem na impressao.

### Mudanca

**`src/components/avaliacao/SlidesPresentation.tsx`**

1. No bloco de print styles (linhas 460-474), adicionar regra para forcar `display: block` no container de impressao e garantir que cada slide ocupe uma pagina inteira em landscape.

2. Trocar a classe do container de impressao (linha 535) de `hidden` para uma classe que so esconde na tela mas aparece na impressao.

Mudancas especificas:

**Print CSS** — adicionar dentro do `@media print`:
```css
.slides-print-container { 
  display: block !important;
  position: absolute; left: 0; top: 0; width: 100%;
}
.slide-print-page {
  page-break-after: always;
  width: 100vw; height: 100vh;
  display: flex !important; align-items: center; justify-content: center;
}
```

**Container HTML** (linha 535): trocar `className="hidden slides-print-container"` para `className="hidden print:block slides-print-container"` — ou manter `hidden` e confiar no CSS `display: block !important` acima.

A abordagem mais segura e usar `display: block !important` no CSS de impressao, que ja esta no arquivo — so precisa ser adicionado.

### Resultado

O botao "Baixar PDF" vai gerar um PDF com todos os 11 slides, cada um em uma pagina landscape, com o conteudo visivel.

