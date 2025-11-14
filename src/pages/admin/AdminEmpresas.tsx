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
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Empresa } from '@/types/database';
import { useState } from 'react';
import { Search, Building2, Edit, Trash2, Link2, Users } from 'lucide-react';
import { format } from 'date-fns';
import { CompanyFormDialog } from '@/components/admin/CompanyFormDialog';
import { DeleteCompanyDialog } from '@/components/admin/DeleteCompanyDialog';
import { InvitationLinkGenerator } from '@/components/admin/InvitationLinkGenerator';
import { useNavigate } from 'react-router-dom';

export default function AdminEmpresas() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [companyDialogOpen, setCompanyDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');

  const { data: empresas, isLoading, refetch } = useQuery({
    queryKey: ['admin-empresas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('empresas')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Empresa[];
    },
  });

  const filteredEmpresas = empresas?.filter(e => 
    e.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.cnpj.includes(searchTerm) ||
    e.codigo_empresa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerenciar Empresas</h1>
            <p className="text-muted-foreground">
              Visualize e gerencie todas as empresas cadastradas
            </p>
          </div>
          <Button 
            className="gap-2"
            onClick={() => {
              setDialogMode('create');
              setSelectedEmpresa(null);
              setCompanyDialogOpen(true);
            }}
          >
            <Building2 className="h-4 w-4" />
            Nova Empresa
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, CNPJ ou código..."
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
                <TableHead>Nome</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : filteredEmpresas && filteredEmpresas.length > 0 ? (
                filteredEmpresas.map((empresa) => (
                  <TableRow key={empresa.id}>
                    <TableCell className="font-medium">{empresa.nome}</TableCell>
                    <TableCell>{formatCNPJ(empresa.cnpj)}</TableCell>
                    <TableCell>{empresa.codigo_empresa}</TableCell>
                    <TableCell>{format(new Date(empresa.created_at), 'dd/MM/yyyy')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Ver usuários"
                          onClick={() => navigate('/admin/usuarios')}
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Gerar link de convite"
                          onClick={() => {
                            setSelectedEmpresa(empresa);
                            setLinkDialogOpen(true);
                          }}
                        >
                          <Link2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Editar"
                          onClick={() => {
                            setSelectedEmpresa(empresa);
                            setDialogMode('edit');
                            setCompanyDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Excluir"
                          onClick={() => {
                            setSelectedEmpresa(empresa);
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
                  <TableCell colSpan={5} className="text-center">
                    Nenhuma empresa encontrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <CompanyFormDialog
        open={companyDialogOpen}
        onOpenChange={setCompanyDialogOpen}
        mode={dialogMode}
        empresa={selectedEmpresa || undefined}
        onSuccess={refetch}
      />

      {selectedEmpresa && (
        <>
          <DeleteCompanyDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            empresa={selectedEmpresa}
            onSuccess={refetch}
          />
          <InvitationLinkGenerator
            open={linkDialogOpen}
            onOpenChange={setLinkDialogOpen}
            onSuccess={refetch}
            preSelectedEmpresa={selectedEmpresa.id}
          />
        </>
      )}
    </AdminLayout>
  );
}
