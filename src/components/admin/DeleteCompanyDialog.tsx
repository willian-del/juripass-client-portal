import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Empresa } from '@/types/database';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface DeleteCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  empresa: Empresa;
  onSuccess: () => void;
}

export function DeleteCompanyDialog({
  open,
  onOpenChange,
  empresa,
  onSuccess,
}: DeleteCompanyDialogProps) {
  const [loading, setLoading] = useState(false);

  const { data: usuariosCount } = useQuery({
    queryKey: ['empresa-usuarios-count', empresa.id],
    queryFn: async () => {
      const { count } = await supabase
        .from('usuarios')
        .select('*', { count: 'exact', head: true })
        .eq('id_empresa', empresa.id)
        .eq('ativo', true)
        .is('deleted_at', null);
      return count || 0;
    },
    enabled: open,
  });

  const handleDelete = async () => {
    setLoading(true);

    try {
      const { error } = await supabase
        .from('empresas')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', empresa.id);

      if (error) throw error;

      toast.success('Empresa excluída com sucesso');
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao excluir empresa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Tem certeza que deseja excluir a empresa <strong>{empresa.nome}</strong>?
            </p>
            {usuariosCount !== undefined && usuariosCount > 0 && (
              <p className="text-destructive font-medium">
                ⚠️ Esta empresa possui {usuariosCount} usuário(s) ativo(s). Ao excluir a
                empresa, os usuários não poderão mais acessar o sistema.
              </p>
            )}
            <p className="text-sm text-muted-foreground">Esta ação não pode ser desfeita.</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
