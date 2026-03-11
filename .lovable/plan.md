

## Plano: Corrigir sobreposição do botão Fechar

### Causa raiz

Há **dois botões Fechar** renderizados simultaneamente:

1. **Externo** — em `AdminMaterials.tsx` (linha 428-432): um botão `absolute top-4 right-4 z-[60]` que é sempre renderizado quando `previewType` está ativo
2. **Interno** — em `PostersViewer.tsx` (linha 277-283): dentro da top bar sticky, renderizado quando `onClose` é passado como prop

Ambos aparecem no canto superior direito, causando sobreposição.

### Solução

Remover o botão Fechar externo de `AdminMaterials.tsx` quando o `previewType` for `'posters'` ou `'onepager'`, já que esses componentes possuem seus próprios botões de fechar internos. Alternativa mais simples: remover o bloco `absolute top-4 right-4` inteiro, pois todos os 3 viewers (Slides, Posters, OnePager) já recebem `onClose` e têm controle interno.

### Mudanças

**`src/pages/admin/AdminMaterials.tsx`** (linhas 428-432)
- Remover o `<div className="absolute top-4 right-4 z-[60]">` com o botão Fechar duplicado
- Os viewers internos já cuidam do botão Fechar via prop `onClose`

### Arquivo afetado
- `src/pages/admin/AdminMaterials.tsx`

