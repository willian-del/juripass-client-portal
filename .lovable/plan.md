
# Refazer ImpactSection: cards empilhados com bullets inline

## Mudança

Trocar o layout de 3 colunas lado a lado (`grid md:grid-cols-3`) por cards empilhados verticalmente (`flex flex-col gap-6`). Em cada card, o ícone e título ficam na parte superior, e os bullets são exibidos em uma linha horizontal (usando `flex flex-wrap gap`) ao invés de lista vertical, eliminando quebras de linha e tornando a leitura mais fluida.

### Estrutura de cada card

```text
┌──────────────────────────────────────────────┐
│  [icon]  Para o RH                           │
│                                              │
│  • Bullet 1   • Bullet 2   • Bullet 3  ...  │
└──────────────────────────────────────────────┘
```

### Mudanças em `src/components/new-home/ImpactSection.tsx`

1. **Layout**: `grid md:grid-cols-3` → `flex flex-col gap-6 max-w-3xl mx-auto`
2. **Card interno**: ícone + título na mesma linha (`flex items-center gap-3`), seguido dos bullets
3. **Bullets**: de `ul space-y-2` vertical para `flex flex-wrap gap-x-6 gap-y-2`, cada bullet inline com o dot ao lado
4. **Largura do card**: full-width, sem hover translate (mais clean empilhado)

Arquivo: `src/components/new-home/ImpactSection.tsx`
