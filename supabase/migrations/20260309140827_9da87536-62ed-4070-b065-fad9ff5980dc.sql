
-- 1. Sales materials catalog
CREATE TABLE public.sales_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  file_path text NOT NULL,
  file_type text NOT NULL DEFAULT 'pdf',
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.sales_materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage sales_materials"
  ON public.sales_materials FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 2. Material shares (trackable links per lead)
CREATE TABLE public.material_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id uuid NOT NULL REFERENCES public.sales_materials(id) ON DELETE CASCADE,
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  token uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  sent_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.material_shares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage material_shares"
  ON public.material_shares FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Public can select by token (for the viewer page, via edge function with service role)
-- No public RLS needed since edge function uses service role key

-- 3. Material views (access tracking)
CREATE TABLE public.material_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  share_id uuid NOT NULL REFERENCES public.material_shares(id) ON DELETE CASCADE,
  viewed_at timestamptz NOT NULL DEFAULT now(),
  ip_address text,
  user_agent text
);

ALTER TABLE public.material_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read material_views"
  ON public.material_views FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 4. Storage bucket for sales materials (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('sales-materials', 'sales-materials', false);

-- Storage RLS: admins can upload/read/delete
CREATE POLICY "Admins can manage sales-materials files"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'sales-materials' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'sales-materials' AND public.has_role(auth.uid(), 'admin'));
