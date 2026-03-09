

# Adicionar máscara de telefone brasileiro no LeadFormDialog

## Abordagem

Implementar a máscara diretamente no componente sem adicionar dependências externas, usando um handler `onChange` que formata o valor conforme o padrão brasileiro:
- `(XX) XXXXX-XXXX` para celular (11 dígitos)
- `(XX) XXXX-XXXX` para fixo (10 dígitos)

## Alterações

### `src/components/ui/LeadFormDialog.tsx`
- Criar função `formatPhone(value: string)` que extrai apenas dígitos e aplica a máscara
- Substituir o `{...register('phone')}` por um handler customizado que formata o valor antes de setar no form (usando `setValue` do react-hook-form)
- Adicionar `setValue` ao destructuring do `useForm`

