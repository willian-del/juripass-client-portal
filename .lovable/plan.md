
## Plano: Indicador de material já enviado

### Problema
No popover "Gerar novo link" da aba Materiais, todos os materiais aparecem iguais — sem distinção entre os que já foram enviados ao lead e os novos. Isso pode levar a envios duplicados acidentais.

### Solução

No popover de seleção de materiais dentro do `LeadDetailPanel`, marcar visualmente os itens que já têm pelo menos um `material_share` registrado para o lead atual.

### Como funciona

1. Já temos `materialShares` (lista de shares do lead) carregada no painel.
2. Criar um `Set` com os `material_id` já compartilhados.
3. No render de cada item no popover:
   - Se já enviado: mostrar badge "Já enviado" + contagem de envios + ícone de check, com tom mais sutil (texto muted).
   - Se nunca enviado: aparência normal.
4. O item continua clicável (admin pode reenviar de propósito), mas a sinalização evita cliques acidentais.

### Detalhes visuais
- Badge pequeno ao lado direito: `Já enviado · 2x` (ou similar) usando `Badge variant="secondary"`.
- Ícone `CheckCircle2` em verde discreto antes do título.
- Texto do material em `text-muted-foreground` quando já enviado, mantendo legibilidade mas indicando estado "secundário".

### Arquivo impactado
- `src/components/admin/LeadDetailPanel.tsx` — adicionar lógica de cruzamento no popover de materiais.

### Resultado
Admin vê instantaneamente quais materiais já foram enviados ao lead e quantas vezes, evitando duplicatas acidentais sem bloquear reenvios intencionais.
