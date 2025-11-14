import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { id_empresa, max_uses, expires_at } = await req.json();

    if (!id_empresa) {
      return new Response(JSON.stringify({ error: 'ID da empresa é obrigatório' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verificar se o usuário tem permissão (super_admin ou admin_empresa da empresa)
    const { data: roles } = await supabaseClient
      .from('user_roles')
      .select('role, id_empresa')
      .eq('user_id', user.id);

    const isSuperAdmin = roles?.some((r) => r.role === 'super_admin');
    const isAdminEmpresa = roles?.some(
      (r) => r.role === 'admin_empresa' && r.id_empresa === id_empresa
    );

    if (!isSuperAdmin && !isAdminEmpresa) {
      return new Response(JSON.stringify({ error: 'Sem permissão para gerar link' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Gerar token único
    const token = crypto.randomUUID();

    // Inserir link de convite
    const { data: link, error: insertError } = await supabaseClient
      .from('invitation_links')
      .insert({
        id_empresa,
        token,
        max_uses: max_uses || null,
        expires_at: expires_at || null,
        created_by: user.id,
        active: true,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Erro ao criar link:', insertError);
      throw insertError;
    }

    console.log('Link de convite gerado:', { id_empresa, token });

    return new Response(JSON.stringify({ token, link }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
