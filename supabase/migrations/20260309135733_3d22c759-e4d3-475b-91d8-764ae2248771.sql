
-- Drop the overly permissive insert policy
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

-- Create a tighter insert policy that restricts which columns can be set
-- We use a trigger to enforce that admin-only fields cannot be set by anonymous users
CREATE OR REPLACE FUNCTION public.sanitize_lead_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Force admin-only fields to their defaults on public insert
  -- These will be set by the calculate_lead_score trigger or by admins
  NEW.lead_score := 0;
  NEW.lead_priority := 'normal';
  NEW.funnel_stage := 'novo';
  NEW.contacted_at := NULL;
  NEW.notes := '';
  RETURN NEW;
END;
$$;

-- This trigger runs BEFORE the scoring trigger to sanitize input first
DROP TRIGGER IF EXISTS sanitize_lead_insert_trigger ON public.leads;
CREATE TRIGGER sanitize_lead_insert_trigger
  BEFORE INSERT ON public.leads
  FOR EACH ROW
  WHEN (current_setting('role') = 'anon')
  EXECUTE FUNCTION public.sanitize_lead_insert();

-- Re-create the insert policy (still allows public inserts, but now sanitized)
CREATE POLICY "Anyone can insert leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
