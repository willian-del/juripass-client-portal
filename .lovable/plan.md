

# Correção: Remover react-snap do package.json

O plano anterior foi aprovado mas as edições nunca foram aplicadas ao `package.json`. O `postbuild: "react-snap"` e o bloco `reactSnap` continuam presentes, causando falha no deploy.

## Mudança

| Arquivo | Ação |
|---|---|
| `package.json` | Remover linha 12 (`"postbuild": "react-snap"`), remover linhas 14-47 (bloco `reactSnap`), remover `react-snap` das dependencies |

Isso é tudo que precisa ser feito — o Vite build completa com sucesso, mas o `postbuild` script falha e bloqueia a publicação.

