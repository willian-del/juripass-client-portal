
Objetivo: corrigir definitivamente o “Baixar PDF” para exportar todos os slides (não só o primeiro).

1) Diagnóstico do problema atual
- O fluxo atual usa `window.print()` + CSS de impressão em `src/components/avaliacao/SlidesPresentation.tsx`.
- A combinação de container de impressão com `position: absolute` e regras de visibilidade está causando paginação incorreta no Chrome (resultado: apenas 1 página).

2) Abordagem de correção (mais robusta)
- Substituir o fluxo de impressão por geração direta de PDF no cliente (sem abrir diálogo de impressão), usando captura por seção (1 slide = 1 página).
- Isso evita inconsistências de CSS print entre navegadores.

3) Implementação
- Arquivo: `src/components/avaliacao/SlidesPresentation.tsx`
  - Trocar `onClick={() => window.print()}` por `handleExportPDF`.
  - Criar estado de exportação (`isExporting`) para desabilitar botão e mostrar feedback visual durante geração.
  - Adicionar container offscreen de exportação com todos os slides renderizados ao mesmo tempo (não visível ao usuário), com marcador `data-pdf-section` em cada slide.
  - Capturar cada seção sequencialmente e montar o PDF em múltiplas páginas (landscape), preservando fundo/cores e imagem do logo.
  - Salvar arquivo com nome consistente (ex.: `Apresentacao_Juripass.pdf`).
  - Remover o CSS de impressão específico atual (ou deixar apenas fallback mínimo), para eliminar conflito com o novo fluxo.

- Dependências:
  - Adicionar `html2canvas` e `jspdf` ao projeto para suportar captura e composição do PDF.

4) Detalhes técnicos
- Captura por slide com escala alta (qualidade) e `useCORS`.
- Cada slide exportado com dimensão fixa (ratio de apresentação) para evitar corte.
- Inserção no PDF página a página (`addPage`) garantindo contagem final = número de slides.
- Preservar a UI atual de navegação; só muda o mecanismo do botão “Baixar PDF”.

5) Validação (fim a fim)
- Testar exportação em:
  - Preview de admin (`/admin/materiais` -> apresentação).
  - Link público de material (`/m/:token`) quando `file_type === presentation`.
- Confirmar:
  - PDF contém todos os slides.
  - Último slide está presente.
  - Cores/gradientes/logos legíveis.
  - Botão mostra estado de carregamento e não dispara múltiplos downloads simultâneos.
