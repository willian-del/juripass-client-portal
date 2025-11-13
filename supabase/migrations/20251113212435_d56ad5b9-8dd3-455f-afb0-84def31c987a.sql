-- Permitir SELECT público em empresas para validação de código durante cadastro
CREATE POLICY "empresas_public_select_for_registration"
ON public.empresas
FOR SELECT
TO public
USING (deleted_at IS NULL);