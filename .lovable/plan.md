

# Configurar envio de email transacional para comercial@juripass.com.br

## Situação atual
A edge function `send-lead-email` salva o lead no banco mas **não envia email** — apenas loga no console.

## Abordagem
Usar a **API do Resend** para enviar um email de notificação para `comercial@juripass.com.br` sempre que um novo lead for recebido. O Resend é o serviço mais simples para emails transacionais e oferece 100 emails/dia gratuitos.

## Pré-requisito: API Key do Resend
1. Criar conta gratuita em [resend.com](https://resend.com)
2. Gerar uma API Key
3. Armazenar como secret `RESEND_API_KEY` no projeto

**Nota:** Sem verificar um domínio próprio, o remetente será `onboarding@resend.dev`. Para usar um remetente como `noreply@juripass.com.br`, será necessário verificar o domínio no Resend.

## Alteração: `supabase/functions/send-lead-email/index.ts`

Após salvar o lead no banco, adicionar chamada à API do Resend:

```typescript
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
if (RESEND_API_KEY) {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Juripass <onboarding@resend.dev>",
      to: ["comercial@juripass.com.br"],
      subject: `Novo lead: ${name} - ${company}`,
      html: `<h2>Novo lead recebido</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Cargo:</strong> ${role_title}</p>
        <p><strong>Mensagem:</strong> ${message || "—"}</p>`,
    }),
  });
}
```

## Resumo

| Passo | Ação |
|---|---|
| 1 | Solicitar `RESEND_API_KEY` ao usuário |
| 2 | Atualizar edge function com envio via Resend |
| 3 | Deploy e teste da edge function |

