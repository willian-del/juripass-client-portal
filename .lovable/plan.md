
## Plano: Gerar links de materiais direto do card da oportunidade

### Problema
Hoje, para enviar um novo material a um lead, o admin precisa sair do card da oportunidade, ir até `/admin/materials`, gerar o link, e voltar. Fluxo quebrado.

### Solução
Adicionar um botão **"Gerar novo link"** dentro da aba "Materiais" do `LeadDetailPanel`, que abre um seletor inline com os materiais disponíveis. Ao escolher, gera o `material_share` (token) vinculado ao lead atual e, opcionalmente, dispara o email.

### Como funciona

Na aba **Materiais** do card, acima da lista de materiais já enviados:

1. Botão **"+ Gerar novo link"** abre um popover/select com a lista de `sales_materials` ativos.
2. Ao selecionar um material:
   - Cria registro em `material_shares` com `lead_id` (atual), `material_id`, `token` (uuid) e `require_lead_info` herdado do material.
   - Adiciona à lista de materiais enviados (refresh automático).
   - Mostra toast com opções: **"Copiar link"** e **"Enviar por email"**.
3. O botão **"Enviar por email"** chama a edge function `send-material-email` (já existente) somente se o lead tiver email real (não `@juripass.temp`).

### Detalhes técnicos

**Arquivo: `src/components/admin/LeadDetailPanel.tsx`**
- Adicionar query para buscar `sales_materials` ativos (uma vez ao abrir o card).
- Adicionar função `handleGenerateLink(materialId)`:
  - `insert` em `material_shares` retornando o token.
  - Refresh da lista de shares do lead.
  - Toast com ações.
- UI: `Popover` ou `Select` com lista de materiais, agrupados por tipo (Apresentação, One-Pager, Proposta, etc.).

**RLS já permite** admins criarem shares (políticas existentes em `material_shares`).

### Arquivo impactado
- `src/components/admin/LeadDetailPanel.tsx` — adicionar seção de geração de link na aba Materiais.

### Resultado
Admin gera e envia novos materiais sem sair do card da oportunidade.
