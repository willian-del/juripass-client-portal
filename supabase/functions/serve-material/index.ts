import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return new Response(JSON.stringify({ error: "Token inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find the share by token
    const { data: share, error: shareError } = await supabase
      .from("material_shares")
      .select("id, material_id, sales_materials(file_path, file_type, title)")
      .eq("token", token)
      .single();

    if (shareError || !share) {
      return new Response(JSON.stringify({ error: "Material não encontrado" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Log the view
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    await supabase.from("material_views").insert({
      share_id: share.id,
      ip_address: ip.slice(0, 100),
      user_agent: userAgent.slice(0, 500),
    });

    const material = (share as any).sales_materials;

    if (!material?.file_path) {
      // No file uploaded — return material info for rendering built-in content
      return new Response(
        JSON.stringify({
          type: "builtin",
          title: material?.title || "Material",
          file_type: material?.file_type || "presentation",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Generate signed URL (1 hour)
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from("sales-materials")
      .createSignedUrl(material.file_path, 3600);

    if (urlError || !signedUrlData?.signedUrl) {
      return new Response(
        JSON.stringify({ error: "Erro ao gerar URL do arquivo" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        type: "file",
        url: signedUrlData.signedUrl,
        title: material.title,
        file_type: material.file_type,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Erro interno" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
