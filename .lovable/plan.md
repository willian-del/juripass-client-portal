
# Corrigir Header Consistente e Logo Lento

## Problema

O `HomeHeader` e o `Footer` sao renderizados **dentro** de cada pagina. Quando o usuario navega entre rotas, o React desmonta a pagina inteira (incluindo header e footer) e remonta a nova. Isso causa:
1. O logo recarrega a cada navegacao (flash/demora)
2. Os elementos do header "tremem" porque sao destruidos e recriados

## Solucao

Criar um layout compartilhado com `<Outlet>` do React Router. O header e footer ficam **fora** das rotas, persistindo entre navegacoes.

---

## Alteracoes

### 1. Criar `src/layouts/MainLayout.tsx`

Componente de layout que renderiza:
- `HomeHeader` (fixo, nunca desmonta)
- `<Outlet />` (conteudo da rota)
- `Footer` (fixo, nunca desmonta)

```text
HomeHeader
  Outlet (conteudo muda conforme a rota)
Footer
```

### 2. Atualizar `src/App.tsx`

Agrupar as rotas principais dentro de uma rota pai com `MainLayout`:

```text
<Route element={<MainLayout />}>
  <Route path="/" element={<Index />} />
  <Route path="/como-funciona" element={<ComoFunciona />} />
  <Route path="/para-quem" element={<ParaQuem />} />
  <Route path="/faq" element={<FAQ />} />
  <Route path="/avaliacao" element={<Avaliacao />} />
</Route>
```

As rotas `/site-anterior` e `*` (NotFound) ficam fora do layout, pois tem estrutura propria.

### 3. Remover `HomeHeader` e `Footer` de cada pagina

Remover os imports e uso de `HomeHeader` e `Footer` de:
- `src/pages/Index.tsx`
- `src/pages/ComoFunciona.tsx`
- `src/pages/ParaQuem.tsx`
- `src/pages/FAQ.tsx`
- `src/pages/Avaliacao.tsx`

Cada pagina passa a renderizar apenas seu conteudo (`<main>`), sem wrapper `<div className="min-h-screen">`.

### 4. Garantir scroll to top na navegacao

Adicionar um componente `ScrollToTop` dentro do `MainLayout` que usa `useLocation` para fazer `window.scrollTo(0, 0)` a cada mudanca de rota, evitando que o usuario chegue no meio da pagina ao navegar.

---

## Resultado esperado

- Header e Footer **nunca desmontam** entre navegacoes
- Logo carrega uma unica vez e permanece visivel
- Zero "tremor" ou flash ao trocar de pagina
- Experiencia de navegacao fluida e consistente

## Arquivos

| Arquivo | Acao |
|---------|------|
| `src/layouts/MainLayout.tsx` | Criar (novo) |
| `src/App.tsx` | Editar rotas |
| `src/pages/Index.tsx` | Remover HomeHeader/Footer |
| `src/pages/ComoFunciona.tsx` | Remover HomeHeader/Footer |
| `src/pages/ParaQuem.tsx` | Remover HomeHeader/Footer |
| `src/pages/FAQ.tsx` | Remover HomeHeader/Footer |
| `src/pages/Avaliacao.tsx` | Remover HomeHeader/Footer |

Nenhuma dependencia nova.
