

# Apresentação Comercial e One-Pager Profissionais

## Visão geral

Reescrever os dois componentes existentes (`SlidesPresentation.tsx` e `OnePager.tsx`) com conteúdo completo baseado nos documentos enviados e no site, e com design visual profissional usando as cores da marca Juripass (#2C3E7D escuro, #4A9FD8 claro).

Esses componentes já são usados na página `/avaliacao` e serão também os materiais "builtin" servidos pelo repositório de materiais via `/m/:token`.

---

## 1. Apresentação Comercial (SlidesPresentation.tsx)

Redesign completo com 12 slides, conteúdo extraído dos documentos:

| # | Título | Conteúdo |
|---|--------|----------|
| 1 | Capa | Logo grande, "Programa de Acolhimento e Orientação Jurídica ao Colaborador", tagline |
| 2 | O desafio do RH | Problemas pessoais impactando trabalho, falta de canal adequado |
| 3 | A lacuna nas empresas | O que acontece quando não há canal: RH como conselheiro, gestores mediando, risco |
| 4 | O que é a Juripass | Plataforma de acolhimento, triagem e facilitação. Temas: dívidas, família, moradia, golpes, consumo |
| 5 | O que o programa oferece | Dois blocos: Para o Colaborador / Para a Empresa |
| 6 | Como funciona | 4 passos visuais com ícones (contato → acolhimento → orientação → encaminhamento) |
| 7 | Benefícios para o RH | Cards com ícones: redução demandas, prevenção conflitos, employer branding, NR-01 |
| 8 | Alinhamento NR-01 | Gestão de riscos psicossociais, suporte preventivo |
| 9 | Confidencialidade e LGPD | Dados do colaborador, sigilo, relatórios anonimizados |
| 10 | Implantação | Timeline: kick-off → comunicação → ativação. 15 dias, sem taxa |
| 11 | Modelo comercial | Valor fixo, piloto 90 dias com 50% desconto, sem custo por atendimento |
| 12 | Encerramento | CTA + contato + logo |

**Design visual por slide:**
- Fundo com gradiente sutil azul escuro → azul claro (alternando entre slides claros e escuros)
- Slides ímpares: fundo escuro (#2C3E7D) com texto branco
- Slides pares: fundo branco com acentos azuis
- Cards internos com `backdrop-blur`, bordas sutis, sombras
- Ícones Lucide para cada ponto
- Tipografia grande e hierárquica (título 4xl, subtítulo 2xl, corpo lg)
- Transição suave com framer-motion (fade + slide)
- Progress bar colorida no topo em vez de dots simples

## 2. One-Pager (OnePager.tsx)

Layout profissional A4 otimizado para impressão/PDF:

- **Cabeçalho**: Logo + faixa azul escura com "Proposta Comercial" em branco
- **Seções com ícones**: O Problema | A Solução | Como Funciona (3 colunas com ícones) | O que oferece (2 colunas: Colaborador/Empresa) | Confidencialidade | Implantação | Investimento
- **Rodapé**: Faixa azul com contato, site, nome do diretor
- Cores da marca nas divisórias e cabeçalhos de seção
- Print CSS para renderização perfeita em PDF
- Temas frequentes como badges visuais (Finanças, Família, Moradia, etc.)

## 3. Integração com MaterialViewer

Atualizar `MaterialViewer.tsx` e `serve-material` edge function para suportar materiais "builtin" (tipo `apresentacao-comercial` e `one-pager`). Quando o prospect acessa `/m/:token` de um material builtin, renderiza o componente React diretamente em vez de redirecionar para arquivo.

## Detalhes técnicos

- **Arquivos modificados**: `SlidesPresentation.tsx`, `OnePager.tsx`, `MaterialViewer.tsx`, `serve-material/index.ts`
- **Dependências**: Usa framer-motion (já instalado) para animações dos slides
- **Sem novos pacotes**
- Os componentes continuam funcionando standalone na página `/avaliacao` e também via link rastreável `/m/:token`

