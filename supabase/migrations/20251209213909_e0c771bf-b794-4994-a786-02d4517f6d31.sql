-- Migrar CPFs em texto plano para formato criptografado SHA256
-- CPFs em texto plano têm até 14 caracteres (com formatação)
-- CPFs criptografados SHA256 têm exatamente 64 caracteres

UPDATE usuarios 
SET cpf_criptografado = public.encrypt_cpf(
  REGEXP_REPLACE(cpf_criptografado, '[^0-9]', '', 'g')
)
WHERE LENGTH(cpf_criptografado) <= 14 
  AND deleted_at IS NULL;

-- Preparar usuário para teste de Primeiro Acesso
-- Limpar id_auth de um dependente existente para permitir teste do fluxo
UPDATE usuarios 
SET id_auth = NULL 
WHERE email = 'rachel@email.com' 
  AND deleted_at IS NULL;