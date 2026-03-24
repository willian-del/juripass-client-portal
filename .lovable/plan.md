

## Plano: Criar apresentacao para colaboradores

### Objetivo
Criar uma nova apresentacao de slides (componente React) direcionada ao colaborador, explorando a Juripass como beneficio juridico pessoal. Segue o mesmo padrao visual e tecnico da `SlidesPresentation.tsx` existente.

### Conteudo dos slides (8-9 slides)

1. **Capa** — "Seu novo beneficio juridico" com logo branco, subtitulo sobre apoio juridico acessivel e confidencial
2. **O problema** — "Imagine ter acesso a advogados e especialistas a qualquer momento" (baseado no slide 3 da referencia Google Slides)
3. **O que e a Juripass** — Canal externo, confidencial, sem custo no atendimento inicial. Programa de acolhimento juridico (referencia slide 4)
4. **Cobertura** — 6 areas: Direito do Consumidor, Divorcio e Pensao, Propriedade e Moradia, Heranca e Sucessao, Responsabilidade Civil, Contratos (referencia screenshot cobertura)
5. **Vantagens para o colaborador** — 8 beneficios em grid (dados do `EmployeeBenefitsSection`: atendimento rapido, contato direto, especialidades, honorarios por sucesso, sigilo, agilidade, beneficio da empresa, educacao juridica) (referencia slide 8 do Google Slides)
6. **Como funciona** — 4 passos: entra em contato → recebe orientacao → compreende caminhos → encaminhamento formal
7. **Confidencialidade** — Sigilo, LGPD, dados pertencem ao colaborador, empresa nao tem acesso
8. **Temas atendidos** — Dividas, conflitos familiares, moradia, golpes, consumidor, saude
9. **Encerramento** — Logo, mensagem de cuidado, contato

### Mudancas tecnicas

**Novo arquivo: `src/components/avaliacao/SlidesColaborador.tsx`**
- Copia a estrutura de `SlidesPresentation.tsx` (SlideWrapper, IconBox, Card, ThemeBadge, navigation, PDF export)
- Define slides proprios com conteudo para colaborador
- Exporta `SlidesColaborador` com mesma interface (`onClose`, `standalone`)
- PDF salva como `Apresentacao_Juripass_Colaborador.pdf`

**`src/pages/MaterialViewer.tsx`**
- Adicionar import de `SlidesColaborador`
- Adicionar case: `if (material.file_type === 'presentation-colaborador') return <SlidesColaborador standalone />`

**`src/pages/admin/AdminMaterials.tsx`**
- Atualizar filtro da secao "Apresentacoes" para incluir `presentation-colaborador`:
  `filter: (m) => m.file_type === 'presentation' || m.file_type === 'presentation-colaborador'`

**Banco de dados** — Inserir novo material via migracao:
```sql
INSERT INTO materials (title, file_type, is_builtin)
VALUES ('Apresentação Juripass — Colaborador', 'presentation-colaborador', true);
```

### Estilo visual
Mesmo tema escuro (#2C3E7D, #4A9FD8), mesmos componentes (SlideWrapper, Card, IconBox), mesmos gradients. Chrome externo em #E8F0FE.

