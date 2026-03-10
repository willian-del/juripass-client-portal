

## Plano: Corrigir entrega de materiais no chat e evitar loop de "Preparando material"

### Problema raiz
Quando o modelo chama `send_material`, o edge function envia um evento de ação ao frontend, mas:
1. O frontend apenas faz `console.log` — nenhum material é entregue ao usuário
2. O texto sintético "Pronto! Estou preparando o material" não contém nenhum link
3. Quando o lead repete o pedido, o mesmo ciclo se repete indefinidamente

### Correção

**1. Edge function (`supabase/functions/ai-commercial/index.ts`)**

Alterar o texto sintético do `send_material` para incluir um link clicável direto:
- Apresentação → `/avaliacao` (já renderiza `SlidesPresentation` standalone)
- One-pager → `/avaliacao` com parâmetro ou rota dedicada

O texto sintético passa a ser algo como:
```
"Aqui está a apresentação da Juripass:\nhttps://juripass-client-portal.lovable.app/avaliacao\n\nSe quiser, posso abrir o formulário para agendar uma conversa com o time."
```

Construir a URL base usando o header `Origin` ou `Referer` do request para funcionar em preview e produção.

**2. ChatMessage (`src/components/chat/ChatMessage.tsx`)**

Adicionar renderização de links como clicáveis no markdown do assistente. O `react-markdown` já converte links automaticamente, mas precisamos garantir que `target="_blank"` seja aplicado para links externos.

**3. ChatWidget (`src/components/chat/ChatWidget.tsx`)**

Remover o `console.log` do handler de `send_material` — o material agora é entregue inline na mensagem.

### Resumo de arquivos

| Arquivo | Mudança |
|---------|---------|
| `supabase/functions/ai-commercial/index.ts` | Incluir URL real no texto sintético de `send_material` |
| `src/components/chat/ChatMessage.tsx` | Garantir links clicáveis com `target="_blank"` no markdown |
| `src/components/chat/ChatWidget.tsx` | Limpar handler de `send_material` (remover console.log) |

