

## Plano: Uniformizar os 3 cards do slide "Como funciona"

### Problema

Os 3 cards têm tamanhos diferentes porque o conteúdo (títulos e descrições) varia em comprimento, e o layout atual com `flex-1` dentro de wrappers que incluem as setas não garante largura igual.

### Mudanças

**`src/components/avaliacao/SlidesPresentation.tsx`** (linhas 238-259)

1. Separar os cards das setas — usar um grid `grid-cols-3` para os cards e posicionar as setas entre eles via overlay ou separadamente
2. Dar a cada card dimensões fixas iguais (`min-h-[240px]`) e padding uniforme (`p-6`)
3. Estruturar o conteúdo interno de cada card identicamente: número no topo, título no meio (com `min-h` para alinhar), descrição em baixo

Estrutura simplificada:
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
  {cards.map((s, i) => (
    <div key={i} className="relative flex flex-col items-center">
      <Card className="w-full h-full min-h-[240px] p-6 text-center flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#4A9FD8] ...">
          {s.step}
        </div>
        <h3 className="font-semibold text-base min-h-[48px] flex items-center">{s.title}</h3>
        <p className="text-sm text-white/60">{s.desc}</p>
      </Card>
      {/* Seta entre cards */}
      {i < 2 && <ChevronRight className="hidden md:block absolute -right-5 top-1/2 ..." />}
    </div>
  ))}
</div>
```

### Resultado

Os 3 cards ficam com exatamente o mesmo tamanho e layout uniforme, com setas posicionadas entre eles.

