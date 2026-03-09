

# Plano: Corrigir build + cadastrar materiais builtin

## Problema 1: Build falhando
O `react-snap` ainda está no `package.json` (linha 12 `postbuild` e linhas 14-47 `reactSnap` config). A remoção aprovada anteriormente não foi aplicada. Precisa ser removido agora.

## Problema 2: Materiais builtin não aparecem no painel
A tabela `sales_materials` está vazia. Os dois materiais builtin (Apresentação Comercial e One-Pager) precisam ser registrados no banco.

## Mudanças

### 1. Remover react-snap do package.json
- Remover linha `"postbuild": "react-snap"` dos scripts
- Remover bloco `"reactSnap": { ... }` (linhas 14-47)

### 2. Inserir materiais builtin na tabela sales_materials
Usar o insert tool para adicionar dois registros:

```sql
INSERT INTO sales_materials (title, description, file_path, file_type) VALUES
  ('Apresentação Comercial Juripass', 'Apresentação interativa de 11 slides sobre a plataforma Juripass, riscos psicossociais e proposta de valor.', '', 'presentation'),
  ('One-Pager Juripass', 'Resumo executivo A4 com visão geral da Juripass, problema, solução e diferenciais.', '', 'one-pager');
```

O `file_path` vazio indica material builtin — o `serve-material` edge function já trata isso, renderizando os componentes React (`SlidesPresentation` e `OnePager`) diretamente.

### Arquivos modificados

| Arquivo / Recurso | Mudança |
|---|---|
| `package.json` | Remover postbuild e reactSnap config |
| Tabela `sales_materials` | Inserir 2 registros builtin |

