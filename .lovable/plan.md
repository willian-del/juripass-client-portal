

## Plano: Enriquecer Slide 3 com detalhes do Canal de Acolhimento

### Problema
O slide 3 ("Como a Juripass funciona para o colaborador") menciona o canal de forma genérica mas não inclui os bullets específicos que descrevem a proposta de valor para o colaborador: orientação sobre dívidas/família/moradia, atendimento humano e confidencial, sem custo, treinamentos, e a nota sobre contratação direta de advogado.

### Mudança em `src/components/avaliacao/SlidesColaborador.tsx`

**Slide 3 — Reescrever para incluir os bullets completos**

Substituir os 3 cards genéricos atuais por um layout mais descritivo com:

- Subtítulo: "Para o Colaborador | Canal de Acolhimento Jurídico"
- **5 bullets principais**:
  1. Orientação sobre dívidas, família, moradia, consumo e contratos
  2. Atendimento humano, confidencial e acessível, com linguagem simples e prática
  3. Sem custo inicial ao colaborador
  4. Treinamentos e conteúdos educativos sobre direitos e prevenção
  5. Primeiro retorno em até 1 dia útil
- **Nota em itálico**: "Caso necessário, o colaborador poderá contratar diretamente um advogado de sua confiança, inclusive entre os parceiros da Juripass, sem qualquer custo ou responsabilidade para a empresa."
- **Destaque lateral** (card ou bloco): o "pulo do gato" — este canal é o mecanismo que gera dados anonimizados para mensuração de risco humano

Layout: coluna principal com bullets à esquerda + card de destaque à direita (ou abaixo, dependendo do espaço). Manter o estilo visual existente (cards translúcidos, ícones em azul claro).

### Arquivo alterado
- `src/components/avaliacao/SlidesColaborador.tsx` — apenas o slide 3 (linhas ~110-145)

