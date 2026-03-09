

# Repositório de Materiais Comerciais

## O que será construído

Um sistema de gestão de materiais comerciais dentro do admin (`/admin/materiais`), onde o admin pode fazer upload de arquivos (PDFs, apresentações) e gerar links rastreáveis para enviar a prospects. Cada acesso do prospect é registrado e visível no CRM.

## Arquitetura

```text
┌─────────────────┐     ┌──────────────┐     ┌──────────────────┐
│  Admin Upload    │────▶│  Storage     │     │  sales_materials │
│  /admin/materiais│     │  (bucket)    │     │  (metadata)      │
└─────────────────┘     └──────────────┘     └──────────────────┘
                                                      │
                              ┌────────────────────────┤
                              ▼                        ▼
                     ┌─────────────────┐    ┌────────────────────┐
                     │ material_shares │    │  material_views    │
                     │ (link por lead) │    │  (cada acesso)     │
                     └─────────────────┘    └────────────────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │  /m/:token      │  ← Página pública que
                     │  (view page)    │    registra o acesso
                     └─────────────────┘
```

## Etapas

### 1. Banco de dados (migration)

**Tabela `sales_materials`** -- catálogo de materiais:
- `id`, `title`, `description`, `file_path` (referência no storage), `file_type`, `created_at`, `created_by`

**Tabela `material_shares`** -- link único por lead:
- `id`, `material_id` (FK), `lead_id` (FK), `token` (uuid único, usado na URL), `sent_at`, `created_by`

**Tabela `material_views`** -- tracking de acessos:
- `id`, `share_id` (FK), `viewed_at`, `ip_address`, `user_agent`

**Storage bucket** `sales-materials` (privado, acesso via signed URLs).

**RLS**: Admins fazem CRUD; público pode SELECT em `material_shares` por token (para a página de visualização).

### 2. Edge Function `serve-material`

Recebe o `token`, registra o acesso em `material_views`, gera uma signed URL temporária (1h) do arquivo no storage e redireciona o prospect para o PDF/arquivo.

### 3. Página pública `/m/:token`

Rota pública no React que chama a edge function e exibe o material (ou redireciona para o signed URL). Mostra branding Juripass.

### 4. Admin: Página de Materiais (`/admin/materiais`)

- Lista de materiais com upload de novos arquivos
- Para cada material: nome, tipo, data de upload
- Botão "Enviar para lead" que abre um seletor de leads e cria um `material_share` com token único
- Copia o link rastreável para a área de transferência

### 5. Integração no CRM (LeadDetailPanel)

- Nova seção "Materiais enviados" no painel de detalhes do lead
- Lista os materiais compartilhados com aquele lead
- Para cada um: nome do material, data de envio, quantidade de visualizações, última visualização
- Indicador visual (badge verde "Visualizado" / cinza "Não abriu")

### 6. Conteúdos iniciais

Dois materiais pré-cadastrados via dados iniciais:
- **Apresentação Comercial** -- o conteúdo já existe em `SlidesPresentation.tsx`, será exportado como PDF ou renderizado na página de visualização
- **One Pager** -- o conteúdo já existe em `OnePager.tsx`, mesma abordagem

## Detalhes técnicos

- Storage bucket criado via migration SQL
- Signed URLs geradas no edge function usando `supabase.storage.from('sales-materials').createSignedUrl()`
- Token é um UUID v4 gerado no insert do `material_shares`
- `material_views` não tem RLS restritivo no INSERT (a edge function usa service role)
- Frontend usa `supabase.functions.invoke('serve-material', { body: { token } })` ou acesso direto via URL

