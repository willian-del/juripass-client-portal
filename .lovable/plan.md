

## Corrigir slides achatados no PDF exportado

### Problema
O canvas é capturado em 16:9 (1280×720) mas é esticado para preencher toda a página A4 landscape (297×210mm = ~1.41:1). Isso achata os slides verticalmente.

### Solução
Manter a proporção 16:9 do slide dentro da página A4, centralizando verticalmente com margens.

### Mudança

**`src/components/avaliacao/SlidesPresentation.tsx`** — função `handleExportPDF` (linhas 467-480):

```ts
const canvas = await html2canvas(sections[i], {
  scale: 1.5,
  useCORS: true,
  backgroundColor: '#E8F0FE',
  width: 1280,
  height: 720,
});

const imgData = canvas.toDataURL('image/jpeg', 0.75);
const pageW = 297;
const pageH = 210;

// Calcular dimensões mantendo aspect ratio 16:9
const imgWidth = pageW;
const imgHeight = (canvas.height * imgWidth) / canvas.width;
const offsetY = (pageH - imgHeight) / 2; // centralizar verticalmente

if (i > 0) pdf.addPage();
pdf.addImage(imgData, 'JPEG', 0, Math.max(0, offsetY), imgWidth, imgHeight);
```

A diferença: em vez de forçar `pageH` (210mm), calcula a altura proporcional (~167mm para 16:9) e centraliza o slide na página. Resultado: slides sem distorção, com pequenas margens superior/inferior.

