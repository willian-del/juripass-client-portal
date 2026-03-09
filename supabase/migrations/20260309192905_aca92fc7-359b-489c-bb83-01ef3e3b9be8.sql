
CREATE POLICY "Admins can delete material_views"
ON public.material_views
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
