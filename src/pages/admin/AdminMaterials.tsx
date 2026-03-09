import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  LogOut, Plus, Upload, Link2, FileText, Eye, Copy, Send, ArrowLeft,
  Pencil, Trash2, Mail, X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SlidesPresentation } from '@/components/avaliacao/SlidesPresentation';
import { OnePager } from '@/components/avaliacao/OnePager';

type Material = {
  id: string;
  title: string;
  description: string;
  file_path: string;
  file_type: string;
  created_at: string;
};

type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
};

type ShareWithViews = {
  id: string;
  token: string;
  sent_at: string;
  lead_id: string;
  leads: { name: string; company: string; email: string } | null;
  material_views: { id: string }[];
};

export default function AdminMaterials() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [sharingMaterial, setSharingMaterial] = useState<Material | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [shares, setShares] = useState<Record<string, ShareWithViews[]>>({});

  // Preview state
  const [previewType, setPreviewType] = useState<'slides' | 'onepager' | null>(null);

  // Edit state
  const [editOpen, setEditOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [saving, setSaving] = useState(false);

  // Upload form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Email sending
  const [sendingEmail, setSendingEmail] = useState(false);

  // Expanded shares row
  const [expandedMaterialId, setExpandedMaterialId] = useState<string | null>(null);

  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('sales_materials')
      .select('*')
      .order('created_at', { ascending: false });
    setMaterials((data as Material[]) || []);
    setLoading(false);
  }, []);

  const fetchShares = useCallback(async () => {
    const { data } = await supabase
      .from('material_shares')
      .select('id, token, sent_at, lead_id, material_id, leads(name, company, email), material_views(id)');

    if (data) {
      const grouped: Record<string, ShareWithViews[]> = {};
      for (const s of data as any[]) {
        const mid = s.material_id;
        if (!grouped[mid]) grouped[mid] = [];
        grouped[mid].push(s);
      }
      setShares(grouped);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    const { data } = await supabase.from('leads').select('id, name, company, email').order('name');
    setLeads((data as Lead[]) || []);
  }, []);

  useEffect(() => {
    fetchMaterials();
    fetchShares();
    fetchLeads();
  }, [fetchMaterials, fetchShares, fetchLeads]);

  const handleUpload = async () => {
    if (!title.trim()) {
      toast({ title: 'Informe o título', variant: 'destructive' });
      return;
    }
    setUploading(true);
    let filePath = '';
    let fileType = 'document';
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'pdf';
      filePath = `${crypto.randomUUID()}.${ext}`;
      fileType = ext === 'pdf' ? 'pdf' : ext.includes('ppt') ? 'presentation' : 'document';
      const { error: uploadError } = await supabase.storage.from('sales-materials').upload(filePath, file);
      if (uploadError) {
        toast({ title: 'Erro no upload', description: uploadError.message, variant: 'destructive' });
        setUploading(false);
        return;
      }
    }
    const { data: { session } } = await supabase.auth.getSession();
    const { error } = await supabase.from('sales_materials').insert({
      title: title.trim(),
      description: description.trim(),
      file_path: filePath,
      file_type: fileType,
      created_by: session?.user?.id || null,
    });
    setUploading(false);
    if (error) {
      toast({ title: 'Erro ao salvar', variant: 'destructive' });
    } else {
      toast({ title: 'Material adicionado!' });
      setTitle(''); setDescription(''); setFile(null); setUploadOpen(false);
      fetchMaterials();
    }
  };

  const handleShare = async (alsoSendEmail = false) => {
    if (!sharingMaterial || !selectedLeadId) return;
    const { data: { session } } = await supabase.auth.getSession();
    const { data, error } = await supabase.from('material_shares').insert({
      material_id: sharingMaterial.id,
      lead_id: selectedLeadId,
      created_by: session?.user?.id || null,
    }).select('token').single();
    if (error || !data) {
      toast({ title: 'Erro ao compartilhar', variant: 'destructive' });
      return;
    }
    const shareUrl = `${window.location.origin}/m/${data.token}`;

    if (alsoSendEmail) {
      setSendingEmail(true);
      try {
        const { error: fnError } = await supabase.functions.invoke('send-material-email', {
          body: {
            materialId: sharingMaterial.id,
            leadId: selectedLeadId,
            shareUrl,
          },
        });
        if (fnError) throw fnError;
        toast({ title: 'Email enviado com sucesso!', description: shareUrl });
      } catch (e: any) {
        toast({ title: 'Link gerado, mas erro ao enviar email', description: e.message, variant: 'destructive' });
        await navigator.clipboard.writeText(shareUrl);
      } finally {
        setSendingEmail(false);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: 'Link copiado!', description: shareUrl });
    }
    setShareOpen(false);
    setSelectedLeadId('');
    fetchShares();
  };

  const handleEdit = async () => {
    if (!editingMaterial || !editTitle.trim()) return;
    setSaving(true);
    const { error } = await supabase.from('sales_materials').update({
      title: editTitle.trim(),
      description: editDescription.trim(),
    }).eq('id', editingMaterial.id);
    setSaving(false);
    if (error) {
      toast({ title: 'Erro ao atualizar', variant: 'destructive' });
    } else {
      toast({ title: 'Material atualizado!' });
      setEditOpen(false);
      fetchMaterials();
    }
  };

  const handleDelete = async (material: Material) => {
    // Cascade: views → shares → material → file
    const materialShares = shares[material.id] || [];
    const shareIds = materialShares.map((s) => s.id);

    if (shareIds.length > 0) {
      await supabase.from('material_views').delete().in('share_id', shareIds);
      await supabase.from('material_shares').delete().eq('material_id', material.id);
    }

    const { error } = await supabase.from('sales_materials').delete().eq('id', material.id);
    if (error) {
      toast({ title: 'Erro ao excluir', variant: 'destructive' });
      return;
    }

    if (material.file_path) {
      await supabase.storage.from('sales-materials').remove([material.file_path]);
    }

    toast({ title: 'Material excluído!' });
    fetchMaterials();
    fetchShares();
  };

  const handlePreview = async (m: Material) => {
    if (!m.file_path) {
      // Builtin
      if (m.file_type === 'one-pager') {
        setPreviewType('onepager');
      } else {
        setPreviewType('slides');
      }
    } else {
      const { data } = await supabase.storage.from('sales-materials').createSignedUrl(m.file_path, 3600);
      if (data?.signedUrl) window.open(data.signedUrl, '_blank');
    }
  };

  const copyShareLink = async (token: string) => {
    const url = `${window.location.origin}/m/${token}`;
    await navigator.clipboard.writeText(url);
    toast({ title: 'Link copiado!' });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Fullscreen preview overlay
  if (previewType) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="absolute top-4 right-4 z-[60]">
          <Button variant="outline" size="sm" onClick={() => setPreviewType(null)}>
            <X className="h-4 w-4 mr-1" /> Fechar
          </Button>
        </div>
        {previewType === 'slides' ? (
          <SlidesPresentation onClose={() => setPreviewType(null)} />
        ) : (
          <OnePager onClose={() => setPreviewType(null)} />
        )}
      </div>
    );
  }

  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-muted/20">
        <header className="border-b bg-card px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/leads')}>
              <ArrowLeft className="h-4 w-4 mr-1" /> CRM
            </Button>
            <h1 className="text-lg font-bold">Materiais Comerciais</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" /> Sair
          </Button>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {materials.length} material{materials.length !== 1 ? 'is' : ''}
            </p>
            <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
              <DialogTrigger asChild>
                <Button><Plus className="h-4 w-4 mr-1" /> Novo material</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar material</DialogTitle>
                  <DialogDescription>Preencha os dados do novo material comercial.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                  <Input placeholder="Título do material" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <Textarea placeholder="Descrição (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">Arquivo (PDF, PPT, etc.) — opcional</label>
                    <Input type="file" accept=".pdf,.ppt,.pptx,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  </div>
                  <Button onClick={handleUpload} disabled={uploading} className="w-full">
                    <Upload className="h-4 w-4 mr-1" />
                    {uploading ? 'Enviando...' : 'Salvar material'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Materials table */}
          {loading ? (
            <p className="text-center py-12 text-muted-foreground">Carregando...</p>
          ) : materials.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Nenhum material cadastrado</p>
            </div>
          ) : (
            <div className="border rounded-lg bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead className="w-[100px]">Tipo</TableHead>
                    <TableHead className="w-[80px] text-center">Envios</TableHead>
                    <TableHead className="w-[80px] text-center">Views</TableHead>
                    <TableHead className="w-[110px]">Data</TableHead>
                    <TableHead className="w-[220px] text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((m) => {
                    const materialShares = shares[m.id] || [];
                    const totalViews = materialShares.reduce((acc, s) => acc + (s.material_views?.length || 0), 0);
                    const isExpanded = expandedMaterialId === m.id;

                    return (
                      <>
                        <TableRow
                          key={m.id}
                          className="cursor-pointer"
                          onClick={() => setExpandedMaterialId(isExpanded ? null : m.id)}
                        >
                          <TableCell>
                            <div>
                              <span className="font-medium">{m.title}</span>
                              {m.description && (
                                <p className="text-xs text-muted-foreground truncate max-w-[300px]">{m.description}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded font-medium">
                              {m.file_type.toUpperCase()}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="flex items-center justify-center gap-1 text-sm">
                              <Send className="h-3 w-3 text-muted-foreground" /> {materialShares.length}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="flex items-center justify-center gap-1 text-sm">
                              <Eye className="h-3 w-3 text-muted-foreground" /> {totalViews}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(m.created_at).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" title="Visualizar" onClick={() => handlePreview(m)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost" size="icon" title="Editar"
                                onClick={() => {
                                  setEditingMaterial(m);
                                  setEditTitle(m.title);
                                  setEditDescription(m.description || '');
                                  setEditOpen(true);
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost" size="icon" title="Enviar para lead"
                                onClick={() => { setSharingMaterial(m); setShareOpen(true); }}
                              >
                                <Link2 className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" title="Excluir" className="text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Excluir material?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      O material "{m.title}" e todos os envios/visualizações associados serão excluídos permanentemente.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(m)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                      Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Expanded shares sub-rows */}
                        {isExpanded && materialShares.length > 0 && materialShares.map((s) => (
                          <TableRow key={s.id} className="bg-muted/30">
                            <TableCell colSpan={2} className="pl-10">
                              <span className="text-sm font-medium">{s.leads?.name || '—'}</span>
                              <span className="text-sm text-muted-foreground ml-2">{s.leads?.company || ''}</span>
                            </TableCell>
                            <TableCell className="text-center text-xs text-muted-foreground">
                              {new Date(s.sent_at).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell className="text-center">
                              {s.material_views?.length > 0 ? (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                                  ✓ {s.material_views.length}x
                                </span>
                              ) : (
                                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                  Não abriu
                                </span>
                              )}
                            </TableCell>
                            <TableCell colSpan={2} className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => copyShareLink(s.token)}>
                                <Copy className="h-3 w-3 mr-1" /> Copiar link
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}

                        {isExpanded && materialShares.length === 0 && (
                          <TableRow key={`${m.id}-empty`} className="bg-muted/30">
                            <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-3">
                              Nenhum envio para este material
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Share dialog */}
        <Dialog open={shareOpen} onOpenChange={setShareOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enviar "{sharingMaterial?.title}" para lead</DialogTitle>
              <DialogDescription>Selecione o lead e escolha como compartilhar.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <Select value={selectedLeadId} onValueChange={setSelectedLeadId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um lead..." />
                </SelectTrigger>
                <SelectContent>
                  {leads.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.name} — {l.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleShare(false)} disabled={!selectedLeadId} className="flex-1">
                  <Copy className="h-4 w-4 mr-1" /> Copiar link
                </Button>
                <Button onClick={() => handleShare(true)} disabled={!selectedLeadId || sendingEmail} className="flex-1">
                  <Mail className="h-4 w-4 mr-1" /> {sendingEmail ? 'Enviando...' : 'Enviar por email'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar material</DialogTitle>
              <DialogDescription>Altere o título ou descrição do material.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <Input placeholder="Título" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              <Textarea placeholder="Descrição" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={3} />
              <Button onClick={handleEdit} disabled={saving || !editTitle.trim()} className="w-full">
                {saving ? 'Salvando...' : 'Salvar alterações'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminAuthGuard>
  );
}
