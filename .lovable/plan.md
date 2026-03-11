

## Aumentar fontes em 30% nos cartazes

### Análise dos tamanhos atuais vs +30%

| Elemento | Atual | Novo (+30%) |
|----------|-------|-------------|
| Título principal | `text-5xl` (~48px) | `text-6xl` (~60px) |
| Subtítulo | `text-lg` (~18px) | `text-2xl` (~24px) |
| Section titles | `text-sm` (~14px) | `text-lg` (~18px) |
| Itens da lista | `text-lg` (~18px) | `text-2xl` (~24px) |
| Steps — título | `text-lg` (~18px) | `text-2xl` (~24px) |
| Steps — descrição | `text-sm` (~14px) | `text-lg` (~18px) |
| Pills | `text-sm` (~14px) | `text-lg` (~18px) |
| Nota | `text-sm` (~14px) | `text-lg` (~18px) |
| CTA label | `text-[10px]` | `text-xs` (~12px) |
| CTA número | `text-base` (~16px) | `text-xl` (~20px) |
| Botão CTA | `text-sm` (~14px) | `text-lg` (~18px) |
| Footer textos | `text-[9px]`/`text-[8px]` | `text-xs`/`text-[10px]` |

### Ajustes de layout para compensar

- Header: `py-5` → `py-3`, logo `h-11` → `h-10`
- Body: `py-5` → `py-4`, `gap-4` → `gap-3`
- Items: `space-y-2` → `space-y-1`
- Steps: `space-y-2.5` → `space-y-1.5`
- CTA: `py-3` → `py-2`, QR `w-20` → `w-18`
- Footer: `py-2` → `py-1.5`, logo `h-8` → `h-6`

Arquivo: `src/components/avaliacao/PostersViewer.tsx`

