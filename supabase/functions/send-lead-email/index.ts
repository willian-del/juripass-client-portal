import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EMPLOYEE_LABELS: Record<string, string> = {
  up_to_50: "Até 50",
  "50_200": "50 – 200",
  "200_500": "200 – 500",
  "500_1000": "500 – 1.000",
  "1000_plus": "1.000+",
};

const DEPARTMENT_LABELS: Record<string, string> = {
  rh: "RH / Pessoas",
  juridico: "Jurídico",
  financeiro: "Financeiro",
  compliance: "Compliance",
  diretoria: "Diretoria",
  outro: "Outro",
};

const INTEREST_LABELS: Record<string, string> = {
  apoio_juridico: "Apoio jurídico para colaboradores",
  nr01: "Adequação à NR-01 (riscos psicossociais)",
  beneficio: "Benefício corporativo",
  passivo_trabalhista: "Redução de passivo trabalhista",
  conhecer: "Quero conhecer a solução",
};

const PSYCHOSOCIAL_LABELS: Record<string, string> = {
  sim: "Sim",
  ainda_nao: "Ainda não",
  pesquisando: "Estou pesquisando o tema",
};

const LEGAL_BENEFIT_LABELS: Record<string, string> = {
  sim: "Sim",
  nao: "Não",
  nao_sei: "Não sei",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name, email, phone, company, role_title, message,
      employee_count, department, seniority, interest,
      evaluating_psychosocial, has_legal_benefit,
    } = await req.json();

    if (!name || !email || !phone || !company) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios faltando" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save lead to database (scoring trigger will calculate lead_score and lead_priority)
    const { data: insertedLead, error: insertError } = await supabase.from("leads").insert({
      name,
      email,
      phone,
      company,
      role_title: role_title || "",
      message: message || "",
      employee_count: employee_count || null,
      department: department || null,
      seniority: seniority || null,
      interest: interest || null,
      evaluating_psychosocial: evaluating_psychosocial || null,
      has_legal_benefit: has_legal_benefit || null,
    }).select("lead_score, lead_priority").single();

    if (insertError) {
      console.error("Error inserting lead:", insertError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar lead" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const leadScore = insertedLead?.lead_score ?? 0;
    const leadPriority = insertedLead?.lead_priority ?? "normal";
    const isHot = leadPriority === "hot";

    console.log("New lead received:", { name, email, company, leadScore, leadPriority });

    // Send notification email via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      try {
        const subject = isHot
          ? `🔥 LEAD QUENTE: ${name} - ${company} (Score: ${leadScore})`
          : `Novo lead: ${name} - ${company} (Score: ${leadScore})`;

        const priorityBadge = {
          hot: "🔥 QUENTE",
          warm: "🟡 MORNO",
          normal: "🔵 NORMAL",
          cold: "⚪ FRIO",
        }[leadPriority] || leadPriority;

        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Juripass <noreply@contato.juripass.com.br>",
            to: ["comercial@juripass.com.br"],
            subject,
            html: `
              <div style="font-family: sans-serif; max-width: 600px;">
                <div style="background: ${isHot ? '#dc2626' : '#2C3E7D'}; color: white; padding: 16px 20px; border-radius: 8px 8px 0 0;">
                  <h2 style="margin: 0;">${isHot ? '🔥 Lead Quente!' : 'Novo Lead Recebido'}</h2>
                  <p style="margin: 4px 0 0; opacity: 0.9;">Prioridade: ${priorityBadge} | Score: ${leadScore}</p>
                </div>
                <div style="border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
                  <h3 style="margin-top: 0; color: #374151;">Dados de Contato</h3>
                  <p><strong>Nome:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Telefone:</strong> ${phone}</p>
                  <p><strong>Empresa:</strong> ${company}</p>
                  <p><strong>Cargo:</strong> ${role_title || "—"}</p>
                  
                  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
                  
                  <h3 style="color: #374151;">Qualificação</h3>
                  <p><strong>Colaboradores:</strong> ${EMPLOYEE_LABELS[employee_count] || "—"}</p>
                  <p><strong>Área:</strong> ${DEPARTMENT_LABELS[department] || "—"}</p>
                  <p><strong>Interesse:</strong> ${INTEREST_LABELS[interest] || "—"}</p>
                  <p><strong>Avaliando riscos psicossociais:</strong> ${PSYCHOSOCIAL_LABELS[evaluating_psychosocial] || "—"}</p>
                  <p><strong>Benefício jurídico atual:</strong> ${LEGAL_BENEFIT_LABELS[has_legal_benefit] || "—"}</p>
                  
                  ${message ? `<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" /><h3 style="color: #374151;">Mensagem</h3><p>${message}</p>` : ''}
                </div>
              </div>`,
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
