## Problema

Na tela `/admin/materiais` todas as abas (Apresentações, Cartazes, etc.) aparecem vazias — "Nenhum material nesta categoria" — mesmo havendo 9 materiais cadastrados no banco (apresentações, one-pager, proposta, cartazes).

## Causa raiz

A migration de segurança anterior executou `REVOKE EXECUTE ... ON FUNCTION public.has_role FROM PUBLIC, anon, authenticated`.

Mas `has_role(auth.uid(), 'admin')` é usada dentro das policies RLS das tabelas:

- `sales_materials`
- `material_shares`
- `material_views`
- `leads`
- `email_templates`
- `chat_conversations`

Mesmo sendo `SECURITY DEFINER`, o caller (role `authenticated`) precisa ter EXECUTE para a função ser chamada dentro da policy. Sem EXECUTE, a chamada falha, a policy retorna falso, e todo SELECT do admin retorna 0 linhas — quebrando toda a área administrativa, não só Materiais.

As outras duas funções revogadas (`sanitize_lead_insert`, `calculate_lead_score`) são usadas apenas em **triggers**, que rodam como o owner da tabela — não precisam de EXECUTE para o caller. Podem ficar revogadas.

## Correção

Migration única:

```sql
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
```

Não conceder a `anon` nem a `public` — nenhuma policy chama `has_role` em contexto anônimo. Mantém o nível de segurança original sem expor a função fora do ciclo normal de avaliação de RLS.

## Verificação

1. Recarregar `/admin/materiais` → as 4 abas devem listar os 9 materiais existentes.
2. Conferir `/admin/leads` → leads devem voltar a aparecer.
3. Atualizar a memória de segurança esclarecendo que `has_role` precisa de EXECUTE para `authenticated` por ser usada em policies RLS (revogar quebra o admin).

## Nada mais é alterado

Nenhuma mudança em código React, edge functions ou outras policies.
