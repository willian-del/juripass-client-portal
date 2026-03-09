DROP POLICY IF EXISTS "Anon can insert conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anon can update own qualify conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anon can select own qualify conversations" ON public.chat_conversations;