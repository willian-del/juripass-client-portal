

# Agente de AI Comercial Juripass

## Visão Geral

Construir um agente de IA com duas interfaces: um **chatbot público** no site para qualificar visitantes e um **assistente interno** no painel admin para o time comercial.

---

## Arquitetura

```text
┌─────────────────────────────────────────────┐
│  Frontend                                    │
│  ┌──────────────┐   ┌────────────────────┐  │
│  │ Chat Widget  │   │ Admin AI Assistant │  │
│  │ (público)    │   │ (/admin/leads)     │  │
│  └──────┬───────┘   └────────┬───────────┘  │
│         │                    │               │
└─────────┼────────────────────┼───────────────┘
          │                    │
    ┌─────▼────────────────────▼─────┐
    │  Edge Function: ai-commercial  │
    │  (Lovable AI Gateway)          │
    │  - mode: "qualify" ou "assist" │
    └────────────────────────────────┘
```

---

## 1. Edge Function `ai-commercial`

Uma única edge function com dois modos:

**Modo "qualify"** (chat público):
- System prompt com conhecimento completo da Juripass (produto, NR-01, benefícios, preços internos excluídos)
- Conversa natural para entender perfil do visitante (empresa, cargo, dor, tamanho)
- Ao coletar dados suficientes, usa tool calling para retornar dados estruturados do lead
- Lead é salvo automaticamente na tabela `leads` via service role

**Modo "assist"** (admin interno, autenticado):
- Recebe contexto do lead selecionado + histórico de leads da empresa
- Funcionalidades:
  - **Gerar proposta**: cria texto de proposta personalizada baseado no perfil
  - **Sugerir follow-up**: redige mensagens de acompanhamento
  - **Consultar produto**: responde dúvidas sobre objeções, diferenciais, scripts
  - **Analisar lead**: sugere abordagem baseada no score e qualificação

Usa `LOVABLE_API_KEY` (já configurado) com modelo `google/gemini-3-flash-preview`.

---

## 2. Chat Widget Público

Componente `ChatWidget.tsx` flutuante no canto inferior direito do site:
- Botão com ícone de chat (estilo Juripass, cor primary)
- Ao abrir, chat com streaming token-by-token
- Mensagem inicial: "Olá! Sou a assistente virtual da Juripass. Como posso ajudar?"
- Quando o agente coleta informações suficientes, oferece CTA para agendar conversa
- Se o visitante fornecer dados de contato durante o chat, o lead é criado automaticamente
- Sem autenticação necessária (endpoint público)

---

## 3. Assistente AI no Admin

Adicionar aba/painel no `AdminLeads.tsx`:
- Botão "AI Assistant" no header do CRM
- Drawer/Sheet com chat contextual
- Ao abrir com lead selecionado, injeta contexto do lead automaticamente
- Ações rápidas como botões:
  - "Gerar proposta comercial"
  - "Sugerir mensagem de follow-up"
  - "Como abordar este lead?"
- Respostas com markdown renderizado
- Requer autenticação admin (JWT validado na edge function)

---

## 4. Tabela de Conversas (opcional mas recomendada)

Nova tabela `chat_conversations` para persistir histórico:
- `id`, `session_id`, `lead_id` (nullable), `messages` (jsonb), `mode`, `created_at`
- RLS: insert anon para qualify, select/update admin para assist

---

## Arquivos Criados/Modificados

| Arquivo | Ação |
|---------|------|
| `supabase/functions/ai-commercial/index.ts` | Criar edge function |
| `supabase/config.toml` | Adicionar config da function |
| `src/components/chat/ChatWidget.tsx` | Widget flutuante público |
| `src/components/chat/ChatMessage.tsx` | Renderização de mensagens com markdown |
| `src/components/chat/useChat.ts` | Hook de streaming SSE |
| `src/components/admin/AIAssistantPanel.tsx` | Painel AI no admin |
| `src/pages/admin/AdminLeads.tsx` | Adicionar botão AI Assistant |
| `src/layouts/MainLayout.tsx` | Incluir ChatWidget |
| Migration SQL | Tabela `chat_conversations` |

---

## Fluxo de Qualificação Automática

1. Visitante abre chat → conversa natural
2. AI identifica: nome, empresa, cargo, interesse, tamanho
3. AI usa tool calling → retorna JSON estruturado
4. Edge function insere na tabela `leads` (trigger calcula score)
5. Se lead hot → dispara email via Resend (reusa lógica existente)
6. AI confirma ao visitante e sugere agendar conversa

---

## Segurança

- Modo "qualify": `verify_jwt = false`, sem auth, rate limit por IP/session
- Modo "assist": valida JWT + verifica role admin via `has_role()`
- Input sanitizado, mensagens limitadas a 500 chars por turno
- Histórico limitado a últimas 20 mensagens por contexto

