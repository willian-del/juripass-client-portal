# 🎨 Diretrizes de Uso da Marca Juripass

## 📋 Visão Geral

Este documento estabelece as diretrizes para uso consistente da marca Juripass em todos os pontos de contato da aplicação.

---

## 🖼️ Logo Principal

### Versões Disponíveis

1. **Full** (`juripass-logo-full.svg`)
   - Ícone JP + texto "Juripass"
   - Uso: Páginas principais, autenticação, headers
   - Dimensões recomendadas: 200x60px

2. **Icon** (`juripass-icon.svg`)
   - Apenas o ícone JP
   - Uso: Favicons, avatares, espaços reduzidos
   - Dimensões: 60x60px (quadrado)

3. **Horizontal** (`juripass-logo-horizontal.svg`)
   - Layout otimizado para headers
   - Uso: Barras de navegação, rodapés
   - Dimensões: 240x48px

4. **Horizontal White** (`juripass-logo-horizontal-white.svg`)
   - Versão branca para fundos escuros
   - Uso: Splash screens, fundos coloridos

---

## 🎨 Paleta de Cores

### Cores Primárias

```css
/* Azul Juripass (Principal) */
--juripass-primary: #4A8FE0
hsl(210, 75%, 56%)

/* Azul Escuro (Texto/Contraste) */
--juripass-primary-dark: #1E3A5F
hsl(210, 50%, 25%)

/* Azul Claro (Hover/States) */
--juripass-primary-light: #5B9FE3
hsl(210, 75%, 63%)
```

### Aplicação de Cores

✅ **Permitido:**
- Logo colorido (#4A8FE0) em fundos claros
- Logo branco em fundos escuros ou sobre imagens
- Variações de hover usando `--juripass-primary-light`

❌ **Não Permitido:**
- Alterar as cores do logo para fora da paleta oficial
- Aplicar gradientes não autorizados
- Usar cores de baixo contraste

---

## 📐 Espaçamento e Área de Respiro

### Regra Geral
- **Mínimo**: 20% do tamanho do logo
- Exemplo: Logo de 100px → 20px de espaço livre ao redor

### Tamanhos Mínimos
- Logo full: 120px de largura
- Logo icon: 32px x 32px
- Favicon: 16px x 16px

---

## 🧩 Uso do Componente React

### Importação

```tsx
import { LogoJuripass } from '@/components/ui/LogoJuripass';
```

### Exemplos de Uso

#### Logo Completo (Páginas de Autenticação)
```tsx
<LogoJuripass variant="full" size="lg" />
```

#### Logo Clicável (Dashboard)
```tsx
<LogoJuripass 
  variant="horizontal" 
  size="md" 
  clickable 
/>
```

#### Logo Branco (Splash Screen)
```tsx
<LogoJuripass 
  variant="full" 
  size="xl" 
  color="white" 
/>
```

#### Apenas Ícone (Mobile)
```tsx
<LogoJuripass 
  variant="icon" 
  size="md" 
  clickable 
/>
```

### Props Disponíveis

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `'full' \| 'icon' \| 'horizontal'` | `'full'` | Variante do logo |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamanho do logo |
| `color` | `'default' \| 'white'` | `'default'` | Cor do logo |
| `clickable` | `boolean` | `false` | Se o logo deve ser clicável |
| `className` | `string` | - | Classes CSS adicionais |

---

## ✅ Boas Práticas

### Formato de Arquivo
- **Preferir SVG** sempre que possível (escalabilidade infinita)
- PNG apenas para casos específicos (emails, redes sociais)
- Favicon em formatos múltiplos (.ico, .svg, .png)

### Responsividade
```tsx
{/* Desktop: logo horizontal */}
<div className="hidden sm:block">
  <LogoJuripass variant="horizontal" size="md" />
</div>

{/* Mobile: apenas ícone */}
<div className="sm:hidden">
  <LogoJuripass variant="icon" size="md" />
</div>
```

### Acessibilidade
- Sempre incluir `alt` text descritivo
- Manter contraste adequado (WCAG AA mínimo)
- Estados de foco visíveis em logos clicáveis

### Performance
- Usar `loading="eager"` para logos acima da dobra
- Lazy loading para logos em seções inferiores
- Otimizar SVGs (remover metadados desnecessários)

---

## ❌ O Que Não Fazer

### Modificações Proibidas

❌ **Não distorcer proporções**
```tsx
{/* ERRADO */}
<img src="logo.svg" className="w-full h-8" />

{/* CORRETO */}
<img src="logo.svg" className="h-8 w-auto" />
```

❌ **Não separar elementos**
- Nunca use apenas o texto "Juripass" sem o ícone (exceto em contextos textuais)
- Não reposicione o ícone em relação ao texto

❌ **Não aplicar efeitos não autorizados**
- Sombras exageradas
- Gradientes personalizados
- Rotações ou perspectivas
- Transparências extremas (< 80%)

❌ **Não usar em fundos inadequados**
- Logo azul em fundo azul (baixo contraste)
- Logo branco em fundo claro
- Sobreposição com imagens complexas sem tratamento

---

## 📱 Aplicações Específicas

### Favicon
```html
<!-- index.html -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

### PWA Manifest
```json
{
  "name": "Juripass",
  "icons": [
    {
      "src": "/images/branding/juripass-icon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
}
```

### Loading States
```tsx
<div className="flex flex-col items-center gap-4">
  <LogoJuripass variant="full" size="xl" />
  <div className="animate-spin border-4 border-juripass-primary" />
</div>
```

### Emails (futuro)
- Usar PNG para compatibilidade
- Dimensões: 200x60px @2x (400x120px)
- Fallback para texto: "JURIPASS"

---

## 🔍 Checklist de Implementação

Ao adicionar o logo em um novo contexto, verifique:

- [ ] Formato correto (SVG preferido)
- [ ] Tamanho apropriado para o contexto
- [ ] Contraste adequado com o fundo
- [ ] Área de respiro respeitada (≥20%)
- [ ] Alt text descritivo presente
- [ ] Responsivo (adapta a mobile/desktop)
- [ ] Estados de hover/focus (se clicável)
- [ ] Performance otimizada
- [ ] Acessibilidade validada

---

## 📞 Contato

Para dúvidas sobre uso da marca ou solicitações especiais:
- **Email**: contato@juripass.com.br
- **WhatsApp**: +55 11 XXXXX-XXXX

---

## 📄 Licença

© 2024 Juripass. Todos os direitos reservados.
O uso da marca Juripass é restrito a aplicações autorizadas.
