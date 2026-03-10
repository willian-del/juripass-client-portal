

## Plano: Ajustes nos cartazes

### 3 mudanças no `src/components/avaliacao/PostersViewer.tsx`:

**1. Footer: usar o logo em anexo (ícone empilhado)**
- Copiar `Logos_Juripass_1_.ai_5.png` para `public/images/branding/juripass-logo-stacked-white.png`
- No footer, trocar a imagem de `juripass-logo-full-white.png` pelo novo logo empilhado (ícone + "PASS" embaixo), aumentar o tamanho para `h-14` ou similar

**2. Fontes maiores (para impressão A4 na parede)**
- Título: `text-3xl` → `text-4xl`
- Subtítulo: `text-base` → `text-lg`
- Section headers: `text-xs` → `text-sm`
- Bullet items: `text-sm` → `text-base`
- Steps título: `text-sm` → `text-base`, descrição: `text-xs` → `text-sm`
- Pills: `text-xs` → `text-sm`
- Nota: `text-xs` → `text-sm`
- CTA número: `text-lg` → `text-2xl`
- CTA botão: `text-sm` → `text-base`
- Aumentar gaps e paddings proporcionalmente

**3. Deixar claro que é WhatsApp (não ligação/SMS)**
- CTA header: "FALE CONOSCO" → "FALE CONOSCO VIA WHATSAPP"
- Botão: "Iniciar novo atendimento →" → "Abrir conversa no WhatsApp →"
- QR label: "ESCANEIE E FALE COM A JURIPASS" → "ESCANEIE E ABRA NO WHATSAPP"
- Adicionar ícone do WhatsApp (usar emoji ou texto) junto ao número

| Arquivo | Mudança |
|---------|---------|
| `public/images/branding/juripass-logo-stacked-white.png` | Copiar do upload |
| `src/components/avaliacao/PostersViewer.tsx` | Footer logo, fontes maiores, textos WhatsApp |

