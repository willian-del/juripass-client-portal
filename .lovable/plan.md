

# Corrigir Links de Agendamento (CTA)

## Problema
O link atual `https://calendar.app.google/nrQvcnKBc4Fu3FzJA` nao esta funcionando. O usuario forneceu um novo link de agendamento do Google Calendar.

## Solucao

O widget JavaScript fornecido pelo Google nao funciona bem em aplicacoes React (SPA). A abordagem mais simples e confiavel e **substituir a URL antiga pela nova URL de agendamento** em todos os arquivos, mantendo o mesmo padrao de link direto que ja existe.

### Nova URL
```
https://calendar.google.com/calendar/appointments/schedules/AcZssZ2GyYmhF9M7wyTa-iyORM70ntb_ojyDZ3M9rcr_kGrCnZZV-WZ7FOsl4KH2rTJ4Y4Bn28SgRmV2?gv=true
```

### Passo 1: Centralizar a URL

Adicionar a URL de agendamento em `src/lib/constants.ts` para facilitar manutencao futura:

```typescript
export const BRAND = {
  // ... campos existentes
  calendarUrl: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2GyYmhF9M7wyTa-iyORM70ntb_ojyDZ3M9rcr_kGrCnZZV-WZ7FOsl4KH2rTJ4Y4Bn28SgRmV2?gv=true',
}
```

### Passo 2: Atualizar todos os arquivos

Substituir o link antigo e importar a constante nos 9 arquivos afetados:

| Arquivo | Ocorrencias |
|---------|-------------|
| `src/components/new-home/HeroSection.tsx` | 1 |
| `src/components/new-home/MidCTASection.tsx` | 1 |
| `src/components/new-home/FinalCTASection.tsx` | 1 |
| `src/pages/NR01.tsx` | 2 |
| `src/pages/ComoFunciona.tsx` | 1 |
| `src/pages/ParaQuem.tsx` | 1 |
| `src/pages/FAQ.tsx` | 1 |
| `src/pages/BlogPost.tsx` | 1 |
| `src/pages/Avaliacao.tsx` | 1 |

Cada arquivo tera o import `import { BRAND } from '@/lib/constants'` e usara `BRAND.calendarUrl` em vez da URL hardcoded. Assim, se precisar trocar a URL novamente no futuro, basta alterar em um unico lugar.

