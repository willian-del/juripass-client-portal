

## Plano: Novas Páginas SEO e Artigos de Blog

### Resumo

Criar 3 landing pages SEO e 3 artigos de blog novos, sem alterar nenhum conteúdo existente. Adicionar rotas, atualizar sitemap e incluir links internos nos novos conteúdos.

---

### 1. Novas Landing Pages (3 arquivos)

Criar páginas seguindo o padrão visual do `NR01.tsx` (SEOHead, ScrollReveal, seções com ícones, CTA final):

| Arquivo | Rota | Título H1 |
|---------|------|-----------|
| `src/pages/GestaoRiscosPsicossociais.tsx` | `/gestao-riscos-psicossociais-nr01` | Gestão de Riscos Psicossociais na NR-01: Como Empresas Podem Estruturar Esse Processo |
| `src/pages/NR01RiscosPsicossociais.tsx` | `/nr01-riscos-psicossociais` | NR-01 e Riscos Psicossociais: O que muda para as empresas em 2026 |
| `src/pages/GestaoRiscosHumanos.tsx` | `/gestao-riscos-humanos-rh` | Gestão de Riscos Humanos: Como o RH pode estruturar prevenção e suporte |

Cada página incluirá:
- `SEOHead` com título, descrição e JSON-LD (Article + Organization)
- Hierarquia H1/H2 com as seções especificadas no prompt
- Links internos para `/`, `/como-funciona`, `/para-quem`
- CTA final com `openScheduling()`

### 2. Novos Artigos de Blog (dados em `blog-data.ts`)

Adicionar 3 novos artigos ao array `blogArticles`:

| Slug | Título | Categoria |
|------|--------|-----------|
| `nr01-riscos-psicossociais-2026` | NR-01: empresas terão que gerenciar riscos psicossociais a partir de 2026 | Compliance |
| `problemas-pessoais-impactam-trabalho` | Problemas pessoais dos colaboradores e seus impactos no trabalho | Gestão de RH |
| `beneficios-modernos-para-colaboradores` | Benefícios modernos para colaboradores: novas ferramentas de apoio ao RH | Benefícios |

Cada artigo terá 4-5 seções com conteúdo substantivo, `relatedSlugs` cruzando com artigos existentes e as novas landing pages.

> Nota: O slug do blog article será `nr01-riscos-psicossociais-2026` (não `nr01-riscos-psicossociais`) para evitar conflito com a landing page que usa `/nr01-riscos-psicossociais` como rota.

### 3. Rotas (`src/App.tsx`)

Adicionar 3 lazy imports e rotas dentro do `MainLayout`:

```typescript
const GestaoRiscosPsicossociais = lazy(() => import("./pages/GestaoRiscosPsicossociais"));
const NR01RiscosPsicossociais = lazy(() => import("./pages/NR01RiscosPsicossociais"));
const GestaoRiscosHumanos = lazy(() => import("./pages/GestaoRiscosHumanos"));
```

### 4. Sitemap (`public/sitemap.xml`)

Adicionar 6 novas URLs (3 landing pages + 3 blog posts) com prioridades adequadas (0.8 para landing pages, 0.6 para blog posts).

### 5. O que NÃO será alterado

- Homepage, header, navigation, footer
- Páginas existentes (NR01, ComoFunciona, ParaQuem, etc.)
- Artigos de blog existentes
- Estrutura de SEO atual

---

### Arquivos criados/editados

| Ação | Arquivo |
|------|---------|
| Criar | `src/pages/GestaoRiscosPsicossociais.tsx` |
| Criar | `src/pages/NR01RiscosPsicossociais.tsx` |
| Criar | `src/pages/GestaoRiscosHumanos.tsx` |
| Editar | `src/lib/blog-data.ts` (adicionar 3 artigos) |
| Editar | `src/App.tsx` (adicionar 3 rotas) |
| Editar | `public/sitemap.xml` (adicionar 6 URLs) |

