

## Plano: Refazer layout dos cartazes seguindo padrão do OnePager

### Problema principal

O cartaz usa `h-[297mm]` fixo com `overflow-hidden`, o que **corta o conteúdo** quando não cabe. O OnePager usa `max-w-[210mm]` sem altura fixa — o conteúdo flui naturalmente e cabe perfeitamente ao imprimir/salvar como PDF.

Além disso, o banco de dados ainda tem registros antigos (`poster-bank`, `poster-generic`) que não correspondem aos novos IDs (`work`, `housing`).

### Mudanças em `PostersViewer.tsx`

**1. Remover altura fixa — adotar padrão OnePager**
- `w-[210mm] h-[297mm]` → `max-w-[210mm]` (sem altura fixa)
- Remover `overflow-hidden` do poster root
- O conteúdo vai fluir naturalmente e o `@page { size: A4 }` garante a paginação correta na impressão

**2. Reestruturar o Poster como o OnePager**
- Container externo: `max-w-[210mm] mx-auto bg-white shadow-lg my-4 print:my-0 print:shadow-none`
- Header band: fundo `DARK_BLUE`, logo branca à esquerda, tagline à direita (igual OnePager)
- Body: `px-8 py-6 space-y-5` (mesmo padrão do OnePager)
- Usar `<Divider />` entre seções (linha `border-t` simples)
- Footer band: fundo `DARK_BLUE` com WhatsApp, telefone, QR Code — tudo visível e bem espaçado

**3. Seções do cartaz (estrutura final)**
1. Header band (logo branca + tagline)
2. Headline + Subtitle
3. Divider
4. "Podemos ajudar com" — lista com bullets
5. Divider
6. "Como pedir ajuda" — 3 passos com números em círculos (igual OnePager)
7. Divider
8. Nota de acolhimento (box com borda lateral)
9. "Atendimento confidencial e sem julgamentos" — destaque
10. Footer band (WhatsApp + telefone + QR Code)

**4. Footer com contato completo (sempre visível)**
- Lado esquerdo: "Fale conosco via WhatsApp" + telefone `(11) 5039-5554` + botão "Abrir conversa no WhatsApp"
- Lado direito: QR Code com label "Escaneie para falar com um advogado"

**5. Top bar (viewer) — mesmo padrão OnePager**
- Barra sticky com label + botão Imprimir/Salvar PDF + botão Fechar
- `print:hidden`

### Atualizar registros no banco de dados

Será necessário:
- Deletar os registros antigos `poster-bank` e `poster-generic` da tabela `sales_materials`
- Inserir os novos registros `poster-work` e `poster-housing`

Isso pode ser feito via migration SQL ou manualmente.

### Arquivos afetados
- `src/components/avaliacao/PostersViewer.tsx` — refatoração completa do layout
- Migration SQL — limpar/atualizar registros de `sales_materials`

