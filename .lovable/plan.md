

## Plano: Corrigir lentidão na navegação admin

### Diagnóstico

Dois problemas principais:

**1. Chunk gigante no AdminMaterials** — As linhas 31-35 importam diretamente `SlidesPresentation`, `SlidesColaborador`, `OnePager`, `PostersViewer` e `PropostaComercial`. Esses componentes trazem consigo `html2canvas` e `jsPDF` (~1.5MB). Como o Vite agrupa tudo no mesmo chunk lazy, qualquer navegação para `/admin/materiais` baixa e parseia esse bundle inteiro, causando atraso de vários segundos. E como estão no mesmo grupo de rotas nested, isso pode afetar o carregamento inicial do layout.

**2. useEffect re-executando** — `AdminAuthContext` tem `[navigate]` como dependência do `useEffect`. Em React Router v6, `useNavigate()` pode retornar uma referência instável, fazendo o efeito de auth re-executar em cada transição de rota, gerando novas chamadas `getSession()` + `user_roles`.

### Solução

**1. Lazy import dos componentes pesados em AdminMaterials**
- Trocar os imports estáticos (linhas 31-35) por `React.lazy()` para `SlidesPresentation`, `SlidesColaborador`, `OnePager`, `PostersViewer` e `PropostaComercial`
- Envolver os usos desses componentes em `<Suspense>` com fallback de loading
- Isso separa o chunk pesado (~1.5MB) e só carrega quando o usuário realmente abre uma preview

**2. Estabilizar dependência do useEffect no AdminAuthContext**
- Usar `useRef` para armazenar `navigate` e remover da lista de dependências do `useEffect`
- Isso garante que o check de auth roda **exatamente uma vez** por sessão

### Arquivos impactados
1. `src/pages/admin/AdminMaterials.tsx` — lazy imports dos 5 componentes pesados
2. `src/contexts/AdminAuthContext.tsx` — estabilizar navigate ref

### Resultado esperado
Transições entre Hub → CRM → Materiais serão instantâneas (sem re-auth, sem carregar bundles pesados desnecessariamente).

