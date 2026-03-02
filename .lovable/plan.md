
# Nova Pagina: "Para seus colaboradores"

## Objetivo
Criar uma pagina complementar estrategica em `/para-seus-colaboradores` que fala com o **decisor empatico do RH**, mostrando o impacto humano concreto da Juripass sem abandonar o posicionamento B2B.

## Estrutura da pagina (7 secoes)

### 1. Hero (emocional + estrategico)
- Titulo: "Um canal de apoio confidencial para o seu time."
- Subtitulo com destaque em bold para termos-chave
- Texto de apoio sobre o impacto de problemas pessoais nao resolvidos
- CTA primario: "Agende uma conversa" (openScheduling)
- CTA secundario: "Entender como funciona" (link para /como-funciona)
- Background com gradientes decorativos (mesmo padrao visual das outras paginas)

### 2. O Problema Invisivel
- Titulo: "Questoes pessoais nao resolvidas afetam o trabalho."
- Card unico com texto explicativo sobre endividamento, conflitos familiares, moradia
- Destaque visual: borda lateral primaria ou icone de alerta sutil

### 3. O que o colaborador encontra (4 blocos)
- Titulo: "Um canal externo, estruturado e confidencial."
- Grid 2x2 com cards:
  - Atendimento externo e sigiloso
  - Orientacao informativa sobre direitos
  - Organizacao da demanda
  - Encaminhamento quando necessario
- Cada card com icone, titulo e descricao curta
- Mesmo estilo visual dos confidentialityCards da pagina Como Funciona

### 4. Temas atendidos
- Titulo: "Situacoes do dia a dia que impactam o colaborador."
- Grid de badges/tags tematicos: Endividamento, Direito do consumidor, Moradia, Questoes familiares, Saude, Duvidas trabalhistas, Relacoes contratuais
- Texto de apoio: "Sempre com orientacao informativa e preventiva."

### 5. Como funciona na pratica (4 passos)
- Timeline vertical simplificada (mesmo componente visual da pagina Como Funciona)
- 4 passos: contato, orientacao, caminhos possiveis, encaminhamento formal (quando aplicavel)
- Nota final: "A empresa nao participa do conteudo das demandas."

### 6. Impacto para o RH (fechamento estrategico)
- Titulo: "Cuidado estruturado que fortalece a gestao."
- Lista com icones de check: reduz demandas informais, diminui desgaste, aumenta percepcao de cuidado, fortalece EVP
- Card de destaque: "Nao e assessoria juridica interna. E gestao preventiva estruturada."

### 7. CTA final
- Gradiente primario (mesmo padrao das outras paginas)
- Titulo: "Ofereca um canal de apoio que vai alem do trabalho."
- Dois botoes: "Levar a Juripass para minha empresa" (openScheduling) e "Como funciona" (link)

## Alteracoes tecnicas

| Arquivo | Acao |
|---------|------|
| `src/pages/ParaSeuColaborador.tsx` | Criar pagina completa com as 7 secoes |
| `src/App.tsx` | Adicionar rota `/para-seus-colaboradores` com lazy loading |
| `src/components/home/HomeHeader.tsx` | Adicionar item de navegacao "Para Colaboradores" no menu |

### Padroes seguidos
- Importa `ScrollReveal` para animacoes de entrada progressivas
- Importa `SEOHead` para meta tags
- Importa `Badge`, `Button` de shadcn
- Importa icones de `lucide-react`
- Usa `openScheduling` de `@/lib/constants` para CTAs
- Usa `Link` de react-router-dom para links internos
- Segue o mesmo estilo visual: `rounded-2xl`, gradientes sutis, `bg-card border-border`, tipografia consistente
- Exporta como default para compatibilidade com lazy loading
