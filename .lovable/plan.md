

## Plano: Melhorar card de oportunidade no CRM

### Problemas identificados

1. **Painel muito estreito** — Usa `Sheet` (sidebar lateral `max-w-md` ~448px), espremido no canto da tela
2. **Email temporário confuso** — Quando o lead é criado rápido (sem email), gera `pendente-{timestamp}@juripass.temp`, que aparece como se fosse o email real
3. **Links de materiais sem ação** — A seção "Materiais enviados" mostra o material mas não permite copiar o link ou reenviar

### Solucao

**1. Trocar Sheet por Dialog centralizado e largo**
- Substituir o `Sheet` (sidebar) por um `Dialog` centralizado com `max-w-2xl` (~672px)
- Layout em duas colunas no desktop: esquerda (contato + qualificacao + funil) e direita (materiais + chat + notas)
- Mais espaço para respirar, sem sensacao de aperto

**2. Tratar email temporário**
- Na exibicao do email, detectar o padrao `pendente-*@juripass.temp` e mostrar "Pendente" com badge em vez do email cru
- No formulario de criacao rapida de lead (AdminMaterials), tornar mais claro que o email esta vazio

**3. Adicionar acoes nos materiais enviados**
- Botao "Copiar link" ao lado de cada material compartilhado (gera a URL `/m/{token}`)
- Botao "Reenviar" que chama a edge function `send-material-email` novamente
- Mostrar a URL completa de forma copiavel

### Arquivos impactados
1. `src/components/admin/LeadDetailPanel.tsx` — refactor completo: Dialog em vez de Sheet, layout 2 colunas, tratamento de email temp, botoes de copiar/reenviar link
2. `src/pages/admin/AdminMaterials.tsx` — ajustar label do campo email no quick lead (indicar que sera "Pendente" se vazio)

### Resultado esperado
- Card de lead amplo e organizado em 2 colunas
- Email temporario aparece como "Pendente" em vez de string confusa
- Links de materiais com botoes de copiar e reenviar direto do card

