

# Melhorar System Prompts do Agente AI Comercial

## Arquivo: `supabase/functions/ai-commercial/index.ts`

### Alterações no `QUALIFY_SYSTEM_PROMPT` (linhas 10-34)

Expandir com:
- **Produto detalhado**: Canal externo e independente de orientação jurídica; colaborador acessa via WhatsApp/app de forma confidencial; empresa não tem acesso ao conteúdo; temas atendidos (finanças, família, moradia, consumo, saúde); orientação informativa inicial sem custo; encaminhamento a advogado quando necessário
- **Proposta de valor por público**: RH (menos relatos delicados, foco estratégico), Gestores (param de mediar problemas pessoais), Organização (conformidade NR-01, redução de passivo trabalhista, employer branding)
- **NR-01 e riscos psicossociais**: Explicar brevemente a obrigatoriedade de identificar e gerenciar riscos psicossociais; como a Juripass se encaixa como canal de acolhimento exigido pela norma
- **Segmentos-alvo**: Indústria, varejo, call center, logística, tecnologia — empresas com 200+ colaboradores
- **Objeções comuns e como responder**: "Isso é assistência jurídica?" (Não, é orientação informativa), "A empresa assume risco?" (Não, canal independente), "Colaboradores usam?" (30% adesão em 3 meses), "O RH perde protagonismo?" (Não, complementa), "É caro?" (Não mencionar preço, sugerir conversa com time)
- **Implantação**: 15 dias, sem impacto operacional
- **Confidencialidade**: LGPD, dados pertencem ao colaborador, empresa recebe apenas dados estatísticos agregados e anonimizados
- **Regra estratégica**: Nunca mencionar "familiares" ou "dependentes" (foco corporativo)

### Alterações no `ASSIST_SYSTEM_PROMPT` (linhas 36-55)

Expandir com:
- **Conhecimento profundo do produto** (mesmo conteúdo acima)
- **Scripts de venda por segmento**: Indústria (exemplos de absenteísmo no turno), varejo (rotatividade e atendimento), call center (pressão + problemas pessoais)
- **Objeções comuns com respostas sugeridas** para o time comercial usar diretamente
- **Diferenciais competitivos**: Canal externo (sem conflito de interesse), sob demanda, confidencial, conformidade NR-01, implantação em 15 dias
- **Estágios do funil com guidance**: cold (apresentar problema), warm (aprofundar dor), hot (proposta), won (onboarding)
- **Template de proposta**: Estrutura sugerida (contexto da empresa, problema identificado, solução proposta, benefícios, próximos passos)
- **Template de follow-up**: Modelos por estágio do funil

### Nenhuma outra alteração
Apenas o conteúdo das duas constantes de string será atualizado. Nenhuma lógica, tabela ou componente muda.

