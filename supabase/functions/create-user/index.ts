import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Missing authorization header')
    }

    // Verify the JWT and get the user
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)
    
    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Check if user has admin role
    const { data: roles, error: rolesError } = await supabaseClient
      .from('user_roles')
      .select('role, id_empresa')
      .eq('user_id', user.id)

    if (rolesError) throw rolesError

    const isSuperAdmin = roles?.some(r => r.role === 'super_admin')
    const adminEmpresaRole = roles?.find(r => r.role === 'admin_empresa')

    if (!isSuperAdmin && !adminEmpresaRole) {
      throw new Error('Insufficient permissions')
    }

    const {
      cpf,
      nome,
      email,
      telefone,
      id_empresa,
      tipo_usuario,
      grau_parentesco,
      id_usuario_principal,
      senha
    } = await req.json()

    console.log('Creating user:', { nome, email, tipo_usuario, id_empresa })

    // Validate empresa for admin_empresa
    if (!isSuperAdmin && adminEmpresaRole) {
      if (id_empresa !== adminEmpresaRole.id_empresa) {
        throw new Error('Cannot create users for other companies')
      }
    }

    // Check if CPF already exists
    const { data: existingUsers, error: checkError } = await supabaseClient
      .rpc('find_user_by_cpf', { cpf_plain: cpf })

    if (checkError) {
      console.error('Error checking CPF:', checkError)
      throw checkError
    }

    if (existingUsers && existingUsers.length > 0) {
      throw new Error('CPF já cadastrado no sistema')
    }

    // Check if email already exists
    const { data: existingEmail } = await supabaseClient
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .is('deleted_at', null)
      .single()

    if (existingEmail) {
      throw new Error('E-mail já cadastrado no sistema')
    }

    // Create user in auth.users
    const { data: authUser, error: authError } = await supabaseClient.auth.admin.createUser({
      email,
      password: senha,
      email_confirm: true,
      user_metadata: { nome }
    })

    if (authError) {
      console.error('Error creating auth user:', authError)
      throw authError
    }

    console.log('Auth user created:', authUser.user.id)

    // Encrypt CPF
    const { data: encryptedCPF, error: encryptError } = await supabaseClient
      .rpc('encrypt_cpf', { cpf_plain: cpf })

    if (encryptError) {
      console.error('Error encrypting CPF:', encryptError)
      // Rollback auth user creation
      await supabaseClient.auth.admin.deleteUser(authUser.user.id)
      throw encryptError
    }

    // Insert into usuarios table
    const { data: newUser, error: insertError } = await supabaseClient
      .from('usuarios')
      .insert({
        id_auth: authUser.user.id,
        cpf_criptografado: encryptedCPF,
        nome,
        email,
        telefone: telefone || null,
        tipo_usuario,
        id_empresa,
        grau_parentesco: tipo_usuario === 'dependente' ? grau_parentesco : null,
        id_usuario_principal: tipo_usuario === 'dependente' ? id_usuario_principal : null,
        ativo: true,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting user:', insertError)
      // Rollback auth user creation
      await supabaseClient.auth.admin.deleteUser(authUser.user.id)
      throw insertError
    }

    console.log('User created successfully:', newUser.id)

    return new Response(
      JSON.stringify({ success: true, user: newUser }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in create-user function:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
