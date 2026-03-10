

## Plano: Corrigir alinhamento dos botões

O problema: o `Button` já tem `inline-flex items-center gap-2` no seu base style (via `buttonVariants`). Ao adicionar `className="inline-flex items-center gap-1"`, estamos criando conflito de classes CSS (dois valores de `gap` competindo), o que pode causar comportamento inconsistente.

### Correção

**`src/components/avaliacao/PostersViewer.tsx` (linhas 299-305)**

Remover o `className` redundante dos dois botões. O `Button` já cuida do alinhamento interno. Manter apenas o `variant` e `size`:

```tsx
<Button variant="outline" size="sm" onClick={handlePrint}>
  <Download className="h-4 w-4" /> Imprimir / Salvar PDF
</Button>
{onClose && (
  <Button variant="ghost" size="sm" onClick={onClose}>
    <X className="h-4 w-4" /> Fechar
  </Button>
)}
```

O container pai (`flex items-center gap-2`) já garante alinhamento vertical entre os botões.

