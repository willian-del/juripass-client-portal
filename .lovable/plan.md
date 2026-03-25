

## Plano: Reorganizar materiais em abas por categoria

### Situacao atual
A pagina tem 2 abas no topo: "Materiais" (com 4 secoes visuais dentro) e "Templates de Email". O usuario quer que cada categoria de material vire sua propria aba.

### Mudanca

**`src/pages/admin/AdminMaterials.tsx`**

Substituir as 2 abas atuais por 5 abas:
- **Apresentacoes** — `presentation`, `presentation-colaborador`
- **One-Pager** — `one-pager`
- **Divulgacao** — `posters`, `poster-*`
- **Templates** — documentos genericos (pdf, etc.)
- **Templates de Email** — conteudo atual da aba "templates" (emails)

Cada aba de material mostra diretamente a tabela filtrada (sem os blocos de secao com header). O botao "+ Novo material" e a contagem ficam dentro de cada aba.

Remover `MATERIAL_SECTIONS` e o loop de secoes. Cada `TabsContent` renderiza a tabela de materiais filtrada pela categoria correspondente, reutilizando o mesmo JSX da tabela atual.

Para evitar duplicacao, extrair o bloco da tabela de materiais numa funcao auxiliar `renderMaterialsTable(filteredMaterials)` que recebe a lista filtrada e retorna o JSX da tabela com acoes.

