

## Plano: Redesign do card de oportunidade no CRM

### Problema
O dialog atual (`max-w-2xl`) ainda parece compacto e denso — textos pequenos, seções apertadas, sem hierarquia visual clara.

### Solução

Redesign completo do `LeadDetailPanel.tsx` com foco em respiração, hierarquia e usabilidade:

**1. Dialog maior e mais espaçoso**
- Aumentar para `max-w-4xl` (~896px) com padding generoso (`p-8`)
- Header com avatar/iniciais do lead, nome grande, empresa como subtítulo, badges de prioridade e score com mais destaque

**2. Layout em abas (Tabs) em vez de scroll longo**
- **Aba "Visão Geral"**: Contato + Qualificação em cards separados com ícones, layout em grid com mais espaço
- **Aba "Materiais"**: Lista de materiais enviados com cards maiores, botões de ação mais visíveis
- **Aba "Histórico"**: Chat e notas internas com mais espaço para leitura
- Isso elimina o scroll infinito e organiza a informação por contexto

**3. Melhorias visuais nos componentes**
- `Info` items com ícones pequenos e padding maior entre linhas
- Cards de material com layout mais claro (título, data, views em linha, ações em linha separada)
- Seção de Funil com visual de progresso (steps/dots) em vez de dropdown isolado
- Botão "Excluir" movido para um menu discreto (dropdown "⋯") no header em vez de botão vermelho gigante no fim
- Notas internas com auto-save ou feedback visual mais sutil

**4. Cores e tipografia**
- Títulos de seção maiores e com cor primária
- Separadores visuais entre seções
- Background sutil nos cards internos (`bg-muted/30`)

### Arquivo impactado
1. `src/components/admin/LeadDetailPanel.tsx` — redesign completo

### Resultado esperado
Card de lead amplo, limpo, com abas para navegar entre contextos, hierarquia visual clara e ações acessíveis sem parecer apertado.

