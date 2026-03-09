-- Fix: Convert all RESTRICTIVE-only policies to PERMISSIVE
-- Without at least one PERMISSIVE policy per table, all access is denied

-- === leads ===
DROP POLICY IF EXISTS "Admins can read leads" ON public.leads;
CREATE POLICY "Admins can read leads" ON public.leads
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
CREATE POLICY "Admins can update leads" ON public.leads
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- === sales_materials ===
DROP POLICY IF EXISTS "Admins can manage sales_materials" ON public.sales_materials;
CREATE POLICY "Admins can manage sales_materials" ON public.sales_materials
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- === user_roles ===
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;
CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- === chat_conversations ===
DROP POLICY IF EXISTS "Admins full access to conversations" ON public.chat_conversations;
CREATE POLICY "Admins full access to conversations" ON public.chat_conversations
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- === material_views ===
DROP POLICY IF EXISTS "Admins can read material_views" ON public.material_views;
CREATE POLICY "Admins can read material_views" ON public.material_views
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- === material_shares ===
DROP POLICY IF EXISTS "Admins can manage material_shares" ON public.material_shares;
CREATE POLICY "Admins can manage material_shares" ON public.material_shares
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));