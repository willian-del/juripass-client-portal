import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';
import { LeadTable } from '@/components/admin/LeadTable';
import { LeadKanban } from '@/components/admin/LeadKanban';
import { LeadDetailPanel } from '@/components/admin/LeadDetailPanel';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { LayoutList, Kanban, LogOut, Search, FileText, Sparkles, Trash2 } from 'lucide-react';
import { FUNNEL_STAGES } from '@/components/admin/FunnelBadge';
import { AIAssistantPanel } from '@/components/admin/AIAssistantPanel';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type Lead = any;

export default function AdminLeads() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'table' | 'kanban'>('table');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStage, setFilterStage] = useState('all');
  const [filterDept, setFilterDept] = useState('all');

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('lead_score', { ascending: false })
      .order('created_at', { ascending: false });
    setLeads(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const filtered = leads.filter((l: Lead) => {
    if (filterPriority !== 'all' && l.lead_priority !== filterPriority) return false;
    if (filterStage !== 'all' && (l.funnel_stage || 'novo') !== filterStage) return false;
    if (filterDept !== 'all' && l.department !== filterDept) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        l.name?.toLowerCase().includes(q) ||
        l.company?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSelect = (lead: Lead) => {
    setSelectedLead(lead);
    setDetailOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    setBulkDeleting(true);
    const ids = Array.from(selectedIds);
    const { error } = await supabase.from('leads').delete().in('id', ids);
    setBulkDeleting(false);
    if (error) {
      toast({ title: 'Erro ao excluir', variant: 'destructive' });
    } else {
      toast({ title: `${ids.length} lead(s) excluído(s)` });
      setSelectedIds(new Set());
      fetchLeads();
    }
  };

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-muted/20">
        <header className="border-b bg-card px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold">CRM Juripass</h1>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/materiais')}>
              <FileText className="h-4 w-4 mr-1" /> Materiais
            </Button>
            <Button variant="outline" size="sm" onClick={() => setAiOpen(true)} className="border-primary/30 text-primary hover:bg-primary/5">
              <Sparkles className="h-4 w-4 mr-1" /> AI Assistant
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" /> Sair
          </Button>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, empresa ou email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Prioridade" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="hot">🔥 Quente</SelectItem>
                <SelectItem value="warm">🟡 Morno</SelectItem>
                <SelectItem value="normal">🔵 Normal</SelectItem>
                <SelectItem value="cold">⚪ Frio</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStage} onValueChange={setFilterStage}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Etapa" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {FUNNEL_STAGES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterDept} onValueChange={setFilterDept}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Área" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="rh">RH</SelectItem>
                <SelectItem value="juridico">Jurídico</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="diretoria">Diretoria</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-1 border rounded-md p-0.5">
              <Button
                variant={view === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('table')}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
              <Button
                variant={view === 'kanban' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('kanban')}
              >
                <Kanban className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats + bulk actions */}
          <div className="flex gap-4 items-center text-sm text-muted-foreground">
            <span>{filtered.length} lead{filtered.length !== 1 ? 's' : ''}</span>
            <span>🔥 {filtered.filter((l: Lead) => l.lead_priority === 'hot').length} quentes</span>
            {selectedIds.size > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" disabled={bulkDeleting}>
                    <Trash2 className="h-4 w-4 mr-1" /> Excluir {selectedIds.size} selecionado{selectedIds.size > 1 ? 's' : ''}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir {selectedIds.size} lead(s)?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação é irreversível. Os leads selecionados serão excluídos permanentemente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleBulkDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          {loading ? (
            <p className="text-center py-12 text-muted-foreground">Carregando...</p>
          ) : view === 'table' ? (
            <LeadTable
              leads={filtered}
              onSelect={handleSelect}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
            />
          ) : (
            <LeadKanban leads={filtered} onSelect={handleSelect} />
          )}
        </div>

        <LeadDetailPanel
          lead={selectedLead}
          open={detailOpen}
          onOpenChange={setDetailOpen}
          onUpdate={() => {
            fetchLeads();
            if (selectedLead) {
              supabase.from('leads').select('*').eq('id', selectedLead.id).single()
                .then(({ data }) => { if (data) setSelectedLead(data); });
            }
          }}
        />

        <AIAssistantPanel
          open={aiOpen}
          onOpenChange={setAiOpen}
          lead={selectedLead}
        />
      </div>
    </AdminAuthGuard>
  );
}
