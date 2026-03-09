

# Criar Imagem OG Dedicada (1200×630)

## Abordagem

Usar a API de geração de imagens (Gemini) via edge function para criar uma imagem OG profissional com as dimensões corretas (1200×630px) para redes sociais.

**Design da imagem:**
- Fundo azul escuro (#2C3E7D) — cor primária da marca
- Logo Juripass branco centralizado
- Tagline: "Plataforma de Suporte Jurídico para Gestão de Pessoas"
- Subtítulo: "Canal jurídico externo, confidencial e estruturado para o RH"
- Layout limpo e profissional

## Plano

### 1. Criar edge function para gerar a imagem OG
- Usar `google/gemini-3-pro-image-preview` (maior qualidade)
- Prompt descritivo com cores e layout da marca
- Salvar resultado como PNG no storage ou como arquivo estático

### 2. Salvar imagem em `public/images/branding/juripass-og-1200x630.png`
- Converter base64 retornado pela API para arquivo PNG
- Dimensões exatas: 1200×630px

### 3. Atualizar referências no `index.html`
- `og:image` → `juripass-og-1200x630.png`
- `og:image:width` → 1200
- `og:image:height` → 630  
- `twitter:image` → `juripass-og-1200x630.png`

### 4. Atualizar `SEOHead.tsx`
- Atualizar a imagem padrão do fallback

## Arquivos

| Arquivo | Ação |
|---|---|
| `supabase/functions/generate-og-image/index.ts` | Criar (temporário, para gerar a imagem) |
| `public/images/branding/juripass-og-1200x630.png` | Criar (resultado) |
| `index.html` | Atualizar meta tags |
| `src/components/ui/SEOHead.tsx` | Atualizar fallback image |

