-- Adicionar campo ativo na tabela usuarios
ALTER TABLE public.usuarios ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT true;

-- Criar tabela para links de convite
CREATE TABLE IF NOT EXISTS public.invitation_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_empresa UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  max_uses INTEGER DEFAULT NULL,
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_invitation_links_token ON public.invitation_links(token);
CREATE INDEX IF NOT EXISTS idx_invitation_links_empresa ON public.invitation_links(id_empresa);

-- Criar tabela para importação de usuários
CREATE TABLE IF NOT EXISTS public.user_imports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_empresa UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  total_rows INTEGER NOT NULL,
  successful_rows INTEGER DEFAULT 0,
  failed_rows INTEGER DEFAULT 0,
  status TEXT DEFAULT 'processing',
  error_log JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_imports_empresa ON public.user_imports(id_empresa);

-- Enable RLS
ALTER TABLE public.invitation_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_imports ENABLE ROW LEVEL SECURITY;

-- RLS Policies para invitation_links
CREATE POLICY "Super admin can manage all invitation links"
ON public.invitation_links
FOR ALL
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admin empresa can manage their invitation links"
ON public.invitation_links
FOR ALL
USING (has_role_in_empresa(auth.uid(), 'admin_empresa'::app_role, id_empresa))
WITH CHECK (has_role_in_empresa(auth.uid(), 'admin_empresa'::app_role, id_empresa));

-- RLS Policies para user_imports
CREATE POLICY "Super admin can view all imports"
ON public.user_imports
FOR SELECT
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admin empresa can view their imports"
ON public.user_imports
FOR SELECT
USING (has_role_in_empresa(auth.uid(), 'admin_empresa'::app_role, id_empresa));

CREATE POLICY "Super admin can create imports"
ON public.user_imports
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admin empresa can create imports for their company"
ON public.user_imports
FOR INSERT
WITH CHECK (has_role_in_empresa(auth.uid(), 'admin_empresa'::app_role, id_empresa));

CREATE POLICY "Super admin can update imports"
ON public.user_imports
FOR UPDATE
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admin empresa can update their imports"
ON public.user_imports
FOR UPDATE
USING (has_role_in_empresa(auth.uid(), 'admin_empresa'::app_role, id_empresa));