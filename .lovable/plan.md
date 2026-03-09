

# Criar imagem OG 1200×630 com o logo real da Juripass

## Problema
A imagem OG gerada por IA não ficou boa. O usuário quer usar o logo real da Juripass — o mesmo exibido no header do site.

## Solução
Criar uma edge function que gera um PNG 1200×630 compondo o logo SVG da Juripass (já existente em `public/images/branding/juripass-logo-full.svg`) centralizado sobre o fundo azul escuro (#2C3E7D) da marca. A edge function vai:

1. Embutir o SVG do logo diretamente no código
2. Criar um SVG wrapper de 1200×630 com fundo azul escuro e o logo centralizado em branco
3. Converter para PNG usando a lib `resvg-wasm` (compatível com Deno/edge functions)
4. Retornar o PNG como resposta

Depois, chamar a função para gerar o arquivo e salvar como `public/images/branding/juripass-og-1200x630.png`, substituindo o atual.

## Alternativa mais simples
Como o projeto já tem `juripass-logo-full-white.png` (logo branco em fundo escuro), podemos simplesmente reverter as meta tags para apontar para esse arquivo. Não terá as dimensões ideais de 1200×630, mas o WhatsApp e redes sociais vão exibir o logo real da marca.

## Plano recomendado (alternativa simples)

### 1. Atualizar `index.html`
- `og:image` → `juripass-logo-full-white.png`
- `twitter:image` → `juripass-logo-full-white.png`
- Remover `og:image:width` e `og:image:height` (dimensões não correspondem a 1200×630)

### 2. Atualizar `SEOHead.tsx`
- Atualizar fallback image para `juripass-logo-full-white.png`

### 3. Remover `juripass-og-1200x630.png`
- Deletar a imagem gerada por IA que não ficou boa

## Arquivos

| Arquivo | Ação |
|---|---|
| `index.html` | Atualizar meta tags |
| `src/components/ui/SEOHead.tsx` | Atualizar fallback |
| `public/images/branding/juripass-og-1200x630.png` | Remover |

