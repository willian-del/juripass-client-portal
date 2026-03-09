
CREATE TABLE public.chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  mode text NOT NULL DEFAULT 'qualify',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

-- Anon can insert (public chat)
CREATE POLICY "Anon can insert conversations"
ON public.chat_conversations
FOR INSERT
TO anon, authenticated
WITH CHECK (mode = 'qualify');

-- Anon can update own session
CREATE POLICY "Anon can update own qualify conversations"
ON public.chat_conversations
FOR UPDATE
TO anon, authenticated
USING (mode = 'qualify')
WITH CHECK (mode = 'qualify');

-- Anon can read own session
CREATE POLICY "Anon can select own qualify conversations"
ON public.chat_conversations
FOR SELECT
TO anon, authenticated
USING (mode = 'qualify');

-- Admins full access
CREATE POLICY "Admins full access to conversations"
ON public.chat_conversations
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
