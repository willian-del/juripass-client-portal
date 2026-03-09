import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { materialId, leadId, shareUrl } = await req.json();

    if (!materialId || !leadId || !shareUrl) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios faltando" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const [{ data: material }, { data: lead }] = await Promise.all([
      supabase.from("sales_materials").select("title, description").eq("id", materialId).single(),
      supabase.from("leads").select("name, email, company").eq("id", leadId).single(),
    ]);

    if (!material || !lead) {
      return new Response(
        JSON.stringify({ error: "Material ou lead não encontrado" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY não configurada" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const safeName = escapeHtml(lead.name);
    const safeTitle = escapeHtml(material.title);
    const safeDesc = escapeHtml(material.description || "");

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Juripass <noreply@contato.juripass.com.br>",
        to: [lead.email],
        subject: `${safeTitle} — Material exclusivo para ${escapeHtml(lead.company)}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="background: linear-gradient(135deg, #2C3E7D 0%, #1e2d5e 100%); color: white; padding: 32px 28px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 600;">Juripass</h1>
              <p style="margin: 8px 0 0; opacity: 0.85; font-size: 14px;">Material exclusivo para você</p>
            </div>
            <div style="border: 1px solid #e5e7eb; border-top: none; padding: 28px; border-radius: 0 0 8px 8px;">
              <p style="color: #374151; font-size: 15px; line-height: 1.6;">
                Olá, <strong>${safeName}</strong>!
              </p>
              <p style="color: #374151; font-size: 15px; line-height: 1.6;">
                Preparamos um material especial para você:
              </p>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h2 style="margin: 0 0 8px; color: #1e293b; font-size: 18px;">${safeTitle}</h2>
                ${safeDesc ? `<p style="margin: 0; color: #64748b; font-size: 14px;">${safeDesc}</p>` : ''}
              </div>
              <div style="text-align: center; margin: 28px 0;">
                <a href="${shareUrl}" style="display: inline-block; background: #2C3E7D; color: white; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px;">
                  Acessar Material →
                </a>
              </div>
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
                Este link é exclusivo e rastreável. Caso tenha dúvidas, entre em contato conosco.
              </p>
            </div>
          </div>
        `,
      }),
    });

    const emailData = await emailRes.text();
    if (!emailRes.ok) {
      console.error("Resend error:", emailRes.status, emailData);
      return new Response(
        JSON.stringify({ error: "Erro ao enviar email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Material email sent to:", lead.email, "material:", material.title);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending material email:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
