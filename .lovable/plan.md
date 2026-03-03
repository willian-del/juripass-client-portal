

# Consistencia de Layout: Blog e BlogPost

## Inconsistencias encontradas

| Item | Atual | Padrao do site |
|------|-------|----------------|
| **BlogPost** article padding (linha 36) | `py-12 md:py-20` | `py-16 md:py-24` |
| **Blog** article grid section (linha 32) | `py-16` (sem md) | `py-16 md:py-24` |
| **BlogPost** related articles cards (linha 83) | `rounded-xl` | `rounded-2xl` |
| **BlogPost** paginas relacionadas cards (linhas 98, 108) | `rounded-xl` | `rounded-2xl` |

Nenhum problema de conteudo sensivel encontrado nestas paginas.

## Alteracoes

**`src/pages/Blog.tsx`**
- Linha 32: trocar `py-16` por `py-16 md:py-24`

**`src/pages/BlogPost.tsx`**
- Linha 36: trocar `py-12 md:py-20` por `py-16 md:py-24`
- Linha 83: trocar `rounded-xl` por `rounded-2xl`
- Linhas 98, 108: trocar `rounded-xl` por `rounded-2xl`

2 arquivos, apenas classes Tailwind.

