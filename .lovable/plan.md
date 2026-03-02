

# Auditoria Completa: Layout, UX, Navegacao, SEO e CTAs

## 1. SEO e Sitemap

### Problemas encontrados

**Sitemap desatualizado** - Falta a pagina `/para-seus-colaboradores` no `sitemap.xml`. Tambem faltam URLs individuais dos artigos do blog (ex: `/blog/absenteismo-juridico-problema-silencioso`).

**Ano desatualizado no footer** - O footer exibe "2025" mas estamos em 2026.

**Meta title do BRAND.meta desatualizado** - Em `constants.ts`, `BRAND.meta.title` ainda diz "Area do Cliente", resquicio do posicionamento anterior.

**Falta `lastmod` no sitemap** - Nenhuma URL tem data de ultima modificacao, o que ajuda crawlers a priorizar paginas atualizadas.

### Acoes

| Arquivo | Mudanca |
|---------|---------|
| `public/sitemap.xml` | Adicionar `/para-seus-colaboradores` e URLs dos artigos do blog; adicionar `lastmod` |
| `src/components/ui/Footer.tsx` | Atualizar ano para 2026 (ou usar `new Date().getFullYear()`) |
| `src/lib/constants.ts` | Atualizar `BRAND.meta` para refletir posicionamento atual |

---

## 2. Footer - Muito Minimalista

### Problema
O footer atual contem apenas endereco, CNPJ e copyright. Nao tem links de navegacao, links para redes sociais, nem links para paginas institucionais. Isso e ruim para:
- SEO (links internos no footer sao valorizados por crawlers)
- UX (usuario que rola ate o final nao tem como navegar)
- Credibilidade (footers robustos passam mais confianca)

### Acao
Reestruturar o footer com:
- 3 colunas: Logo + descricao | Links de navegacao | Contato/Legal
- Links internos para todas as paginas publicas
- Manter dados institucionais (endereco, CNPJ)

| Arquivo | Mudanca |
|---------|---------|
| `src/components/ui/Footer.tsx` | Redesign completo com colunas, links internos e ano dinamico |

---

## 3. Links Internos Faltantes

### Problemas
- **Pagina "Para Colaboradores"** nao tem secao "Saiba mais" com links internos (todas as outras paginas como ComoFunciona, ParaQuem e NR01 tem).
- **Home (SegmentationSection)** nao tem link para `/para-quem` (seria natural conectar "Quem mais sente isso" com a pagina expandida).
- **Home (HowItWorksSection)** nao tem link para `/como-funciona`.
- **NR-01** nao tem link para `/para-seus-colaboradores` na secao de conteudo relacionado.

### Acoes

| Arquivo | Mudanca |
|---------|---------|
| `src/pages/ParaSeuColaborador.tsx` | Adicionar secao "Saiba mais" antes do CTA final com links para NR-01, Como Funciona e FAQ |
| `src/components/new-home/SegmentationSection.tsx` | Adicionar link "Ver mais detalhes" para `/para-quem` |
| `src/components/new-home/HowItWorksSection.tsx` | Adicionar link "Ver fluxo completo" para `/como-funciona` |
| `src/pages/NR01.tsx` | Adicionar link para `/para-seus-colaboradores` na secao "Conteudo relacionado" |

---

## 4. Inconsistencias de CTA

### Problemas
- **ParaQuem e FAQ** usam `<button>` nativo para o CTA final em vez de `<Button>` do shadcn. Isso cria inconsistencia visual (padding, font, hover) com as demais paginas.
- **ComoFunciona CTA final** tem apenas 1 botao, enquanto as demais paginas tem 2 (primario + secundario). Falta opcao secundaria.

### Acoes

| Arquivo | Mudanca |
|---------|---------|
| `src/pages/ParaQuem.tsx` | Trocar `<button>` por `<Button variant="secondary">` no CTA final |
| `src/pages/FAQ.tsx` | Trocar `<button>` por `<Button variant="secondary">` no CTA final |
| `src/pages/ComoFunciona.tsx` | Adicionar CTA secundario "Conheca o beneficio" linkando para `/para-seus-colaboradores` |

---

## 5. Mobile/Responsividade

### Problema
O header tem 7 itens de navegacao. No desktop cabe, mas no mobile o menu hamburguer abre uma lista longa. Nao e critico, mas poderia agrupar melhor.

### Acao
Nenhuma acao critica necessaria. O menu mobile atual funciona. Ponto de atencao para futuro.

---

## 6. Pagina ParaSeuColaborador - Pontos de Melhoria

### Problemas menores
- Nao tem secao de links internos ("Saiba mais") como as demais paginas (ja mencionado acima).
- A classe `bg-gradient-dark` usada na secao "Nao e assessoria juridica interna" pode nao estar definida no tailwind config. Verificar se renderiza corretamente.

---

## 7. robots.txt

### Ponto de atencao
O robots.txt referencia o sitemap com URL do Lovable (`juripass-client-portal.lovable.app`). Se um dominio customizado for configurado no futuro, isso precisara ser atualizado.

---

## Resumo de Prioridades

| Prioridade | Item | Impacto |
|------------|------|---------|
| Alta | Atualizar sitemap com paginas faltantes | SEO |
| Alta | Redesign do footer com links internos | SEO + UX |
| Alta | Adicionar secao "Saiba mais" em ParaSeuColaborador | Links internos / SEO |
| Media | Adicionar links de conexao na Home (Segmentation, HowItWorks) | Links internos |
| Media | Padronizar CTAs (ParaQuem, FAQ) com componente Button | Consistencia visual |
| Media | Adicionar link para ParaColaboradores na NR-01 | Links internos |
| Baixa | Atualizar ano no footer para dinamico | Manutencao |
| Baixa | Atualizar BRAND.meta em constants.ts | Coerencia |

## Estimativa
8 arquivos modificados, nenhum novo componente necessario.

