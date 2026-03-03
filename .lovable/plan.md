

# Unificar formatação do texto na OrganizationalProblemSection

A segunda frase está com `text-primary font-medium` (azul), mas o usuário quer ambas as frases na mesma formatação (texto normal), já que logo abaixo já existe conteúdo em azul.

## Mudança em `src/components/new-home/OrganizationalProblemSection.tsx`

**Linha 69**: Remover o `<span>` com classe `text-primary font-medium` e deixar o texto como parte do `<p>` normal, mantendo a mesma classe `text-muted-foreground` do parágrafo pai.

```tsx
// De:
<span className="text-primary font-medium">Mas nenhum deles deveria assumir esse papel.</span>

// Para:
Mas nenhum deles deveria assumir esse papel.
```

