

# Otimizacao SEO — Reposicionar como Plataforma de Gestao

## Diagnostico atual

O SEO atual posiciona a Juripass como "Programa de Acolhimento Juridico" e "Beneficio corporativo". Isso nao esta alinhado com o posicionamento estrategico desejado: **ferramenta de gestao para RH**, preventiva, estruturada como politica corporativa, em conformidade com a NR-01.

### Problemas encontrados:

| Local | Atual | Problema |
|---|---|---|
| `index.html` title | "Programa de Acolhimento Juridico para Empresas \| Ferramenta de Gestao de RH" | "Programa de acolhimento" como identidade principal |
| `index.html` description | "Canal externo e confidencial para acolher colaboradores..." | Foco em acolhimento, nao em gestao |
| `index.html` keywords | "beneficio juridico empresas, saude mental..." | Termos secundarios no lugar de primarios |
| `SEOHead` (Index) title | "Programa de Acolhimento Juridico para Empresas \| Gestao de RH" | Mesmo problema |
| `SEOHead` (Index) description | Idem ao index.html | Idem |
| H1 (HeroSection) | "Alguns problemas pessoais dos colaboradores..." | Narrativo, nao otimizado para SEO |
| JSON-LD Organization | "Programa de acolhimento juridico corporativo" | Posicionamento antigo |
| JSON-LD WebSite | "Ferramenta de gestao de RH para prevencao..." | OK parcialmente |
| `constants.ts` meta | "Beneficio corporativo que fortalece a gestao de pessoas" | "Beneficio" como categoria principal |
| OG tags (index.html) | "Programa de Acolhimento Juridico para Empresas" | Idem |

## Plano de alteracoes

### 1. `index.html` — Meta tags estaticas (fallback para crawlers que nao executam JS)

- **Title**: `Juripass | Plataforma de Gestão de Suporte Jurídico para RH`
- **Description**: `Plataforma de suporte jurídico para gestão de pessoas. Solução preventiva e estruturada como política corporativa, em conformidade com a Nova NR-01 para gestão de riscos psicossociais.`
- **Keywords**: Reordenar priorizando: `plataforma suporte jurídico RH, gestão de riscos psicossociais, Nova NR-01, política corporativa preventiva, gestão de pessoas, suporte jurídico colaboradores, compliance NR-01, juripass`
- **OG title/description e Twitter title/description**: Alinhar com o mesmo posicionamento

### 2. `src/pages/Index.tsx` — SEOHead dinâmico

- **title**: `Juripass | Plataforma de Gestão de Suporte Jurídico para RH`
- **description**: `Plataforma de suporte jurídico para gestão de pessoas. Solução preventiva e estruturada como política corporativa, em conformidade com a Nova NR-01 para gestão de riscos psicossociais.`

### 3. `src/components/new-home/HeroSection.tsx` — H1 e primeiro paragrafo

- **H1**: `Plataforma de Suporte Jurídico para Gestão de Pessoas`
- **Primeiro paragrafo**: Reescrever para deixar claro que e ferramenta estrategica para RH, preventiva, estruturada como politica corporativa, com impacto organizacional, em conformidade com a Nova NR-01 e gestao de riscos psicossociais. Termo "beneficio" pode aparecer secundariamente.

### 4. `src/components/ui/SEOHead.tsx` — JSON-LD schemas

- **organizationJsonLd.description**: Atualizar para posicionamento como plataforma de gestao
- **websiteJsonLd.description**: Alinhar

### 5. `src/lib/constants.ts` — BRAND.meta

- **title**: `Juripass | Plataforma de Gestão de Suporte Jurídico para RH`
- **description**: Alinhar com novo posicionamento

## Arquivos editados

5 arquivos: `index.html`, `src/pages/Index.tsx`, `src/components/new-home/HeroSection.tsx`, `src/components/ui/SEOHead.tsx`, `src/lib/constants.ts`

