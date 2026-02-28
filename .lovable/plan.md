
# Pagina dedicada: Nova NR-01 e Riscos Psicossociais

## Objetivo
Criar uma pagina `/nr-01` focada em capturar trafego organico de profissionais de RH pesquisando sobre a Nova NR-01, riscos psicossociais e obrigacoes legais das empresas. A pagina educa o leitor e posiciona a Juripass como solucao pratica.

## Estrutura da pagina

### 1. Hero
- H1: "Nova NR-01 e Riscos Psicossociais: O Que Muda Para o RH"
- Subtitulo explicando que a norma agora exige prevencao de riscos psicossociais e que a Juripass ajuda empresas a estarem em conformidade
- Badge/tag: "Atualizado 2025"

### 2. O que e a Nova NR-01 (secao educativa)
- Explicacao clara e acessivel sobre a atualizacao da NR-01
- O que sao riscos psicossociais no contexto do trabalho
- Exemplos praticos: estresse, assedio, conflitos pessoais que afetam o trabalho
- Timeline/destaque: prazo de adequacao e fiscalizacao

### 3. Quais as obrigacoes da empresa
- Lista de exigencias: identificar, avaliar e gerenciar riscos psicossociais
- Canal de acolhimento como parte da estrategia de prevencao
- Consequencias do nao cumprimento (multas, acoes trabalhistas)

### 4. Como a Juripass ajuda na conformidade
- Conexao direta entre o programa de acolhimento juridico e os requisitos da NR-01
- Bullets: canal externo e confidencial, dados anonimizados para o RH, prevencao ativa
- Diferencial: nao e apenas compliance, e cuidado genuino com o colaborador

### 5. Dados e estatisticas
- Reutilizar dados ja existentes (69% enfrentam problemas juridicos, 28% impacto na saude mental)
- Adicionar contexto de riscos psicossociais

### 6. CTA final
- "Agende uma conversa" com link para o Google Calendar
- Texto: "Entenda como adequar sua empresa a Nova NR-01 com um programa de acolhimento juridico"

## Alteracoes tecnicas

| Arquivo | Acao |
|---------|------|
| `src/pages/NR01.tsx` | **Criar** - pagina completa com todas as secoes |
| `src/App.tsx` | Adicionar rota `/nr-01` com lazy loading dentro do MainLayout |
| `src/components/home/HomeHeader.tsx` | Adicionar "NR-01" ao menu de navegacao |
| `src/components/ui/SEOHead.tsx` | Ja existe, sera usado na nova pagina |
| `public/sitemap.xml` | Adicionar `/nr-01` com priority 0.9 |
| `public/robots.txt` | Sem alteracao (pagina publica) |

### SEO da pagina

- **Title**: "Nova NR-01 e Riscos Psicossociais — Juripass | Como Adequar Sua Empresa"
- **Description**: "Entenda o que muda com a Nova NR-01 sobre riscos psicossociais no trabalho. Saiba como um programa de acolhimento juridico ajuda sua empresa na conformidade e prevencao."
- **JSON-LD**: Article schema com keywords sobre NR-01, riscos psicossociais, saude mental no trabalho
- **H1-H3**: otimizados com termos de busca como "riscos psicossociais", "NR-01 atualizacao", "obrigacoes do empregador"

### Navegacao

Adicionar item "NR-01" no array `navItems` do header, entre "Para Quem" e "FAQ":

```text
Inicio | Como Funciona | Para Quem | NR-01 | FAQ
```
