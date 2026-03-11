

## Plano: Categorias genéricas de tipo + botão de download na tabela

### Situação atual

A coluna "Tipo" mostra o `file_type` bruto (ex: `POSTER-INSTITUTIONAL`, `POSTER-DEBT`, `ONE-PAGER`). O usuário quer categorias mais simples: **Poster**, **Presentation**, **One-Pager**. Além disso, quer um botão de download direto na tabela.

### Mudanças em `src/pages/admin/AdminMaterials.tsx`

**1. Mapeamento de tipo para categoria genérica**

Criar uma função helper que converte `file_type` em label amigável:
- `presentation` → `Apresentação`
- `one-pager` → `One-Pager`
- `posters`, `poster-*` → `Cartaz`
- `pdf`, `document`, etc. → `Documento`

Usar badge com cor diferente por categoria.

**2. Botão de download na tabela**

Adicionar ícone de download (`Download` do lucide) na coluna de ações. Ao clicar:
- **Materiais builtin** (sem `file_path`): acionar `window.print()` via `handlePreview` (abrir visualizador onde já existe o botão Imprimir/Salvar)
- **Materiais com arquivo** (`file_path`): gerar signed URL e abrir download direto

### Arquivo afetado
- `src/pages/admin/AdminMaterials.tsx`

