import { FUNNEL_STAGES } from './FunnelBadge';
import { PriorityBadge } from './PriorityBadge';

interface Lead {
  id: string;
  name: string;
  company: string;
  lead_score: number | null;
  lead_priority: string | null;
  funnel_stage: string | null;
  created_at: string;
}

export function LeadKanban({ leads, onSelect }: { leads: Lead[]; onSelect: (lead: Lead) => void }) {
  const grouped = FUNNEL_STAGES.map((stage) => ({
    ...stage,
    leads: leads.filter((l) => (l.funnel_stage || 'novo') === stage.value),
  }));

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {grouped.map((col) => (
        <div key={col.value} className="min-w-[240px] flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold">{col.label}</h3>
            <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">{col.leads.length}</span>
          </div>
          <div className="space-y-2">
            {col.leads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-lg border bg-card p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onSelect(lead)}
              >
                <p className="font-medium text-sm">{lead.name}</p>
                <p className="text-xs text-muted-foreground">{lead.company}</p>
                <div className="flex items-center justify-between mt-2">
                  <PriorityBadge priority={lead.lead_priority || 'normal'} />
                  <span className="text-xs font-mono text-muted-foreground">{lead.lead_score ?? 0}</span>
                </div>
              </div>
            ))}
            {col.leads.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-6">Vazio</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
