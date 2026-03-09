

# Redefinir senha via Edge Function temporária

## Plano

1. **Criar edge function `reset-admin-password`** que usa o Supabase Admin API para atualizar a senha do usuário `frederico@juripass.com.br` para a senha informada
2. **Configurar `verify_jwt = false`** no config.toml para essa function (endpoint temporário)
3. **Invocar a function** para executar o reset
4. **Deletar a function** imediatamente após o uso

### Detalhes técnicos
- A function usará `SUPABASE_SERVICE_ROLE_KEY` (já configurado) para chamar `auth.admin.updateUserById()`
- O user ID do Frederico é `1c5d0a84-ffb8-4a59-9aea-347cd172010c`
- Após confirmar que funcionou, a function será removida por segurança

