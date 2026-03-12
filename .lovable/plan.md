

## Plano: Corrigir impressão dos cartazes

### 3 problemas identificados

**1. Cartaz institucional cortado na impressão**
O conteúdo do cartaz institucional excede a altura de uma página A4 (297mm). O `min-h-[297mm]` não limita a altura máxima — o conteúdo transborda e o footer (QR code, telefone) é cortado pelo limite da página.

**Solução**: Reduzir espaçamentos e tamanhos de fonte no cartaz institucional para que caiba em uma página A4. Ajustar `py`, `gap`, e tamanhos de texto para comprimir o conteúdo verticalmente.

**2. Nome do arquivo ao salvar como PDF**
O browser usa o `document.title` como nome padrão do PDF. Atualmente é o título genérico do site.

**Solução**: Antes de chamar `window.print()`, setar `document.title` para o título do material (ex: "Cartazes Informativos - Juripass" ou "Cartaz Institucional - Juripass"). Restaurar o título original após a impressão via `window.onafterprint`.

**3. Kit com 6 cartazes só imprime o primeiro**
A abordagem `hidden print:block` do Tailwind pode falhar porque a classe `hidden` (`display:none`) compete em especificidade com `print:block`. Alguns browsers ignoram o override em contexto de impressão.

**Solução**: Substituir `hidden print:block` por uma abordagem mais robusta — usar classes CSS customizadas no bloco `@media print` existente para forçar `display: block !important` nos cartazes ocultos. Na tela, usar `style={{ display: id !== currentId ? 'none' : undefined }}` inline ao invés da classe `hidden`.

### Arquivos afetados
- `src/components/avaliacao/PostersViewer.tsx`

### Mudanças específicas

1. **Função de impressão** (substituir `onClick={() => window.print()}`):
   - Setar `document.title` com o título do material
   - Chamar `window.print()`
   - Restaurar título original no `onafterprint`

2. **Renderização dos cartazes** (linhas 420-430):
   - Trocar `className={id !== currentId ? 'hidden print:block' : ''}` por abordagem com CSS inline para tela + classe para print
   - Adicionar regra no `@media print`: `.poster-print-page { display: block !important; }`

3. **Cartaz institucional** (função `InstitutionalPoster`):
   - Reduzir `py-6` → `py-4`, `gap-3` → `gap-2`
   - Reduzir título de `text-3xl` → `text-2xl`
   - Compactar seções para caber em A4

