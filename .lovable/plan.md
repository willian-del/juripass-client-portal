

# Corrigir CTA de Agendamento com window.open()

## Problema
O link com `target="_blank"` nao abre em ambientes de iframe (como o preview do Lovable). Mesmo no site publicado, pode ser bloqueado por pop-up blockers dependendo do navegador.

## Solucao
Substituir os links `<a href={...} target="_blank">` por botoes que chamam `window.open()` com dimensoes especificas, criando uma janela popup focada no agendamento.

### Vantagens
- Funciona dentro de iframes e previews
- Menos chance de ser bloqueado por pop-up blockers (pois e acionado por clique direto do usuario)
- O usuario nao perde a pagina do site
- A janela abre centralizada com tamanho adequado para o calendario

### Implementacao

**Passo 1: Criar funcao utilitaria em `src/lib/constants.ts`**

Adicionar uma funcao `openScheduling()` que centraliza a logica de abrir o calendario:

```typescript
export function openScheduling() {
  const w = 600;
  const h = 700;
  const left = (screen.width - w) / 2;
  const top = (screen.height - h) / 2;
  window.open(
    BRAND.calendarUrl,
    'juripass-agendamento',
    `width=${w},height=${h},top=${top},left=${left},toolbar=no,menubar=no`
  );
}
```

**Passo 2: Atualizar todos os CTAs**

Em cada arquivo, trocar o `<a>` por um `<button>` chamando `openScheduling()`:

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/HeroSection.tsx` | Trocar `<a>` por `<Button onClick={openScheduling}>` |
| `src/components/new-home/MidCTASection.tsx` | Idem |
| `src/components/new-home/FinalCTASection.tsx` | Idem |
| `src/pages/NR01.tsx` | 2 ocorrencias |
| `src/pages/ComoFunciona.tsx` | 2 ocorrencias |
| `src/pages/ParaQuem.tsx` | 1 ocorrencia |
| `src/pages/FAQ.tsx` | 1 ocorrencia |
| `src/pages/BlogPost.tsx` | 1 ocorrencia |
| `src/pages/Avaliacao.tsx` | 1 ocorrencia |

Cada CTA passa de:
```tsx
<Button asChild>
  <a href={BRAND.calendarUrl} target="_blank" rel="noopener noreferrer">
    <Calendar /> Agende uma conversa
  </a>
</Button>
```

Para:
```tsx
<Button onClick={openScheduling}>
  <Calendar /> Agende uma conversa
</Button>
```

Remove-se o `asChild` e o `<a>` wrapper, simplificando o codigo.

## Detalhes tecnicos
- Funcao `openScheduling` exportada de `src/lib/constants.ts`
- Import atualizado em todos os arquivos: `import { BRAND, openScheduling } from '@/lib/constants'`
- 10 arquivos alterados, 0 arquivos novos
