

# Adicionar botão de Preview nos materiais

## Problema
A página de materiais não tem como visualizar os materiais diretamente. Só existe o botão "Enviar para lead".

## Solução

Adicionar um botão **"Visualizar"** (ícone Eye) ao lado de cada material que:
- Para materiais **builtin** (`file_path` vazio): abre a rota `/avaliacao` em nova aba (onde já existem os componentes `SlidesPresentation` e `OnePager`)
- Para materiais com **arquivo**: gera uma URL temporária do storage e abre em nova aba

### Arquivo modificado

| Arquivo | Mudança |
|---------|---------|
| `src/pages/admin/AdminMaterials.tsx` | Adicionar botão "Visualizar" ao lado de "Enviar para lead" com lógica de preview por tipo |

### Detalhes

- Botão `variant="outline"` com ícone `Eye` + texto "Visualizar"
- Materiais builtin (`presentation` → `/avaliacao`, `one-pager` → `/avaliacao?view=onepager`) abrem em `window.open(..., '_blank')`
- Materiais com `file_path`: chama `supabase.storage.from('sales-materials').createSignedUrl(file_path, 3600)` e abre a URL assinada em nova aba

