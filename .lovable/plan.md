

# Corrigir CTA invisivel na secao final da pagina "Para seus colaboradores"

## Problema
O segundo botao ("Como funciona") na secao final usa `variant="outline"` com `text-primary-foreground` sobre fundo azul. O resultado e um botao quase invisivel: texto branco sobre fundo transparente com borda muito sutil.

## Solucao
Dar ao botao "Como funciona" um fundo branco semitransparente com texto escuro, garantindo contraste e visibilidade — mesmo padrao usado na `FinalCTASection` da home.

## Alteracao

| Arquivo | Mudanca |
|---------|---------|
| `src/pages/ParaSeuColaborador.tsx` | Alterar classes do segundo botao na secao CTA final (linha 311) |

O botao passa de:
```
variant="outline" className="rounded-full px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
```

Para:
```
variant="outline" className="rounded-full px-8 bg-white/20 border-white/40 text-white hover:bg-white/30"
```

Isso cria um botao com fundo branco translucido, borda visivel e texto branco legivel sobre o gradiente azul.
