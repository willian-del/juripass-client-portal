

## Problema: Botões sobrepostos no Assistente AI

O botão de fechar (X) do Sheet está posicionado em `absolute right-4 top-4` no componente Sheet, e o botão de reset do AI Assistant está no header em flex container. Ambos competem pelo mesmo espaço no canto superior direito.

### Solução

Ajustar o `SheetHeader` no `AIAssistantPanel.tsx` para adicionar padding direito (`pr-12`) que cria espaço para o botão de fechar do Sheet, evitando a sobreposição com o botão de reset.

### Mudanças

**`src/components/admin/AIAssistantPanel.tsx`**

- Linha 77: Adicionar `pr-12` ao className do `SheetHeader` para criar espaço reservado para o botão de fechar do Sheet

