

# Correção definitiva do build de publicação

## Diagnóstico
O `package.json` ainda contém:
- Linha 12: `"postbuild": "react-snap"` — executa automaticamente após `vite build` e falha
- Linhas 14-47: bloco `reactSnap` com configuração
- Linha 95: `"react-snap": "^1.23.0"` nas dependencies

O `src/main.tsx` tem lógica de hidratação (`hydrateRoot`) que só faz sentido com react-snap.

O Vite compila com sucesso, mas o `postbuild` falha e bloqueia o deploy.

## Solução

| Arquivo | Mudança |
|---|---|
| `package.json` | Remover `"postbuild": "react-snap"` dos scripts; remover bloco `reactSnap` inteiro (linhas 14-47); remover `"react-snap"` das dependencies |
| `src/main.tsx` | Simplificar para usar apenas `createRoot().render()`, removendo `hydrateRoot` e a lógica condicional |

Nenhuma outra mudança necessária. O SEO já é coberto por `SEOHead`, `sitemap.xml` e metatags.

