

# Fix: Chat Widget não aparece em produção (build failure)

## Diagnóstico

O build falha no passo `postbuild: react-snap` (pré-renderização). O Vite compila com sucesso, mas o `react-snap` tenta renderizar as páginas em headless browser e provavelmente falha ao encontrar o `ChatWidget` (que usa `sessionStorage`, `crypto.randomUUID`, `fetch` streaming — APIs que não existem no contexto de pré-renderização).

A produção está rodando uma versão antiga do código, anterior à adição do ChatWidget.

## Solução

### 1. Tornar o ChatWidget compatível com SSR/react-snap

No `ChatWidget.tsx`, verificar se está rodando em contexto de pré-renderização (`navigator.userAgent` contém "ReactSnap") e não renderizar nada nesse caso:

```tsx
// No início do componente ChatWidget
if (typeof navigator !== 'undefined' && navigator.userAgent?.includes('ReactSnap')) {
  return null;
}
```

### 2. Proteger o `useChat.ts` contra SSR

No `getSessionId()`, guardar contra `sessionStorage` não disponível:

```tsx
function getSessionId() {
  if (typeof window === 'undefined') return 'ssr';
  // ...resto
}
```

### 3. Verificar se react-markdown é compatível

`react-markdown` v10 usa ESM puro. Se o react-snap não suportar, pode ser necessário fazer lazy import ou usar dynamic import com `React.lazy`.

## Arquivos modificados

| Arquivo | Mudança |
|---------|---------|
| `src/components/chat/ChatWidget.tsx` | Guard para react-snap |
| `src/components/chat/useChat.ts` | Guard SSR no sessionStorage |

Nenhuma mudança de lógica, banco ou edge function.

