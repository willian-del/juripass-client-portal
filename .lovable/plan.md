

## Plano: Aumentar espaçamentos entre seções do cartaz

O conteúdo está muito "colado" — precisa de mais respiro entre as seções para parecer um poster de parede, como na referência.

### Mudanças em `PostersViewer.tsx`

**Espaçamentos entre blocos (body):**
- Body gap: `gap-3` → `gap-5` (mais separação entre seções)
- Title block: `space-y-1` → `space-y-2`
- Items section: `space-y-1.5` (entre título e lista) → `space-y-2.5`
- Items list: `space-y-1` → `space-y-2` (mais respiro entre bullets)
- Steps container: `space-y-1.5` (entre título e steps) → `space-y-2.5`
- Steps items: `space-y-1.5` → `space-y-3` (mais separação entre passos)
- Step desc: `mt-0.5` → `mt-1`
- Note: `py-2.5` → `py-3`

**Manter tudo o resto igual** — fontes, CTA, footer, header permanecem como estão.

