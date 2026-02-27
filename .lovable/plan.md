

# Hero Full-Text Centralizado

## O que muda

Remover a imagem e o grid de 2 colunas. Centralizar todo o conteudo (headline, subtitulo, CTA) em uma unica coluna com espaco generoso.

## Alteracao: `src/components/new-home/HeroSection.tsx`

**Remove:**
- Grid `md:grid-cols-2`
- Coluna da imagem (tag `img` e wrapper)
- Import nao necessario (se houver)

**Novo layout:**
- `text-center` com `max-w-3xl mx-auto`
- Padding vertical generoso: `py-20 md:py-32`
- Headline (`h1`) com tamanho maior: `text-4xl md:text-5xl lg:text-6xl`, tracking tight
- A frase destaque em `text-primary` permanece
- Subtitulo (`p`) com `text-xl md:text-2xl`, `max-w-2xl mx-auto`
- CTA centralizado com `justify-center`
- Micro-texto abaixo do botao mantido

**Estrutura resultante:**
```text
+------------------------------------------+
|                                          |
|          [headline centralizado]         |
|       [span primary na 2a linha]         |
|                                          |
|        [subtitulo centralizado]          |
|                                          |
|           [ CTA Button ]                |
|        15 min para entender...           |
|                                          |
+------------------------------------------+
```

Nenhuma alteracao em outros arquivos. Apenas texto e layout do HeroSection.

