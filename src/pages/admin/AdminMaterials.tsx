import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { LogOut, Plus, Upload, Link2, FileText, Eye, Copy, Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  leads: { name: string; company: string } | null;
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

  // Upload form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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
      .select('id, token, sent_at, lead_id, material_id, leads(name, company), material_views(id)');
    
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

      const { error: uploadError } = await supabase.storage
        .from('sales-materials')
        .upload(filePath, file);

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
      setTitle('');
      setDescription('');
      setFile(null);
      setUploadOpen(false);
      fetchMaterials();
    }
  };

  const handleShare = async () => {
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
    await navigator.clipboard.writeText(shareUrl);
    toast({ title: 'Link copiado!', description: shareUrl });
    setShareOpen(false);
    setSelectedLeadId('');
    fetchShares();
  };

  const copyShareLink = async (token: string) => {
    const url = `${window.location.origin}/m/${token}`;
    await navigator.clipboard.writeText(url);
    toast({ title: 'Link copiado!' });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

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

        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
          {/* Actions */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {materials.length} material{materials.length !== 1 ? 'is' : ''}
            </p>
            <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-1" /> Novo material
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar material</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                  <Input
                    placeholder="Título do material"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Descrição (opcional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">
                      Arquivo (PDF, PPT, etc.) — opcional
                    </label>
                    <Input
                      type="file"
                      accept=".pdf,.ppt,.pptx,.doc,.docx"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                  </div>
                  <Button onClick={handleUpload} disabled={uploading} className="w-full">
                    <Upload className="h-4 w-4 mr-1" />
                    {uploading ? 'Enviando...' : 'Salvar material'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Materials list */}
          {loading ? (
            <p className="text-center py-12 text-muted-foreground">Carregando...</p>
          ) : materials.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Nenhum material cadastrado</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {materials.map((m) => {
                const materialShares = shares[m.id] || [];
                const totalViews = materialShares.reduce(
                  (acc, s) => acc + (s.material_views?.length || 0), 0
                );

                return (
                  <div
                    key={m.id}
                    className="border rounded-lg bg-card p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <FileText className="h-8 w-8 text-primary mt-0.5 shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground">{m.title}</h3>
                          {m.description && (
                            <p className="text-sm text-muted-foreground">{m.description}</p>
                          )}
                          <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                            <span>{m.file_type.toUpperCase()}</span>
                            <span>{new Date(m.created_at).toLocaleDateString('pt-BR')}</span>
                            <span className="flex items-center gap-1">
                              <Send className="h-3 w-3" /> {materialShares.length} envio{materialShares.length !== 1 ? 's' : ''}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" /> {totalViews} visualização{totalViews !== 1 ? 'ões' : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            if (!m.file_path) {
                              // Builtin material
                              const route = m.file_type === 'one-pager'
                                ? '/avaliacao?view=onepager'
                                : '/avaliacao';
                              window.open(route, '_blank');
                            } else {
                              const { data } = await supabase.storage
                                .from('sales-materials')
                                .createSignedUrl(m.file_path, 3600);
                              if (data?.signedUrl) window.open(data.signedUrl, '_blank');
                            }
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" /> Visualizar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSharingMaterial(m);
                            setShareOpen(true);
                          }}
                        >
                          <Link2 className="h-4 w-4 mr-1" /> Enviar para lead
                        </Button>
                      </div>
                    </div>

                    {/* Shares for this material */}
                    {materialShares.length > 0 && (
                      <div className="border-t pt-2 space-y-1">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Envios</p>
                        {materialShares.map((s) => (
                          <div key={s.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{s.leads?.name || '—'}</span>
                              <span className="text-muted-foreground">{s.leads?.company || ''}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              {s.material_views?.length > 0 ? (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                                  ✓ Visualizado ({s.material_views.length}x)
                                </span>
                              ) : (
                                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                  Não abriu
                                </span>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyShareLink(s.token)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Share dialog */}
        <Dialog open={shareOpen} onOpenChange={setShareOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enviar "{sharingMaterial?.title}" para lead</DialogTitle>
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
              <Button onClick={handleShare} disabled={!selectedLeadId} className="w-full">
                <Link2 className="h-4 w-4 mr-1" /> Gerar link e copiar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminAuthGuard>
  );
}
