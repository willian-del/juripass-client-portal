

# Ajustes na Apresentação Comercial e One-Pager

## Resumo das 6 alterações solicitadas

### 1. Apresentação toda em tom dark
Converter todos os slides para `variant: 'dark'` (fundo #2C3E7D, texto branco). Remover alternância claro/escuro. Usar variações sutis de gradiente entre slides para evitar monotonia (ex: gradiente diagonal levemente diferente, ou fundo com pattern sutil).

### 2. Logo branco para fundos escuros
Copiar o logo branco enviado (`Logos_Juripass_1_.ai-3.png`) para `public/images/branding/` e usar na apresentação e no one-pager (cabeçalho). O componente `LogoJuripass` já suporta `color="white"` — validar que está usando o asset correto em todos os slides.

### 3. Remover todos os valores monetários
- **Apresentação**: Eliminar o slide 11 (Modelo Comercial) inteiro. Substituir por um slide sobre "Escopo e Limitações" (conteúdo do documento: não substitui consulta jurídica, não inclui peças processuais, sem custo ao colaborador na orientação inicial). Reduzir para 11 slides.
- **One-Pager**: Remover a seção "Investimento" com valores R$ 9.990 e piloto. Substituir por seção "Natureza do Serviço" (a Juripass não presta serviços advocatícios, atua como plataforma de acolhimento e facilitação).

### 4. Opção de download em PDF da apresentação
Adicionar botão "Baixar PDF" no header da apresentação que usa `window.print()` com CSS `@media print` otimizado — mesma abordagem já usada no OnePager. O print CSS renderiza todos os slides em sequência vertical, um por página, em layout A4 landscape.

### 5. Conteúdo fiel à homepage
Alinhar o texto e estrutura dos slides com as seções reais do site:
- **Slide 2 (Problema)**: Usar o fluxo do `OrganizationalProblemSection` — "O RH não tem um problema jurídico. Tem um problema de encaminhamento."
- **Slide 3 (Riscos)**: Usar os 3 riscos do `RiskOrganizationSection` — Psicossocial, Relacional, Escalada
- **Slide 4 (O que é)**: Usar texto do `WhatIsJuripassSection` — canal externo, sob demanda, sem custo ao colaborador + badges de temas
- **Slide 5 (Oferece)**: Manter estrutura Colaborador/Empresa do `ImpactSection` (4 colunas: RH, Gestores, Colaboradores, Organização)
- **Slide 6 (Como funciona)**: Usar os 3 passos do `HowItWorksSection` com setas
- **Slide capa**: Usar o headline da Hero — "Plataforma de Suporte Jurídico para Gestão de Pessoas" + definição institucional
- Remover menções a "familiares/dependentes" conforme estratégia de vendas RH

### 6. One-Pager fiel ao modelo do documento
Reestruturar o OnePager seguindo a estrutura exata do docx enviado:
1. Sobre a Juripass (definição + temas)
2. O que o programa oferece (Colaborador + Empresa)
3. Como funciona (4 passos)
4. Escopo e limitações
5. Confidencialidade e LGPD
6. Natureza do serviço
7. Encerramento

Remover título "Proposta Comercial" do cabeçalho. Manter apenas "Programa de Acolhimento e Orientação Jurídica".

## Arquivos modificados
- `src/components/avaliacao/SlidesPresentation.tsx` — todos os slides dark, conteúdo alinhado, remover slide valores, adicionar botão PDF
- `src/components/avaliacao/OnePager.tsx` — reestruturar conforme docx, remover valores, remover título "Proposta Comercial"
- Copiar logo branco para `public/images/branding/`

