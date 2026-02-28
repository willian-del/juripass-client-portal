
# Alterar CTA "Conversar rapidamente" para "Agende uma conversa"

## Resumo
Substituir todos os botoes CTA que diziam "Conversar rapidamente" (apontando para WhatsApp) por "Agende uma conversa" apontando para o Google Calendar: `https://calendar.app.google/nrQvcnKBc4Fu3FzJA`

Tambem trocar o icone de `MessageCircle` para `Calendar` (lucide-react), ja que o destino agora e um agendamento e nao mais uma conversa no WhatsApp.

## Arquivos alterados (8 arquivos)

| Arquivo | Mudanca |
|---------|---------|
| `src/components/new-home/HeroSection.tsx` | Texto, link e icone do CTA principal |
| `src/components/new-home/MidCTASection.tsx` | Texto, link e icone |
| `src/components/new-home/FinalCTASection.tsx` | Texto, link e icone do botao primario |
| `src/components/home/HomeHeader.tsx` | Texto, link e icone nos 2 botoes (desktop e mobile) |
| `src/pages/FAQ.tsx` | Texto, link e icone do CTA final |
| `src/pages/ComoFunciona.tsx` | Texto, link e icone do CTA final |
| `src/pages/ParaQuem.tsx` | Texto, link e icone do CTA final |
| `src/pages/Avaliacao.tsx` | Texto, link e icone do CTA |

## Detalhes tecnicos

Em cada arquivo:
1. Substituir `href="https://wa.me/5511999999999..."` por `href="https://calendar.app.google/nrQvcnKBc4Fu3FzJA"`
2. Substituir texto "Conversar rapidamente" por "Agende uma conversa"
3. Substituir import e uso de `MessageCircle` por `Calendar` (de lucide-react)
4. Manter `target="_blank"` e `rel="noopener noreferrer"`

**Nota:** O arquivo `src/components/avaliacao/OnePager.tsx` contem uma referencia textual ao WhatsApp no rodape de contato -- essa sera mantida como esta, pois e informacao de contato e nao um CTA.

**Subtitulo do Hero:** O texto "15 minutos para entender se faz sentido para sua empresa." sera mantido, pois continua fazendo sentido com agendamento.
