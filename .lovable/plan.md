
# Refinar visual da lista de consequencias na OrganizationalProblemSection

## Objetivo
Melhorar o espaçamento, estilo e sofisticacao visual da lista de consequencias, tornando-a mais integrada ao design da secao e com maior impacto visual.

## Mudancas propostas

### 1. Trocar lista simples por cards estilizados
Em vez de uma lista basica com icones pequenos, cada consequencia sera apresentada em um card individual com:
- Fundo sutil `bg-destructive/5` com borda `border-destructive/15`
- Cantos arredondados `rounded-xl`
- Padding mais generoso `px-5 py-4`
- Icone em circulo com fundo `bg-destructive/10`

### 2. Layout em coluna unica centralizada
- Aumentar largura maxima de `max-w-md` para `max-w-lg`
- Maior espacamento entre cards `space-y-4` (era `space-y-3`)
- Remover `py-2` e usar spacing do `space-y-10` do container pai

### 3. Tipografia refinada
- Texto de `text-sm` para `text-base` nos cards
- Cor de `text-muted-foreground` para `text-foreground/80` para maior legibilidade
- Manter `font-medium`

### 4. Paragrafo final
- Adicionar separador visual sutil antes do paragrafo final (linha `border-t border-border/50` com `pt-8`)

## Resultado visual esperado

```text
+-----------------------------------------------+
|  [fluxo de cards existente]                   |
|                                                |
|  +------------------------------------------+ |
|  | (!) Gestores atuam como conselheiros...   | |
|  +------------------------------------------+ |
|  +------------------------------------------+ |
|  | (!) O RH recebe relatos delicados...      | |
|  +------------------------------------------+ |
|  +------------------------------------------+ |
|  | (!) Questoes externas passam a impactar...| |
|  +------------------------------------------+ |
|                                                |
|  ─────────────────────────────────────────     |
|  "Gestores tentam ajudar..."                  |
+-----------------------------------------------+
```

## Arquivo alterado

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/OrganizationalProblemSection.tsx` | Linhas 62-78: redesign dos cards de consequencias com melhor espacamento, fundo sutil, icones em circulo, tipografia maior e separador antes do paragrafo final |
