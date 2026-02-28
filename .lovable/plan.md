

# Adicionar lista de consequencias a OrganizationalProblemSection

## Objetivo
Agregar 3 frases de consequencia logo apos o fluxo visual (cards) e antes do paragrafo final, como uma lista estilizada com icones.

## Conteudo a adicionar
- Gestores atuam como conselheiros informais
- O RH recebe relatos delicados fora do seu escopo
- Questoes externas passam a impactar clima e operacao

## Layout

As 3 frases serao apresentadas como uma lista vertical centralizada com icones de alerta/check sutis, entre o fluxo de cards e o paragrafo final. Cada item tera um icone pequeno a esquerda e o texto em `text-muted-foreground` com `font-medium`.

```text
+------------------------------------------+
|  [fluxo de cards existente]              |
|                                           |
|  ! Gestores atuam como conselheiros...   |
|  ! O RH recebe relatos delicados...      |
|  ! Questoes externas passam a impactar...|
|                                           |
|  "Gestores tentam ajudar..."             |
+------------------------------------------+
```

## Alteracao tecnica

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/OrganizationalProblemSection.tsx` | Adicionar um bloco `div` com 3 itens de lista entre o fluxo (linha 59) e o paragrafo final (linha 61). Cada item usa `AlertTriangle` ou `ChevronRight` como icone e texto em `text-sm text-muted-foreground`. Container com `max-w-md mx-auto space-y-3 text-left`. |

