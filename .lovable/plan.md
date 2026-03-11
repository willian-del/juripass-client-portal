

## Plano: Corrigir impressão em branco dos cartazes

### Problema
O CSS de impressão esconde tudo com `body * { visibility: hidden }` e tenta mostrar apenas elementos com `[data-poster-root]`, mas nenhum elemento no JSX tem esse atributo. Resultado: página em branco.

### Correção

**`src/components/avaliacao/PostersViewer.tsx`** — duas mudanças mínimas:

1. **Linha ~143** (componente `Poster`, div raiz): adicionar `data-poster-root` ao container do poster:
   ```tsx
   <div data-poster-root className="w-[210mm] min-h-[297mm] ...">
   ```

2. **Linha ~319-324** (print CSS): também garantir que o container pai dos posters fique visível, adicionando posição absoluta para que os posters apareçam no fluxo de impressão:
   ```css
   @media print {
     body * { visibility: hidden; }
     .print\\:hidden { display: none !important; }
     [data-poster-root], [data-poster-root] * { visibility: visible; }
     [data-poster-root] { position: relative; }
     @page { size: A4 portrait; margin: 0; }
   }
   ```

Mudança mínima: adicionar 1 atributo ao JSX do poster + ajuste no CSS.

