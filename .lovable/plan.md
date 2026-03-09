

# Alinhar /avaliacao com Homepage e Apresentação Comercial

## Alterações em `src/pages/Avaliacao.tsx`

### 1. Remover seções com valores/preços
- **Eliminar** a seção "Investimento" (linhas 187-201) com R$5 mil
- **Remover** o FAQ item "Quanto custa?" (linha 31) que menciona R$5 mil
- **Remover** a seção "Piloto de 90 dias" (linhas 167-185) — contém informação comercial

### 2. Alinhar conteúdo com homepage

**Hero** — Manter, mas ajustar subtítulo para tom mais institucional.

**O problema** — Substituir pelo fluxo da `OrganizationalProblemSection`:
- Título: "O RH não tem um problema jurídico. Tem um problema de encaminhamento."
- Usar o fluxo visual: Colaborador → Gestor → RH → Desgaste
- Frase de fechamento: "Gestores tentam ajudar. O RH tenta orientar. Mas nenhum deles deveria assumir esse papel."

**A solução** — Alinhar com `WhatIsJuripassSection`: plataforma de gestão preventiva, canal jurídico externo, confidencial e estruturado como política corporativa.

**Como funciona** — Usar os 3 passos exatos da homepage (`HowItWorksSection`):
1. Colaborador entra em contato direto
2. Equipe treinada acolhe e organiza a demanda
3. Situação é encaminhada adequadamente

**Impacto** — Expandir para 4 colunas como na homepage (`ImpactSection`): RH, Gestores, Colaboradores, Organização — com os mesmos pontos.

**FAQ** — Usar os mesmos 5 itens da `HomeFAQSection` (sem "Quanto custa?").

### 3. Remover imports não utilizados
Remover `DollarSign`, `Clock` do import após eliminar seções de preço/piloto.

### Arquivo modificado
- `src/pages/Avaliacao.tsx`

