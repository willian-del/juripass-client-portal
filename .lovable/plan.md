

# Correção do build que impede a publicação

## Problema
O build do Vite completa com sucesso, mas o script `postbuild` executa `react-snap` que falha (conflito com bibliotecas ESM como `react-markdown` e APIs de navegador). Isso impede a publicação — o site fica preso na versão antiga.

Isso já foi documentado no projeto: *"O projeto não utiliza pré-renderização estática (react-snap) devido a conflitos de build"*. Porém o `postbuild` e a dependência nunca foram removidos.

## Solução

| Arquivo | Mudança |
|---------|---------|
| `package.json` | Remover script `postbuild`, bloco `reactSnap`, e dependência `react-snap` |

Apenas essas 3 remoções. Nada mais precisa mudar — o SEO já é coberto por `SEOHead`, `sitemap.xml` e metatags dinâmicas.

