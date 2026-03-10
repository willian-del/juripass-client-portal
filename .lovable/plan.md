

## Mockup: Cartaz no Padrão do PDF

Analisei os dois designs lado a lado. Aqui está como ficaria o cartaz "Nome Sujo" adaptado ao padrão visual do PDF:

### Design atual (HTML) vs. Design do PDF -- Diferenças-chave

```text
┌─────────────────────────────────────┐
│  DESIGN ATUAL (HTML/React)          │
│                                     │
│  ┌─────────────────────────────────┐│
│  │  j/ JURIPASS  (barra fina azul) ││
│  ├─────────────────────────────────┤│
│  │  😢 (emoji grande)             ││
│  │  Está com o nome sujo?         ││
│  │  (subtítulo cinza)             ││
│  │                                ││
│  │  ┌─ VOCÊ SABIA QUE... ───────┐ ││
│  │  │ ❌ banco cobrando errado  │ ││
│  │  │ ❌ prescrição             │ ││
│  │  │ ✅ negociar               │ ││
│  │  └───────────────────────────┘ ││
│  │                                ││
│  │  💬 A orientação é GRATUITA   ││
│  │                                ││
│  │  ┌─ COMO PEDIR AJUDA ───────┐ ││
│  │  │ 1. WhatsApp...           │ ││
│  │  │ 2. Conte o problema      │ ││
│  │  │ 3. Advogado orienta      │ ││
│  │  └──────────────────────────┘ ││
│  │                                ││
│  │  ⚠ Nota informativa           ││
│  │                                ││
│  │  ┌─ FALE COM A JURIPASS ────┐ ││
│  │  │ (11) 5039-5554    [QR]  │ ││
│  │  │ [WhatsApp verde]        │ ││
│  │  └─────────────────────────┘ ││
│  │  j/ JURIPASS (footer azul)   ││
│  └─────────────────────────────┘ ││
└─────────────────────────────────────┘
```

```text
┌─────────────────────────────────────┐
│  DESIGN PDF (alvo)                  │
│                                     │
│  ┌─────────────────────────────────┐│
│  │     [ícone j/ grande]           ││
│  │      JURIPASS                   ││
│  │  (header branco, logo grande,   ││
│  │   centralizado, ~15% da altura) ││
│  ├─────────────────────────────────┤│
│  │                                 ││
│  │  Título grande azul escuro      ││
│  │  (sem emoji grande no topo)     ││
│  │  Subtítulo em cinza             ││
│  │                                 ││
│  │  Seção "O que é" com texto      ││
│  │  corrido (não cards)            ││
│  │                                 ││
│  │  "Como utilizar?" com ícones    ││
│  │  azuis em caixinhas quadradas   ││
│  │  + texto descritivo             ││
│  │                                 ││
│  │  CTA azul: "Fale conosco!"      ││
│  │  [QR code] [Botão azul grande]  ││
│  │  (seta azul apontando)          ││
│  │                                 ││
│  ├─────────────────────────────────┤│
│  │  Footer azul médio (#5B8EC9)    ││
│  │  [ícone j/ branco] JURIPASS     ││
│  │  ACOLHIMENTO JURÍDICO           ││
│  │  NA PALMA DA SUA MÃO            ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### Principais diferenças visuais

| Elemento | HTML atual | PDF (alvo) |
|----------|-----------|------------|
| **Header** | Barra fina com logo pequeno | Logo grande centralizado (ícone + texto), fundo branco, ocupa ~12% da altura |
| **Emojis** | Emoji grande como ícone do tema | Sem emojis -- ícones minimalistas azuis em caixas quadradas com bordas arredondadas |
| **Cards de items** | Fundo colorido temático (laranja claro, etc.) | Fundo branco limpo, sem background colorido nos cards |
| **Steps** | Números em círculos coloridos | Ícones azuis em caixas quadradas + texto descritivo mais longo |
| **CTA** | Barra azul escuro com QR + botão verde WhatsApp | QR code + botão azul "Iniciar novo atendimento" com seta decorativa |
| **Footer** | Duas linhas (azul escuro + azul médio) | Uma barra azul médio com logo branco centralizado + tagline |
| **Cores** | Cores temáticas por cartaz (laranja, roxo, etc.) | Monocromático azul (#2563A8 / #1B3A6B) para todos |
| **Tipografia** | Títulos menores, mais compactos | Títulos bem grandes e bold, mais espaço branco |

### Proposta de adaptação

Manter o **conteúdo temático** de cada cartaz (nome sujo, banco, consumidor, família, genérico) mas aplicar o **layout visual do PDF**:

1. **Header grande**: Logo Juripass (ícone + texto) centralizado em fundo branco, ocupando mais espaço
2. **Corpo limpo**: Fundo branco, sem cards coloridos -- usar bordas sutis e ícones azuis em caixas quadradas ao invés de emojis
3. **Paleta monocromática**: Azul escuro (#1B3A6B) para títulos e azul médio (#2563A8 / #4A9FD8) para destaques, em todos os cartazes
4. **CTA unificado**: QR code + botão azul "Iniciar novo atendimento" no estilo do PDF
5. **Footer simples**: Uma barra azul com logo branco + "Acolhimento jurídico na palma da sua mão" + "Dúvidas? Procure o RH da empresa."

Quer que eu implemente essa adaptação ou prefere manter o estilo atual com algum ajuste específico?

