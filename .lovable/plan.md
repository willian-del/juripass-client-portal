
# Blog / Conteudo Educativo + Limpeza do Header

## Resumo

Duas alteracoes principais:
1. **Remover os botoes CTA do header** (Area do Cliente e Agende uma conversa) para liberar espaco, mantendo apenas a navegacao e o logo
2. **Criar uma pagina de blog** (`/blog`) com artigos educativos estaticos focados em SEO, linkada no menu principal

---

## 1. Limpar o Header

**Arquivo:** `src/components/home/HomeHeader.tsx`

- Remover o bloco de CTAs do desktop (linhas 55-69: "Area do Cliente" e "Agende uma conversa")
- Remover os CTAs do menu mobile (linhas 94-107)
- Remover imports nao utilizados (`ExternalLink`, `Calendar`, `Button`)
- Resultado: header limpo com apenas logo + navegacao + hamburger mobile

---

## 2. Criar pagina de Blog

### 2a. Pagina principal do blog (`/blog`)

**Arquivo novo:** `src/pages/Blog.tsx`

- SEOHead com title "Conteudo para RH | Juripass - Artigos sobre Gestao de Pessoas e NR-01"
- Lista de cards de artigos com titulo, resumo, categoria e tempo de leitura
- Cada card linka para `/blog/:slug`
- Artigos definidos estaticamente (sem banco de dados), cobrindo temas estrategicos:
  1. "Absenteismo Juridico: O Problema Silencioso nas Empresas"
  2. "Nova NR-01 e Riscos Psicossociais: Guia Pratico para RH"
  3. "Beneficios Corporativos: O Que Realmente Faz Diferenca na Retencao"
  4. "Como Implementar um Programa de Acolhimento Juridico"
  5. "Saude Mental no Trabalho: O Papel do RH na Prevencao"

### 2b. Pagina de artigo individual

**Arquivo novo:** `src/pages/BlogPost.tsx`

- Rota: `/blog/:slug`
- Renderiza o conteudo completo do artigo baseado no slug
- SEOHead dinamico por artigo (title, description, JSON-LD Article)
- CTA no final de cada artigo ("Agende uma conversa")
- Navegacao de volta ao blog

### 2c. Dados dos artigos

**Arquivo novo:** `src/lib/blog-data.ts`

- Array com os artigos (slug, titulo, descricao, categoria, tempo de leitura, conteudo completo em formato de secoes)
- Conteudo rico e otimizado para SEO com palavras-chave: acolhimento juridico, gestao de RH, NR-01, riscos psicossociais, beneficios corporativos

---

## 3. Integracao

### Roteamento (`src/App.tsx`)
- Adicionar rotas `/blog` e `/blog/:slug` com lazy loading dentro do MainLayout

### Navegacao (`src/components/home/HomeHeader.tsx`)
- Adicionar "Blog" ao array `navItems` apos "FAQ"

### Sitemap (`public/sitemap.xml`)
- Adicionar `/blog` com priority 0.7

### Home (`src/pages/Index.tsx`)
- Adicionar o `BlogSection` existente (ja criado) antes do `FinalCTASection`, com link para `/blog`

---

## Arquivos criados/alterados

| Arquivo | Acao |
|---------|------|
| `src/lib/blog-data.ts` | **Criar** - dados estaticos dos artigos |
| `src/pages/Blog.tsx` | **Criar** - listagem de artigos |
| `src/pages/BlogPost.tsx` | **Criar** - artigo individual |
| `src/components/home/HomeHeader.tsx` | Remover CTAs, adicionar "Blog" ao menu |
| `src/App.tsx` | Adicionar rotas `/blog` e `/blog/:slug` |
| `src/pages/Index.tsx` | Adicionar secao de blog na home |
| `public/sitemap.xml` | Adicionar `/blog` |
