

# Templates de Email Personalizáveis para Materiais

## Contexto
Hoje o email de envio de material usa um template HTML hardcoded na edge function `send-material-email`. O admin não tem como personalizar o conteúdo do email antes de enviar.

## Solução

### 1. Tabela `email_templates` no banco
Criar uma tabela para armazenar templates de email editáveis pelo admin:
- `id`, `name` (ex: "Envio de material padrão"), `subject_template`, `body_template`, `is_default`, `created_at`, `updated_at`
- Os templates usam variáveis como `{{lead_name}}`, `{{lead_company}}`, `{{material_title}}`, `{{material_description}}`, `{{share_url}}`
- RLS: apenas admins podem CRUD
- Inserir um template padrão (o atual) como seed

### 2. Nova página/seção de gestão de templates
Adicionar uma aba ou seção em `AdminMaterials.tsx` (ou nova rota `/admin/email-templates`) para:
- Listar templates existentes
- Criar novo template com campos: nome, assunto (subject), corpo (HTML com variáveis)
- Editar template existente
- Preview do email com dados fictícios substituindo as variáveis
- Marcar um template como padrão
- Excluir templates (exceto o padrão)

### 3. Seleção de template ao enviar
No dialog de compartilhamento (`shareOpen`), adicionar um `Select` para escolher o template de email antes de enviar. O template padrão vem pré-selecionado.

### 4. Edge function usa template do banco
Atualizar `send-material-email` para:
- Receber `templateId` opcional no body
- Se fornecido, buscar o template do banco; senão, usar o template padrão (`is_default = true`)
- Substituir as variáveis `{{...}}` pelos dados reais do lead/material
- Enviar via Resend com o HTML processado

## Arquivos modificados

| Arquivo / Recurso | Mudança |
|---|---|
| Tabela `email_templates` | Criar tabela + seed com template padrão |
| `src/pages/admin/AdminMaterials.tsx` | Adicionar seção de gestão de templates + seletor no dialog de envio |
| `supabase/functions/send-material-email/index.ts` | Buscar template do banco e processar variáveis |

## Variáveis disponíveis nos templates

| Variável | Valor |
|---|---|
| `{{lead_name}}` | Nome do lead |
| `{{lead_company}}` | Empresa do lead |
| `{{material_title}}` | Título do material |
| `{{material_description}}` | Descrição do material |
| `{{share_url}}` | Link de acesso ao material |

