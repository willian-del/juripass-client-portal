

## Plano: Corrigir top bar e otimizar impressão A4

### Problema 1: Botão Fechar sobrepondo Imprimir

Na top bar (linha 257), o label fica à esquerda e todos os botões (paginação + Imprimir + Fechar) ficam à direita empilhados. O botão Fechar está ao lado do Imprimir sem espaço adequado.

**Solução:** Mover o botão Fechar para a extrema direita com separador visual, e garantir `gap-3` entre Imprimir e Fechar. Padrão igual ao OnePager (linha 14-27) onde Imprimir e Fechar têm espaçamento claro.

### Problema 2: Conteúdo achatado no PDF / não ocupa A4 inteiro

O poster usa `max-w-[210mm]` mas sem altura mínima, então o conteúdo fica comprimido no topo da página. Para ocupar a página A4 inteira:

**Solução:**
- Adicionar `min-h-[297mm]` ao poster root com `flex flex-col`
- O body (seção central) recebe `flex-1` para expandir e distribuir o conteúdo verticalmente
- Body usa `justify-between` em vez de `space-y-5` fixo, para que as seções se distribuam uniformemente na página
- Aumentar padding do body: `px-8 py-6` → `px-10 py-8`
- Header e footer mantêm tamanho fixo, body expande para preencher

### Mudanças em `PostersViewer.tsx`

1. **Top bar** — adicionar `gap-3` e separador entre Imprimir e Fechar
2. **Poster root** — adicionar `min-h-[297mm] flex flex-col`
3. **Body** — `flex-1 flex flex-col justify-between px-10 py-8` (distribui seções verticalmente)
4. **Print styles** — adicionar `min-height: 297mm` e `width: 210mm` ao `[data-poster-root]`

### Arquivo afetado
- `src/components/avaliacao/PostersViewer.tsx`

