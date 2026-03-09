

# Melhorias no Painel de Materiais Comerciais

## Resumo das mudanças solicitadas

### 1. Layout em lista (tabela)
Substituir os cards atuais por uma tabela compacta com colunas: Título, Tipo, Envios, Visualizações, Data, Ações. Mais eficiente para muitos documentos.

### 2. Botão Visualizar abre o material diretamente
Ao clicar em "Visualizar", abrir o componente `SlidesPresentation` ou `OnePager` diretamente na página (overlay fullscreen), sem redirecionar para `/avaliacao`. Para materiais com arquivo, abrir a URL assinada em nova aba.

### 3. Editar e excluir materiais
- **Editar**: Dialog para alterar título e descrição do material
- **Excluir**: Botão com confirmação (AlertDialog) que deleta o material, seus shares e views associados, e o arquivo do storage se houver

### 4. Enviar link por email
Novo botão "Enviar por email" no dialog de compartilhamento. Ao selecionar o lead, gera o link e envia automaticamente por email usando a edge function `send-material-email` (nova) via Resend, com o mesmo padrão visual do `send-lead-email`. Registra o share e rastreia abertura normalmente.

### Arquivos modificados

| Arquivo / Recurso | Mudança |
|---|---|
| `src/pages/admin/AdminMaterials.tsx` | Refatorar para layout tabela, adicionar preview inline, editar, excluir, enviar por email |
| `supabase/functions/send-material-email/index.ts` | Nova edge function para enviar email com link do material ao lead via Resend |

### Detalhes técnicos

**Layout tabela**: Usar componentes `Table` existentes. Envios expandem em sub-linhas ou tooltip.

**Preview inline**: Renderizar `<SlidesPresentation onClose={...} />` ou `<OnePager onClose={...} />` como overlay dentro do AdminMaterials, sem navegar.

**Excluir**: Cascade — deletar `material_views` → `material_shares` → `sales_materials` → arquivo no storage. Usar `supabase.from('material_views').delete().in('share_id', shareIds)` antes de deletar shares e material.

**Edge function `send-material-email`**: Recebe `{ materialId, leadId, shareUrl }`, busca dados do lead e material, envia email formatado via Resend com botão para abrir o material. Usa a mesma `RESEND_API_KEY` já configurada.

