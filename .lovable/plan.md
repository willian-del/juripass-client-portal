

## Problema

O arquivo `src/pages/BlogPost.tsx` tem um `BASE_URL` próprio ainda apontando para `https://juripass-client-portal.lovable.app`. Isso faz com que as páginas de blog gerem canonical tags com o domínio errado.

O `SEOHead.tsx` já está correto com `https://www.juripass.com.br`.

## Mudança

### `src/pages/BlogPost.tsx` (linha 8)
Substituir:
```ts
const BASE_URL = 'https://juripass-client-portal.lovable.app';
```
Por:
```ts
const BASE_URL = 'https://www.juripass.com.br';
```

Isso é a única ocorrência restante do domínio antigo em todo o projeto. Após essa correção, todas as páginas usarão canonical tags apontando para `https://www.juripass.com.br`. Será necessário republicar o frontend após a alteração.

