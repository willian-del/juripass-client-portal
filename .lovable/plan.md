

## Plano: Landing Page no MaterialViewer

### Situacao atual
O `MaterialViewer` (`/m/:token`) carrega o material e imediatamente renderiza o componente (slides, one-pager, etc.) ou redireciona para o arquivo. Nao ha nenhuma pagina intermediaria com branding.

### Proposta
Adicionar um estado intermediario (`showViewer = false`) que exibe uma landing page branded antes de mostrar o material. O usuario ve o branding Juripass, o titulo do material e botoes de acao. Ao clicar em "Visualizar", o componente real e renderizado.

### Mudancas em `src/pages/MaterialViewer.tsx`

1. **Novo estado `showViewer`** — inicia como `false`
2. **Landing page intermediaria** com:
   - Header com gradiente azul escuro (#2C3E7D → #1e2d5e) e logo branca
   - Card central com:
     - Icone do tipo de material (Presentation, FileText, Image, etc.)
     - Badge com a categoria (Apresentacao, One-Pager, Cartaz, Proposta)
     - Titulo do material
     - Descricao generica contextual
     - Dois botoes: **"Visualizar Material"** (primario) e **"Baixar PDF"** (outline/secundario, chama a funcao de download do componente se disponivel, ou abre em nova aba para arquivos)
   - Footer discreto com "Juripass © 2026" e link para o site
3. **Ao clicar "Visualizar"** → `setShowViewer(true)` → renderiza o componente normalmente (slides, one-pager, etc.)
4. **Para materiais tipo `file`** — nao redireciona automaticamente; mostra a landing page com botao "Baixar Arquivo"

### Mapeamento de categorias e icones
- `presentation` / `presentation-colaborador` → Apresentacao → Slides icon
- `one-pager` → One-Pager → FileText icon
- `posters` / `poster-*` → Cartaz → Image icon
- `proposal` → Proposta Comercial → Briefcase icon
- `file` → Documento → Download icon

### Arquivo alterado
- `src/pages/MaterialViewer.tsx` — refatoracao completa do fluxo de renderizacao

