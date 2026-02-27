
# Cards uniformes + 2 novos cards na RecognitionSection

## O que muda

Atualmente sao 7 cards com tamanhos variados (o texto de cada um tem comprimento diferente, causando alturas desiguais). Vamos:

1. **Adicionar 2 novos cards**: "Pagamento de pensao alimenticia" e "Cobranças indevidas e direitos do consumidor"
2. **Uniformizar tamanho**: Usar `h-[80px]` fixo nos cards e `items-center` para manter todos com a mesma altura
3. **Grid 3x3**: Com 9 cards, o grid `md:grid-cols-3` fica perfeitamente equilibrado (3 linhas de 3)
4. **Texto padronizado**: Ajustar os labels para terem volume de texto similar (2-4 palavras cada)

## Alteracao: `src/components/new-home/RecognitionSection.tsx`

**Novo array de items (9 itens):**

| Icone | Label |
|-------|-------|
| Wallet | Endividamento e negativacao |
| Heart | Conflitos familiares |
| Home | Problemas com moradia |
| Shield | Golpes e fraudes digitais |
| FileText | Inventarios e documentos |
| CreditCard | Direitos do consumidor |
| Users | Separacao e guarda |
| Scale (novo) | Pensao alimenticia |
| ShoppingBag (novo) | Cobranças indevidas |

**Ajustes no card:**
- Adicionar `min-h-[72px]` para garantir altura uniforme
- Manter layout `flex items-center gap-3`
- Importar `Scale` e `ShoppingBag` do lucide-react

## Arquivo alterado

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/new-home/RecognitionSection.tsx` | 2 novos cards, altura uniforme, imports |
