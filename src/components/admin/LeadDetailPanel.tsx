import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PriorityBadge } from './PriorityBadge';
import { FUNNEL_STAGES } from './FunnelBadge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Phone, FileText, Eye, Trash2, Mail, MessageSquare,
  Copy, Send, Building2, User, Briefcase, Users,
  MoreHorizontal, X, ClipboardCheck, Clock, CheckCircle2, Plus
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';
import { getPublicShareBaseUrl } from '@/lib/constants';

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

function isTempEmail(email: string) {
  return email.includes('@juripass.temp');
}

interface ChatMessage {
  role: string;
  content: string;
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
  const [deleting, setDeleting] = useState(false);
  const [materialShares, setMaterialShares] = useState<any[]>([]);
  const [chatConversations, setChatConversations] = useState<any[]>([]);
  const [resending, setResending] = useState<string | null>(null);
  const [availableMaterials, setAvailableMaterials] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(false);
  const [contactDraft, setContactDraft] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role_title: '',
  });

  const refreshShares = async (leadId: string) => {
    const { data } = await supabase
      .from('material_shares')
      .select('id, token, sent_at, material_id, sales_materials(title, file_type), material_views(id, viewed_at)')
      .eq('lead_id', leadId)
      .order('sent_at', { ascending: false });
    setMaterialShares(data || []);
  };

  useEffect(() => {
    if (!lead) return;
    const fetchData = async () => {
      const [sharesRes, chatsRes, materialsRes] = await Promise.all([
        supabase
          .from('material_shares')
          .select('id, token, sent_at, material_id, sales_materials(title, file_type), material_views(id, viewed_at)')
          .eq('lead_id', lead.id)
          .order('sent_at', { ascending: false }),
        supabase
          .from('chat_conversations')
          .select('id, messages, created_at, updated_at, mode')
          .eq('lead_id', lead.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('sales_materials')
          .select('id, title, file_type, description')
          .order('created_at', { ascending: false }),
      ]);
      setMaterialShares(sharesRes.data || []);
      setChatConversations(chatsRes.data || []);
      setAvailableMaterials(materialsRes.data || []);
    };
    fetchData();
  }, [lead]);

  const updateField = async (fields: Record<string, unknown>) => {
    if (!lead) return;
    setSaving(true);
    const { error } = await supabase.from('leads').update(fields).eq('id', lead.id);
    setSaving(false);
    if (error) {
      toast({ title: 'Erro ao salvar', variant: 'destructive' });
      return false;
    }
    toast({ title: 'Atualizado!' });
    onUpdate();
    return true;
  };

  const startEditingContact = () => {
    if (!lead) return;
    setContactDraft({
      name: lead.name || '',
      email: isTempEmail(lead.email) ? '' : (lead.email || ''),
      phone: lead.phone || '',
      company: lead.company || '',
      role_title: lead.role_title || '',
    });
    setEditingContact(true);
  };

  const saveContact = async () => {
    const name = contactDraft.name.trim();
    const company = contactDraft.company.trim();
    const email = contactDraft.email.trim();
    const phone = contactDraft.phone.trim();
    const role_title = contactDraft.role_title.trim();

    if (!name || !company) {
      toast({ title: 'Nome e empresa são obrigatórios', variant: 'destructive' });
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: 'Email inválido', variant: 'destructive' });
      return;
    }
    if (!lead) return;

    const fields: Record<string, unknown> = { name, company, phone, role_title };
    // Keep temp email if user left it blank; otherwise overwrite
    if (email) fields.email = email;

    const ok = await updateField(fields);
    if (ok) setEditingContact(false);
  };

  const handleDelete = async () => {
    if (!lead) return;
    setDeleting(true);
    const { error } = await supabase.from('leads').delete().eq('id', lead.id);
    setDeleting(false);
    if (error) {
      toast({ title: 'Erro ao excluir', variant: 'destructive' });
    } else {
      toast({ title: 'Lead excluído!' });
      onOpenChange(false);
      onUpdate();
    }
  };

  const copyLink = async (token: string) => {
    const url = `${getPublicShareBaseUrl()}/m/${token}`;
    await navigator.clipboard.writeText(url);
    toast({ title: 'Link copiado!', description: url });
  };

  const resendEmail = async (share: any) => {
    if (!lead) return;
    setResending(share.id);
    try {
      const shareUrl = `${getPublicShareBaseUrl()}/m/${share.token}`;
      const { error } = await supabase.functions.invoke('send-material-email', {
        body: { materialId: share.material_id, leadId: lead.id, shareUrl },
      });
      if (error) throw error;
      toast({ title: 'Email reenviado!' });
    } catch {
      toast({ title: 'Erro ao reenviar email', variant: 'destructive' });
    } finally {
      setResending(null);
    }
  };

  const handleGenerateLink = async (materialId: string, sendEmail: boolean) => {
    if (!lead) return;
    setGenerating(true);
    setPopoverOpen(false);
    try {
      const { data: share, error } = await supabase
        .from('material_shares')
        .insert({ lead_id: lead.id, material_id: materialId })
        .select('id, token')
        .single();
      if (error || !share) throw error || new Error('insert failed');

      const shareUrl = `${getPublicShareBaseUrl()}/m/${share.token}`;
      await refreshShares(lead.id);

      if (sendEmail && hasRealEmail) {
        const { error: mailErr } = await supabase.functions.invoke('send-material-email', {
          body: { materialId, leadId: lead.id, shareUrl },
        });
        if (mailErr) throw mailErr;
        toast({ title: 'Link gerado e email enviado!', description: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({ title: 'Link gerado e copiado!', description: shareUrl });
      }
    } catch {
      toast({ title: 'Erro ao gerar link', variant: 'destructive' });
    } finally {
      setGenerating(false);
    }
  };

  if (lead && notes !== (lead.notes || '') && !saving) {
    setNotes(lead.notes || '');
  }

  if (!lead) return null;

  const hasRealEmail = !isTempEmail(lead.email);
  const initials = lead.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const createdDate = new Date(lead.created_at).toLocaleDateString('pt-BR');
  const currentStage = lead.funnel_stage || 'novo';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden gap-0 [&>button]:hidden">
        {/* ── HEADER ── */}
        <div className="bg-primary/5 border-b px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 text-lg">
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{lead.name}</h2>
                <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm">{lead.company}</span>
                  <span className="text-xs">·</span>
                  <span className="text-sm">{lead.role_title || '—'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <PriorityBadge priority={lead.lead_priority || 'normal'} />
              <Badge variant="outline" className="text-sm font-semibold px-3 py-1">
                Score {lead.lead_score ?? 0}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" /> Excluir lead
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir lead?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação é irreversível. <strong>{lead.name}</strong> ({lead.company}) será excluído permanentemente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* ── FUNNEL PROGRESS ── */}
          <div className="mt-5 flex items-center gap-1">
            {FUNNEL_STAGES.map((stage, i) => {
              const currentIndex = FUNNEL_STAGES.findIndex(s => s.value === currentStage);
              const isActive = i <= currentIndex;
              const isCurrent = stage.value === currentStage;
              return (
                <button
                  key={stage.value}
                  onClick={() => updateField({ funnel_stage: stage.value })}
                  className={`
                    flex-1 py-1.5 text-xs font-medium rounded-md transition-all
                    ${isCurrent
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : isActive
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }
                  `}
                >
                  {stage.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── TABS CONTENT ── */}
        <Tabs defaultValue="overview" className="flex-1">
          <div className="px-8 pt-4 border-b">
            <TabsList className="bg-transparent p-0 h-auto gap-6">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 text-sm"
              >
                Visão Geral
              </TabsTrigger>
              <TabsTrigger
                value="materials"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 text-sm"
              >
                Materiais ({materialShares.length})
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3 text-sm"
              >
                Histórico
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="px-8 py-6 max-h-[50vh] overflow-y-auto">
            {/* ── VISÃO GERAL ── */}
            <TabsContent value="overview" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Card */}
                <div className="rounded-xl bg-muted/30 border p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <User className="h-4 w-4" /> Contato
                  </h3>
                  <div className="space-y-3">
                    <InfoRow icon={<Mail className="h-4 w-4" />} label="Email">
                      {hasRealEmail ? (
                        <span className="font-medium">{lead.email}</span>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Pendente</Badge>
                      )}
                    </InfoRow>
                    <InfoRow icon={<Phone className="h-4 w-4" />} label="Telefone">
                      <span className="font-medium">{lead.phone || '—'}</span>
                    </InfoRow>
                    <InfoRow icon={<Building2 className="h-4 w-4" />} label="Empresa">
                      <span className="font-medium">{lead.company}</span>
                    </InfoRow>
                    <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Cargo">
                      <span className="font-medium">{lead.role_title || '—'}</span>
                    </InfoRow>
                  </div>
                  <div className="flex gap-2 pt-2">
                    {hasRealEmail && (
                      <a
                        href={`mailto:${lead.email}?subject=${encodeURIComponent(`Juripass — ${lead.company}`)}&body=${encodeURIComponent(`Olá ${lead.name},\n\n`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <Mail className="h-4 w-4 mr-1" /> Email
                        </Button>
                      </a>
                    )}
                    {!lead.contacted_at ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => updateField({ contacted_at: new Date().toISOString() })}
                        disabled={saving}
                      >
                        <Phone className="h-4 w-4 mr-1" /> Marcar contatado
                      </Button>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                        Contatado em {new Date(lead.contacted_at).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Qualification Card */}
                <div className="rounded-xl bg-muted/30 border p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4" /> Qualificação
                  </h3>
                  <div className="space-y-3">
                    <InfoRow icon={<Users className="h-4 w-4" />} label="Colaboradores">
                      <span className="font-medium">{getLabel('employee_count', lead.employee_count)}</span>
                    </InfoRow>
                    <InfoRow icon={<Building2 className="h-4 w-4" />} label="Área">
                      <span className="font-medium">{getLabel('department', lead.department)}</span>
                    </InfoRow>
                    <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Interesse">
                      <span className="font-medium">{getLabel('interest', lead.interest)}</span>
                    </InfoRow>
                    <InfoRow label="Riscos psicossociais">
                      <span className="font-medium">{getLabel('evaluating_psychosocial', lead.evaluating_psychosocial)}</span>
                    </InfoRow>
                    <InfoRow label="Benefício jurídico">
                      <span className="font-medium">{getLabel('has_legal_benefit', lead.has_legal_benefit)}</span>
                    </InfoRow>
                  </div>
                </div>
              </div>

              {/* Message */}
              {lead.message && (
                <div className="rounded-xl bg-muted/30 border p-5">
                  <h3 className="text-sm font-semibold text-primary mb-2">Mensagem do lead</h3>
                  <p className="text-sm leading-relaxed">{lead.message}</p>
                </div>
              )}

              {/* Notes */}
              <div className="rounded-xl bg-muted/30 border p-5 space-y-3">
                <h3 className="text-sm font-semibold text-primary">Notas internas</h3>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Adicionar notas sobre este lead..."
                  className="resize-none bg-background"
                />
                <Button size="sm" onClick={() => updateField({ notes })} disabled={saving}>
                  Salvar notas
                </Button>
              </div>

              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> Criado em {createdDate}
              </p>
            </TabsContent>

            {/* ── MATERIAIS ── */}
            <TabsContent value="materials" className="mt-0 space-y-4">
              {/* Generate new link */}
              <div className="flex items-center justify-between rounded-xl border border-dashed bg-muted/20 p-4">
                <div>
                  <p className="text-sm font-semibold">Enviar novo material</p>
                  <p className="text-xs text-muted-foreground">
                    Gere um link rastreável para este lead sem sair do card.
                  </p>
                </div>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button size="sm" disabled={generating || availableMaterials.length === 0}>
                      <Plus className="h-4 w-4 mr-1.5" />
                      {generating ? 'Gerando...' : 'Gerar novo link'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-80 p-0">
                    <div className="px-3 py-2 border-b">
                      <p className="text-xs font-semibold text-muted-foreground">Escolha um material</p>
                    </div>
                    <div className="max-h-72 overflow-y-auto py-1">
                      {(() => {
                        const sentCounts = materialShares.reduce((acc: Record<string, number>, s: any) => {
                          acc[s.material_id] = (acc[s.material_id] || 0) + 1;
                          return acc;
                        }, {});
                        return availableMaterials.map((m) => {
                          const count = sentCounts[m.id] || 0;
                          const alreadySent = count > 0;
                          return (
                            <div key={m.id} className="px-3 py-2 hover:bg-muted/50 transition-colors">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-start gap-1.5 min-w-0 flex-1">
                                  {alreadySent && (
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 mt-0.5 shrink-0" />
                                  )}
                                  <p className={`text-sm font-medium truncate ${alreadySent ? 'text-muted-foreground' : ''}`}>
                                    {m.title}
                                  </p>
                                </div>
                                {alreadySent && (
                                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 shrink-0">
                                    Já enviado · {count}x
                                  </Badge>
                                )}
                              </div>
                              {m.description && (
                                <p className="text-xs text-muted-foreground truncate mb-1.5 mt-0.5">{m.description}</p>
                              )}
                              <div className="flex gap-1.5 mt-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs"
                                  onClick={() => handleGenerateLink(m.id, false)}
                                >
                                  <Copy className="h-3 w-3 mr-1" /> Copiar link
                                </Button>
                                {hasRealEmail && (
                                  <Button
                                    size="sm"
                                    className="h-7 text-xs"
                                    onClick={() => handleGenerateLink(m.id, true)}
                                  >
                                    <Send className="h-3 w-3 mr-1" /> {alreadySent ? 'Reenviar' : 'Enviar email'}
                                  </Button>
                                )}
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {materialShares.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-10 w-10 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Nenhum material compartilhado com este lead.</p>
                </div>
              ) : (
                materialShares.map((s: any) => {
                  const views = s.material_views?.length || 0;
                  const material = s.sales_materials;
                  return (
                    <div key={s.id} className="rounded-xl border p-5 space-y-3 hover:bg-muted/20 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{material?.title || '—'}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Enviado em {new Date(s.sent_at).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        {views > 0 ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                            <Eye className="h-3 w-3 mr-1" /> {views} visualização{views > 1 ? 'ões' : ''}
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Não abriu</Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => copyLink(s.token)}>
                          <Copy className="h-3.5 w-3.5 mr-1.5" /> Copiar link
                        </Button>
                        {hasRealEmail && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => resendEmail(s)}
                            disabled={resending === s.id}
                          >
                            <Send className="h-3.5 w-3.5 mr-1.5" />
                            {resending === s.id ? 'Enviando...' : 'Reenviar email'}
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </TabsContent>

            {/* ── HISTÓRICO ── */}
            <TabsContent value="history" className="mt-0 space-y-4">
              {chatConversations.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Nenhuma conversa registrada com este lead.</p>
                </div>
              ) : (
                chatConversations.map((conv: any) => {
                  const msgs = (Array.isArray(conv.messages) ? conv.messages : []) as ChatMessage[];
                  const userMsgs = msgs.filter((m) => m.role === 'user');
                  const lastUserMsg = userMsgs[userMsgs.length - 1]?.content || '';
                  return (
                    <div key={conv.id} className="rounded-xl border p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          {new Date(conv.created_at).toLocaleDateString('pt-BR')}
                          <Badge variant="secondary" className="text-xs">{msgs.length} mensagens</Badge>
                        </div>
                      </div>
                      {lastUserMsg && (
                        <p className="text-sm leading-relaxed line-clamp-2 italic text-foreground/80">
                          "{lastUserMsg}"
                        </p>
                      )}
                      <details className="text-sm">
                        <summary className="cursor-pointer text-primary hover:underline text-xs font-medium">
                          Ver conversa completa
                        </summary>
                        <div className="mt-3 space-y-2 max-h-72 overflow-y-auto">
                          {msgs.map((m, i) => (
                            <div
                              key={i}
                              className={`text-sm p-3 rounded-lg ${
                                m.role === 'user'
                                  ? 'bg-primary/10 ml-4'
                                  : 'bg-muted mr-4'
                              }`}
                            >
                              <span className="font-semibold text-xs block mb-1">
                                {m.role === 'user' ? 'Lead' : 'Bot'}
                              </span>
                              {m.content}
                            </div>
                          ))}
                        </div>
                      </details>
                    </div>
                  );
                })
              )}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-sm text-right">{children}</div>
    </div>
  );
}
