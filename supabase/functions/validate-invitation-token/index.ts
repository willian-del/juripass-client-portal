import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token, increment_usage = false } = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ valid: false, error: "Token não fornecido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role key to bypass RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`Validating invitation token: ${token}`);

    // Find the invitation link by token
    const { data: invitation, error: invitationError } = await supabase
      .from("invitation_links")
      .select(`
        id,
        token,
        active,
        expires_at,
        max_uses,
        current_uses,
        id_empresa,
        empresas (
          id,
          nome,
          codigo_empresa
        )
      `)
      .eq("token", token)
      .maybeSingle();

    if (invitationError) {
      console.error("Error fetching invitation:", invitationError);
      return new Response(
        JSON.stringify({ valid: false, error: "Erro ao validar token" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!invitation) {
      console.log("Token not found");
      return new Response(
        JSON.stringify({ valid: false, error: "Link de convite inválido" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if active
    if (!invitation.active) {
      console.log("Token is inactive");
      return new Response(
        JSON.stringify({ valid: false, error: "Este link de convite foi desativado" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check expiration
    if (invitation.expires_at && new Date(invitation.expires_at) < new Date()) {
      console.log("Token expired");
      return new Response(
        JSON.stringify({ valid: false, error: "Este link de convite expirou" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check usage limit
    if (invitation.max_uses && invitation.current_uses >= invitation.max_uses) {
      console.log("Token usage limit reached");
      return new Response(
        JSON.stringify({ valid: false, error: "Este link de convite atingiu o limite de uso" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Increment usage if requested (after successful registration)
    if (increment_usage) {
      const { error: updateError } = await supabase
        .from("invitation_links")
        .update({ current_uses: (invitation.current_uses || 0) + 1 })
        .eq("id", invitation.id);

      if (updateError) {
        console.error("Error incrementing usage:", updateError);
      } else {
        console.log("Usage incremented successfully");
      }
    }

    const empresa = invitation.empresas as unknown as { id: string; nome: string; codigo_empresa: string } | null;

    console.log(`Token valid for empresa: ${empresa?.nome}`);

    return new Response(
      JSON.stringify({
        valid: true,
        empresa_id: invitation.id_empresa,
        empresa_nome: empresa?.nome || "",
        empresa_codigo: empresa?.codigo_empresa || "",
        invitation_id: invitation.id,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ valid: false, error: "Erro interno do servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
