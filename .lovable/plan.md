

## Plano: Criação rápida de lead + Gate opcional no MaterialViewer

### Problema
Ao compartilhar um material via WhatsApp, o admin muitas vezes só tem o nome do prospect. Atualmente, é obrigatório selecionar um lead existente (com nome, empresa, email) para gerar o link.

### Solução em duas partes

---

### Parte 1 — Criar lead rápido no diálogo de compartilhamento

No diálogo de compartilhamento em `AdminMaterials.tsx`:

- Adicionar um botão **"+ Novo lead rápido"** abaixo do Select de leads
- Ao clicar, exibe campos inline: **Nome** (obrigatório), **Empresa** e **Email** (opcionais)
- Ao salvar, insere o lead na tabela `leads` (com os campos opcionais como string vazia) e seleciona-o automaticamente no Select
- Adicionar um **toggle/switch** "Solicitar dados ao destinatário" (padrão: desligado) que será salvo junto com o share

### Parte 2 — Gate opcional no MaterialViewer

- **Migração SQL**: Adicionar coluna `require_lead_info boolean default false` na tabela `material_shares`
- Atualizar `handleShare` para incluir o valor do toggle ao criar o share
- Atualizar a edge function `serve-material` para retornar a flag `require_lead_info` e o `share_id`
- No `MaterialViewer.tsx`, antes de exibir o material: se `require_lead_info = true`, mostrar um formulário elegante (mesmo visual da landing page) pedindo **Nome** e **Email**
- Ao submeter, atualizar o lead correspondente via uma nova edge function (ou a mesma `serve-material` com ação de update), preenchendo nome/email se estiverem vazios
- Após preenchimento, liberar a visualização normalmente

### Detalhes técnicos

**Arquivos modificados:**
1. `src/pages/admin/AdminMaterials.tsx` — botão de criação rápida + toggle no share dialog
2. `src/pages/MaterialViewer.tsx` — gate de captura de dados
3. `supabase/functions/serve-material/index.ts` — retornar flag + aceitar update de lead
4. Migração SQL — nova coluna `require_lead_info` em `material_shares`

**Fluxo do admin:**
1. Clica "Enviar para lead" no material
2. Clica "+ Novo lead rápido" → digita só o nome → Salvar
3. Opcionalmente ativa "Solicitar dados ao destinatário"
4. Copia o link e envia por WhatsApp

**Fluxo do prospect (com gate ativo):**
1. Abre o link → vê a landing page com formulário de Nome + Email
2. Preenche e clica "Acessar Material"
3. Dados salvos no lead → material liberado

