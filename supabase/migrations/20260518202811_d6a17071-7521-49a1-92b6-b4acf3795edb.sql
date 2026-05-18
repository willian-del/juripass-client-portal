
-- Remove anon direct insert on leads; force traffic through edge function (service role)
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

-- Revoke public EXECUTE on SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.sanitize_lead_insert() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.calculate_lead_score() FROM PUBLIC, anon, authenticated;
