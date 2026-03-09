import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, role_title, message } = await req.json();

    // Validate required fields
    if (!name || !email || !phone || !company || !role_title) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios faltando" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save lead to database
    const { error: insertError } = await supabase.from("leads").insert({
      name,
      email,
      phone,
      company,
      role_title,
      message: message || "",
    });

    if (insertError) {
      console.error("Error inserting lead:", insertError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar lead" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("New lead received:", { name, email, phone, company, role_title, message });

    // Send notification email via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Juripass <onboarding@resend.dev>",
            to: ["comercial@juripass.com.br"],
            subject: `Novo lead: ${name} - ${company}`,
            html: `<h2>Novo lead recebido</h2>
              <p><strong>Nome:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Telefone:</strong> ${phone}</p>
              <p><strong>Empresa:</strong> ${company}</p>
              <p><strong>Cargo:</strong> ${role_title}</p>
              <p><strong>Mensagem:</strong> ${message || "—"}</p>`,
          }),
        });
        const emailData = await emailRes.text();
        if (!emailRes.ok) {
          console.error("Resend error:", emailRes.status, emailData);
        } else {
          console.log("Email sent successfully:", emailData);
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    } else {
      console.warn("RESEND_API_KEY not configured, skipping email");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing lead:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
