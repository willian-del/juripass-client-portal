

## Plano: 3 melhorias no CRM

### 1. Deletar leads (junk/teste)

**Problema**: Não existe RLS policy para DELETE na tabela `leads`, nem botão na UI.

**Solução**:
- Migração SQL: adicionar RLS policy para admins poderem deletar leads
- UI: Adicionar botão "Excluir" no `LeadDetailPanel` com confirmação (AlertDialog)
- Também adicionar seleção múltipla na `LeadTable` com botão "Excluir selecionados" para limpeza em massa

### 2. Histórico de chat no card do lead

**Problema**: A tabela `chat_conversations` tem `lead_id` mas o `LeadDetailPanel` não exibe as conversas.

**Solução**:
- No `LeadDetailPanel`, buscar `chat_conversations` onde `lead_id = lead.id`
- Exibir seção "Histórico de Chat" com as mensagens (parseando o campo JSONB `messages`)
- Mostrar data da conversa e resumo das mensagens
- Os materiais enviados já aparecem com contagem de visualizações — adicionar a data de envio (`sent_at`) que já é buscada mas não exibida

### 3. Integração de email no CRM

**Viabilidade e complexidade**:

Integrar email bidirecional (visualizar inbox + enviar) diretamente no CRM é **complexo e não viável nativamente** no Lovable:

- **Receber emails**: Requer acesso IMAP/API ao inbox da Juripass (ex: Google Workspace API com scopes `gmail.readonly`, `gmail.send`). Não há conector Gmail disponível no Lovable.
- **Enviar emails**: É possível enviar emails transacionais via a infraestrutura existente (Resend), mas não como um "cliente de email" integrado com thread/reply.
- **Alternativa recomendada**: Integrar com um CRM externo (HubSpot, Pipedrive) que já tem email nativo, ou usar um link direto para abrir o Gmail/Outlook com o email do lead pré-preenchido (`mailto:` link).

**O que posso implementar agora**: Botão "Enviar email" que abre o cliente de email do usuário com destinatário pré-preenchido (`mailto:`). Para integração completa, seria necessário um serviço externo.

### Mudanças técnicas

**Migração SQL**:
```sql
CREATE POLICY "Admins can delete leads"
ON public.leads FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
```

**`src/components/admin/LeadDetailPanel.tsx`**:
- Buscar `chat_conversations` do lead e exibir seção de histórico
- Mostrar `sent_at` nos materiais enviados
- Adicionar botão "Excluir lead" com AlertDialog de confirmação
- Adicionar link `mailto:` para abrir email

**`src/components/admin/LeadTable.tsx`**:
- Adicionar checkboxes para seleção múltipla
- Botão "Excluir selecionados" no topo

**`src/pages/admin/AdminLeads.tsx`**:
- Gerenciar estado de seleção e lógica de exclusão em massa

