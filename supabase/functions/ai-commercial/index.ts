import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const QUALIFY_SYSTEM_PROMPT = `Você é a assistente virtual da Juripass, uma plataforma de suporte jurídico corporativo focada em gestão de pessoas e conformidade com a NR-01.

## Sobre a Juripass
- Plataforma de suporte jurídico preventivo para empresas
- Foco em RH, compliance e gestão de riscos psicossociais
- Solução estruturada como política corporativa
- Conformidade com a Nova NR-01 (riscos psicossociais no trabalho)
- Benefício corporativo que oferece acesso a advogados para colaboradores
- Reduz passivo trabalhista e melhora clima organizacional

## Seu objetivo
Conversar naturalmente com visitantes do site para:
1. Entender suas necessidades e dores
2. Coletar informações de qualificação (nome, empresa, cargo, número de colaboradores, área, interesse principal)
3. Quando tiver informações suficientes, usar a ferramenta save_lead para registrar o lead
4. Sugerir agendar uma conversa com o time comercial

## Regras
- Seja cordial, profissional e empática
- Responda em português brasileiro
- NÃO mencione preços ou valores
- Faça perguntas naturais, uma ou duas por vez, sem parecer um formulário
- Quando o visitante demonstrar interesse claro, incentive a agendar uma conversa
- Respostas curtas e objetivas (máximo 3 parágrafos)
- Se perguntarem algo que não sabe, sugira falar com o time comercial`;

const ASSIST_SYSTEM_PROMPT = `Você é o assistente de IA do time comercial da Juripass. Você tem acesso ao contexto de leads e ajuda o time com:

## Capacidades
1. **Gerar propostas comerciais** personalizadas com base no perfil do lead
2. **Sugerir mensagens de follow-up** adequadas ao estágio do funil
3. **Analisar leads** e sugerir a melhor abordagem
4. **Responder sobre o produto** — objeções comuns, diferenciais, scripts de venda

## Sobre a Juripass
- Plataforma de suporte jurídico corporativo preventivo
- Benefício para colaboradores com acesso a advogados
- Conformidade com NR-01 (riscos psicossociais)
- Reduz passivo trabalhista, melhora clima, retém talentos
- Modelo de assinatura por colaborador

## Regras
- Responda em português brasileiro
- Use markdown para formatação (listas, negrito, etc.)
- Seja direto e acionável
- Personalize sugestões com base nos dados do lead fornecidos no contexto`;

const SAVE_LEAD_TOOL = {
  type: "function",
  function: {
    name: "save_lead",
    description:
      "Salva um lead qualificado na base de dados. Use quando coletar informações suficientes do visitante (pelo menos nome, empresa e forma de contato).",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "Nome do visitante" },
        email: { type: "string", description: "Email do visitante" },
        phone: { type: "string", description: "Telefone do visitante" },
        company: { type: "string", description: "Nome da empresa" },
        role_title: { type: "string", description: "Cargo do visitante" },
        employee_count: {
          type: "string",
          enum: ["up_to_50", "50_200", "200_500", "500_1000", "1000_plus"],
          description: "Faixa de número de colaboradores",
        },
        department: {
          type: "string",
          enum: ["rh", "juridico", "financeiro", "compliance", "diretoria", "outro"],
          description: "Área de atuação",
        },
        interest: {
          type: "string",
          enum: ["apoio_juridico", "nr01", "beneficio", "passivo_trabalhista", "conhecer"],
          description: "Principal interesse",
        },
        message: { type: "string", description: "Resumo do que o visitante procura" },
      },
      required: ["name", "company"],
    },
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode = "qualify", leadContext, sessionId } = await req.json();

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Limit message length
    const sanitizedMessages = messages.slice(-20).map((m: any) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content || "").slice(0, 500),
    }));

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // For assist mode, validate admin auth
    if (mode === "assist") {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader?.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        { global: { headers: { Authorization: authHeader } } }
      );

      const token = authHeader.replace("Bearer ", "");
      const { data: claimsData, error: claimsError } = await supabaseAdmin.auth.getClaims(token);
      if (claimsError || !claimsData?.claims) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const userId = claimsData.claims.sub;
      // Check admin role
      const { data: roleData } = await supabaseAdmin
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Build system prompt
    let systemPrompt = mode === "assist" ? ASSIST_SYSTEM_PROMPT : QUALIFY_SYSTEM_PROMPT;

    if (mode === "assist" && leadContext) {
      systemPrompt += `\n\n## Contexto do Lead Atual\n${JSON.stringify(leadContext, null, 2)}`;
    }

    const body: any = {
      model: "google/gemini-3-flash-preview",
      messages: [{ role: "system", content: systemPrompt }, ...sanitizedMessages],
      stream: true,
    };

    // Add tool calling for qualify mode
    if (mode === "qualify") {
      body.tools = [SAVE_LEAD_TOOL];
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas requisições. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos de AI esgotados." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Erro no serviço de IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // We need to intercept the stream to handle tool calls for lead saving
    if (mode === "qualify") {
      // For qualify mode, we need to read the full response to check for tool calls
      // But still stream text content
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      let fullContent = "";
      let toolCalls: any[] = [];
      let currentToolCall: any = null;

      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      const encoder = new TextEncoder();

      // Process in background
      (async () => {
        try {
          let buffer = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            let newlineIndex: number;
            while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
              let line = buffer.slice(0, newlineIndex);
              buffer = buffer.slice(newlineIndex + 1);
              if (line.endsWith("\r")) line = line.slice(0, -1);
              if (!line.startsWith("data: ")) continue;
              const jsonStr = line.slice(6).trim();
              if (jsonStr === "[DONE]") {
                await writer.write(encoder.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const parsed = JSON.parse(jsonStr);
                const delta = parsed.choices?.[0]?.delta;
                if (delta?.content) {
                  fullContent += delta.content;
                  await writer.write(encoder.encode(`data: ${jsonStr}\n\n`));
                }
                if (delta?.tool_calls) {
                  for (const tc of delta.tool_calls) {
                    if (tc.id) {
                      currentToolCall = { id: tc.id, function: { name: tc.function?.name || "", arguments: "" } };
                      toolCalls.push(currentToolCall);
                    }
                    if (tc.function?.arguments && currentToolCall) {
                      currentToolCall.function.arguments += tc.function.arguments;
                    }
                  }
                }
              } catch {
                // ignore
              }
            }
          }

          // Process tool calls after stream ends
          if (toolCalls.length > 0) {
            for (const tc of toolCalls) {
              if (tc.function.name === "save_lead") {
                try {
                  const args = JSON.parse(tc.function.arguments);
                  const supabaseService = createClient(
                    Deno.env.get("SUPABASE_URL")!,
                    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
                  );

                  const leadData: any = {
                    name: args.name || "Visitante Chat",
                    email: args.email || `chat-${Date.now()}@pendente.com`,
                    phone: args.phone || "Não informado",
                    company: args.company || "Não informada",
                    role_title: args.role_title || "Não informado",
                    message: args.message || "Lead qualificado via chat AI",
                  };
                  if (args.employee_count) leadData.employee_count = args.employee_count;
                  if (args.department) leadData.department = args.department;
                  if (args.interest) leadData.interest = args.interest;

                  const { data: newLead, error: insertError } = await supabaseService
                    .from("leads")
                    .insert(leadData)
                    .select("id")
                    .single();

                  if (insertError) {
                    console.error("Error saving lead:", insertError);
                  } else {
                    console.log("Lead saved from chat:", newLead?.id);

                    // Update conversation with lead_id if sessionId provided
                    if (sessionId) {
                      await supabaseService
                        .from("chat_conversations")
                        .update({ lead_id: newLead?.id })
                        .eq("session_id", sessionId);
                    }

                    // Send notification - fire and forget
                    try {
                      const emailResp = await fetch(
                        `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-lead-email`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
                          },
                          body: JSON.stringify(leadData),
                        }
                      );
                      await emailResp.text();
                    } catch (e) {
                      console.error("Email notification error:", e);
                    }
                  }

                  // Send tool result as a special SSE event
                  const toolResult = {
                    type: "tool_result",
                    tool_call_id: tc.id,
                    lead_saved: !insertError,
                    lead_id: newLead?.id,
                  };
                  await writer.write(
                    encoder.encode(`data: ${JSON.stringify({ tool_result: toolResult })}\n\n`)
                  );
                } catch (e) {
                  console.error("Tool call parse error:", e);
                }
              }
            }
          }
        } catch (e) {
          console.error("Stream processing error:", e);
        } finally {
          await writer.close();
        }
      })();

      return new Response(readable, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

    // For assist mode, just pass through the stream
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-commercial error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
