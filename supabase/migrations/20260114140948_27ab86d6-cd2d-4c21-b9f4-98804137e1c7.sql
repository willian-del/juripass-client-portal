-- ================================================
-- LIMPEZA COMPLETA DO BANCO DE DADOS
-- Removendo todas as tabelas, políticas, funções e triggers
-- que não fazem mais parte do escopo da homepage simples
-- ================================================

-- 1. Remover tabelas (na ordem correta respeitando foreign keys)
DROP TABLE IF EXISTS public.user_imports CASCADE;
DROP TABLE IF EXISTS public.invitation_links CASCADE;
DROP TABLE IF EXISTS public.atendimentos CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.usuarios CASCADE;
DROP TABLE IF EXISTS public.empresas CASCADE;

-- 2. Remover funções
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;
DROP FUNCTION IF EXISTS public.has_role_in_empresa(uuid, app_role, uuid) CASCADE;
DROP FUNCTION IF EXISTS public.encrypt_cpf(text) CASCADE;
DROP FUNCTION IF EXISTS public.find_user_by_cpf(text) CASCADE;
DROP FUNCTION IF EXISTS public.generate_numero_cliente() CASCADE;
DROP FUNCTION IF EXISTS public.set_numero_cliente() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- 3. Remover sequence
DROP SEQUENCE IF EXISTS public.numero_cliente_seq CASCADE;

-- 4. Remover enum type
DROP TYPE IF EXISTS public.app_role CASCADE;