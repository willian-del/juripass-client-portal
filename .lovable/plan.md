

# Otimizacao de SEO do site Juripass

## Visao geral

O site atualmente tem SEO basico apenas no `index.html` (meta tags estaticas). Como e uma SPA React, os meta tags nao mudam por pagina. A otimizacao incluira: meta tags dinamicas por rota, sitemap.xml, robots.txt aprimorado, dados estruturados (JSON-LD), e conteudo semantico otimizado com palavras-chave estrategicas.

## 1. Componente SEO dinamico (Helmet-like)

Criar um componente `SEOHead` que atualiza `document.title` e meta tags dinamicamente por pagina usando `useEffect`.

| Pagina | Title | Description (keywords integradas) |
|--------|-------|------------------------------------|
| `/` (Home) | Juripass - Programa de Acolhimento Juridico para Empresas / Ferramenta de Gestao de RH | Canal externo e confidencial para acolher colaboradores em questoes pessoais sensiveis. Ferramenta de gestao de RH alinhada a Nova NR-01 para prevencao de riscos psicossociais. |
| `/como-funciona` | Como Funciona a Juripass / Acolhimento Juridico Corporativo | Entenda como o programa de acolhimento juridico funciona: canal confidencial via WhatsApp, equipe treinada e encaminhamento especializado para colaboradores. |
| `/para-quem` | Para Quem - Juripass / Beneficio Juridico para Industria, Varejo e Call Center | Empresas com mais de 200 colaboradores onde situacoes pessoais impactam a operacao. Solucao para gestao de pessoas e conformidade com NR-01. |
| `/faq` | Perguntas Frequentes - Juripass / Duvidas sobre Acolhimento Juridico Corporativo | Respostas sobre acolhimento juridico, confidencialidade LGPD, implantacao e resultados do programa Juripass para RH e gestores. |

## 2. Dados estruturados JSON-LD

Adicionar schema.org markup no `index.html` e no componente SEO:

- **Organization**: nome, logo, descricao, endereco, tipo de servico
- **FAQPage**: na pagina `/faq` com as perguntas e respostas existentes (melhora chances de rich snippets no Google)
- **WebSite**: nome, URL, descricao

## 3. Sitemap.xml

Criar `public/sitemap.xml` com as 4 paginas publicas e suas prioridades:

```text
/           - priority 1.0, weekly
/como-funciona - priority 0.8, monthly
/para-quem     - priority 0.8, monthly
/faq           - priority 0.7, monthly
```

## 4. Robots.txt aprimorado

Atualizar `public/robots.txt` para:
- Referenciar o sitemap
- Bloquear `/site-anterior` e `/avaliacao` (paginas ocultas)
- Manter permissoes existentes

## 5. Meta tags Open Graph e Twitter por pagina

O componente SEOHead atualizara dinamicamente:
- `og:title`, `og:description`, `og:url`
- `twitter:title`, `twitter:description`
- `canonical` URL por pagina

## 6. Keywords estrategicas no index.html

Atualizar as meta tags do `index.html` com keywords relevantes:
- acolhimento juridico corporativo
- ferramenta gestao de RH
- Nova NR-01 riscos psicossociais
- beneficio juridico empresas
- saude mental colaboradores
- programa de bem-estar corporativo
- canal confidencial colaboradores
- prevencao riscos psicossociais

## 7. Atributos semanticos nas paginas

Adicionar `lang="pt-BR"` no HTML e garantir que headings (h1, h2, h3) contenham palavras-chave naturais.

---

## Arquivos criados/alterados

| Arquivo | Acao |
|---------|------|
| `src/components/ui/SEOHead.tsx` | **Criar** - componente que gerencia title, meta description, OG tags, canonical e JSON-LD por pagina |
| `src/pages/Index.tsx` | Adicionar `<SEOHead>` com meta tags da home |
| `src/pages/ComoFunciona.tsx` | Adicionar `<SEOHead>` com meta tags |
| `src/pages/ParaQuem.tsx` | Adicionar `<SEOHead>` com meta tags |
| `src/pages/FAQ.tsx` | Adicionar `<SEOHead>` com meta tags + JSON-LD FAQPage |
| `index.html` | Atualizar title, description, keywords com termos estrategicos; mudar `lang="en"` para `lang="pt-BR"` |
| `public/sitemap.xml` | **Criar** - mapa do site com 4 paginas publicas |
| `public/robots.txt` | Adicionar referencia ao sitemap e bloquear rotas ocultas |
| `src/lib/constants.ts` | Atualizar `meta` com keywords e descriptions otimizadas |

