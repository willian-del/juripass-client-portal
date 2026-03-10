

## Plano: Alinhar botões da barra superior dos cartazes

O problema é que os botões "Imprimir / Salvar PDF" e "Fechar" podem estar desalinhados verticalmente em relação ao logo e título à esquerda.

### Mudança

**`src/components/avaliacao/PostersViewer.tsx` (linha 293)**

Adicionar `items-center` explicitamente nos containers internos e garantir alinhamento vertical consistente. O container pai já tem `flex items-center justify-between`, mas o container dos botões (linha 298) pode precisar de `items-center` reforçado. Vou também padronizar o `size` dos botões e garantir que o ícone e texto estejam alinhados dentro de cada botão com `inline-flex items-center`.

Mudança mínima: na div dos botões (linha 298), confirmar `flex items-center gap-2` e nos `Button`, usar `className="inline-flex items-center gap-1"` para alinhar ícone + texto internamente.

