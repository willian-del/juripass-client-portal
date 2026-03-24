

## Plano: Reduzir tamanho do PDF exportado (de 116MB para ~2-5MB)

### Problema
O PDF está enorme porque cada slide é capturado como PNG com `scale: 2` (2560x1440 pixels) — imagens PNG sem compressão resultam em ~10MB por slide. Com 11 slides = ~110MB.

### Solução
Duas mudanças simples no `handleExportPDF`:

**`src/components/avaliacao/SlidesPresentation.tsx`** (linhas 466-480)

1. **Reduzir escala de captura**: `scale: 2` → `scale: 1.5` (1920x1080 — ainda boa qualidade)
2. **Usar JPEG em vez de PNG**: `canvas.toDataURL('image/jpeg', 0.75)` — compressão com qualidade visual adequada
3. **Usar formato JPEG no addImage**: `pdf.addImage(imgData, 'JPEG', ...)` em vez de `'PNG'`

Resultado estimado: cada slide passa de ~10MB para ~200-400KB → PDF final ~3-5MB.

### Mudança de código

```ts
const canvas = await html2canvas(sections[i], {
  scale: 1.5,          // era 2
  useCORS: true,
  backgroundColor: '#E8F0FE',  // fundo sólido (evita transparência PNG)
  width: 1280,
  height: 720,
});

const imgData = canvas.toDataURL('image/jpeg', 0.75);  // era image/png
// ...
pdf.addImage(imgData, 'JPEG', 0, 0, pageW, pageH);     // era PNG
```

