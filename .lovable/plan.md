

# Revisao de Conteudo e Padronizacao de Layout

## 1. Conteudo sensivel encontrado

**Termos a corrigir:**

| Arquivo | Linha | Atual | Correcao |
|---------|-------|-------|----------|
| `NR01.tsx` | 168 | "Endividamento e problemas jurídicos" | "Dívidas e problemas financeiros" |
| `ParaSeuColaborador.tsx` | 149 | "Endividamento, conflitos familiares..." | "Dívidas, conflitos familiares..." |

Nenhuma mencao a "direito trabalhista", "criminal" ou "relacoes contratuais" nas demais paginas. A NR01.tsx menciona "litígio trabalhista" (linha 60) e "ações trabalhistas" (linha 225), mas no contexto de obrigacoes do empregador perante a norma — nao como servico oferecido ao colaborador. Manter.

## 2. Padronizacao de espaçamentos

Paginas `ParaQuem.tsx` e `FAQ.tsx` usam `py-12 md:py-20`, enquanto `ComoFunciona.tsx` e `ParaSeuColaborador.tsx` usam `py-16 md:py-24`. Padronizar todas para `py-16 md:py-24`.

**ParaQuem.tsx** — trocar `py-12 md:py-20` por `py-16 md:py-24` em todas as 5 sections (linhas 60, 74, 107, 131, 174).

**FAQ.tsx** — trocar `py-12 md:py-20` por `py-16 md:py-24` nas 3 sections (linhas 67, 81, 106).

## 3. Padronizacao de border-radius dos cards

`ParaQuem.tsx` e `FAQ.tsx` usam `rounded-xl` nos cards. Demais paginas usam `rounded-2xl`. Trocar para `rounded-2xl` em:
- ParaQuem.tsx: cards de segmento (linha 78), cards "também atendemos" (linha 115), cards "saiba mais" (linhas 138, 148, 158)
- FAQ.tsx: accordion items (linha 89)

## Resumo
4 arquivos, apenas ajustes de classes Tailwind e 2 textos trocados. Nenhuma mudanca estrutural.

