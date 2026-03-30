

## Plano: Reposicionar tom da apresentação "Colaborador" para RH + corrigir cores do chrome

### Problema
1. A apresentação fala diretamente com o colaborador ("você", "seu benefício"), mas o público real é o RH — o objetivo é vender ao RH a ideia de oferecer o programa Juripass como benefício, mostrando como funciona para o colaborador e destacando que o canal criado é o mecanismo para mensurar risco humano.
2. O header/footer usa `bg-[#E8F0FE]` (azul claro) que ficou estranho. Deve ser branco.

### Mudanças em `src/components/avaliacao/SlidesColaborador.tsx`

**1. Chrome (header, footer, fundo) → branco**
- Trocar `bg-[#E8F0FE]` por `bg-white` no container principal
- Bordas e textos do header/footer: `border-gray-200`, `text-gray-500`
- `backgroundColor` do html2canvas: `#FFFFFF`

**2. Reescrever tom e conteúdo dos slides para audiência RH**

Manter a mesma estrutura de 10 slides, mas reescrever títulos e textos:

- **Slide 1 (Capa)**: "Programa Juripass para Colaboradores" / subtítulo: "Como o benefício jurídico funciona na prática — e por que ele é o canal ideal para mensurar riscos humanos."
- **Slide 2 (Problema)**: Reposicionar para o RH: "Problemas pessoais dos colaboradores impactam o ambiente de trabalho" — mostrar que dívidas, conflitos familiares e problemas de consumo geram absenteísmo, presenteísmo e demandas ao RH.
- **Slide 3 (O que é)**: "Como a Juripass funciona para o colaborador" — explicar ao RH que o colaborador acessa um canal externo e confidencial, sem custo. Destacar que este canal é o mecanismo que gera dados anonimizados para mensuração de risco humano.
- **Slide 4 (Cobertura)**: Manter as 6 áreas, mas ajustar linguagem: "Áreas cobertas pelo programa"
- **Slide 5 (Exclusões)**: Manter, ajustar tom para RH: "Áreas fora do escopo"
- **Slide 6 (Vantagens)**: Trocar "Vantagens para você" → "Vantagens para o colaborador" — mostrar ao RH o que o colaborador ganha, reforçando o valor percebido do benefício
- **Slide 7 (Como funciona)**: "Jornada do colaborador" — manter os 4 passos mas narrar em terceira pessoa ("o colaborador entra em contato...")
- **Slide 8 (Confidencialidade)**: Reposicionar para RH: "Segurança e conformidade" — explicar que a empresa não acessa dados individuais, garantindo LGPD, e que recebe apenas indicadores agregados de risco
- **Slide 9 (Temas)**: "Exemplos de demandas atendidas" — manter os temas mas em tom descritivo (terceira pessoa)
- **Slide 10 (Encerramento)**: "O benefício que protege o colaborador — e informa o RH" / subtítulo sobre o canal como ferramenta de mensuração de risco humano + contato

**Princípio geral**: eliminar "você/seu" → usar "o colaborador", "o programa", "a empresa". Reforçar em 2-3 slides que o canal de acolhimento é o mecanismo de captura de dados para mensuração de risco humano (o "pulo do gato").

