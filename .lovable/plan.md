

# Atualizar remetente do email para contato.juripass.com.br

## Alteração

### `supabase/functions/send-lead-email/index.ts`
- Trocar o `from` de `"Juripass <onboarding@resend.dev>"` para `"Juripass <noreply@contato.juripass.com.br>"`

## Pré-requisito
Para que o Resend aceite enviar com esse domínio, é necessário verificá-lo no painel do Resend:
1. Acesse [resend.com/domains](https://resend.com/domains)
2. Adicione `contato.juripass.com.br`
3. Configure os registros DNS (MX, SPF, DKIM) que o Resend indicar no seu provedor de DNS
4. Aguarde a verificação

Sem essa verificação, o Resend rejeitará o envio. A alteração no código é simples — apenas uma linha.

