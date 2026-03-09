

# Formulário de qualificação de leads + Mini CRM

## Visão geral

Expandir o formulário de captura com campos de qualificação, criar um sistema de scoring automático, e construir um mini CRM protegido por autenticação para gestão dos leads.

---

## 1. Banco de dados

### Migração: adicionar colunas na tabela `leads`

```sql
ALTER TABLE public.leads
  ADD COLUMN employee_count text,        -- 'up_to_50', '50_200', '200_500', '500_1000', '1000_plus'
  ADD COLUMN department text,            -- 'rh', 'juridico', 'financeiro', 'compliance', 'diretoria', 'outro'
  ADD COLUMN seniority text,            -- 'analista', 'coordenador', 'gerente', 'diretor', 'socio'
  ADD COLUMN interest text,             -- 'apoio_juridico', 'nr01', 'beneficio', 'passivo_trabalhista', 'conhecer'
  ADD COLUMN evaluating_psychosocial text,  -- 'sim', 'ainda_nao', 'pesquisando'
  ADD COLUMN has_legal_benefit text,    -- 'sim', 'nao', 'nao_sei'
  ADD COLUMN lead_score integer DEFAULT 0,
  ADD COLUMN lead_priority text DEFAULT 'normal',  -- 'hot', 'warm', 'normal', 'cold'
  ADD COLUMN funnel_stage text DEFAULT 'novo',      -- 'novo', 'contatado', 'qualificado', 'proposta', 'fechado', 'perdido'
  ADD COLUMN notes text DEFAULT '',
  ADD COLUMN contacted_at timestamptz;
```

### Função de scoring (database function)

Calcular score automaticamente via trigger no INSERT:

| Critério | Pontos |
|---|---|
| 500-1000 colaboradores | +20 |
| 1000+ colaboradores | +30 |
| RH / Pessoas | +15 |
| Compliance | +10 |
| Diretor / Sócio | +20 |
| Gerente | +10 |
| NR-01 ou Passivo trabalhista | +15 |
| Já avaliando psicossociais = Sim | +10 |
| Não tem benefício jurídico = Não | +10 |

**Prioridade derivada:**
- Score >= 60 → `hot`
- Score >= 35 → `warm`
- Score >= 15 → `normal`
- Abaixo → `cold`

Trigger `BEFORE INSERT` na tabela `leads` que calcula `lead_score` e `lead_priority`.

---

## 2. Formulário (LeadFormDialog.tsx)

Transformar o dialog em formulário multi-step para não sobrecarregar:

**Step 1 - Dados de contato** (campos atuais): Nome, Email, Telefone, Empresa

**Step 2 - Qualificação** (novos campos com radio buttons):
- Numero de colaboradores (5 opções)
- Qual sua area? (6 opções)
- Cargo (5 opções - substitui o campo texto `role_title`)
- Como podemos ajudar? (5 opções)
- Avaliando riscos psicossociais? (3 opções)
- Benefício jurídico hoje? (3 opções)

**Step 3 - Mensagem** (opcional): Campo de texto livre

O dialog usará `sm:max-w-lg` e scroll interno para acomodar os campos. Indicador de progresso (steps 1/3, 2/3, 3/3) no topo.

O campo `role_title` será preenchido pela seleção de cargo (mapeamento: 'analista' → 'Analista', etc.).

---

## 3. Edge Function (send-lead-email)

- Aceitar os novos campos no body
- Incluir todas as informações de qualificação no email HTML
- **Destacar visualmente** leads `hot` no assunto: `🔥 LEAD QUENTE: ${name} - ${company}`
- Incluir score e prioridade no email

---

## 4. Mini CRM - Dashboard de Leads

### Autenticação
- Página `/admin/login` com email/senha
- Proteger rotas `/admin/*` com auth guard
- Criar usuário admin manualmente no banco (sem signup público)

### Página `/admin/leads`
- Tabela com todos os leads, ordenados por score (desc) e data
- Colunas: Nome, Empresa, Colaboradores, Area, Cargo, Score, Prioridade (badge colorido), Etapa do funil, Data
- **Filtros**: por prioridade, etapa do funil, departamento
- **Kanban simplificado**: alternar entre visão tabela e visão kanban por etapa do funil
- Click no lead abre painel lateral com:
  - Todos os dados do formulário
  - Campo de notas editável
  - Botão para alterar etapa do funil (dropdown)
  - Botão "Marcar como contatado" (salva `contacted_at`)

### RLS
- Leitura de leads: apenas `authenticated` com role `admin`
- Update de leads (notas, funnel_stage, contacted_at): apenas `admin`
- Insert mantém como está (anon + authenticated)

### Estrutura de arquivos

```text
src/pages/admin/
  AdminLogin.tsx
  AdminLeads.tsx
src/components/admin/
  LeadTable.tsx
  LeadDetailPanel.tsx
  LeadKanban.tsx
  FunnelBadge.tsx
  PriorityBadge.tsx
  AdminAuthGuard.tsx
```

---

## 5. Email de alerta para leads quentes

Na edge function, quando `lead_priority = 'hot'`:
- Assunto diferenciado com emoji de fogo
- Email enviado com tag `[URGENTE]` para `comercial@juripass.com.br`

---

## Resumo de entregas

| # | Entrega |
|---|---|
| 1 | Migração: novas colunas + trigger de scoring |
| 2 | Formulário multi-step com qualificação |
| 3 | Edge function atualizada com novos campos + alerta hot |
| 4 | Sistema de auth admin |
| 5 | Dashboard CRM com tabela, filtros e painel de detalhes |
| 6 | Kanban por etapa do funil |

