
# Links Internos entre NR-01, Para Quem e Blog

## Objetivo
Adicionar blocos de links internos contextuais entre as paginas NR-01, Para Quem e os artigos do blog para criar uma malha de interligacao que fortalece o SEO (link juice) e melhora a navegacao do usuario.

## Alteracoes por arquivo

### 1. `src/pages/NR01.tsx`
Adicionar uma secao "Conteudo relacionado" antes do CTA final com links para:
- Pagina "Para Quem" (com texto: "Descubra quais segmentos mais se beneficiam")
- Artigo do blog sobre NR-01 (slug: `nr-01-riscos-psicossociais-guia-pratico`)
- Artigo sobre saude mental (slug: `saude-mental-trabalho-papel-rh`)

### 2. `src/pages/ParaQuem.tsx`
Adicionar uma secao "Saiba mais" entre "Tambem atendemos" e o CTA final com links para:
- Pagina NR-01 (com texto: "Entenda as obrigacoes da Nova NR-01")
- Artigo sobre absenteismo juridico (slug: `absenteismo-juridico-problema-silencioso`)
- Artigo sobre implementacao (slug: `como-implementar-acolhimento-juridico`)

### 3. `src/pages/BlogPost.tsx`
Adicionar uma secao "Leia tambem" entre o conteudo do artigo e o CTA final, mostrando ate 3 artigos relacionados (excluindo o atual). Tambem adicionar links contextuais para as paginas NR-01 e Para Quem dependendo da categoria do artigo.

### 4. `src/lib/blog-data.ts`
Adicionar um campo opcional `relatedSlugs` a cada artigo para definir quais artigos sao relacionados. Isso permite controle editorial sobre as sugestoes.

## Design visual
Cada bloco de links internos segue o padrao visual do site:
- Card com borda `border-border`, fundo `bg-card` ou `bg-muted/30`
- Icone + titulo + descricao curta
- Seta para indicar navegacao (`ArrowRight`)
- Estilo consistente com os cards ja existentes no blog

## Detalhes tecnicos

| Arquivo | Acao |
|---------|------|
| `src/lib/blog-data.ts` | Adicionar campo `relatedSlugs` aos artigos |
| `src/pages/NR01.tsx` | Adicionar secao "Conteudo relacionado" com 3 cards de link |
| `src/pages/ParaQuem.tsx` | Adicionar secao "Saiba mais" com 3 cards de link |
| `src/pages/BlogPost.tsx` | Adicionar secao "Leia tambem" com artigos relacionados + links para paginas |

Todos os links usam o componente `<Link>` do react-router-dom para navegacao SPA. Import de `ArrowRight` do lucide-react para os icones de seta.
