
## Plano: Corrigir URL dos links de materiais

### Problema
Links gerados no admin usam `window.location.origin`, que retorna a URL do preview Lovable (`*.lovableproject.com`) quando estamos editando. Esses links não funcionam para clientes externos.

### Solução
Usar a URL de produção (`https://www.juripass.com.br`) como base para os links de materiais, em vez de `window.location.origin`.

**Estratégia**: criar um helper `getPublicBaseUrl()` que retorna:
- `https://www.juripass.com.br` quando o host atual for um domínio de preview/staging Lovable (ou diferente do domínio de produção)
- `window.location.origin` quando já estiver no domínio de produção (mantém flexibilidade)

Aplicar em todos os 5 pontos onde `${window.location.origin}/m/${token}` é construído:
- `src/components/admin/LeadDetailPanel.tsx` (3 ocorrências: copyLink, resendMaterial, handleGenerateLink)
- `src/pages/admin/AdminMaterials.tsx` (2 ocorrências: criação e cópia de link)

### Arquivos impactados
1. `src/lib/constants.ts` — adicionar `PUBLIC_SITE_URL` e helper `getPublicShareBaseUrl()`
2. `src/components/admin/LeadDetailPanel.tsx` — substituir `window.location.origin` pelo helper
3. `src/pages/admin/AdminMaterials.tsx` — substituir `window.location.origin` pelo helper

### Resultado
Links gerados sempre apontam para `https://www.juripass.com.br/m/{token}`, funcionando para qualquer destinatário externo.
