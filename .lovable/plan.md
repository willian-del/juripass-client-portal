

## Plano: Criar Cartazes Juripass no padrão do PDF

### Contexto
Converter 5 cartazes do HTML (Genérico, Nome sujo, Banco/cartão, Compra/consumidor, Família) em um componente React seguindo o design do PDF: header branco com logo centralizado, corpo limpo, footer azul escuro com logo + tagline. Footer genérico: "Dúvidas? Procure o RH da empresa." Disponíveis na área de materiais do admin.

### Arquivos

| Arquivo | Mudança |
|---------|---------|
| `src/components/avaliacao/PostersViewer.tsx` | **Novo** — Componente React com os 5 cartazes em formato A4 printável, seguindo o layout do PDF (header claro com logo, corpo branco, CTA com QR code, footer azul escuro). Cada cartaz é uma "página" com `page-break-after`. Inclui botão de imprimir/salvar PDF. |
| `src/pages/admin/AdminMaterials.tsx` | Adicionar `PostersViewer` como mais um tipo builtin (`posters`), ao lado de `slides` e `onepager`. Atualizar `handlePreview` para abrir o viewer quando `file_type === 'posters'`. |
| `supabase/functions/serve-material/index.ts` | Adicionar case para `file_type === 'posters'` retornando `{ type: 'builtin', title: 'Cartazes', file_type: 'posters' }`. |
| `src/pages/MaterialViewer.tsx` | Importar `PostersViewer` e renderizar quando `file_type === 'posters'`. |

### Design dos cartazes (padrão PDF)

Cada cartaz segue esta estrutura:
1. **Header**: fundo claro (`#F5F7FA`), logo Juripass PNG centralizado
2. **Corpo**: fundo branco, título grande em azul escuro, subtítulo, cards com bullets/steps, badge "gratuito", nota informativa
3. **CTA**: fundo azul escuro, número WhatsApp `(11) 5039-5554`, botão verde WhatsApp, QR code
4. **Footer**: fundo azul escuro, logo branco pequeno + tagline "Acolhimento jurídico na palma da sua mão" + texto "Dúvidas? Procure o RH da empresa."

Cores: `#1B3A6B` (azul escuro), `#2563A8` (azul médio), branco. Font: Nunito (já usada no HTML original, importar via Google Fonts ou usar system font).

### Conteúdo dos 5 cartazes

1. **Genérico** — "Seu advogado no WhatsApp" + lista de temas + como funciona (3 passos) + pills (Grátis, Sigiloso, WhatsApp, Família inclusa)
2. **Nome sujo** — tema laranja → "Está com o nome sujo?" + fatos sobre dívidas + 3 passos
3. **Banco/cartão** — tema azul → "Problema com banco ou cartão?" + situações comuns + 3 passos
4. **Compra/consumidor** — tema âmbar → "Comprou algo e deu problema?" + direitos do consumidor + 3 passos
5. **Família** — tema roxo → "Problema de família?" + pensão, guarda, divórcio + 3 passos

Cada cartaz mantém a cor temática apenas em detalhes sutis (título, badges) mas o layout geral segue o padrão limpo do PDF.

### Seed no banco
Será necessário inserir um registro na tabela `sales_materials` para o tipo builtin `posters`, similar ao que existe para `presentation` e `one-pager`.

