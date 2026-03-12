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

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_EMPLOYEE_COUNTS = ["up_to_50", "50_200", "200_500", "500_1000", "1000_plus"];
const VALID_DEPARTMENTS = ["rh", "juridico", "financeiro", "compliance", "diretoria", "outro"];
const VALID_SENIORITIES = ["analista", "coordenador", "gerente", "diretor", "socio"];
const VALID_INTERESTS = ["apoio_juridico", "nr01", "beneficio", "passivo_trabalhista", "conhecer"];
const VALID_PSYCHOSOCIAL = ["sim", "ainda_nao", "pesquisando"];
const VALID_LEGAL_BENEFIT = ["sim", "nao", "nao_sei"];

function validateEnum(value: string | null | undefined, allowed: string[]): string | null {
  if (!value) return null;
  return allowed.includes(value) ? value : null;
}

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

    // Server-side input validation
    const trimmedName = String(name).trim().slice(0, 100);
    const trimmedEmail = String(email).trim().slice(0, 255);
    const trimmedPhone = String(phone).trim().slice(0, 30);
    const trimmedCompany = String(company).trim().slice(0, 150);
    const trimmedRoleTitle = String(role_title || "").trim().slice(0, 100);
    const trimmedMessage = String(message || "").trim().slice(0, 1000);

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return new Response(
        JSON.stringify({ error: "Formato de email inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!trimmedName || !trimmedPhone || !trimmedCompany) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios faltando" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validatedEmployeeCount = validateEnum(employee_count, VALID_EMPLOYEE_COUNTS);
    const validatedDepartment = validateEnum(department, VALID_DEPARTMENTS);
    const validatedSeniority = validateEnum(seniority, VALID_SENIORITIES);
    const validatedInterest = validateEnum(interest, VALID_INTERESTS);
    const validatedPsychosocial = validateEnum(evaluating_psychosocial, VALID_PSYCHOSOCIAL);
    const validatedLegalBenefit = validateEnum(has_legal_benefit, VALID_LEGAL_BENEFIT);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Rate limiting: check for recent submissions with the same email (last 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recentLeads } = await supabase
      .from("leads")
      .select("id")
      .eq("email", trimmedEmail)
      .gte("created_at", fiveMinutesAgo)
      .limit(1);

    if (recentLeads && recentLeads.length > 0) {
      return new Response(
        JSON.stringify({ error: "Aguarde alguns minutos antes de enviar novamente" }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const leadData = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      company: trimmedCompany,
      role_title: trimmedRoleTitle,
      message: trimmedMessage,
      employee_count: validatedEmployeeCount,
      department: validatedDepartment,
      seniority: validatedSeniority,
      interest: validatedInterest,
      evaluating_psychosocial: validatedPsychosocial,
      has_legal_benefit: validatedLegalBenefit,
    };

    // Check if lead with this email already exists
    const { data: existingLead } = await supabase
      .from("leads")
      .select("id")
      .eq("email", trimmedEmail)
      .limit(1)
      .single();

    let insertedLead;
    let insertError;

    if (existingLead) {
      // Update existing lead
      const result = await supabase
        .from("leads")
        .update(leadData)
        .eq("id", existingLead.id)
        .select("lead_score, lead_priority")
        .single();
      insertedLead = result.data;
      insertError = result.error;
      console.log("Updated existing lead:", existingLead.id);
    } else {
      // Insert new lead
      const result = await supabase
        .from("leads")
        .insert(leadData)
        .select("lead_score, lead_priority")
        .single();
      insertedLead = result.data;
      insertError = result.error;
    }

    if (insertError) {
      console.error("Error saving lead:", insertError);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar lead" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const leadScore = insertedLead?.lead_score ?? 0;
    const leadPriority = insertedLead?.lead_priority ?? "normal";
    const isHot = leadPriority === "hot";

    console.log("New lead received:", { name: trimmedName, email: trimmedEmail, company: trimmedCompany, leadScore, leadPriority });

    // Send notification email via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      try {
        const safeName = escapeHtml(trimmedName);
        const safeEmail = escapeHtml(trimmedEmail);
        const safePhone = escapeHtml(trimmedPhone);
        const safeCompany = escapeHtml(trimmedCompany);
        const safeRoleTitle = escapeHtml(trimmedRoleTitle);
        const safeMessage = escapeHtml(trimmedMessage);

        const subject = isHot
          ? `🔥 LEAD QUENTE: ${safeName} - ${safeCompany} (Score: ${leadScore})`
          : `Novo lead: ${safeName} - ${safeCompany} (Score: ${leadScore})`;

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
                  <p><strong>Nome:</strong> ${safeName}</p>
                  <p><strong>Email:</strong> ${safeEmail}</p>
                  <p><strong>Telefone:</strong> ${safePhone}</p>
                  <p><strong>Empresa:</strong> ${safeCompany}</p>
                  <p><strong>Cargo:</strong> ${safeRoleTitle || "—"}</p>
                  
                  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
                  
                  <h3 style="color: #374151;">Qualificação</h3>
                  <p><strong>Colaboradores:</strong> ${EMPLOYEE_LABELS[employee_count] || "—"}</p>
                  <p><strong>Área:</strong> ${DEPARTMENT_LABELS[department] || "—"}</p>
                  <p><strong>Interesse:</strong> ${INTEREST_LABELS[interest] || "—"}</p>
                  <p><strong>Avaliando riscos psicossociais:</strong> ${PSYCHOSOCIAL_LABELS[evaluating_psychosocial] || "—"}</p>
                  <p><strong>Benefício jurídico atual:</strong> ${LEGAL_BENEFIT_LABELS[has_legal_benefit] || "—"}</p>
                  
                  ${safeMessage ? `<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" /><h3 style="color: #374151;">Mensagem</h3><p>${safeMessage}</p>` : ''}
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
