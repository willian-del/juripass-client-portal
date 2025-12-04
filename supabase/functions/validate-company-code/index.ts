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
    const { codigo_empresa } = await req.json();

    if (!codigo_empresa || typeof codigo_empresa !== 'string') {
      console.log('Invalid request: missing or invalid codigo_empresa');
      return new Response(
        JSON.stringify({ valid: false, error: 'Código da empresa é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service role key to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data, error } = await supabaseAdmin
      .from('empresas')
      .select('id, nome')
      .eq('codigo_empresa', codigo_empresa.trim())
      .is('deleted_at', null)
      .single();

    if (error || !data) {
      console.log('Company not found for code:', codigo_empresa);
      return new Response(
        JSON.stringify({ valid: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Company validated:', { id: data.id, nome: data.nome });

    // Only return valid status and company name - NOT the CNPJ or other sensitive data
    return new Response(
      JSON.stringify({ 
        valid: true, 
        empresa_id: data.id,
        empresa_nome: data.nome 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error validating company code:', error);
    return new Response(
      JSON.stringify({ valid: false, error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
