

## Plano: Reescrever o Agente de Qualificação (prompt + fluxo + CTA)

O agente atual é prolixo, repete informações, trava no fluxo e coleta dados manualmente em vez de usar o formulário. As mudanças são em 3 frentes: **system prompt**, **tool calling** (novo tool para abrir CTA), e **ChatWidget** (renderizar botão de CTA inline).

---

### 1. Reescrever o `QUALIFY_SYSTEM_PROMPT` (edge function)

Substituir o prompt atual (~70 linhas) por um prompt mais curto, conversacional e orientado a conversão. Pontos-chave:

- **Formato WhatsApp**: máx. 3 frases curtas por resposta, 1 pergunta por vez
- **Explicação única**: descrever a Juripass no máx. 1 vez na conversa
- **Fluxo de qualificação**: (1) boas-vindas curta → (2) identificar perfil (RH? quantos colab?) → (3) qualificar interesse → (4) CTA ou material
- **Lead quente → CTA**: quando o lead demonstrar interesse ("quero valores", "quero agendar"), usar a tool `open_lead_form` em vez de coletar dados manualmente
- **Lead quente → Material**: quando solicitado, usar tool `send_material` para enviar apresentação/one-pager
- **Empatia natural**: evitar jargões de marketing, linguagem direta e humana
- **Sem repetição**: NR-01, impacto, produtividade etc. mencionados no máx. 1 vez
- **Fallback**: se não souber, dizer "Boa pergunta. Nosso time pode explicar melhor em uma conversa rápida."
- **Proibido**: buscar info na web, emitir opiniões, inventar dados, mencionar concorrentes
- **Base de conhecimento**: apenas conteúdo oficial Juripass
- **Atualizar posicionamento**: "Plataforma de prevenção e monitoramento de riscos humanos" (alinhado com home)

### 2. Adicionar tool `open_lead_form` (edge function)

Nova tool definition que o modelo pode chamar quando o lead estiver pronto para agendar/preencher formulário. O edge function detecta essa tool call e envia um evento SSE especial `{ action: "open_lead_form" }` para o frontend.

### 3. Adicionar tool `send_material` (edge function)

Nova tool que o modelo chama quando o lead pede material. Parâmetros: `type` (apresentacao | one_pager), `email` (opcional). O edge function:
- Cria um share link via tabela `material_shares`
- Retorna o link ao modelo para incluir na resposta

### 4. Atualizar `ChatWidget.tsx` — renderizar ação de CTA

- Importar `useLeadForm` do contexto
- No stream parser (`useChat.ts`), detectar eventos `{ action: "open_lead_form" }` e emitir callback
- No `ChatWidget`, quando o evento chegar, abrir automaticamente o `LeadFormDialog`
- Renderizar botões inline nas mensagens do assistente (quando a mensagem contiver `[AGENDAR]` ou similar, renderizar como botão)

### 5. Atualizar mensagem de boas-vindas

Trocar a welcome message atual (longa e genérica) por:

> "Olá! 👋 Sou a assistente da Juripass.\n\nAjudamos empresas a estruturar o acolhimento de questões pessoais dos colaboradores e apoiar o RH na gestão de riscos psicossociais.\n\nVocê trabalha com RH ou gestão de pessoas?"

---

### Resumo de arquivos

| Arquivo | Mudança |
|---------|---------|
| `supabase/functions/ai-commercial/index.ts` | Reescrever `QUALIFY_SYSTEM_PROMPT`, adicionar tools `open_lead_form` e `send_material`, processar novas tool calls |
| `src/components/chat/useChat.ts` | Detectar eventos de ação (`open_lead_form`) e expor callback |
| `src/components/chat/ChatWidget.tsx` | Importar `useLeadForm`, conectar callback para abrir formulário, atualizar welcome message |
| `src/components/chat/ChatMessage.tsx` | Renderizar botões de ação inline (agendar, material) |

