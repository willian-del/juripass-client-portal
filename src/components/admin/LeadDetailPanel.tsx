import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PriorityBadge } from './PriorityBadge';
import { FUNNEL_STAGES } from './FunnelBadge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Phone, FileText, Eye } from 'lucide-react';
import { useEffect } from 'react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role_title: string;
  message: string | null;
  employee_count: string | null;
  department: string | null;
  seniority: string | null;
  interest: string | null;
  evaluating_psychosocial: string | null;
  has_legal_benefit: string | null;
  lead_score: number | null;
  lead_priority: string | null;
  funnel_stage: string | null;
  notes: string | null;
  contacted_at: string | null;
  created_at: string;
}

const LABELS: Record<string, Record<string, string>> = {
  employee_count: { up_to_50: 'Até 50', '50_200': '50–200', '200_500': '200–500', '500_1000': '500–1.000', '1000_plus': '1.000+' },
  department: { rh: 'RH / Pessoas', juridico: 'Jurídico', financeiro: 'Financeiro', compliance: 'Compliance', diretoria: 'Diretoria', outro: 'Outro' },
  interest: { apoio_juridico: 'Apoio jurídico', nr01: 'NR-01', beneficio: 'Benefício corporativo', passivo_trabalhista: 'Passivo trabalhista', conhecer: 'Conhecer solução' },
  evaluating_psychosocial: { sim: 'Sim', ainda_nao: 'Ainda não', pesquisando: 'Pesquisando' },
  has_legal_benefit: { sim: 'Sim', nao: 'Não', nao_sei: 'Não sei' },
};

function getLabel(field: string, value: string | null) {
  if (!value) return '—';
  return LABELS[field]?.[value] || value;
}

export function LeadDetailPanel({
  lead, open, onOpenChange, onUpdate,
}: {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}) {
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [materialShares, setMaterialShares] = useState<any[]>([]);

  useEffect(() => {
    if (!lead) return;
    const fetchShares = async () => {
      const { data } = await supabase
        .from('material_shares')
        .select('id, token, sent_at, sales_materials(title, file_type), material_views(id, viewed_at)')
        .eq('lead_id', lead.id)
        .order('sent_at', { ascending: false });
      setMaterialShares(data || []);
    };
    fetchShares();
  }, [lead]);

  const updateField = async (fields: Record<string, unknown>) => {
    if (!lead) return;
    setSaving(true);
    const { error } = await supabase.from('leads').update(fields).eq('id', lead.id);
    setSaving(false);
    if (error) {
      toast({ title: 'Erro ao salvar', variant: 'destructive' });
    } else {
      toast({ title: 'Atualizado!' });
      onUpdate();
    }
  };

  // Sync notes when lead changes
  if (lead && notes !== (lead.notes || '') && !saving) {
    setNotes(lead.notes || '');
  }

  if (!lead) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-lg">{lead.name}</SheetTitle>
        </SheetHeader>

        <div className="space-y-5 mt-4">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={lead.lead_priority || 'normal'} />
            <span className="text-sm text-muted-foreground">Score: {lead.lead_score ?? 0}</span>
          </div>

          <Section title="Contato">
            <Info label="Email" value={lead.email} />
            <Info label="Telefone" value={lead.phone} />
            <Info label="Empresa" value={lead.company} />
            <Info label="Cargo" value={lead.role_title} />
          </Section>

          <Section title="Qualificação">
            <Info label="Colaboradores" value={getLabel('employee_count', lead.employee_count)} />
            <Info label="Área" value={getLabel('department', lead.department)} />
            <Info label="Interesse" value={getLabel('interest', lead.interest)} />
            <Info label="Riscos psicossociais" value={getLabel('evaluating_psychosocial', lead.evaluating_psychosocial)} />
            <Info label="Benefício jurídico" value={getLabel('has_legal_benefit', lead.has_legal_benefit)} />
          </Section>

          {lead.message && (
            <Section title="Mensagem">
              <p className="text-sm">{lead.message}</p>
            </Section>
          )}

          <Section title="Funil">
            <Select
              value={lead.funnel_stage || 'novo'}
              onValueChange={(v) => updateField({ funnel_stage: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FUNNEL_STAGES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {!lead.contacted_at && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={() => updateField({ contacted_at: new Date().toISOString() })}
                disabled={saving}
              >
                <Phone className="h-4 w-4 mr-1" /> Marcar como contatado
              </Button>
            )}
            {lead.contacted_at && (
              <p className="text-xs text-muted-foreground mt-1">
                Contatado em {new Date(lead.contacted_at).toLocaleDateString('pt-BR')}
              </p>
            )}
          </Section>

          <Section title="Notas internas">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Adicionar notas..."
            />
            <Button
              size="sm"
              className="mt-2"
              onClick={() => updateField({ notes })}
              disabled={saving}
            >
              Salvar notas
            </Button>
          </Section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{title}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
