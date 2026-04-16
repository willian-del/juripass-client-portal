

## Plano: Acesso direto ao material (sem tela intermediária)

### Problema
Quando o lead abre o link compartilhado, ele vê uma landing page intermediária e precisa clicar em "Visualizar Material" para acessar o conteúdo. Isso adiciona fricção desnecessária e risco de perder o lead.

### Solução

Eliminar a tela intermediária: após carregar os dados do material, renderizar diretamente o conteúdo — exceto quando o gate de lead (nome/email) estiver ativo.

### Alteração em `src/pages/MaterialViewer.tsx`

**Lógica atual:**
1. Fetch material → mostra landing page → clica "Visualizar" → `setShowViewer(true)` → renderiza componente

**Nova lógica:**
1. Fetch material → se `require_lead_info` ativo e não preenchido → mostra gate (formulário nome/email)
2. Caso contrário → renderiza o componente diretamente (sem landing page intermediária)
3. Para materiais do tipo `file` (download) → redireciona direto para a URL do arquivo

Na prática:
- Remover o estado `showViewer` 
- Após o fetch bem-sucedido, se não precisa de gate, renderizar imediatamente o componente builtin ou redirecionar para o URL do arquivo
- Manter a tela de gate (formulário nome/email) como único ponto de parada antes do material

### Arquivo impactado
1. `src/pages/MaterialViewer.tsx` — simplificar fluxo removendo tela intermediária

