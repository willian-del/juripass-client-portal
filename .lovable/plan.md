

# Redesign do fluxo visual na OrganizationalProblemSection

## Problema atual

A linha conectora (`h-px bg-border`) passa por cima dos cards porque usa `absolute top-1/2` e os cards nao tem z-index suficiente ou background opaco para cobri-la. O card "Desgaste" em especial fica com a linha preta visivel atravessando o texto. O design geral e simples demais.

## Novo design

Substituir o fluxo linear por um design mais sofisticado usando **chevrons/setas estilizadas** entre os cards, sem linha conectora absoluta. Inspirado em pipelines visuais de SaaS.

### Estrutura visual:

```text
[ Colaborador ]  -->  [ Gestor ]  -->  [ RH ]  -->  [ Desgaste ]
```

### Detalhes:

1. **Remover a linha conectora absoluta** (a causa do bug visual)
2. **Adicionar setas SVG** (`ChevronRight` do lucide) entre cada card como separadores visuais
3. **Cards mais elegantes**: padding maior, gradiente sutil no background, icones no topo de cada card (User, Users, Building2, AlertTriangle)
4. **Card "Desgaste" diferenciado**: fundo com gradiente vermelho sutil, icone de alerta, borda mais marcada
5. **Mobile**: Stack vertical com setas apontando para baixo (`ChevronDown`)
6. **Segunda linha de texto**: Destacar "Mas nenhum deles deveria assumir esse papel." em cor primary para mais impacto

### Icones por step:

| Step | Icone | Estilo |
|------|-------|--------|
| Colaborador | User | bg-accent, text-primary |
| Gestor | Users | bg-accent, text-primary |
| RH | Building2 | bg-accent, text-primary |
| Desgaste | AlertTriangle | bg-destructive/10, text-destructive |

### Layout do card:

- Icone circular no topo (40x40, rounded-full, bg colorido)
- Label em font-semibold
- Sublabel em text-muted-foreground
- rounded-2xl, shadow-sm, hover:shadow-md
- min-w-[140px]

### Setas entre cards:

- Desktop: `ChevronRight` com `text-muted-foreground/40`, tamanho 20px
- Mobile: `ChevronDown` centralizado entre os cards empilhados

## Arquivo alterado

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/new-home/OrganizationalProblemSection.tsx` | Redesign completo do fluxo visual com icones, setas e card diferenciado |

