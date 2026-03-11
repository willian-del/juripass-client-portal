

## Plano: Redesign dos cartazes para formato "poster de parede"

### Problema
O cartaz atual parece um documento de texto com fontes pequenas. Para ser fixado em refeitórios e lido a distância, precisa de letras significativamente maiores e um footer mais compacto.

### Mudanças em `src/components/avaliacao/PostersViewer.tsx`

**Aumentar todas as fontes para leitura a distância:**
- Título principal: `text-2xl` → `text-5xl` (impacto visual forte)
- Subtítulo: `text-sm` → `text-lg`
- Títulos de seção (PODE PEDIR AJUDA / COMO FUNCIONA): `text-xs` → `text-sm`
- Itens da lista: `text-sm` → `text-lg`
- Bullets: `w-1.5 h-1.5` → `w-2.5 h-2.5`
- Steps — título: `text-sm` → `text-lg`, descrição: `text-xs` → `text-sm`
- IconBox (números): `w-7 h-7 text-xs` → `w-9 h-9 text-sm`
- Nota: `text-xs` → `text-sm`

**Compactar o footer e CTA:**
- CTA section: reduzir `py-4` → `py-3`, número do WhatsApp `text-lg` → `text-base`
- QR code: `w-22 h-22` → `w-20 h-20`
- Footer: `py-3` → `py-2`, logo `h-10` → `h-8`, textos `text-[10px]` → `text-[9px]`

**Ajustar espaçamentos do body:**
- Body padding: `px-10 py-4 gap-3` → `px-12 py-5 gap-4` (mais respiro para o conteúdo maior)
- Items: `space-y-1.5` → `space-y-2`
- Steps: `space-y-2` → `space-y-2.5`
- Pills (poster genérico): `text-xs` → `text-sm`, `px-4 py-1` → `px-5 py-1.5`

O resultado será um poster com tipografia bold e legível a distância, mantendo o CTA e footer compactos na parte inferior.

