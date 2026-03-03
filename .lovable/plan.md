
# Refatorar SegmentationSection: 4 cards em grid 2x2 (igual ImpactSection)

## Mudanças em `src/components/new-home/SegmentationSection.tsx`

1. **Adicionar 4º card** "Facilities" com ícone `Building` e 4 bullets
2. **Cada card**: 4 bullets verticais (adicionar 1 bullet extra nos 3 cards existentes)
3. **Remover subtitles** — manter apenas ícone, título e bullets (mesmo padrão da ImpactSection)
4. **Layout**: trocar `grid md:grid-cols-3` por `grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto`
5. **Card styling**: copiar exatamente o padrão da ImpactSection (`p-6 rounded-2xl bg-card border border-border shadow-md space-y-4`, sem hover translate)
6. **Manter** o link "Ver mais detalhes" no final

Arquivo: `src/components/new-home/SegmentationSection.tsx`
