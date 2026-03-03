

# Nova secao: Onde a Juripass organiza risco para o RH

## O que sera feito

Criar `src/components/new-home/RiskOrganizationSection.tsx` com 3 cards (Risco psicossocial, Risco relacional, Risco de escalada), cada um com icone, titulo e descricao. Inserir logo apos a secao "O que e a Juripass" no Index.

## Alteracoes

### 1. Novo arquivo: `src/components/new-home/RiskOrganizationSection.tsx`
- Titulo: "Onde a Juripass organiza risco para o RH"
- Grid de 3 cards seguindo o mesmo padrao visual das secoes existentes (ImpactSection/WhatIsJuripassSection): `bg-card border rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1`
- Cada card com icone em circulo com gradiente, titulo bold e descricao
- Icones: `Brain` (psicossocial), `ShieldAlert` (relacional), `AlertTriangle` (escalada)
- Cards animados com `ScrollReveal` e delay escalonado (`index * 0.15`)
- Background `bg-background` (sem accent, para contraste com a secao anterior que usa `bg-accent/30`)

### 2. `src/pages/Index.tsx`
- Adicionar lazy import do `RiskOrganizationSection`
- Inserir entre `WhatIsJuripassSection` e `HowItWorksSection`, envolvido em `<ScrollReveal>`

2 arquivos (1 novo, 1 editado).

