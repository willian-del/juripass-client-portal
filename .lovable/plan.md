
# Aumentar fonte do headline mantendo quebras de linha

## Problema
O usuario quer aumentar o tamanho da fonte do h1 mas manter exatamente a disposicao visual das linhas conforme mostrado na imagem.

## Solucao

Alterar `src/components/new-home/HeroSection.tsx`:

1. **Aumentar tamanho da fonte**: de `text-4xl md:text-5xl lg:text-5xl` para `text-5xl md:text-6xl lg:text-[4rem]`
2. **Forcar quebras de linha exatas** usando `<br />` para garantir a disposicao:
   - Linha 1: "Alguns problemas pessoais dos"
   - Linha 2: "colaboradores nao sao da"
   - Linha 3: "empresa. Mas acabam"
   - Linha 4: "chegando ate ela."
3. Aumentar `max-w` do container se necessario para acomodar o texto maior

### Detalhe tecnico

```tsx
<h1 className="text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight leading-tight text-foreground">
  Alguns problemas pessoais dos<br />
  colaboradores não são da<br />
  empresa.{' '}
  <span className="text-primary">Mas acabam<br />
  chegando até ela.</span>
</h1>
```

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/HeroSection.tsx` | Aumentar font-size do h1 e adicionar `<br />` para quebras de linha fixas |
