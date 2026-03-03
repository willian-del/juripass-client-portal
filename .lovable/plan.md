

# Reordenar seções na página Index

Mover `ImpactSection` para logo após `RiskOrganizationSection` em `src/pages/Index.tsx`. Atualmente a ordem é:

`...RiskOrganization → HowItWorks → Impact → MidCTA...`

Nova ordem:

`...RiskOrganization → Impact → HowItWorks → MidCTA...`

Basta trocar as posições dos blocos `ImpactSection` e `HowItWorksSection` no JSX.

