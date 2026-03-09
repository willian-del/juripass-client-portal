

# Corrigir imagem OG para compartilhamento no WhatsApp

## Problema

A imagem usada no Open Graph (`juripass-logo-card.png`) tem fundo branco e está mal cortada, resultando numa visualização ruim ao compartilhar no WhatsApp.

## Solução

Trocar a referência da imagem OG no `index.html` para usar o `juripass-logo-full-white.png`, que já existe no projeto e tem fundo azul com o logo completo — muito mais profissional para previews de link.

## Alteração

**`index.html`** — Atualizar as 2 tags `og:image` e a `twitter:image` de:
```
juripass-logo-card.png
```
para:
```
juripass-logo-full-white.png
```

Isso é uma mudança de 3 linhas no `index.html`, sem necessidade de criar novos arquivos.

**Nota:** Após o deploy, o cache do WhatsApp pode demorar algumas horas para atualizar a preview. Para forçar, pode usar ferramentas como o [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) para limpar o cache.

