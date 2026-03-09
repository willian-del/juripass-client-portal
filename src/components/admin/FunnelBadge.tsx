import { Badge } from '@/components/ui/badge';

const config: Record<string, { label: string; className: string }> = {
  novo: { label: 'Novo', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  contatado: { label: 'Contatado', className: 'bg-purple-50 text-purple-700 border-purple-200' },
  qualificado: { label: 'Qualificado', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  proposta: { label: 'Proposta', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  fechado: { label: 'Fechado', className: 'bg-green-100 text-green-800 border-green-300' },
  perdido: { label: 'Perdido', className: 'bg-red-50 text-red-600 border-red-200' },
};

export const FUNNEL_STAGES = Object.entries(config).map(([value, { label }]) => ({ value, label }));

export function FunnelBadge({ stage }: { stage: string }) {
  const c = config[stage] || config.novo;
  return <Badge variant="outline" className={c.className}>{c.label}</Badge>;
}
