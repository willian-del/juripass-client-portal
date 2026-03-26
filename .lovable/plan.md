

## Plano: Template de Proposta Comercial com PDF

### Objetivo
Criar um componente React `PropostaComercial.tsx` como material builtin na seção de materiais do admin. Documento de 2 paginas A4 com campos dinamicos, logica automatica de precificacao e exportacao PDF.

### Componente principal
**`src/components/avaliacao/PropostaComercial.tsx`**

Documento A4 (210mm) com 2 paginas, estilo premium corporativo (fundo branco, tipografia limpa, azul escuro #2C3E7D + azul claro #4A9FD8). Segue o padrao visual do OnePager existente (header band azul com logo, footer band, secoes numeradas).

**Campos dinamicos** — formulario no topo (print:hidden) com 3 inputs:
- `client_name` (texto)
- `proposal_date` (date, default hoje)
- `employee_count` (numero)

**Logica de precificacao** — tabela de faixas hardcoded:
```
ate 300 → R$ 1.990
301-600 → R$ 3.490
601-1000 → R$ 5.490
1001-1500 → R$ 7.490
1501-2500 → R$ 9.990
2501-4000 → R$ 14.990
4000+ → sob consulta
```
A linha correspondente ao `employee_count` é destacada em azul claro. Abaixo da tabela: faixa aplicavel, numero de colaboradores e valor mensal contratado.

**Secao "Condicoes Especiais"** — toggle (print:hidden) para mostrar/ocultar um campo de texto livre para descontos ou condicoes especificas.

**Estrutura das 2 paginas:**

*Pagina 1 — Capa + Visao Geral + Frentes de Atuacao*
- Header band com logo branca
- Titulo: "Acolhimento Juridico, Gestao de Riscos Humanos e Canal de Integridade"
- Subtitulo: Proposta Comercial
- Cliente e data dinamicos
- Secao 1: Visao Geral (texto curto)
- Secao 2: Frentes de atuacao — 3 blocos visuais lado a lado (Colaborador, RH, Canal de Integridade) com icones e bullets
- Secao 3: Como funciona (4 steps) + badges SLA/LGPD

*Pagina 2 — Solucao + Comercial + Condicoes*
- Secao 4: Componentes da Solucao (6 items com icones)
- Secao 5: Modelo Comercial + tabela de precos com highlight
- Secao 6: Condicoes (12 meses, 30 dias aviso, etc.)
- Secao 7: Escopo e Limitacoes
- Secao 8: Encerramento
- Condicoes Especiais (se ativada)
- Footer band com contato

**Exportacao PDF** — botao "Imprimir / Salvar como PDF" via `window.print()` (mesmo padrao do OnePager). CSS `@media print` garante paginacao e ocultacao dos controles.

**Props**: `onClose?: () => void`, `standalone?: boolean` (mesmo padrao dos outros materiais).

### Integracao

**`src/pages/admin/AdminMaterials.tsx`**:
- Import `PropostaComercial`
- Adicionar ao `previewType` (novo valor `'proposta'`)
- Renderizar no overlay de preview
- Incluir na aba "Templates" (filtro por `file_type === 'proposal'`)

**`src/pages/MaterialViewer.tsx`**:
- Adicionar case `proposal` no bloco de builtins

**Banco de dados** — migracao SQL:
```sql
INSERT INTO sales_materials (title, file_type, is_builtin, description)
VALUES ('Proposta Comercial Juripass', 'proposal', true, 'Template de proposta comercial com preços e campos dinâmicos');
```

### Design
- Layout tipo OnePager: `max-w-[210mm]`, header/footer bands em #2C3E7D
- Secoes com `SectionTitle` numerado
- Tabela de precos com bordas sutis, header azul escuro, linha destacada em `bg-[#4A9FD8]/10`
- 3 blocos de frentes de atuacao com icone em circulo azul + bullets
- Espacamento generoso, tipografia limpa
- Print CSS para quebra de pagina entre pag 1 e 2

