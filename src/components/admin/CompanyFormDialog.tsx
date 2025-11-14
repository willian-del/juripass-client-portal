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
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Empresa } from '@/types/database';
import { Loader2 } from 'lucide-react';

interface CompanyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  empresa?: Empresa;
  onSuccess: () => void;
}

export function CompanyFormDialog({
  open,
  onOpenChange,
  mode,
  empresa,
  onSuccess,
}: CompanyFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    codigo_empresa: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === 'edit' && empresa) {
      setFormData({
        nome: empresa.nome,
        cnpj: empresa.cnpj,
        codigo_empresa: empresa.codigo_empresa,
      });
    } else {
      setFormData({
        nome: '',
        cnpj: '',
        codigo_empresa: '',
      });
    }
    setErrors({});
  }, [mode, empresa, open]);

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return value;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome || formData.nome.length < 3) {
      newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    const cnpjNumbers = formData.cnpj.replace(/\D/g, '');
    if (cnpjNumbers.length !== 14) {
      newErrors.cnpj = 'CNPJ deve conter 14 dígitos';
    }

    if (!formData.codigo_empresa || formData.codigo_empresa.length < 3) {
      newErrors.codigo_empresa = 'Código deve ter pelo menos 3 caracteres';
    } else if (!/^[A-Z0-9_-]+$/.test(formData.codigo_empresa)) {
      newErrors.codigo_empresa = 'Código deve conter apenas letras maiúsculas, números, _ ou -';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);

    try {
      const cnpjNumbers = formData.cnpj.replace(/\D/g, '');

      if (mode === 'create') {
        // Verificar se CNPJ já existe
        const { data: existingCNPJ } = await supabase
          .from('empresas')
          .select('id')
          .eq('cnpj', cnpjNumbers)
          .is('deleted_at', null)
          .single();

        if (existingCNPJ) {
          toast.error('CNPJ já cadastrado');
          setLoading(false);
          return;
        }

        // Verificar se código já existe
        const { data: existingCodigo } = await supabase
          .from('empresas')
          .select('id')
          .eq('codigo_empresa', formData.codigo_empresa)
          .is('deleted_at', null)
          .single();

        if (existingCodigo) {
          toast.error('Código da empresa já cadastrado');
          setLoading(false);
          return;
        }

        const { error } = await supabase.from('empresas').insert({
          nome: formData.nome,
          cnpj: cnpjNumbers,
          codigo_empresa: formData.codigo_empresa,
        });

        if (error) throw error;
        toast.success('Empresa criada com sucesso');
      } else {
        const { error } = await supabase
          .from('empresas')
          .update({
            nome: formData.nome,
          })
          .eq('id', empresa!.id);

        if (error) throw error;
        toast.success('Empresa atualizada com sucesso');
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao processar empresa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Nova Empresa' : 'Editar Empresa'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Preencha os dados para cadastrar uma nova empresa'
              : 'Atualize os dados da empresa'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da Empresa</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Empresa LTDA"
              disabled={loading}
            />
            {errors.nome && <p className="text-sm text-destructive">{errors.nome}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              value={formData.cnpj}
              onChange={(e) =>
                setFormData({ ...formData, cnpj: formatCNPJ(e.target.value) })
              }
              placeholder="00.000.000/0000-00"
              disabled={loading || mode === 'edit'}
            />
            {errors.cnpj && <p className="text-sm text-destructive">{errors.cnpj}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="codigo_empresa">Código da Empresa</Label>
            <Input
              id="codigo_empresa"
              value={formData.codigo_empresa}
              onChange={(e) =>
                setFormData({ ...formData, codigo_empresa: e.target.value.toUpperCase() })
              }
              placeholder="EMP001"
              disabled={loading || mode === 'edit'}
            />
            {errors.codigo_empresa && (
              <p className="text-sm text-destructive">{errors.codigo_empresa}</p>
            )}
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
              {mode === 'create' ? 'Criar Empresa' : 'Atualizar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
