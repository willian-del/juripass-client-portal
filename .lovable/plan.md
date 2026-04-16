

## Plano: Otimizar navegacao admin (eliminar re-auth e melhorar transicoes)

### Diagnostico

A lentidao vem de **3 problemas**:

1. **Auth re-check em cada pagina**: `AdminAuthGuard` faz `getSession()` + query `user_roles` toda vez que voce navega entre CRM, Materiais e Hub. Isso adiciona ~500-1000ms por transicao.
2. **AdminHub** tambem faz seu proprio `getSession()` independente.
3. **AdminMaterials** dispara 4 fetches simultaneos (materials, shares, leads, templates) no mount — sem cache.

### Solucao

**1. Criar `AdminAuthContext`** (`src/contexts/AdminAuthContext.tsx`)
- Context React que verifica auth/role **uma unica vez** e mantém o estado em memoria.
- Expoe `authorized`, `loading` e `logout()`.
- Escuta `onAuthStateChange` para invalidar se sessao expirar.

**2. Criar `AdminLayout`** (`src/layouts/AdminLayout.tsx`)
- Layout wrapper com `<Outlet />` que envolve todas as rotas `/admin/*`.
- Renderiza o `AdminAuthProvider` uma vez, eliminando re-checks.

**3. Atualizar rotas em `App.tsx`**
- Agrupar `/admin`, `/admin/leads` e `/admin/materiais` dentro de um `<Route element={<AdminLayout />}>` com rotas filhas.

**4. Simplificar paginas admin**
- **AdminHub**: Remover check de sessao proprio, usar `useAdminAuth()` para logout.
- **AdminLeads**: Remover `<AdminAuthGuard>` wrapper, usar `useAdminAuth()` para logout.
- **AdminMaterials**: Remover `<AdminAuthGuard>` wrapper.

### Arquivos impactados
1. `src/contexts/AdminAuthContext.tsx` — **novo**
2. `src/layouts/AdminLayout.tsx` — **novo**
3. `src/App.tsx` — reestruturar rotas admin como nested
4. `src/pages/admin/AdminHub.tsx` — remover auth check duplicado
5. `src/pages/admin/AdminLeads.tsx` — remover AdminAuthGuard, usar context
6. `src/pages/admin/AdminMaterials.tsx` — remover AdminAuthGuard

### Resultado esperado
Navegacao entre paginas admin sera instantanea (sem loading "Carregando..." a cada clique).

