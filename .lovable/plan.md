

## Plano: Hub Administrativo + Rota `/admin`

### O que será feito

Criar uma página de entrada do painel administrativo (`/admin`) com dois cards lado a lado — **CRM** e **Materiais** — seguindo o mesmo design system da landing page de materiais (gradiente azul escuro, cards glassmorphism, logo branca).

### Detalhes

**Novo arquivo:** `src/pages/admin/AdminHub.tsx`
- Layout fullscreen com gradiente Juripass (`#2C3E7D → #162048`)
- Header com logo branca + botão "Sair"
- Título "Painel Administrativo" centralizado
- Grid de 2 cards com ícones (`Users` para CRM, `FolderOpen` para Materiais), cada um navegando para `/admin/leads` e `/admin/materiais`
- Verifica sessão ativa; redireciona para `/admin/login` se não autenticado
- Footer discreto

**Alterações em `src/App.tsx`:**
- Adicionar lazy import para `AdminHub`
- Adicionar rota `/admin` apontando para `AdminHub`

**Alteração em `src/pages/admin/AdminLogin.tsx`:**
- Mudar redirect pós-login de `/admin/leads` para `/admin` (o hub)

**Sobre o domínio `crm.juripass.com.br`:**
- Isso requer configuração DNS no seu provedor de domínio (um registro CNAME ou A apontando para o mesmo servidor)
- Dentro do Lovable, você pode configurar isso em **Project Settings → Domains**
- Depois de configurado, o acesso via `crm.juripass.com.br/admin` cairá direto no hub

### Arquivos impactados
1. `src/pages/admin/AdminHub.tsx` (novo)
2. `src/App.tsx` (nova rota)
3. `src/pages/admin/AdminLogin.tsx` (redirect)

