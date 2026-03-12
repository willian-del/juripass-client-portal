import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { PriorityBadge } from './PriorityBadge';
import { FunnelBadge } from './FunnelBadge';

const EMPLOYEE_LABELS: Record<string, string> = {
  up_to_50: 'Até 50', '50_200': '50–200', '200_500': '200–500', '500_1000': '500–1k', '1000_plus': '1k+',
};

const DEPT_LABELS: Record<string, string> = {
  rh: 'RH', juridico: 'Jurídico', financeiro: 'Fin.', compliance: 'Compliance', diretoria: 'Diretoria', outro: 'Outro',
};

interface Lead {
  id: string;
  name: string;
  company: string;
  employee_count: string | null;
  department: string | null;
  role_title: string;
  lead_score: number | null;
  lead_priority: string | null;
  funnel_stage: string | null;
  created_at: string;
}

export function LeadTable({
  leads, onSelect, selectedIds, onSelectionChange,
}: {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
}) {
  const allSelected = leads.length > 0 && leads.every((l) => selectedIds.has(l.id));

  const toggleAll = () => {
    if (allSelected) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(leads.map((l) => l.id)));
    }
  };

  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange(next);
  };

  return (
    <div className="rounded-lg border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
            </TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead className="hidden md:table-cell">Colab.</TableHead>
            <TableHead className="hidden md:table-cell">Área</TableHead>
            <TableHead className="hidden sm:table-cell">Cargo</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead className="hidden lg:table-cell">Etapa</TableHead>
            <TableHead className="hidden lg:table-cell">Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 && (
            <TableRow>
              <TableCell colSpan={10} className="text-center text-muted-foreground py-8">
                Nenhum lead encontrado
              </TableCell>
            </TableRow>
          )}
          {leads.map((lead) => (
            <TableRow
              key={lead.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onSelect(lead)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedIds.has(lead.id)}
                  onCheckedChange={() => toggleOne(lead.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.company}</TableCell>
              <TableCell className="hidden md:table-cell">{EMPLOYEE_LABELS[lead.employee_count || ''] || '—'}</TableCell>
              <TableCell className="hidden md:table-cell">{DEPT_LABELS[lead.department || ''] || '—'}</TableCell>
              <TableCell className="hidden sm:table-cell">{lead.role_title || '—'}</TableCell>
              <TableCell className="font-mono">{lead.lead_score ?? 0}</TableCell>
              <TableCell><PriorityBadge priority={lead.lead_priority || 'normal'} /></TableCell>
              <TableCell className="hidden lg:table-cell"><FunnelBadge stage={lead.funnel_stage || 'novo'} /></TableCell>
              <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                {new Date(lead.created_at).toLocaleDateString('pt-BR')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
