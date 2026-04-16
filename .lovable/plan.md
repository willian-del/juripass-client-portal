
## Plano: Editar dados de contato direto no card da oportunidade

### Problema
Hoje o card mostra os campos de contato (nome, email, telefone, empresa, cargo) apenas como texto. Quando um lead foi criado sem email (ex: Thiago Botelho — email "Pendente"), não há como adicionar/corrigir essas informações pelo CRM. A função `updateField` já existe mas só é usada para `funnel_stage`, `contacted_at` e `notes`.

### Solução

Adicionar um botão **"Editar"** no card de Contato (aba Visão Geral) que transforma os campos em inputs editáveis, com botões **Salvar** e **Cancelar**.

### Como funciona

1. Botão **"Editar"** (ícone de lápis) no canto superior direito do card "Contato".
2. Ao clicar, os 5 campos viram inputs preenchidos com os valores atuais:
   - Nome (text)
   - Email (email)
   - Telefone (tel)
   - Empresa (text)
   - Cargo (text)
3. Aparecem dois botões abaixo: **Cancelar** (descarta) e **Salvar** (chama `updateField` com todos os campos alterados).
4. Validação simples: nome, empresa e email obrigatórios. Email precisa ter formato válido OU ficar vazio (caso queira manter "Pendente").
5. Após salvar:
   - Toast de sucesso, sai do modo edição, refresh do lead.
   - Se o email foi preenchido (deixou de ser temp), o avatar/badge "Pendente" some automaticamente.

### Detalhes técnicos

**Arquivo: `src/components/admin/LeadDetailPanel.tsx`**
- Adicionar estado `editingContact` (boolean) e `contactDraft` (objeto com os 5 campos).
- Ao entrar em modo edição, popular `contactDraft` com valores atuais do lead.
- Renderização condicional: se `editingContact`, mostrar inputs; senão, manter os `InfoRow` atuais.
- Função `saveContact()` chama `updateField(contactDraft)` e fecha o modo edição.
- Quando email é trocado de temp para real, o flag `hasRealEmail` é recalculado naturalmente no próximo render.

### Bonus: nome e empresa também editáveis
Mesmo comportamento aplica para o cabeçalho (nome + empresa + cargo no topo do dialog), mas para manter simples, edição fica concentrada no card "Contato" — o cabeçalho atualiza automaticamente após salvar.

### Arquivo impactado
- `src/components/admin/LeadDetailPanel.tsx` — adicionar modo edição inline no card de Contato.

### Resultado
Admin pode incluir/corrigir email, telefone e demais dados de qualquer lead direto do card, sem precisar acessar o banco. Resolve o caso do Thiago Botelho e qualquer lead criado sem dados completos.
