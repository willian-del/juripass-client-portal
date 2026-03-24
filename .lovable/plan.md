

## Plano: Adicionar áreas não cobertas na apresentação do colaborador

### Objetivo
Incluir no slide de Cobertura (slide 4) uma seção clara informando que a Juripass **não cobre** Direito do Trabalho, Direito Criminal e temas relacionados ao Código de Ética da empresa.

### Mudança

**`src/components/avaliacao/SlidesColaborador.tsx`** — Slide 4 (Cobertura, linhas ~142-176)

Após o grid de 6 áreas cobertas, adicionar um bloco visual de "Não cobrimos" com ícones X em vermelho/destrutivo, listando:
- **Direito do Trabalho** — Ações e reclamações trabalhistas
- **Direito Criminal** — Processos criminais e penais  
- **Código de Ética** — Denúncias e temas de compliance da empresa

Visualmente será um card com fundo diferenciado (ex: `bg-red-500/10 border-red-500/20`) para se destacar das áreas cobertas, seguindo o mesmo padrão usado no `CoverageSection.tsx` da home.

Será necessário importar o ícone `XCircle` (ou `X`) do lucide-react.

