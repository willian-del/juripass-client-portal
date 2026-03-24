

## Plano: Dividir materiais em 4 seções por categoria

### Situação atual
Todos os 7 materiais aparecem numa única tabela flat. O usuário quer agrupá-los em seções visuais.

### Mudanças

**`src/pages/admin/AdminMaterials.tsx`**

1. Dentro da `TabsContent value="materials"`, substituir a tabela única por 4 seções colapsáveis/visuais:
   - **Apresentações** — materiais com `file_type === 'presentation'`
   - **One-Pager** — materiais com `file_type === 'one-pager'`
   - **Divulgação** — materiais com `file_type === 'posters'` ou `file_type.startsWith('poster-')`
   - **Templates** — documentos genéricos (`pdf`, `document`, etc.)

2. Cada seção terá:
   - Um título (`h2`) com ícone e contagem de itens
   - A mesma tabela atual (título, tipo, envios, views, data, ações), mas filtrada por categoria
   - Seções vazias ficam ocultas ou mostram estado vazio discreto

3. Mover o helper de categorização para uma função que mapeia `file_type` → seção:
   ```ts
   function getSectionKey(fileType: string): string {
     if (fileType === 'presentation') return 'apresentacoes';
     if (fileType === 'one-pager') return 'onepager';
     if (fileType === 'posters' || fileType.startsWith('poster-')) return 'divulgacao';
     return 'templates';
   }
   ```

4. Agrupar `materials` por seção e renderizar cada grupo com seu heading + tabela.

5. O botão "Novo material" e contagem total permanecem no topo.

### Resultado
A página mostra 4 blocos organizados com os materiais distribuídos por tipo, melhorando a navegação visual.

