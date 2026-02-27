
# Alinhar texto dos cards e forcar duas linhas

## O que muda

No `RecognitionSection.tsx`, dois ajustes nos cards:

1. **Texto alinhado a esquerda**: Adicionar `text-left` no span do label (ja esta implicitamente a esquerda pelo flex, mas garantir)
2. **Forcar duas linhas em todos os cards**: Ajustar os labels curtos para terem conteudo suficiente para duas linhas, e usar `line-clamp-2 min-h-[2.5rem]` no texto para garantir que todos ocupem exatamente 2 linhas de altura

### Labels ajustados (todos com volume para 2 linhas):

| Atual | Novo |
|-------|------|
| Endividamento e negativacao | Endividamento e negativacao (ja ok) |
| Conflitos familiares | Conflitos e questoes familiares |
| Problemas com moradia | Problemas com moradia e aluguel |
| Golpes e fraudes digitais | Golpes e fraudes digitais (ja ok) |
| Inventarios e documentos | Inventarios e regularizacao de documentos |
| Direitos do consumidor | Direitos do consumidor e compras |
| Separacao e guarda | Separacao e guarda de filhos |
| Pensao alimenticia | Revisao e pagamento de pensao |
| Cobrancas indevidas | Cobrancas e taxas indevidas |

### CSS do card:
- Adicionar `text-left` no container do texto
- Usar `min-h-[2.5rem]` no span para garantir espaco de 2 linhas
- Manter `items-start` ao inves de `items-center` para alinhar icone ao topo quando texto quebra

## Arquivo alterado

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/new-home/RecognitionSection.tsx` | Labels expandidos, texto alinhado a esquerda, altura de 2 linhas |
