import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Verificar permissões
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role, id_empresa')
      .eq('user_id', user.id);

    const isSuperAdmin = roles?.some(r => r.role === 'super_admin');
    const adminEmpresa = roles?.find(r => r.role === 'admin_empresa');

    if (!isSuperAdmin && !adminEmpresa) {
      throw new Error('Permissão negada: apenas administradores podem importar usuários');
    }

    const body = await req.json();
    const { id_empresa, filename, usuarios } = body;

    // Determinar empresa
    let empresaId = id_empresa;
    if (!isSuperAdmin && adminEmpresa) {
      // Admin empresa só pode importar para sua empresa
      empresaId = adminEmpresa.id_empresa;
      if (id_empresa && id_empresa !== empresaId) {
        throw new Error('Permissão negada: admin de empresa só pode importar para sua própria empresa');
      }
    }

    if (!empresaId) {
      throw new Error('ID da empresa é obrigatório');
    }

    // Verificar se empresa existe
    const { data: empresa, error: empresaError } = await supabase
      .from('empresas')
      .select('id')
      .eq('id', empresaId)
      .is('deleted_at', null)
      .single();

    if (empresaError || !empresa) {
      throw new Error('Empresa não encontrada');
    }

    // Rate limiting
    if (usuarios.length > 500) {
      throw new Error('Máximo de 500 usuários por importação');
    }

    // Processar usuários
    const results = [];
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < usuarios.length; i++) {
      const usuario = usuarios[i];
      const rowNumber = i + 2; // +2 porque linha 1 é header

      try {
        // Validar CPF único
        const { data: cpfEncrypted } = await supabase
          .rpc('encrypt_cpf', { cpf_plain: usuario.cpf });

        const { data: existingCPF } = await supabase
          .from('usuarios')
          .select('id')
          .eq('cpf_criptografado', cpfEncrypted)
          .is('deleted_at', null)
          .single();

        if (existingCPF) {
          throw new Error('CPF já cadastrado no sistema');
        }

        // Validar email único
        const { data: existingEmail } = await supabase
          .from('usuarios')
          .select('id')
          .eq('email', usuario.email.toLowerCase())
          .is('deleted_at', null)
          .single();

        if (existingEmail) {
          throw new Error('Email já cadastrado no sistema');
        }

        // Se dependente, buscar usuário principal
        let principalId = null;
        if (usuario.tipo_usuario === 'dependente') {
          const { data: principalCpfEncrypted } = await supabase
            .rpc('encrypt_cpf', { cpf_plain: usuario.cpf_usuario_principal });

          const { data: principal, error: principalError } = await supabase
            .from('usuarios')
            .select('id, id_empresa')
            .eq('cpf_criptografado', principalCpfEncrypted)
            .eq('tipo_usuario', 'principal')
            .is('deleted_at', null)
            .single();

          if (principalError || !principal) {
            throw new Error('Usuário principal não encontrado');
          }

          if (principal.id_empresa !== empresaId) {
            throw new Error('Usuário principal deve ser da mesma empresa');
          }

          principalId = principal.id;
        }

        // Gerar senha temporária forte
        const password = crypto.randomUUID() + Math.random().toString(36).slice(-8);

        // Criar usuário no auth
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
          email: usuario.email.toLowerCase(),
          password: password,
          email_confirm: true,
        });

        if (authError) {
          throw authError;
        }

        // Inserir usuário na tabela usuarios
        const { data: newUser, error: insertError } = await supabase
          .from('usuarios')
          .insert({
            id_auth: authUser.user.id,
            cpf_criptografado: cpfEncrypted,
            nome: usuario.nome,
            email: usuario.email.toLowerCase(),
            telefone: usuario.telefone || null,
            id_empresa: empresaId,
            tipo_usuario: usuario.tipo_usuario,
            grau_parentesco: usuario.grau_parentesco || null,
            id_usuario_principal: principalId,
            ativo: true,
          })
          .select('numero_cliente')
          .single();

        if (insertError) {
          // Rollback: deletar auth user
          await supabase.auth.admin.deleteUser(authUser.user.id);
          throw insertError;
        }

        // Criar role usuario
        await supabase.from('user_roles').insert({
          user_id: authUser.user.id,
          role: 'usuario',
        });

        results.push({
          row: rowNumber,
          cpf: usuario.cpf,
          nome: usuario.nome,
          success: true,
          numero_cliente: newUser.numero_cliente,
        });

        successCount++;
      } catch (error: any) {
        console.error(`Erro ao importar usuário linha ${rowNumber}:`, error);
        results.push({
          row: rowNumber,
          cpf: usuario.cpf,
          nome: usuario.nome,
          success: false,
          error: error.message || 'Erro desconhecido',
        });
        failCount++;
      }
    }

    // Salvar histórico
    const { data: importRecord } = await supabase
      .from('user_imports')
      .insert({
        id_empresa: empresaId,
        uploaded_by: user.id,
        filename: filename || 'importacao.csv',
        total_rows: usuarios.length,
        successful_rows: successCount,
        failed_rows: failCount,
        status: 'completed',
        error_log: results.filter(r => !r.success),
      })
      .select()
      .single();

    console.log(`Importação concluída: ${successCount} sucessos, ${failCount} falhas`);

    return new Response(
      JSON.stringify({
        import_id: importRecord?.id,
        total: usuarios.length,
        successful: successCount,
        failed: failCount,
        results: results,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Error in import-users function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
