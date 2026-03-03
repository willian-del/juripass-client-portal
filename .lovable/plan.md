

# Reorganizar Header e Footer

## Header
Remover do `navItems`: "Para Quem", "NR-01", "FAQ" e "Blog". Ficam apenas:
1. Inicio
2. Como Funciona
3. Para Colaboradores

## Footer
Reorganizar em 3 colunas (md:grid-cols-3):

**Coluna 1 — Logo + descricao** (manter como esta)

**Coluna 2 — Links** (nova)
- NR-01 → `/nr-01`
- FAQ → `/faq`
- Blog → `/blog`

**Coluna 3 — Institucional** (simplificado)
- Juripass Desenvolvimento de Software LTDA
- CNPJ 53.971.772/0001-37
- Alphaville, Barueri - SP

## Pagina "Para Quem"
A rota `/para-quem` continua existindo e acessivel via o link "Ver mais detalhes" na SegmentationSection da home. Apenas removida da navegacao principal (header/footer).

## Arquivos alterados
- `src/components/home/HomeHeader.tsx` — reduzir navItems
- `src/components/ui/Footer.tsx` — adicionar coluna de links, simplificar institucional

