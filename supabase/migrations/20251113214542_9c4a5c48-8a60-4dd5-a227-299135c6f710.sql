-- Fix RLS recursion in usuarios select policy
DROP POLICY IF EXISTS usuarios_select_policy ON public.usuarios;

CREATE POLICY usuarios_select_policy ON public.usuarios
FOR SELECT
USING (
  id_auth = auth.uid()
  OR public.has_role(auth.uid(), 'super_admin'::app_role)
  OR public.has_role_in_empresa(auth.uid(), 'admin_empresa'::app_role, id_empresa)
);
