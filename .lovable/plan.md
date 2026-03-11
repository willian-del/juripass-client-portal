

## Plano: Agente reconhece que o formulário já foi preenchido

### Problema
Após o lead preencher o formulário, o agente continua oferecendo o formulário porque não tem informação de que ele já foi submetido. O contexto da conversa não inclui esse estado.

### Solução

Duas mudanças coordenadas:

**1. `src/contexts/LeadFormContext.tsx`** — Expor estado `hasSubmitted` no contexto
- Adicionar `hasSubmitted: boolean` ao contexto
- Quando o formulário for enviado com sucesso, setar `hasSubmitted = true`
- O `LeadFormDialog` precisa comunicar o sucesso de volta (via callback `onSuccess`)

**2. `src/components/chat/ChatWidget.tsx`** — Enviar flag `leadFormSubmitted` ao agente
- Ler `hasSubmitted` do `useLeadForm()`
- Passar `leadFormSubmitted: true` no body do `send()` quando aplicável

**3. `src/components/chat/useChat.ts`** — Incluir `leadFormSubmitted` no payload enviado à edge function

**4. `supabase/functions/ai-commercial/index.ts`** — Ajustar o system prompt dinamicamente
- Ler `leadFormSubmitted` do body da requisição
- Quando `true`, adicionar ao system prompt: "O visitante JÁ preencheu o formulário de agendamento. NÃO ofereça o formulário novamente. Agradeça, confirme que o time entrará em contato e ofereça materiais ou tire dúvidas."
- Não invocar `open_lead_form` tool quando a flag estiver ativa

### Arquivos afetados
- `src/contexts/LeadFormContext.tsx`
- `src/components/ui/LeadFormDialog.tsx` (callback onSuccess)
- `src/components/chat/ChatWidget.tsx`
- `src/components/chat/useChat.ts`
- `supabase/functions/ai-commercial/index.ts`

