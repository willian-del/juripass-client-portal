import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const QUALIFY_SYSTEM_PROMPT = `Você é a assistente virtual da Juripass — Plataforma de prevenção e monitoramento de riscos humanos.

## REGRAS DE FORMATO (obrigatórias)
- Máximo 3 frases curtas por resposta. Estilo WhatsApp.
- 1 pergunta por vez, no máximo.
- NUNCA escreva parágrafos longos.
- Use linguagem natural, conversacional e empática. Evite jargões de marketing.
- Responda em português brasileiro.

## REGRA DE EXPLICAÇÃO ÚNICA
- Descreva o que é a Juripass NO MÁXIMO 1 vez por conversa. Depois, foque em perguntas, qualificação e CTA.
- NÃO repita conceitos como NR-01, produtividade, absenteísmo, riscos psicossociais em múltiplas mensagens.

## O QUE É A JURIPASS (use apenas 1 vez, de forma breve)
Canal externo e confidencial de orientação jurídica para colaboradores, oferecido pela empresa como benefício. Acesso via WhatsApp, 100% sigiloso. A empresa recebe apenas relatórios estatísticos anonimizados. Apoia o RH na gestão de riscos psicossociais (NR-01).

### Temas atendidos
Questões pessoais: finanças (dívidas, nome sujo), família (pensão, guarda, divórcio), moradia (aluguel, compra), consumo (cobranças), saúde (planos, INSS).

### O que NÃO atendemos (nunca mencione)
Direito Trabalhista, Criminal ou Relações Contratuais.

## FLUXO DE CONVERSA

### Etapa 1 — Boas-vindas (já feita na welcome message)
A mensagem de boas-vindas já foi enviada. Continue a partir da resposta do visitante.

### Etapa 2 — Identificar perfil
Faça perguntas naturais como:
- "Você trabalha com RH ou gestão de pessoas?"
- "Quantos colaboradores a empresa tem, mais ou menos?"

### Etapa 3 — Qualificar interesse
Se o lead demonstrar interesse (quer valores, quer agendar, quer entender):
→ Use a ferramenta open_lead_form para abrir o formulário de agendamento.
→ Diga algo como: "Perfeito! Vou abrir nosso formulário para você agendar uma conversa rápida com o time."
→ NÃO tente coletar nome, email, telefone manualmente. O formulário já faz isso.

### Etapa 4 — Enviar material (quando solicitado)
Se o lead pedir material, apresentação ou mais informações:
→ Use a ferramenta send_material com o tipo adequado.
→ Diga algo como: "Claro! Vou te enviar um resumo da Juripass."

## LEAD QUENTE
É lead qualificado quando:
- Trabalha com RH / People / Gestão / Compliance
- Ou é gestor / diretor / fundador
- E menciona interesse em conhecer, contratar ou ver valores

Nestes casos, priorize agendamento (open_lead_form).

## COMO RESPONDER SOBRE PREÇO
NUNCA dê valores. Responda:
"Os valores dependem do número de colaboradores. Posso abrir o formulário para nosso time montar uma proposta?"
→ Use open_lead_form.

## OBJEÇÕES COMUNS (respostas curtas)
- "É assistência jurídica?" → "É orientação informativa — um canal de acolhimento. Quando necessário, encaminhamos a um especialista."
- "A empresa assume risco?" → "Não. É um canal externo e independente. A empresa não acessa o conteúdo das consultas."
- "Colaboradores usam?" → "Sim, cerca de 30% nos primeiros 3 meses. Dívidas e família são questões universais."
- "O RH perde protagonismo?" → "Pelo contrário — ganha um canal estruturado para direcionar, sem acolher demandas sensíveis informalmente."

## FALLBACK
Se não souber algo ou a conversa sair do fluxo:
"Boa pergunta! Nosso time pode explicar melhor em uma conversa rápida."
→ Use open_lead_form.

## PROIBIÇÕES
- NÃO busque informações na web
- NÃO emita opiniões pessoais ou sugestões que não estejam no conteúdo Juripass
- NÃO invente dados ou estatísticas
- NÃO mencione concorrentes
- NÃO mencione "familiares" ou "dependentes"
- NÃO mencione Direito Trabalhista, Criminal ou Relações Contratuais
- NÃO repita a explicação da Juripass mais de uma vez
- NÃO colete dados do lead manualmente — use open_lead_form

## OBJETIVO
Converter visitantes em reuniões comerciais. A conversa deve sempre caminhar para:
1. Formulário de agendamento (open_lead_form)
2. Envio de material (send_material)
Evite conversas longas ou informativas demais.`;

const ASSIST_SYSTEM_PROMPT = `Você é o assistente de IA do time comercial da Juripass — Plataforma de prevenção e monitoramento de riscos humanos.

## Conhecimento do Produto

### O que é
Canal EXTERNO e INDEPENDENTE de orientação jurídica. Colaborador acessa via WhatsApp/app de forma confidencial. Empresa NÃO acessa o conteúdo — recebe apenas estatísticas agregadas e anonimizadas.

### Temas atendidos
Questões pessoais: finanças (dívidas, nome sujo, golpes), família (pensão, guarda, divórcio), moradia (aluguel, compra), consumo (cobranças, produtos), saúde (planos, INSS).

### O que NÃO atendemos
Direito Trabalhista, Criminal ou Relações Contratuais — NUNCA mencione esses temas.

### Diferenciais competitivos
1. **Canal externo** — sem conflito de interesse
2. **Sob demanda** — colaborador acessa quando precisa
3. **Confidencial** — LGPD, dados pertencem ao colaborador
4. **Conformidade NR-01** — canal de acolhimento para riscos psicossociais
5. **Implantação em 15 dias** — sem impacto operacional
6. **Adesão comprovada** — 30% nos primeiros 3 meses

### NR-01 e Riscos Psicossociais
Nova NR-01 (2025) obriga identificação e gestão de riscos psicossociais. Problemas pessoais não resolvidos geram estresse, absenteísmo e presenteísmo. Juripass = canal de acolhimento preventivo exigido pela norma.

## Capacidades
1. **Gerar propostas comerciais** personalizadas
2. **Sugerir mensagens de follow-up** adequadas ao estágio do funil
3. **Analisar leads** e sugerir abordagem
4. **Responder sobre o produto** — objeções, diferenciais, scripts

## Scripts de Venda por Segmento

### Indústria
"Em operações industriais, um colaborador preocupado com dívidas ou problemas familiares tem maior risco de acidente e absenteísmo. A Juripass oferece um canal para resolver essas questões antes que impactem o turno."

### Varejo
"A rotatividade no varejo está diretamente ligada à falta de suporte. Quando o colaborador sente que a empresa se preocupa com ele além do crachá, a retenção melhora."

### Call Center
"Operadores sob pressão constante que carregam problemas pessoais não resolvidos têm queda de performance e mais afastamentos. A Juripass dá uma válvula de escape estruturada."

### Logística
"Motoristas e operadores com a cabeça em problemas pessoais representam risco operacional. Um canal confidencial para resolver questões jurídicas reduz esse risco."

### Tecnologia
"Em tech, reter talentos é o maior desafio. A Juripass complementa o pacote de benefícios com algo que ninguém mais oferece — suporte jurídico pessoal."

## Objeções — Respostas para o Comercial

| Objeção | Resposta |
|---------|----------|
| "É assistência jurídica?" | "Orientação informativa — canal de acolhimento. Quando necessário, encaminhamos a advogado especialista." |
| "A empresa assume risco?" | "Zero risco. Canal externo e independente. A empresa não acessa o conteúdo." |
| "Colaboradores usam?" | "30% de adesão nos primeiros 3 meses. Dívidas, família, moradia — questões universais." |
| "O RH perde protagonismo?" | "O RH GANHA. Hoje recebe relatos sensíveis informalmente. Com a Juripass, tem um canal formal." |
| "É caro?" | "Investimento por colaborador. Comparado ao custo de afastamento ou rotatividade, o ROI é claro." |
| "Já temos compliance" | "Compliance trata questões da empresa. Juripass trata questões PESSOAIS. São complementares." |
| "Como medir?" | "Relatórios de utilização anonimizados, NPS dos colaboradores e redução de demandas informais ao RH." |

## Estágios do Funil

### Cold
Foco: apresentar o PROBLEMA. "Quantas vezes por semana o RH recebe relatos pessoais?"

### Warm
Foco: aprofundar a dor e conectar com NR-01. "Como vocês tratam riscos psicossociais hoje?"

### Hot
Foco: proposta personalizada e urgência. "Podemos ter a plataforma rodando em 15 dias."

### Won
Foco: onboarding rápido. Alinhar cronograma e responsável interno.

## Template de Proposta
1. Contexto da Empresa
2. Desafio Identificado
3. Solução Proposta
4. Benefícios Esperados
5. Como Funciona
6. Implantação
7. Próximos Passos

## Templates de Follow-up

### Após primeiro contato
"Olá [Nome], conversamos sobre [tema]. Preparei um material sobre como empresas do setor de [segmento] estão estruturando o acolhimento para a Nova NR-01. Posso enviar?"

### Após apresentação
"[Nome], seguindo nossa conversa, preparei uma proposta para a [Empresa] considerando [número] colaboradores. Quando podemos alinhar?"

### Reengajamento
"[Nome], com a obrigatoriedade da NR-01 para riscos psicossociais, muitas empresas do porte de vocês estão buscando soluções preventivas. Vale uma conversa rápida de 15 minutos?"

## Regras
- Português brasileiro
- Markdown para formatação
- Direto e acionável
- Personalize com dados do lead
- NUNCA mencione "familiares" ou "dependentes"
- NUNCA mencione Direito Trabalhista, Criminal ou Relações Contratuais`;

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

const OPEN_LEAD_FORM_TOOL = {
  type: "function",
  function: {
    name: "open_lead_form",
    description:
      "Abre o formulário de agendamento/CTA no frontend do visitante. Use quando o lead demonstrar interesse em agendar, conhecer valores, ou quando quiser coletar dados de contato. PREFIRA esta ferramenta em vez de coletar dados manualmente.",
    parameters: {
      type: "object",
      properties: {
        reason: {
          type: "string",
          description: "Motivo para abrir o formulário (ex: 'agendar conversa', 'solicitar proposta')",
        },
      },
      required: [],
    },
  },
};

const SEND_MATERIAL_TOOL = {
  type: "function",
  function: {
    name: "send_material",
    description:
      "Envia material comercial (apresentação ou one-pager) para o lead. Use quando o visitante pedir mais informações, material, apresentação ou resumo da Juripass.",
    parameters: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: ["apresentacao", "one_pager"],
          description: "Tipo de material: 'apresentacao' para apresentação comercial completa, 'one_pager' para resumo de uma página",
        },
      },
      required: ["type"],
    },
  },
};

// Simple in-memory rate limiter (per isolate)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  if (rateLimitMap.size > 1000) {
    for (const [key, vals] of rateLimitMap) {
      if (vals.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }
  return false;
}

async function handleToolCall(
  tc: any,
  sessionId: string | undefined,
  writer: WritableStreamDefaultWriter<Uint8Array>,
  encoder: TextEncoder
) {
  const supabaseService = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  if (tc.function.name === "open_lead_form") {
    // Send action event to frontend
    await writer.write(
      encoder.encode(`data: ${JSON.stringify({ action: "open_lead_form" })}\n\n`)
    );
    return;
  }

  if (tc.function.name === "send_material") {
    try {
      const args = JSON.parse(tc.function.arguments);
      const materialType = args.type || "apresentacao";

      // Find builtin material matching the type
      const titleSearch = materialType === "one_pager" ? "One-Pager" : "Apresentação";
      const { data: material } = await supabaseService
        .from("sales_materials")
        .select("id, title, file_path, file_type")
        .ilike("title", `%${titleSearch}%`)
        .limit(1)
        .maybeSingle();

      if (material) {
        const baseUrl = Deno.env.get("SUPABASE_URL")!.replace(
          ".supabase.co",
          ".supabase.co"
        );
        // Create a generic share for the chat (no specific lead yet)
        // We need a placeholder lead or handle without lead_id
        // For now, send the material info as an action
        await writer.write(
          encoder.encode(
            `data: ${JSON.stringify({
              action: "send_material",
              material: {
                id: material.id,
                title: material.title,
                type: material.file_type,
                path: material.file_path,
              },
            })}\n\n`
          )
        );
      } else {
        await writer.write(
          encoder.encode(
            `data: ${JSON.stringify({
              action: "send_material",
              material: null,
              error: "Material não encontrado",
            })}\n\n`
          )
        );
      }
    } catch (e) {
      console.error("send_material error:", e);
    }
    return;
  }

  if (tc.function.name === "save_lead") {
    try {
      const args = JSON.parse(tc.function.arguments);
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
        if (sessionId) {
          await supabaseService
            .from("chat_conversations")
            .update({ lead_id: newLead?.id })
            .eq("session_id", sessionId);
        }
        // Fire and forget email notification
        try {
          await fetch(
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
        } catch (e) {
          console.error("Email notification error:", e);
        }
      }

      await writer.write(
        encoder.encode(
          `data: ${JSON.stringify({ tool_result: { tool_call_id: tc.id, lead_saved: !insertError, lead_id: newLead?.id } })}\n\n`
        )
      );
    } catch (e) {
      console.error("save_lead error:", e);
    }
    return;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode = "qualify", leadContext, sessionId, leadFormSubmitted } = await req.json();

    // Rate limit public qualify mode by IP
    if (mode === "qualify") {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      if (isRateLimited(ip)) {
        return new Response(
          JSON.stringify({ error: "Muitas mensagens. Aguarde um momento antes de tentar novamente." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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

    let systemPrompt = mode === "assist" ? ASSIST_SYSTEM_PROMPT : QUALIFY_SYSTEM_PROMPT;
    if (mode === "assist" && leadContext) {
      systemPrompt += `\n\n## Contexto do Lead Atual\n${JSON.stringify(leadContext, null, 2)}`;
    }
    if (mode === "qualify" && leadFormSubmitted) {
      systemPrompt += `\n\n## IMPORTANTE: FORMULÁRIO JÁ PREENCHIDO\nO visitante JÁ preencheu o formulário de agendamento. NÃO ofereça o formulário novamente. NÃO use a ferramenta open_lead_form. Agradeça, confirme que o time comercial entrará em contato em breve e ofereça materiais ou tire dúvidas sobre a Juripass.`;
    }

    const body: any = {
      model: "google/gemini-3-flash-preview",
      messages: [{ role: "system", content: systemPrompt }, ...sanitizedMessages],
      stream: true,
    };

    // Add tools for qualify mode
    if (mode === "qualify") {
      body.tools = [SAVE_LEAD_TOOL, OPEN_LEAD_FORM_TOOL, SEND_MATERIAL_TOOL];
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

    // For qualify mode, intercept stream to handle tool calls
    if (mode === "qualify") {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      let toolCalls: any[] = [];
      let currentToolCall: any = null;

      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      const encoder = new TextEncoder();

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
                // ignore partial JSON
              }
            }
          }

          // Process tool calls after stream ends
          let hasToolCalls = false;
          for (const tc of toolCalls) {
            hasToolCalls = true;
            await handleToolCall(tc, sessionId, writer, encoder);
          }

          // If the model only produced tool calls (no text content), inject a synthetic response
          // so the chat doesn't appear frozen/empty
          if (hasToolCalls) {
            const toolNames = toolCalls.map((tc: any) => tc.function?.name).filter(Boolean);
            let syntheticText = "";
            if (toolNames.includes("open_lead_form")) {
              syntheticText = "Perfeito! Abri o formulário para você. 😊\nÉ só preencher e nosso time entra em contato rapidinho.";
            } else if (toolNames.includes("send_material")) {
              // Build base URL from request origin
              const origin = req.headers.get("origin") || req.headers.get("referer")?.replace(/\/+$/, "") || "https://juripass-client-portal.lovable.app";
              const materialArgs = toolCalls.find((t: any) => t.function?.name === "send_material");
              let matType = "apresentacao";
              try { matType = JSON.parse(materialArgs?.function?.arguments || "{}").type || "apresentacao"; } catch {}
              const matPath = matType === "one_pager" ? "/materiais/one-pager" : "/materiais/apresentacao";
              const matLabel = matType === "one_pager" ? "One-Pager" : "Apresentação Comercial";
              syntheticText = `Aqui está a ${matLabel} da Juripass:\n\n👉 [Abrir ${matLabel}](${origin}${matPath})\n\nSe quiser, posso abrir o formulário para agendar uma conversa com o time.`;
            }
            if (syntheticText) {
              const syntheticChunk = JSON.stringify({
                choices: [{ delta: { content: syntheticText } }],
              });
              await writer.write(encoder.encode(`data: ${syntheticChunk}\n\n`));
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

    // For assist mode, pass through
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
