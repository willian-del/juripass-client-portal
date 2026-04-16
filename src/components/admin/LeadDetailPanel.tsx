import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { PriorityBadge } from './PriorityBadge';
import { FUNNEL_STAGES } from './FunnelBadge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Phone, FileText, Eye, Trash2, Mail, MessageSquare, Copy, Send, Link2 } from 'lucide-react';

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

  useEffect(() => {
    if (!lead) return;
    const fetchData = async () => {
      const [sharesRes, chatsRes] = await Promise.all([
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
      ]);
      setMaterialShares(sharesRes.data || []);
      setChatConversations(chatsRes.data || []);
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
    } else {
      toast({ title: 'Atualizado!' });
      onUpdate();
    }
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
    const url = `${window.location.origin}/m/${token}`;
    await navigator.clipboard.writeText(url);
    toast({ title: 'Link copiado!', description: url });
  };

  const resendEmail = async (share: any) => {
    if (!lead) return;
    setResending(share.id);
    try {
      const shareUrl = `${window.location.origin}/m/${share.token}`;
      const { error } = await supabase.functions.invoke('send-material-email', {
        body: {
          materialId: share.material_id,
          leadId: lead.id,
          shareUrl,
        },
      });
      if (error) throw error;
      toast({ title: 'Email reenviado!' });
    } catch {
      toast({ title: 'Erro ao reenviar email', variant: 'destructive' });
    } finally {
      setResending(null);
    }
  };

  // Sync notes when lead changes
  if (lead && notes !== (lead.notes || '') && !saving) {
    setNotes(lead.notes || '');
  }

  if (!lead) return null;

  const hasRealEmail = !isTempEmail(lead.email);
  const mailtoUrl = hasRealEmail
    ? `mailto:${lead.email}?subject=${encodeURIComponent(`Juripass — ${lead.company}`)}&body=${encodeURIComponent(`Olá ${lead.name},\n\n`)}`
    : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-3">
            {lead.name}
            <PriorityBadge priority={lead.lead_priority || 'normal'} />
            <span className="text-sm font-normal text-muted-foreground">Score: {lead.lead_score ?? 0}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          {/* LEFT COLUMN: Contact + Qualification + Funnel */}
          <div className="space-y-5">
            <Section title="Contato">
              <Info label="Email" value={
                hasRealEmail ? lead.email : undefined
              } badge={!hasRealEmail ? 'Pendente' : undefined} />
              <Info label="Telefone" value={lead.phone || '—'} />
              <Info label="Empresa" value={lead.company} />
              <Info label="Cargo" value={lead.role_title || '—'} />
              {hasRealEmail && (
                <a href={mailtoUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    <Mail className="h-4 w-4 mr-1" /> Enviar email
                  </Button>
                </a>
              )}
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
          </div>

          {/* RIGHT COLUMN: Materials + Chat + Notes + Delete */}
          <div className="space-y-5">
            <Section title={`Materiais enviados (${materialShares.length})`}>
              {materialShares.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum material compartilhado.</p>
              ) : (
                <div className="space-y-3">
                  {materialShares.map((s: any) => {
                    const views = s.material_views?.length || 0;
                    const material = s.sales_materials;
                    return (
                      <div key={s.id} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="h-4 w-4 text-primary shrink-0" />
                            <div className="min-w-0">
                              <span className="font-medium text-sm block truncate">{material?.title || '—'}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(s.sent_at).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          </div>
                          {views > 0 ? (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium flex items-center gap-1 shrink-0">
                              <Eye className="h-3 w-3" /> {views}x
                            </span>
                          ) : (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full shrink-0">
                              Não abriu
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs h-7"
                            onClick={() => copyLink(s.token)}
                          >
                            <Copy className="h-3 w-3 mr-1" /> Copiar link
                          </Button>
                          {hasRealEmail && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-xs h-7"
                              onClick={() => resendEmail(s)}
                              disabled={resending === s.id}
                            >
                              <Send className="h-3 w-3 mr-1" /> {resending === s.id ? 'Enviando...' : 'Reenviar'}
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Section>

            {chatConversations.length > 0 && (
              <Section title="Histórico de Chat">
                <div className="space-y-3">
                  {chatConversations.map((conv: any) => {
                    const msgs = (Array.isArray(conv.messages) ? conv.messages : []) as ChatMessage[];
                    const userMsgs = msgs.filter((m) => m.role === 'user');
                    const lastUserMsg = userMsgs[userMsgs.length - 1]?.content || '';
                    return (
                      <div key={conv.id} className="border rounded-md p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MessageSquare className="h-3 w-3" />
                            {new Date(conv.created_at).toLocaleDateString('pt-BR')} — {msgs.length} msg
                          </div>
                        </div>
                        {lastUserMsg && (
                          <p className="text-sm text-foreground line-clamp-2">"{lastUserMsg}"</p>
                        )}
                        <details className="text-xs">
                          <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                            Ver conversa completa
                          </summary>
                          <div className="mt-2 space-y-1.5 max-h-60 overflow-y-auto">
                            {msgs.map((m, i) => (
                              <div key={i} className={`text-xs p-2 rounded ${m.role === 'user' ? 'bg-primary/10' : 'bg-muted'}`}>
                                <span className="font-semibold">{m.role === 'user' ? 'Lead' : 'Bot'}:</span>{' '}
                                {m.content}
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}

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

            <div className="pt-4 border-t">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="w-full" disabled={deleting}>
                    <Trash2 className="h-4 w-4 mr-1" /> Excluir lead
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir lead?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação é irreversível. O lead <strong>{lead.name}</strong> ({lead.company}) será excluído permanentemente.
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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

function Info({ label, value, badge }: { label: string; value?: string; badge?: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      {badge ? (
        <Badge variant="secondary" className="text-xs">{badge}</Badge>
      ) : (
        <span className="font-medium text-right">{value}</span>
      )}
    </div>
  );
}
