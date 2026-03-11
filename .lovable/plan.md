

## Plano: Atualizar conteúdo dos 5 cartazes Juripass

O componente já possui a estrutura visual correta (layout A4, margens 20mm, print styles, etc). A mudança principal é **atualizar o conteúdo** dos 5 cartazes para corresponder ao briefing fornecido, e adicionar a frase de confidencialidade.

### Mudanças no array `posters` em `PostersViewer.tsx`

**Cartaz 1 — Família** (id: `family`)
- Headline: "Problemas de família?"
- Subtitle: "Pensão, guarda dos filhos ou separação podem ser momentos difíceis. Você não precisa enfrentar isso sozinho."
- sectionTitle: "PODEMOS AJUDAR COM"
- Items: Pensão alimentícia, Guarda dos filhos, Separação ou divórcio, Reconhecimento de paternidade, Divisão de bens ou herança
- Steps: Abra o WhatsApp → Conte o que está acontecendo → Receba orientação jurídica
- Note: "Assuntos de família são delicados. Você merece uma orientação de qualidade, com cuidado e respeito."

**Cartaz 2 — Dívidas** (id: `debt`)
- Headline: "Endividado ou sendo cobrado?"
- Subtitle: "Nem toda cobrança é justa. Saiba quais são seus direitos."
- sectionTitle: "PODEMOS AJUDAR QUANDO VOCÊ ESTIVER ENFRENTANDO"
- Items: Cobranças abusivas, Nome negativado, Dívidas com banco ou cartão, Juros excessivos, Renegociação de dívidas
- Steps: Abra o WhatsApp → Explique sua situação → Receba orientação jurídica
- Note: "Antes de pagar ou fazer um acordo, entenda quais são seus direitos."

**Cartaz 3 — Trabalho** (novo, substituindo `bank`)
- id: `work`
- Headline: "Problemas no trabalho?"
- Subtitle: "Situações no ambiente de trabalho podem gerar muitas dúvidas."
- sectionTitle: "PODEMOS ORIENTAR SOBRE"
- Items: Demissão e rescisão, Direitos trabalhistas, Assédio moral, Horas extras, Dúvidas sobre contrato de trabalho
- Steps: Abra o WhatsApp → Conte o que aconteceu → Receba orientação jurídica
- Note: "Informação correta ajuda você a tomar decisões com mais segurança."

**Cartaz 4 — Aluguel/Imóvel** (novo, substituindo `generic`)
- id: `housing`
- Headline: "Problemas com aluguel ou imóvel?"
- Subtitle: "Conflitos com proprietário ou inquilino são mais comuns do que parecem."
- sectionTitle: "PODEMOS AJUDAR COM"
- Items: Problemas com contrato de aluguel, Aumento abusivo de aluguel, Despejo, Caução ou garantia, Direitos de inquilino e proprietário
- Steps: Abra o WhatsApp → Explique sua situação → Receba orientação jurídica
- Note: "Conhecer seus direitos pode evitar muitos problemas."

**Cartaz 5 — Consumo** (id: `consumer`)
- Headline: "Comprou algo e teve problema?"
- Subtitle: "Você tem direitos como consumidor."
- sectionTitle: "PODEMOS AJUDAR EM SITUAÇÕES COMO"
- Items: Produto com defeito, Serviço que não foi entregue, Cobrança indevida, Cancelamento de contrato, Problemas com garantia
- Steps: Abra o WhatsApp → Conte o que aconteceu → Receba orientação jurídica
- Note: "Muitas situações podem ser resolvidas quando você conhece seus direitos."

### Mudança no layout do Poster

- Adicionar frase fixa **"Atendimento confidencial e sem julgamentos."** acima do bloco CTA (dark blue), como texto centralizado em destaque.
- Remover `pills` (só existiam no cartaz genérico que está sendo substituído).

### Atualizar `POSTER_LABELS`

```text
family   → 'Família'
debt     → 'Endividamento'
work     → 'Trabalho'
housing  → 'Aluguel e Imóvel'
consumer → 'Consumo'
```

### Atualizar referências ao `posterId`

- `serve-material` edge function e admin materials: verificar se há referências a `generic` ou `bank` que precisam ser atualizadas para `work` e `housing`.

### Arquivo afetado
- `src/components/avaliacao/PostersViewer.tsx` — conteúdo dos posters + label map + frase de confidencialidade

