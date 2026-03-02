

# Corrigir CTA de Agendamento Bloqueado

## Problema
A funcao `openScheduling()` usa `window.open()` com parametros de popup (largura, altura fixa), que navegadores modernos bloqueiam como popup. Isso afeta **todos os CTAs do site** — sao 15+ botoes em 11 arquivos.

## Solucao
Alterar a funcao `openScheduling` em `src/lib/constants.ts` para abrir em nova aba em vez de popup. Isso resolve o problema em todos os CTAs de uma vez, pois todos usam a mesma funcao.

**Arquivo:** `src/lib/constants.ts`

**De:**
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

**Para:**
```typescript
export function openScheduling() {
  window.open(BRAND.calendarUrl, '_blank', 'noopener,noreferrer');
}
```

Ao remover os parametros de dimensao/posicao e usar `_blank`, o link abre em nova aba normalmente sem ser bloqueado. O `noopener,noreferrer` adiciona seguranca.

Apenas 1 arquivo modificado, corrige todos os 15+ CTAs do site.
