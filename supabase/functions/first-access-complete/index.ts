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
    const { cpf, senha } = await req.json();

    if (!cpf || !senha) {
      return new Response(
        JSON.stringify({ error: 'CPF e senha são obrigatórios' }),
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

    if (senha.length < 6) {
      return new Response(
        JSON.stringify({ error: 'Senha deve ter pelo menos 6 caracteres' }),
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
        JSON.stringify({ error: 'CPF não encontrado no sistema' }),
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

    // Create Supabase Auth account
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: usuario.email,
      password: senha,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        nome: usuario.nome,
        tipo_usuario: usuario.tipo_usuario,
      }
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      
      if (authError.message?.includes('already registered')) {
        return new Response(
          JSON.stringify({ error: 'E-mail já está em uso por outra conta' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Erro ao criar conta de acesso' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!authData.user) {
      return new Response(
        JSON.stringify({ error: 'Erro ao criar conta de acesso' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Update usuario with the new id_auth
    const { error: updateError } = await supabaseAdmin
      .from('usuarios')
      .update({ id_auth: authData.user.id })
      .eq('id', usuario.id);

    if (updateError) {
      console.error('Error updating usuario:', updateError);
      
      // Rollback: delete the auth user we just created
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      
      return new Response(
        JSON.stringify({ error: 'Erro ao vincular conta de acesso' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Success!
    console.log(`First access completed for user ${usuario.id}, auth id ${authData.user.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Conta criada com sucesso! Você já pode fazer login.',
        email: usuario.email
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
