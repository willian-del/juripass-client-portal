
# Plano: Sistema de Prerendering Estático para SEO

## Análise do Problema

O site atual é um SPA (Single Page Application) usando React + Vite + React Router, o que causa problemas de indexação no Google porque:
- Conteúdo é renderizado apenas no cliente via JavaScript
- Crawlers podem não executar JavaScript completamente
- Tempo de carregamento inicial impacta First Contentful Paint
- Problemas de "soft 404" identificados no Search Console

## Páginas Prioritárias para Prerendering

### Landing Pages (11 rotas estáticas)
- `/` - Homepage
- `/como-funciona`
- `/para-quem`
- `/faq`
- `/nr-01`
- `/para-seus-colaboradores`
- `/gestao-riscos-psicossociais-nr01`
- `/nr01-riscos-psicossociais`
- `/gestao-riscos-humanos-rh`
- `/blog` - Página índice do blog

### Blog Posts (8 rotas dinâmicas)
- `/blog/absenteismo-juridico-problema-silencioso`
- `/blog/nr-01-riscos-psicossociais-guia-pratico`
- `/blog/beneficios-corporativos-retencao-talentos`
- `/blog/como-implementar-acolhimento-juridico`
- `/blog/saude-mental-trabalho-papel-rh`
- `/blog/nr01-riscos-psicossociais-2026`
- `/blog/problemas-pessoais-impactam-trabalho`
- `/blog/beneficios-modernos-para-colaboradores`

**Total: 19 páginas para prerender**

## Soluções Propostas

### Opção 1: react-snap (Recomendada - Mais Simples)

**Vantagens:**
- Zero configuração inicial
- Funciona automaticamente com React Router
- Mais testado e estável
- Instalação simples

**Implementação:**
1. Instalar `react-snap` como dependência de desenvolvimento
2. Adicionar script `postbuild` no `package.json`
3. Configurar `reactSnap` no `package.json` com rotas específicas
4. Ajustar `src/index.tsx` para compatibilidade com hidratação

### Opção 2: vite-plugin-prerender (Mais Controle)

**Vantagens:**
- Integração nativa com Vite
- Mais customizável
- Melhor performance no build
- Controle granular sobre o processo

**Implementação:**
1. Instalar `vite-plugin-prerender`
2. Configurar plugin no `vite.config.ts`
3. Criar script para extrair rotas dinamicamente do `blog-data.ts`
4. Configurar pós-processamento para otimizar HTML gerado

## Implementação Detalhada (react-snap)

### 1. Instalação e Scripts
```json
// package.json
{
  "scripts": {
    "build": "vite build",
    "postbuild": "react-snap"
  },
  "reactSnap": {
    "crawlFrom": "/",
    "include": [
      "/",
      "/como-funciona",
      "/para-quem", 
      "/faq",
      "/nr-01",
      "/blog",
      // ... todas as 19 rotas
    ],
    "puppeteerArgs": ["--no-sandbox", "--disable-setuid-sandbox"]
  }
}
```

### 2. Ajustes no código
- Modificar `src/main.tsx` para usar `hydrateRoot` em produção
- Adicionar `noscript` fallbacks nas páginas críticas
- Configurar `inlineCss: true` para melhor First Paint

### 3. Build Pipeline
- `npm run build` → Vite build normal
- `postbuild` → react-snap executa automaticamente
- Genera HTML estático para cada rota no `dist/`
- Mantém funcionalidade SPA para navegação

## Resultados Esperados

### SEO Improvements
- HTML estático com conteúdo completo para crawlers
- Meta tags renderizadas no servidor
- Structured data (JSON-LD) presente no HTML inicial
- Resolução dos soft 404s

### Performance
- First Contentful Paint mais rápido
- Melhor Core Web Vitals
- Fallback funcional sem JavaScript

### Manutenibilidade
- Build automatizado
- Rotas atualizadas automaticamente
- Compatibilidade mantida com SPA

## Arquivos Modificados

1. `package.json` - Adicionar dependência e scripts
2. `src/main.tsx` - Ajustar para hydration
3. `vite.config.ts` - Configurações build (se usar opção 2)
4. `scripts/generate-routes.js` - Script para extrair rotas do blog (novo)

## Próximos Passos Após Implementação

1. Testar build local: `npm run build`
2. Verificar HTML estático gerado em `dist/`
3. Deploy e aguardar reindexação Google (2-4 semanas)
4. Monitorar Search Console para melhorias
5. Ajustar rotas conforme novos artigos

## Considerações Técnicas

- **Compatibilidade**: Mantém navegação SPA após hydratação
- **Dynamic imports**: Lazy loading preservado
- **Estado**: Não interfere com React state management
- **Assets**: Vite asset optimization mantido
- **Bundle size**: Impacto mínimo no JavaScript final
