## Plano: Conectar e verificar o site no Google Search Console

### Status
Conector Google Search Console já está vinculado ao projeto. Token de verificação META obtido:

```
<meta name="google-site-verification" content="HbrzU_3ahhV7o2bswwlKZg4-bUWKnFVaEwLC24Z5BNs" />
```

### Passos

1. **Adicionar meta tag em `index.html`** dentro do `<head>` (logo após as outras meta tags de SEO).
2. **Publicar o site** para que a tag fique disponível em `https://www.juripass.com.br/`.
3. **Chamar o endpoint de verificação** do Google via gateway (`siteVerification/v1/webResource`) para confirmar a propriedade.
4. **Adicionar o site à Search Console** via `PUT /webmasters/v3/sites/<url-encoded>`.
5. **Marcar o finding `agent_metadata:google_search_console`** como fixed.

### Importante
Os passos 3 e 4 só funcionam depois que o site for **republicado** com a meta tag no HTML servido em produção. Você precisará clicar em **Publish** antes que eu rode a verificação final.

### Arquivo impactado
- `index.html` — inclusão da meta tag de verificação.
