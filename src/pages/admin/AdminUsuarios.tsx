import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Usuario } from '@/types/database';
import { useState } from 'react';
import { Search, UserPlus, Upload, Download, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { UserFormDialog } from '@/components/admin/UserFormDialog';
import { DeleteUserDialog } from '@/components/admin/DeleteUserDialog';
import { UserImportDialog } from '@/components/admin/UserImportDialog';

export default function AdminUsuarios() {
  const { isSuperAdmin, usuario } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  const { data: usuarios, isLoading, refetch } = useQuery({
    queryKey: ['admin-usuarios', usuario?.id_empresa],
    queryFn: async () => {
      let query = supabase
        .from('usuarios')
        .select('*, empresas(nome)')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (!isSuperAdmin && usuario?.id_empresa) {
        query = query.eq('id_empresa', usuario.id_empresa);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Usuario[];
    },
  });

  const filteredUsuarios = usuarios?.filter(u => 
    u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.numero_cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleAtivo = async (userId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('usuarios')
      .update({ ativo: !currentStatus })
      .eq('id', userId);

    if (error) {
      toast.error('Erro ao atualizar status do usuário');
      return;
    }

    toast.success(currentStatus ? 'Usuário inativado' : 'Usuário ativado');
    refetch();
  };

  const formatCPF = (cpf: string) => {
    // CPF é criptografado, mostrar apenas parcialmente
    return `***.***.***-**`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerenciar Usuários</h1>
            <p className="text-muted-foreground">
              Visualize e gerencie todos os usuários do sistema
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
              <Button variant="outline" className="gap-2" onClick={() => setImportDialogOpen(true)}>
                <Upload className="h-4 w-4" />
                Importar
              </Button>
            <Button className="gap-2" onClick={() => setCreateDialogOpen(true)}>
              <UserPlus className="h-4 w-4" />
              Novo Usuário
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou número de cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número Cliente</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : filteredUsuarios && filteredUsuarios.length > 0 ? (
                filteredUsuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell className="font-medium">{usuario.numero_cliente}</TableCell>
                    <TableCell>{usuario.nome}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell className="text-muted-foreground">{formatCPF(usuario.cpf_criptografado)}</TableCell>
                    <TableCell>{usuario.empresas?.nome}</TableCell>
                    <TableCell>
                      <Badge variant={usuario.tipo_usuario === 'principal' ? 'default' : 'secondary'}>
                        {usuario.tipo_usuario}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={usuario.ativo}
                        onCheckedChange={() => handleToggleAtivo(usuario.id, usuario.ativo)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUsuario(usuario);
                            setEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUsuario(usuario);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <UserFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        mode="create"
        onSuccess={refetch}
      />

      {selectedUsuario && (
        <>
          <UserFormDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            mode="edit"
            usuario={selectedUsuario}
            onSuccess={refetch}
          />

          <DeleteUserDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            usuario={selectedUsuario}
            onSuccess={refetch}
          />

          <UserImportDialog
            open={importDialogOpen}
            onOpenChange={setImportDialogOpen}
            onSuccess={refetch}
          />
        </>
      )}
    </AdminLayout>
  );
}
