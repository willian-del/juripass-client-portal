
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  role_title TEXT NOT NULL,
  message TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Anyone can insert leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No select/update/delete for anon
CREATE POLICY "Only service role can read leads"
ON public.leads
FOR SELECT
TO authenticated
USING (false);
