

# Substituir CTA "Agende uma conversa" por formulário de lead

## Resumo

Trocar todos os botões "Agende uma conversa" (que abrem o Google Calendar) por um modal/dialog com formulário de captação de lead. Ao enviar, os dados são salvos no banco e um email é disparado para comercial@juripass.com.br.

## Campos do formulário
- Nome (obrigatório)
- Email (obrigatório)
- Telefone (obrigatório)
- Empresa (obrigatório)
- Cargo (obrigatório)
- Mensagem (opcional)

## Arquitetura

### 1. Banco de dados — tabela `leads`
Criar tabela para persistir os leads:
- `id`, `name`, `email`, `phone`, `company`, `role_title`, `message`, `created_at`
- RLS: insert público (anon), select restrito

### 2. Edge function `send-lead-email`
- Recebe os dados do lead
- Salva na tabela `leads` (via service role)
- Envia email transacional para comercial@juripass.com.br usando Lovable AI (ou Resend se necessário)
- Retorna sucesso

### 3. Componente `LeadFormDialog`
- Dialog/modal usando Radix Dialog (já instalado)
- Formulário com validação via zod + react-hook-form
- Ao submeter: chama a edge function, exibe toast de sucesso, fecha o modal

### 4. Substituir `openScheduling` globalmente
- Trocar a função `openScheduling()` em `constants.ts` (ou criar nova) para abrir o dialog
- Abordagem: criar um componente de contexto (`LeadFormProvider`) que expõe `openLeadForm()` via context, wrappando o App
- Todos os botões que chamam `openScheduling` passam a chamar `openLeadForm()`

## Arquivos

| Arquivo | Ação |
|---|---|
| Migration SQL | Criar tabela `leads` |
| `supabase/functions/send-lead-email/index.ts` | Criar edge function |
| `src/components/ui/LeadFormDialog.tsx` | Criar componente do formulário modal |
| `src/contexts/LeadFormContext.tsx` | Criar provider + hook `useLeadForm` |
| `src/lib/constants.ts` | Remover `openScheduling` e `calendarUrl` |
| `src/App.tsx` | Wrap com `LeadFormProvider` |
| 14 arquivos que importam `openScheduling` | Trocar para `useLeadForm().open()` |

## Questão sobre envio de email

Para enviar o email para comercial@juripass.com.br, a melhor opção é usar um conector de email ou a Resend. Vou verificar se há um conector disponível, mas provavelmente será necessário configurar um serviço de envio de email na edge function.

