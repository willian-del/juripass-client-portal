# Sistema de Prerendering Estático - Juripass

Este projeto utiliza **react-snap** para gerar páginas estáticas que melhoram a indexação no Google e a performance de carregamento.

## Como Funciona

1. **Build Normal**: `npm run build` cria o bundle JavaScript normal
2. **Postbuild**: `react-snap` executa automaticamente após o build
3. **Prerendering**: Gera HTML estático para cada rota configurada
4. **Hydration**: O JavaScript "hidrata" as páginas pré-renderizadas no cliente

## Rotas Pré-renderizadas

### Páginas Estáticas (11 rotas)
- `/` - Homepage
- `/como-funciona`
- `/para-quem`
- `/faq`
- `/nr-01`
- `/para-seus-colaboradores`
- `/gestao-riscos-psicossociais-nr01`
- `/nr01-riscos-psicossociais`
- `/gestao-riscos-humanos-rh`
- `/blog` - Índice do blog

### Posts do Blog (8 rotas dinâmicas)
- `/blog/absenteismo-juridico-problema-silencioso`
- `/blog/nr-01-riscos-psicossociais-guia-pratico`
- `/blog/beneficios-corporativos-retencao-talentos`
- `/blog/como-implementar-acolhimento-juridico`
- `/blog/saude-mental-trabalho-papel-rh`
- `/blog/nr01-riscos-psicossociais-2026`
- `/blog/problemas-pessoais-impactam-trabalho`
- `/blog/beneficios-modernos-para-colaboradores`

**Total: 19 páginas pré-renderizadas**

## Scripts Utilitários

### Gerar Rotas Automaticamente
```bash
# Ver rotas que seriam geradas
node scripts/generate-routes.js

# Atualizar package.json com novas rotas do blog
node scripts/generate-routes.js --update
```

## Build e Deploy

```bash
# Build completo com prerendering
npm run build

# Ver arquivos gerados
ls dist/

# Preview local
npm run preview
```

## Estrutura após Build

```
dist/
├── index.html                    # Homepage pré-renderizada
├── como-funciona/
│   └── index.html               # Página estática
├── blog/
│   ├── index.html               # Lista do blog
│   └── artigo-slug/
│       └── index.html           # Post pré-renderizado
└── assets/                      # CSS/JS otimizados
```

## Benefícios SEO

✅ **HTML Completo**: Crawlers veem conteúdo renderizado
✅ **Meta Tags**: SEO metadata presente no HTML inicial  
✅ **JSON-LD**: Structured data incluída no HTML estático
✅ **Performance**: First Contentful Paint mais rápido
✅ **Fallback**: Funciona sem JavaScript habilitado

## Manutenção

### Adicionar Nova Página Estática
1. Adicione a rota no array `include` em `package.json`
2. Rode `npm run build` para testar

### Adicionar Novo Artigo do Blog
1. Adicione o artigo em `src/lib/blog-data.ts`
2. Execute: `node scripts/generate-routes.js --update`
3. Rode `npm run build`

### Monitoramento
- Google Search Console: Verificar indexação
- Core Web Vitals: Monitorar performance
- Build time: ~2-3 minutos para 19 páginas

## Troubleshooting

### Build Falha
- Verificar se todas as rotas estão acessíveis
- Checar console do browser no processo react-snap
- Rotas com erro são pulas automaticamente

### Páginas não Indexadas
- Verificar se HTML contém conteúdo completo
- Confirmar meta tags no código fonte
- Aguardar 2-4 semanas para re-indexação

### Performance Issues
- Configurar `inlineCss: true` está ativo
- `minifyHtml` está otimizando HTML
- Verificar bundle size com `npm run build`

## Configuração Técnica

Ver `package.json` seção `reactSnap` para configurações avançadas:
- `puppeteerArgs`: Argumentos Chrome/Puppeteer
- `inlineCss`: Incorpora CSS crítico inline
- `minifyHtml`: Minifica HTML gerado
- `include`: Lista de rotas para pré-renderizar