

## Plano: Separar cobertura e exclusões em dois slides

### Problema
O slide 4 está muito denso — mistura 6 cards de cobertura + bloco de exclusões no mesmo slide.

### Mudanças em `src/components/avaliacao/SlidesColaborador.tsx`

**Slide 4 — Cobertura (harmonizar cards)**
- Remover o bloco vermelho "O que não cobrimos" deste slide
- Uniformizar os 6 cards: usar layout centrado com ícone no topo (mesmo padrão do slide 3 "O que é a Juripass"), em vez do layout horizontal atual com ícone à esquerda
- Resultado: slide limpo com 6 cards harmonizados em grid 3×2

**Novo Slide 5 — O que não cobrimos**
- Slide dedicado com título "O que não cobrimos"
- 3 cards com visual vermelho/destrutivo:
  - **Direito do Trabalho** — "Consultas, dúvidas, ações e reclamações trabalhistas" (texto atualizado conforme pedido)
  - **Direito Criminal** — "Processos criminais e penais"
  - **Código de Ética** — "Denúncias e temas relacionados ao código de ética da sua empresa"
- Layout espaçado (grid 3 colunas), sem competir com outros conteúdos

Os slides seguintes (Vantagens, Como funciona, etc.) deslocam-se uma posição adiante. Total passa de 9 para 10 slides.

