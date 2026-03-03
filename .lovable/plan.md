

# Refatorar ImpactSection: 4 cards em grid 2x2

## Mudanças em `src/components/new-home/ImpactSection.tsx`

1. **Título**: "O impacto na organização" → "O impacto positivo"
2. **Dados**: 4 cards — Para o RH, Para os Gestores, Para os Colaboradores, Para a Organização (novo card com 4 bullets)
3. **Layout**: trocar `flex flex-col` por `grid grid-cols-1 md:grid-cols-2 gap-6` para 2x2 no desktop
4. **Bullets**: cada card com 4 bullets verticais (`flex flex-col gap-2`), sem wrap/quebra de linha — um por linha, leitura limpa
5. **Ícones**: manter os ícones existentes + adicionar `Building2` para o card "Para a Organização"

### Estrutura visual (desktop)
```text
┌──────────────────┐  ┌──────────────────┐
│  Para o RH       │  │  Para os Gestores│
│  • bullet        │  │  • bullet        │
│  • bullet        │  │  • bullet        │
│  • bullet        │  │  • bullet        │
│  • bullet        │  │  • bullet        │
└──────────────────┘  └──────────────────┘
┌──────────────────┐  ┌──────────────────┐
│  Para os Colab.  │  │  Para a Org.     │
│  • bullet        │  │  • bullet        │
│  • bullet        │  │  • bullet        │
│  • bullet        │  │  • bullet        │
│  • bullet        │  │  • bullet        │
└──────────────────┘  └──────────────────┘
```

Arquivo: `src/components/new-home/ImpactSection.tsx`

