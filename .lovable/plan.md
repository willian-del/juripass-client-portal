
# Simplificar o Footer

## Mudancas

**Arquivo:** `src/components/ui/Footer.tsx`

1. **Remover a coluna de navegacao** - Eliminar toda a coluna 2 (links "Como Funciona", "Para Quem", etc.) e o array `navLinks`
2. **Trocar o logo** - Substituir o `<img>` manual pelo componente `<LogoJuripass variant="full" size="md" format="png" />`, igual ao header
3. **Layout 2 colunas** - Reorganizar de `grid-cols-3` para `grid-cols-2`: Logo + descricao | Institucional
4. **Manter** a descricao "Acolhimento juridico corporativo...", dados institucionais e copyright

O resultado sera um footer limpo com apenas duas colunas: a marca com descricao a esquerda e os dados institucionais a direita.
