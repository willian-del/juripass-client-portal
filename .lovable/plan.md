

## Plano: Tom mais claro no chrome da apresentação

### Problema

A apresentação usa `bg-[#2C3E7D]` (azul escuro) tanto no wrapper/header quanto nos slides, e quando combinado com o header/footer do site (que também usa tons de azul da marca), tudo fica visualmente monótono — "muito azul".

### Abordagem

Clarear o **chrome da apresentação** (barra superior, fundo externo, barra de progresso) mantendo os slides com os gradientes escuros atuais. Isso cria uma separação visual entre a "moldura" e o conteúdo dos slides.

### Mudanças

**`src/components/avaliacao/SlidesPresentation.tsx`**

1. **Wrapper principal** (linha 458): trocar `bg-[#2C3E7D]` por `bg-[#E8F0FE]` (azul bem claro, quase branco)

2. **Header bar** (linha 488): trocar `border-b border-white/10` por `border-b border-[#2C3E7D]/10` e ajustar as cores do texto/botões de branco para escuro:
   - Logo: usar versão normal (não branca)
   - Texto do contador: `text-[#2C3E7D]/60`
   - Botão "Baixar PDF": `text-[#2C3E7D]/70 hover:text-[#2C3E7D]`
   - Botão fechar: mesmos tons escuros

3. **Barra de progresso** (linha 479): trocar `bg-white/5` por `bg-[#2C3E7D]/10`

4. **Navegação inferior** (botões Anterior/Próximo e dots): ajustar de branco para tons escuros sobre fundo claro

Os slides individuais **não mudam** — mantêm os gradientes escuros atuais, criando contraste com o chrome claro ao redor.

### Resultado

O chrome da apresentação fica em azul claro (quase branco), os slides permanecem nos gradientes azul escuro atuais, e a diferenciação visual com o header/footer do site fica clara.

