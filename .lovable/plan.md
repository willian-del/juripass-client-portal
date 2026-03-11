

## Plano: Separar cartazes em 5 materiais + polir layout A4

### Diagnóstico

1. **Apenas 1 página imprime**: `break-after: page` com múltiplos divs A4 é notoriamente inconsistente entre navegadores. Solução confiável: cada cartaz vira um material independente.
2. **Conteúdo explode a margem inferior**: O poster atual soma header (py-10) + accent line + body (px-12 py-8 gap-7) + CTA (py-7) + footer (py-5). Isso ultrapassa 297mm. Precisa compactar espaçamentos e fontes.

### Mudanças

#### 1. Separar em 5 materiais individuais (`PostersViewer.tsx`)

- Aceitar um novo prop `posterId?: string` para renderizar apenas um cartaz específico.
- Quando `posterId` é fornecido, renderizar apenas aquele poster (impressão de página única — funciona sempre).
- Quando não fornecido, renderizar todos com navegação (comportamento atual para visualização, sem impressão multi-página).
- O botão "Imprimir" fica disponível em cada cartaz individual.

#### 2. Compactar layout do poster para caber em A4

Reduzir espaçamentos internos para que o conteúdo caiba sem cortar:
- Header: `py-10` → `py-6`, logo `h-16` → `h-12`
- Body: `py-8 gap-7` → `py-5 gap-4`, título `text-4xl` → `text-3xl`
- Subtitle: `text-lg` → `text-base`
- Items: `space-y-3` → `space-y-2`, font `text-base` → `text-sm`
- Steps: `space-y-4` → `space-y-2.5`
- CTA section: `py-7 px-12` → `py-4 px-8`, número `text-2xl` → `text-xl`, QR `w-28 h-28` → `w-24 h-24`
- Footer: `py-5` → `py-3`, logo `h-14` → `h-10`
- Note: `px-5 py-4` → `px-4 py-3`

#### 3. Atualizar `serve-material` edge function

Adicionar os 5 cartazes individuais como tipos builtin reconhecidos (`poster-generic`, `poster-debt`, `poster-bank`, `poster-consumer`, `poster-family`), ou usar um parâmetro de query.

#### 4. Registrar materiais no admin (`AdminMaterials`)

Adicionar os 5 cartazes como materiais builtin separados na seção de materiais, cada um com seu título descritivo:
- Cartaz Genérico
- Cartaz Endividamento  
- Cartaz Bancos
- Cartaz Consumo
- Cartaz Família

Cada um linkando para o `PostersViewer` com o `posterId` correspondente.

### Abordagem técnica

A mudança principal é no `PostersViewer`: filtrar por `posterId` quando fornecido. O print CSS fica simples (1 poster = 1 página A4). Os materiais no admin passam a ter 5 entradas de cartaz em vez de 1.

