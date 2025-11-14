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
import { Usuario } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  usuario: Usuario;
  onSuccess: () => void;
}

export function DeleteUserDialog({ open, onOpenChange, usuario, onSuccess }: DeleteUserDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: dependentes } = useQuery({
    queryKey: ['dependentes', usuario.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id_usuario_principal', usuario.id)
        .eq('ativo', true)
        .is('deleted_at', null);
      if (error) throw error;
      return data as Usuario[];
    },
    enabled: open && usuario.tipo_usuario === 'principal',
  });

  const hasDependentes = dependentes && dependentes.length > 0;

  const handleDelete = async () => {
    if (hasDependentes) {
      toast.error('Não é possível excluir usuário com dependentes ativos');
      return;
    }

    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', usuario.id);

      if (error) throw error;

      toast.success('Usuário excluído com sucesso');
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error('Erro ao excluir usuário');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Tem certeza que deseja excluir o usuário <strong>{usuario.nome}</strong>?
            </p>
            {hasDependentes && (
              <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md mt-4">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="text-sm text-destructive">
                  <p className="font-semibold">Este usuário possui {dependentes.length} dependente(s) ativo(s):</p>
                  <ul className="list-disc list-inside mt-1">
                    {dependentes.map((dep) => (
                      <li key={dep.id}>{dep.nome}</li>
                    ))}
                  </ul>
                  <p className="mt-2">
                    Para excluir este usuário, primeiro é necessário inativar ou excluir os dependentes.
                  </p>
                </div>
              </div>
            )}
            {!hasDependentes && (
              <p className="text-muted-foreground mt-2">
                Esta ação não pode ser desfeita. O usuário será marcado como excluído.
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting || hasDependentes}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? 'Excluindo...' : 'Excluir'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
