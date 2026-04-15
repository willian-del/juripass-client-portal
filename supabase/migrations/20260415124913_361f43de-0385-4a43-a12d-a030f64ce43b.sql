
-- Add require_lead_info flag to material_shares
ALTER TABLE public.material_shares
ADD COLUMN require_lead_info boolean NOT NULL DEFAULT false;

-- Allow anonymous users to insert material_views (for the gate form tracking)
CREATE POLICY "Anyone can insert material_views"
ON public.material_views
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
