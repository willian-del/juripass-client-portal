

# Cards "Saiba Mais" em layout horizontal (2 linhas)

Reorganizar cada card para layout horizontal: icone à esquerda, texto à direita. Titulo e descricao ficam em duas linhas ao lado do icone, em vez de empilhados verticalmente.

## Alteracao

**`src/components/new-home/LearnMoreSection.tsx`**
- Mudar o layout interno de cada card de `text-center` vertical para `flex items-center text-left`
- Icone fica à esquerda (sem `mx-auto`)
- Titulo + descricao à direita em coluna
- Remover o link "Acessar" separado — o card inteiro já é clicável
- Ou manter "Acessar" inline ao lado da descricao

Layout resultante de cada card:
```text
┌──────────────────────────────┐
│  [icon]  Titulo              │
│          Descricao curta →   │
└──────────────────────────────┘
```

1 arquivo editado.

