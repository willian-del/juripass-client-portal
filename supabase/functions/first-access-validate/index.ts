import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cpf } = await req.json();

    if (!cpf) {
      return new Response(
        JSON.stringify({ error: 'CPF é obrigatório' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Clean CPF - remove non-digits
    const cpfLimpo = cpf.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
      return new Response(
        JSON.stringify({ error: 'CPF deve conter 11 dígitos' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create Supabase client with service role key to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Find user by CPF using the RPC function
    const { data: usuarios, error: findError } = await supabaseAdmin
      .rpc('find_user_by_cpf', { cpf_plain: cpfLimpo });

    if (findError) {
      console.error('Error finding user:', findError);
      return new Response(
        JSON.stringify({ error: 'Erro ao buscar usuário' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!usuarios || usuarios.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: 'CPF não encontrado no sistema',
          code: 'CPF_NOT_FOUND'
        }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const usuario = usuarios[0];

    // Check if user already has id_auth (already completed first access)
    if (usuario.id_auth) {
      return new Response(
        JSON.stringify({ 
          error: 'Este CPF já possui uma conta ativa. Faça login normalmente.',
          code: 'ALREADY_REGISTERED'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Return user data for first access (without sensitive info)
    // Mask the name for privacy (show only first name and last initial)
    const nomeParts = usuario.nome.split(' ');
    const nomeMascarado = nomeParts.length > 1 
      ? `${nomeParts[0]} ${nomeParts[nomeParts.length - 1].charAt(0)}.`
      : nomeParts[0];

    return new Response(
      JSON.stringify({
        success: true,
        usuario: {
          id: usuario.id,
          nome_mascarado: nomeMascarado,
          email: usuario.email,
          tipo_usuario: usuario.tipo_usuario,
          grau_parentesco: usuario.grau_parentesco,
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
