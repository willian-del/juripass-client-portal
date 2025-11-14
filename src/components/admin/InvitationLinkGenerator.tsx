import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Copy } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Empresa } from '@/types/database';

interface InvitationLinkGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  preSelectedEmpresa?: string;
}

export function InvitationLinkGenerator({
  open,
  onOpenChange,
  onSuccess,
  preSelectedEmpresa,
}: InvitationLinkGeneratorProps) {
  const { isSuperAdmin, usuario } = useAuth();
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id_empresa: preSelectedEmpresa || '',
    max_uses: '',
    expires_at: '',
  });

  const { data: empresas } = useQuery({
    queryKey: ['empresas-select'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('empresas')
        .select('id, nome, codigo_empresa')
        .is('deleted_at', null)
        .order('nome');

      if (error) throw error;
      return data as Empresa[];
    },
    enabled: isSuperAdmin && open,
  });

  useEffect(() => {
    if (open) {
      setGeneratedLink(null);
      if (preSelectedEmpresa) {
        setFormData(prev => ({ ...prev, id_empresa: preSelectedEmpresa }));
      } else if (!isSuperAdmin && usuario?.id_empresa) {
        setFormData(prev => ({ ...prev, id_empresa: usuario.id_empresa }));
      }
    }
  }, [open, isSuperAdmin, usuario, preSelectedEmpresa]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    const empresaId = isSuperAdmin ? formData.id_empresa : usuario?.id_empresa;

    if (!empresaId) {
      toast.error('Selecione uma empresa');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-invitation-link', {
        body: {
          id_empresa: empresaId,
          max_uses: formData.max_uses ? parseInt(formData.max_uses) : null,
          expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
        },
      });

      if (error) throw error;

      const fullUrl = `${window.location.origin}/novo-cadastro?token=${data.token}`;
      setGeneratedLink(fullUrl);
      toast.success('Link gerado com sucesso!');
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao gerar link');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      toast.success('Link copiado para área de transferência');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gerar Link de Convite</DialogTitle>
          <DialogDescription>
            Crie um link de cadastro para permitir novos usuários
          </DialogDescription>
        </DialogHeader>

        {generatedLink ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Link Gerado</Label>
              <div className="flex gap-2">
                <Input value={generatedLink} readOnly className="font-mono text-sm" />
                <Button type="button" size="icon" onClick={copyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>Fechar</Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleGenerate} className="space-y-4">
            {isSuperAdmin && (
              <div className="space-y-2">
                <Label htmlFor="empresa">Empresa</Label>
                <Select
                  value={formData.id_empresa}
                  onValueChange={(value) =>
                    setFormData({ ...formData, id_empresa: value })
                  }
                  disabled={loading || !!preSelectedEmpresa}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {empresas?.map((empresa) => (
                      <SelectItem key={empresa.id} value={empresa.id}>
                        {empresa.nome} ({empresa.codigo_empresa})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="max_uses">Limite de Usos (opcional)</Label>
              <Input
                id="max_uses"
                type="number"
                min="1"
                value={formData.max_uses}
                onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
                placeholder="Ilimitado"
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground">
                Deixe em branco para uso ilimitado
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expires_at">Data de Expiração (opcional)</Label>
              <Input
                id="expires_at"
                type="datetime-local"
                value={formData.expires_at}
                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground">
                Deixe em branco para não expirar
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Gerar Link
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
