-- Enable pgcrypto extension for encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create enum for user roles
CREATE TYPE app_role AS ENUM ('super_admin', 'admin_empresa', 'usuario');

-- Create empresas table
CREATE TABLE public.empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo_empresa TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  cnpj TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Create usuarios table
CREATE TABLE public.usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_auth UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  numero_cliente TEXT UNIQUE NOT NULL,
  cpf_criptografado TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  tipo_usuario TEXT NOT NULL CHECK (tipo_usuario IN ('principal', 'dependente')),
  id_usuario_principal UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
  id_empresa UUID REFERENCES public.empresas(id) NOT NULL,
  grau_parentesco TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  id_empresa UUID REFERENCES public.empresas(id),
  UNIQUE(user_id, role, id_empresa)
);

-- Create atendimentos table
CREATE TABLE public.atendimentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_usuario UUID REFERENCES public.usuarios(id) NOT NULL,
  id_empresa UUID REFERENCES public.empresas(id) NOT NULL,
  descricao TEXT,
  data TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pendente',
  origem TEXT NOT NULL DEFAULT 'whatsapp',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Create sequence for numero_cliente
CREATE SEQUENCE IF NOT EXISTS numero_cliente_seq START 1;

-- Create function to check if user has a role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user has role in company
CREATE OR REPLACE FUNCTION public.has_role_in_empresa(_user_id UUID, _role app_role, _id_empresa UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND (id_empresa = _id_empresa OR id_empresa IS NULL)
  )
$$;

-- Create function to encrypt CPF
CREATE OR REPLACE FUNCTION public.encrypt_cpf(cpf_plain TEXT)
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT encode(digest(cpf_plain, 'sha256'), 'hex')
$$;

-- Create function to find user by CPF
CREATE OR REPLACE FUNCTION public.find_user_by_cpf(cpf_plain TEXT)
RETURNS SETOF public.usuarios
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.usuarios 
  WHERE cpf_criptografado = public.encrypt_cpf(cpf_plain)
    AND deleted_at IS NULL
$$;

-- Create function to generate numero_cliente
CREATE OR REPLACE FUNCTION public.generate_numero_cliente()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  next_num INTEGER;
  new_numero TEXT;
BEGIN
  next_num := nextval('numero_cliente_seq');
  new_numero := 'JP-' || LPAD(next_num::TEXT, 7, '0');
  RETURN new_numero;
END;
$$;

-- Create trigger to set numero_cliente before insert
CREATE OR REPLACE FUNCTION public.set_numero_cliente()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.numero_cliente IS NULL THEN
    NEW.numero_cliente := public.generate_numero_cliente();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_set_numero_cliente
  BEFORE INSERT ON public.usuarios
  FOR EACH ROW
  EXECUTE FUNCTION public.set_numero_cliente();

-- Create trigger to create default user role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'usuario');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.atendimentos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for empresas
CREATE POLICY "empresas_select_policy" ON public.empresas
  FOR SELECT
  USING (
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role_in_empresa(auth.uid(), 'admin_empresa', id)
  );

CREATE POLICY "empresas_insert_policy" ON public.empresas
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "empresas_update_policy" ON public.empresas
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "empresas_delete_policy" ON public.empresas
  FOR DELETE
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for usuarios
CREATE POLICY "usuarios_select_policy" ON public.usuarios
  FOR SELECT
  USING (
    id_auth = auth.uid() OR
    id_usuario_principal IN (SELECT id FROM public.usuarios WHERE id_auth = auth.uid()) OR
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role_in_empresa(auth.uid(), 'admin_empresa', id_empresa)
  );

CREATE POLICY "usuarios_insert_policy" ON public.usuarios
  FOR INSERT
  WITH CHECK (
    id_auth = auth.uid() OR
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role(auth.uid(), 'admin_empresa')
  );

CREATE POLICY "usuarios_update_policy" ON public.usuarios
  FOR UPDATE
  USING (
    id_auth = auth.uid() OR
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role_in_empresa(auth.uid(), 'admin_empresa', id_empresa)
  );

CREATE POLICY "usuarios_delete_policy" ON public.usuarios
  FOR DELETE
  USING (
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role_in_empresa(auth.uid(), 'admin_empresa', id_empresa)
  );

-- RLS Policies for user_roles
CREATE POLICY "user_roles_select_policy" ON public.user_roles
  FOR SELECT
  USING (
    user_id = auth.uid() OR
    public.has_role(auth.uid(), 'super_admin')
  );

CREATE POLICY "user_roles_insert_policy" ON public.user_roles
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "user_roles_update_policy" ON public.user_roles
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "user_roles_delete_policy" ON public.user_roles
  FOR DELETE
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for atendimentos
CREATE POLICY "atendimentos_select_policy" ON public.atendimentos
  FOR SELECT
  USING (
    id_usuario IN (SELECT id FROM public.usuarios WHERE id_auth = auth.uid()) OR
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role_in_empresa(auth.uid(), 'admin_empresa', id_empresa)
  );

CREATE POLICY "atendimentos_insert_policy" ON public.atendimentos
  FOR INSERT
  WITH CHECK (
    id_usuario IN (SELECT id FROM public.usuarios WHERE id_auth = auth.uid()) OR
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role_in_empresa(auth.uid(), 'admin_empresa', id_empresa)
  );

CREATE POLICY "atendimentos_update_policy" ON public.atendimentos
  FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role_in_empresa(auth.uid(), 'admin_empresa', id_empresa)
  );

CREATE POLICY "atendimentos_delete_policy" ON public.atendimentos
  FOR DELETE
  USING (
    public.has_role(auth.uid(), 'super_admin') OR
    public.has_role_in_empresa(auth.uid(), 'admin_empresa', id_empresa)
  );

-- Create indexes for performance
CREATE INDEX idx_usuarios_id_auth ON public.usuarios(id_auth);
CREATE INDEX idx_usuarios_cpf ON public.usuarios(cpf_criptografado);
CREATE INDEX idx_usuarios_id_empresa ON public.usuarios(id_empresa);
CREATE INDEX idx_usuarios_id_usuario_principal ON public.usuarios(id_usuario_principal);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);
CREATE INDEX idx_atendimentos_id_usuario ON public.atendimentos(id_usuario);
CREATE INDEX idx_atendimentos_id_empresa ON public.atendimentos(id_empresa);