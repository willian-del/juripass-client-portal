
## Análise

Os cards na seção "Organizational Problem" estão com tamanhos desiguais devido aos sublabels terem comprimentos de texto diferentes:

- "Colaborador": "com problema pessoal" (curto)
- "Gestor": "Gestores atuam como conselheiros informais" (médio) 
- "RH": "O RH recebe relatos delicados fora do seu escopo" (longo)
- "Desgaste": "Questões externas passam a impactar clima e operação" (longo)

## Solução

No arquivo `src/components/new-home/OrganizationalProblemSection.tsx`, linha 36, alterar as classes do container dos cards:

**Atualmente:**
```tsx
className={`flex flex-col items-center justify-center gap-3 px-5 py-5 rounded-2xl border w-full md:w-[200px] min-h-[140px] md:min-h-[160px] shadow-md transition-all duration-200 ${...}`}
```

**Novo:**
```tsx
className={`flex flex-col items-center justify-center gap-3 px-5 py-5 rounded-2xl border w-full md:w-[200px] h-[160px] md:h-[180px] shadow-md transition-all duration-200 ${...}`}
```

**Mudanças:**
- Substituir `min-h-[140px] md:min-h-[160px]` por `h-[160px] md:h-[180px]` 
- Altura fixa garante que todos os cards tenham exatamente o mesmo tamanho
- Ligeiro aumento da altura para acomodar textos mais longos sem quebra visual

## Resultado

Todos os 4 cards terão dimensões idênticas (200px × 180px no desktop), criando um layout visual uniforme independente do comprimento do texto interno.
