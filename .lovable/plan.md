

## Plano: Corrigir impressão do kit de cartazes e atualizar descrição

### Problemas identificados

1. **Impressão mostra só 1 página**: O componente `PostersViewer` renderiza apenas o cartaz atual (`currentId`) na tela. Ao imprimir, só esse cartaz vai para o PDF. Precisa renderizar todos os 6 cartazes no DOM durante a impressão.

2. **Descrição errada no banco**: O registro `posters` (id `92b1932c...`) tem descrição "Kit com 5 cartazes temáticos: Genérico, Nome sujo, Banco/cartão, Consumidor e Família" — faltam temas e o total está errado (são 6: Institucional, Família, Endividamento, Trabalho, Aluguel e Imóvel, Consumo).

### Mudanças

**1. `src/components/avaliacao/PostersViewer.tsx`**

- Na área de renderização (linha ~420), renderizar **todos** os cartazes no DOM mas mostrar apenas o atual na tela (os demais ficam com `hidden` via classe, mas visíveis no `@media print`)
- Adicionar `page-break-after: always` entre cartazes na impressão
- Manter a navegação por paginação para visualização em tela

**2. Migração SQL** — Atualizar descrição do material:
```sql
UPDATE sales_materials 
SET description = 'Kit com 6 cartazes temáticos: Institucional, Família, Endividamento, Trabalho, Aluguel e Imóvel, e Consumo. Formato A4 para impressão.'
WHERE id = '92b1932c-fbcb-48e8-9eb5-45e55e0ea5ae';
```

