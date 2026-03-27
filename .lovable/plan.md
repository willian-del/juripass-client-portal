

## Plano: Reescrever Proposta Comercial conforme PDF anexo + corrigir exportação PDF

### Duas mudanças

**1. Conteúdo e layout — seguir o PDF da Komatsu**

O PDF anexado usa um layout linear e limpo (não usa cards em 3 colunas). A estrutura será reescrita para espelhar fielmente o documento:

*Página 1:*
- Header azul com logo + "Proposta Comercial" + subtítulo
- Linha divisória
- **1. Visão Geral** — parágrafo simples
- **2. Frentes de Atuação** — 3 blocos sequenciais (não lado a lado):
  - "Para o Colaborador | Canal de Acolhimento Jurídico" — bullets + nota itálica
  - "Para o RH | Gestão de Riscos Humanos" — bullets
  - "Para o RH | Canal de Integridade" — bullets + nota itálica
- **3. O que a empresa Ganha?** — lista de 4 bullets
- **4. Componentes da Solução** — texto + 6 bullets simples
- Footer azul com logo centralizado

*Página 2:*
- Header azul idêntico
- **5. Tabela de Valores** — tabela com highlight na faixa ativa
- **6. Investimento** — faixa aplicável, valor contratado (campo dinâmico), nota de tributos
- **7. Condições Comerciais** — 4 bullets
- **8. Escopo e Limitações** — texto + 3 bullets "Não estão contemplados" + frase final em azul
- Condições Especiais (se preenchida, via campo dinâmico)
- Footer azul com logo centralizado

Os campos dinâmicos (`clientName`, `proposalDate`, `employeeCount`, condições especiais) permanecem no formulário `print:hidden` no topo.

**2. Exportação PDF — substituir `window.print()` por html2canvas + jsPDF**

O `window.print()` gera PDFs achatados de página única. Será substituído por:
- Instalar `jspdf` e `html2canvas` como dependências
- Cada página do documento terá um `id` próprio (`proposal-page-1`, `proposal-page-2`)
- Botão "Baixar PDF" renderiza cada página com `html2canvas` (scale 2) e insere no jsPDF como imagem A4 portrait, gerando um PDF de 2 páginas real
- Manter botão "Imprimir" separado com `window.print()` como fallback

### Arquivos alterados

- `src/components/avaliacao/PropostaComercial.tsx` — reescrita completa do conteúdo e layout + nova função de exportação PDF
- `package.json` — adicionar `jspdf` e `html2canvas`

### Design

- Layout linear como no PDF: seções com títulos bold em azul escuro, bullets simples, sem cards/grids de 3 colunas
- Header/footer azul `#2C3E7D` com logo centralizada no footer
- Tabela de preços com header azul, linhas alternadas, highlight na faixa ativa
- Tipografia maior e mais legível (text-sm/text-base em vez de text-[9px])
- Espaço em branco generoso entre seções

