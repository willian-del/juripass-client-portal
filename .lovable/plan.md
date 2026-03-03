
# Simplificar HowItWorksSection: texto puro + setas de progressão

## Mudanças em `src/components/new-home/HowItWorksSection.tsx`

1. **Remover ícones e numeração** dos cards — manter apenas título e descrição
2. **Adicionar seta (`ChevronRight`)** entre os cards no desktop para indicar progressão do processo
3. **No mobile**, as setas ficam verticais (`ChevronDown`) entre os cards empilhados
4. **Simplificar dados**: remover `icon` e `number` do array `steps`

### Estrutura visual (desktop)

```text
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Título      │ ──▶ │  Título      │ ──▶ │  Título      │
│  Descrição   │     │  Descrição   │     │  Descrição   │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Implementação

- Layout: `flex items-center` com cards intercalados por setas
- No mobile: `flex-col` com `ChevronDown` entre cards
- Cards mantêm o estilo visual atual (rounded-2xl, border, shadow)

Arquivo: `src/components/new-home/HowItWorksSection.tsx`
