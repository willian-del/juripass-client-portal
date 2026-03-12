

## Análise: Leads duplicados para Rachel Lima

### Causa

O sistema atual só tem rate limiting de **5 minutos** por email (linhas 121-135 de `send-lead-email/index.ts`). Se a mesma pessoa submeter o formulário com intervalos maiores que 5 minutos, um novo lead é criado a cada vez. Os 3 registros de "Rachel Lima" no screenshot confirmam isso — todos do dia 10/03/2026.

### Solução proposta

Duas ações:

**1. Deduplicação na inserção** — Na edge function `send-lead-email`, ao invés de apenas checar os últimos 5 minutos, verificar se já existe um lead com o mesmo email. Se existir, fazer `UPDATE` (atualizar dados) em vez de `INSERT`, e retornar sucesso sem criar duplicata.

**2. Limpeza dos duplicados existentes** — Migração SQL para remover os leads duplicados, mantendo apenas o mais recente de cada email.

### Mudanças

**`supabase/functions/send-lead-email/index.ts`**
- Antes do insert, buscar lead existente por email (sem filtro de tempo)
- Se encontrar, fazer `update` nos campos do lead existente em vez de `insert`
- Manter o rate limiting de 5 min como proteção contra spam

**Migração SQL** — Remover duplicatas existentes:
```sql
DELETE FROM leads a
USING leads b
WHERE a.email = b.email
  AND a.created_at < b.created_at;
```

### Resultado
Cada email terá no máximo 1 registro na tabela de leads. Resubmissões atualizarão os dados do lead existente.

