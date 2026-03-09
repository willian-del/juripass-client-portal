
-- Create email_templates table
CREATE TABLE public.email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject_template text NOT NULL,
  body_template text NOT NULL,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Only admins can CRUD
CREATE POLICY "Admins can manage email_templates"
  ON public.email_templates
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow anon/public to read (edge functions use service role, but just in case)
-- Actually edge functions use service role key so no need for public read

-- Insert default template (the current hardcoded one)
INSERT INTO public.email_templates (name, subject_template, body_template, is_default)
VALUES (
  'Envio padrão',
  '{{material_title}} — Material exclusivo para {{lead_company}}',
  '<div style="font-family: ''Segoe UI'', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
  <div style="background: linear-gradient(135deg, #2C3E7D 0%, #1e2d5e 100%); color: white; padding: 32px 28px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 22px; font-weight: 600;">Juripass</h1>
    <p style="margin: 8px 0 0; opacity: 0.85; font-size: 14px;">Material exclusivo para você</p>
  </div>
  <div style="border: 1px solid #e5e7eb; border-top: none; padding: 28px; border-radius: 0 0 8px 8px;">
    <p style="color: #374151; font-size: 15px; line-height: 1.6;">
      Olá, <strong>{{lead_name}}</strong>!
    </p>
    <p style="color: #374151; font-size: 15px; line-height: 1.6;">
      Preparamos um material especial para você:
    </p>
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h2 style="margin: 0 0 8px; color: #1e293b; font-size: 18px;">{{material_title}}</h2>
      <p style="margin: 0; color: #64748b; font-size: 14px;">{{material_description}}</p>
    </div>
    <div style="text-align: center; margin: 28px 0;">
      <a href="{{share_url}}" style="display: inline-block; background: #2C3E7D; color: white; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px;">
        Acessar Material →
      </a>
    </div>
    <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
      Este link é exclusivo e rastreável. Caso tenha dúvidas, entre em contato conosco.
    </p>
  </div>
</div>',
  true
);
