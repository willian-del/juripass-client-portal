

## Plano: Redesign do cartaz para impressão profissional

### Problemas identificados no código atual

1. **Botão "Fechar"** — aparece quando `onClose` é passado; na rota standalone não aparece, mas no admin sim
2. **Barra de rolagem** — o container usa `overflow-hidden` mas o viewer externo pode mostrar scroll
3. **Margens insuficientes** — `px-12` (~12mm) é pouco para impressão profissional (padrão: 20-25mm)
4. **Espaçamento entre seções** — já aumentamos mas ainda está denso para poster de parede
5. **Hierarquia visual** — falta separação visual mais clara entre blocos
6. **Rodapé comprimido** — `py-1.5` é muito apertado
7. **CTA pouco destacado** — bloco escuro funciona mas pode ser mais impactante

### Mudanças em `PostersViewer.tsx`

**1. Margens de impressão (20mm = ~px-[20mm])**
- Body: `px-12` → `px-[20mm]`
- Garantir que nenhum elemento toque as bordas

**2. Espaçamento entre seções (mais respiro)**
- Body gap: `gap-5` → `gap-7`
- Title block: `space-y-2` → `space-y-3`
- Items section: `space-y-2.5` → `space-y-3`
- Items list: `space-y-2` → `space-y-3`
- Steps container: `space-y-2.5` → `space-y-3`
- Steps items: `space-y-3` → `space-y-4`

**3. Hierarquia visual melhorada**
- Adicionar linha separadora sutil entre seções (Items e Steps)
- Note box: aumentar padding `px-4 py-3` → `px-5 py-4`
- Section titles: adicionar `border-b` sutil ou `pb-1` para ancorar

**4. Rodapé e CTA mais profissionais**
- CTA: `py-2` → `py-3`, mais respiro interno
- Footer: `py-1.5` → `py-2.5`, logo `h-6` → `h-7`
- QR Code label: aumentar legibilidade

**5. Print styles reforçados**
- Adicionar `overflow: hidden` no body durante print
- Esconder scrollbars com CSS explícito
- Garantir que o poster ocupe exatamente 1 página A4

**6. Top bar (viewer)**
- Já é `print:hidden` — OK para impressão
- O botão "Fechar" só aparece com `onClose` — comportamento correto
- Adicionar nota visual "Este material é otimizado para impressão" na barra

### Resultado esperado
Cartaz institucional com margens seguras, hierarquia clara, blocos bem separados e aspecto profissional de material impresso — não de screenshot web.

