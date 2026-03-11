

## Plano: Cartaz Institucional Juripass

### Abordagem

O cartaz institucional tem uma estrutura diferente dos temáticos (tem seções extras como "O que é", "O que está incluído", "O que não está incluído"). Vou criar um componente `InstitutionalPoster` dedicado dentro do mesmo arquivo, reutilizando os helpers existentes (`SectionTitle`, `Divider`, header/footer bands).

### Estrutura do cartaz institucional

1. **Header band** — logo branca + "Benefício jurídico disponível para colaboradores desta empresa"
2. **Headline** — "Tem dúvidas ou problemas jurídicos no seu dia a dia?" + subheadline
3. **Divider**
4. **O que é a Juripass** — 2 parágrafos explicativos
5. **Divider**
6. **Em quais situações pode ajudar** — lista com bullets (família, dívidas, consumo, aluguel, cotidiano)
7. **Divider**
8. **O que está incluído** — lista com checkmarks (✔)
9. **O que não está incluído** — lista com itens excluídos + nota sobre canais internos
10. **Divider**
11. **Como pedir ajuda** — 3 passos numerados (mesmo padrão)
12. **Nota de acolhimento** — box com borda lateral
13. **Footer band** — WhatsApp + telefone + QR Code
14. **Sub-footer** — logo + tagline

### Mudanças

**`src/components/avaliacao/PostersViewer.tsx`**
- Adicionar componente `InstitutionalPoster` com layout dedicado (mesmo padrão visual, seções diferentes)
- Adicionar `'institutional'` ao `POSTER_LABELS`
- Ajustar lógica do viewer: quando `posterId === 'institutional'`, renderizar `InstitutionalPoster`; quando sem filtro, incluir o institucional na lista navegável (total: 6 cartazes)
- Texto menor nas seções para caber em A4 (text-sm nos parágrafos, text-base nos items)

**Migration SQL** — inserir registro `poster-institutional` na tabela `sales_materials`

### Arquivo afetado
- `src/components/avaliacao/PostersViewer.tsx`
- Migration SQL para `sales_materials`

