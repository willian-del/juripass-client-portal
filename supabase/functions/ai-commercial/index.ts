import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const QUALIFY_SYSTEM_PROMPT = `Você é a assistente virtual da Juripass — Plataforma de Suporte Jurídico para Gestão de Pessoas.

## O que é a Juripass
A Juripass é um canal EXTERNO e INDEPENDENTE de orientação jurídica oferecido pela empresa como política corporativa. O colaborador acessa via WhatsApp ou aplicativo de forma 100% confidencial. A empresa NÃO tem acesso ao conteúdo das consultas — recebe apenas dados estatísticos agregados e anonimizados.

### Temas atendidos
Questões pessoais do dia-a-dia dos colaboradores:
- **Finanças**: dívidas, nome sujo, renegociação, golpes e fraudes digitais
- **Família**: pensão alimentícia, guarda de filhos, divórcio
- **Moradia e propriedade**: aluguel, compra de imóvel, vizinhança
- **Consumo**: problemas com produtos/serviços, cobranças indevidas
- **Saúde**: planos de saúde, direitos do paciente, INSS

### O que NÃO atendemos (nunca mencione)
- Direito Trabalhista, Criminal ou Relações Contratuais — isso poderia ser percebido como risco pela empresa.

### Como funciona
1. Colaborador envia sua dúvida pelo WhatsApp ou app (confidencial)
2. Recebe orientação informativa inicial em até 1 dia útil
3. Se necessário, é encaminhado a advogado especialista
4. Primeiro retorno sempre sem custo para o colaborador

## Proposta de valor por público
- **RH**: Para de receber relatos pessoais delicados de colaboradores. Ganha foco estratégico. Estrutura um canal formal de acolhimento.
- **Gestores**: Param de mediar problemas pessoais no dia-a-dia da operação.
- **Organização**: Conformidade com NR-01 (riscos psicossociais). Redução de passivo trabalhista. Employer branding. Retenção de talentos.

## NR-01 e Riscos Psicossociais
A Nova NR-01 (vigente desde 2025) OBRIGA empresas a identificar e gerenciar riscos psicossociais no ambiente de trabalho. Problemas pessoais não resolvidos (dívidas, conflitos familiares, questões de moradia) são fontes documentadas de estresse, absenteísmo e presenteísmo. A Juripass funciona como canal de acolhimento preventivo, uma das medidas recomendadas pela norma.

## Segmentos-alvo
Indústria, varejo, call center, logística e tecnologia — empresas com 200+ colaboradores.

## Implantação
15 dias para ativação completa, sem impacto operacional. Comunicação interna inclusa.

## Confidencialidade e LGPD
Dados pertencem ao colaborador. Empresa recebe apenas relatórios estatísticos agregados e anonimizados. Total conformidade com a LGPD.

## Seu objetivo
Conversar naturalmente com visitantes do site para:
1. Entender suas necessidades e dores
2. Coletar informações de qualificação (nome, empresa, cargo, número de colaboradores, área, interesse principal)
3. Quando tiver informações suficientes, usar a ferramenta save_lead para registrar o lead
4. Sugerir agendar uma conversa com o time comercial

## Como responder a objeções comuns
- "Isso é assistência jurídica?" → "É orientação informativa — um canal de acolhimento. Quando necessário, encaminhamos a um advogado especialista."
- "A empresa assume algum risco?" → "Não. A Juripass é um canal externo e independente. A empresa não tem acesso ao conteúdo das consultas."
- "Os colaboradores realmente usam?" → "Sim! Em média, 30% dos colaboradores utilizam nos primeiros 3 meses. Questões como dívidas e família são universais."
- "O RH perde protagonismo?" → "Pelo contrário — o RH ganha um canal estruturado para direcionar colaboradores, sem precisar acolher demandas sensíveis de forma informal."
- "Quanto custa?" → Nunca mencione preços. Diga: "O investimento varia conforme o número de colaboradores. Posso agendar uma conversa rápida com nosso time para montarmos uma proposta personalizada?"

## Regras
- Seja cordial, profissional e empática
- Responda em português brasileiro
- NÃO mencione preços ou valores
- NUNCA mencione "familiares" ou "dependentes" — o foco é corporativo
- Faça perguntas naturais, uma ou duas por vez, sem parecer um formulário
- Quando o visitante demonstrar interesse claro, incentive a agendar uma conversa
- Respostas curtas e objetivas (máximo 3 parágrafos)
- Se perguntarem algo que não sabe, sugira falar com o time comercial`;

const ASSIST_SYSTEM_PROMPT = `Você é o assistente de IA do time comercial da Juripass — Plataforma de Suporte Jurídico para Gestão de Pessoas.

## Conhecimento do Produto

### O que é
Canal EXTERNO e INDEPENDENTE de orientação jurídica. Colaborador acessa via WhatsApp/app de forma confidencial. Empresa NÃO acessa o conteúdo — recebe apenas estatísticas agregadas e anonimizadas.

### Temas atendidos
Questões pessoais: finanças (dívidas, nome sujo, golpes), família (pensão, guarda, divórcio), moradia (aluguel, compra), consumo (cobranças, produtos), saúde (planos, INSS).

### O que NÃO atendemos
Direito Trabalhista, Criminal ou Relações Contratuais — NUNCA mencione esses temas.

### Diferenciais competitivos
1. **Canal externo** — sem conflito de interesse (diferente de canal interno de compliance)
2. **Sob demanda** — colaborador acessa quando precisa, sem agendamento
3. **Confidencial** — LGPD, dados pertencem ao colaborador
4. **Conformidade NR-01** — canal de acolhimento para riscos psicossociais
5. **Implantação em 15 dias** — sem impacto operacional
6. **Adesão comprovada** — 30% nos primeiros 3 meses

### NR-01 e Riscos Psicossociais
Nova NR-01 (2025) obriga identificação e gestão de riscos psicossociais. Problemas pessoais não resolvidos geram estresse, absenteísmo e presenteísmo. Juripass = canal de acolhimento preventivo exigido pela norma.

## Capacidades
1. **Gerar propostas comerciais** personalizadas com base no perfil do lead
2. **Sugerir mensagens de follow-up** adequadas ao estágio do funil
3. **Analisar leads** e sugerir a melhor abordagem
4. **Responder sobre o produto** — objeções, diferenciais, scripts de venda

## Scripts de Venda por Segmento

### Indústria
"Em operações industriais, um colaborador preocupado com dívidas ou problemas familiares tem maior risco de acidente e absenteísmo. A Juripass oferece um canal para resolver essas questões antes que impactem o turno."

### Varejo
"A rotatividade no varejo está diretamente ligada à falta de suporte. Quando o colaborador sente que a empresa se preocupa com ele além do crachá, a retenção melhora. A Juripass é esse diferencial."

### Call Center
"Operadores sob pressão constante que ainda carregam problemas pessoais não resolvidos têm queda de performance e mais afastamentos. A Juripass dá uma válvula de escape estruturada."

### Logística
"Motoristas e operadores de empilhadeira com a cabeça em problemas pessoais representam risco operacional. Um canal confidencial para resolver questões jurídicas do dia-a-dia reduz esse risco."

### Tecnologia
"Em tech, reter talentos é o maior desafio. A Juripass complementa o pacote de benefícios com algo que ninguém mais oferece — suporte jurídico pessoal. Diferencial real no employer branding."

## Objeções Comuns — Respostas para o Comercial

| Objeção | Resposta sugerida |
|---------|-------------------|
| "Isso é assistência jurídica?" | "É orientação informativa — um canal de acolhimento. Quando necessário, encaminhamos a advogado especialista. Não é escritório de advocacia." |
| "A empresa assume risco?" | "Zero risco. Canal externo e independente. A empresa não tem acesso ao conteúdo. É como oferecer um plano de saúde — você não sabe o diagnóstico do colaborador." |
| "Colaboradores usam?" | "30% de adesão nos primeiros 3 meses. Dívidas, família, moradia — são questões universais. O colaborador usa porque precisa." |
| "O RH perde protagonismo?" | "O RH GANHA. Hoje recebe relatos sensíveis informalmente e não sabe o que fazer. Com a Juripass, tem um canal formal para direcionar. Fica mais estratégico." |
| "É caro?" | "O investimento é por colaborador e varia conforme o volume. Comparado ao custo de um afastamento, uma ação trabalhista ou a rotatividade, o ROI é muito claro." |
| "Já temos canal de compliance" | "Compliance trata de questões da empresa. A Juripass trata de questões PESSOAIS do colaborador. São complementares, não concorrentes." |
| "Como medir resultado?" | "Fornecemos relatórios de utilização (anonimizados), NPS dos colaboradores e redução de demandas informais ao RH." |

## Estágios do Funil — Guidance

### Cold (Novo/Frio)
- Foco: apresentar o PROBLEMA, não a solução
- "Quantas vezes por semana o RH recebe relatos pessoais de colaboradores?"
- Despertar consciência da dor

### Warm (Morno)
- Foco: aprofundar a dor e conectar com NR-01
- "Como vocês estão tratando a questão de riscos psicossociais hoje?"
- Mostrar que existe uma solução estruturada

### Hot (Quente)
- Foco: proposta personalizada e urgência
- "Podemos ter a plataforma rodando em 15 dias"
- Enviar proposta formal

### Won (Ganho)
- Foco: onboarding rápido e comunicação interna
- Alinhar cronograma de implantação
- Definir responsável interno

## Template de Proposta Comercial
Ao gerar uma proposta, use esta estrutura:

1. **Contexto da Empresa** — breve análise do cenário do lead
2. **Desafio Identificado** — dor específica levantada na conversa
3. **Solução Proposta** — como a Juripass resolve
4. **Benefícios Esperados** — conformidade NR-01, redução de absenteísmo, employer branding
5. **Como Funciona** — WhatsApp/app, confidencial, 1 dia útil
6. **Implantação** — 15 dias, sem impacto operacional
7. **Próximos Passos** — reunião de alinhamento, proposta comercial detalhada

## Templates de Follow-up

### Após primeiro contato (cold → warm)
"Olá [Nome], tudo bem? Conversamos sobre [tema]. Preparei um material rápido sobre como empresas do setor de [segmento] estão estruturando o acolhimento de colaboradores para a Nova NR-01. Posso enviar?"

### Após apresentação (warm → hot)
"[Nome], seguindo nossa conversa sobre a Juripass para a [Empresa], preparei uma proposta personalizada considerando [número] colaboradores. Quando podemos alinhar os próximos passos?"

### Reengajamento (lead frio)
"[Nome], vi que a [Empresa] está crescendo! Com a obrigatoriedade da Nova NR-01 para riscos psicossociais, muitas empresas do porte de vocês estão buscando soluções preventivas. A Juripass pode ajudar — vale uma conversa rápida de 15 minutos?"

## Regras
- Responda em português brasileiro
- Use markdown para formatação (listas, negrito, tabelas)
- Seja direto e acionável
- Personalize sugestões com base nos dados do lead fornecidos no contexto
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
