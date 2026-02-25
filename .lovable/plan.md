
# Melhorias de Performance e Navegacao

## Problema 1: Navegacao -- Sem link "Inicio"

Adicionar "Inicio" como primeiro item no menu de navegacao do `HomeHeader.tsx`, tanto no desktop quanto no mobile.

**Alteracao em `src/components/home/HomeHeader.tsx`:**
- Adicionar `{ label: 'Inicio', target: '/' }` como primeiro item do array `navItems`
- Quando o usuario esta na Home, o link rola para o topo da pagina
- Quando esta em outra pagina, navega de volta para `/`

---

## Problema 2: Site lento -- Otimizacoes de performance

### 2a. Reduzir pesos da fonte Montserrat

Atualmente carrega 7 pesos (300-900). O site usa apenas 400, 500, 600 e 700.

**Alteracao em `index.html`:**
- Reduzir de `wght@300;400;500;600;700;800;900` para `wght@400;500;600;700`
- Adicionar `&display=swap` (ja esta, confirmar)

### 2b. Lazy loading das secoes da Home com React.lazy

A pagina Index importa 10 componentes de forma sincrona. Converter as secoes abaixo do fold para carregamento dinamico.

**Alteracao em `src/pages/Index.tsx`:**
- Manter HeroSection e RecognitionSection como import sincrono (acima do fold)
- Converter as secoes 3-10 para `React.lazy()` com `Suspense`

### 2c. Otimizar imagem hero

**Alteracao em `src/components/new-home/HeroSection.tsx`:**
- Trocar `import heroImage from '@/assets/hero-rh-situation.jpg'` por referencia direta `/images/hero-rh-situation.jpg` no public folder
- Mover o arquivo `src/assets/hero-rh-situation.jpg` para `public/images/hero-rh-situation.jpg`
- Adicionar atributos `width`, `height` e `fetchpriority="high"` na tag img

### 2d. Reduzir uso de backdrop-blur

Os cards com `backdrop-blur-sm` causam repaint custoso durante scroll, especialmente em dispositivos moveis.

**Alteracao nos componentes de secao:**
- Substituir `bg-card/80 backdrop-blur-sm` por `bg-card` nos cards que nao estao sobre imagens ou gradientes (a maioria deles)
- Manter `backdrop-blur` apenas no header (onde realmente faz diferenca visual)

Componentes afetados:
- `RecognitionSection.tsx`
- `ImpactSection.tsx`
- `SegmentationSection.tsx`
- `WhatIsJuripassSection.tsx` (verificar)
- `HowItWorksSection.tsx` (verificar)
- `ComoFunciona.tsx`
- `ParaQuem.tsx`
- `FAQ.tsx`
- `Avaliacao.tsx`

---

## Resumo de arquivos

| Arquivo | Tipo de alteracao |
|---------|------------------|
| `src/components/home/HomeHeader.tsx` | Adicionar item "Inicio" no navItems |
| `index.html` | Reduzir pesos da fonte |
| `src/pages/Index.tsx` | Lazy load das secoes 3-10 |
| `src/components/new-home/HeroSection.tsx` | Otimizar imagem |
| `src/assets/hero-rh-situation.jpg` | Mover para public/images/ |
| ~9 componentes de secao | Remover backdrop-blur desnecessario |

Nenhuma dependencia nova.
