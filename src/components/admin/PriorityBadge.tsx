import { Badge } from '@/components/ui/badge';

const config: Record<string, { label: string; className: string }> = {
  hot: { label: '🔥 Quente', className: 'bg-red-100 text-red-800 border-red-200' },
  warm: { label: '🟡 Morno', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  normal: { label: '🔵 Normal', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  cold: { label: '⚪ Frio', className: 'bg-gray-100 text-gray-600 border-gray-200' },
};

export function PriorityBadge({ priority }: { priority: string }) {
  const c = config[priority] || config.normal;
  return <Badge variant="outline" className={c.className}>{c.label}</Badge>;
}
