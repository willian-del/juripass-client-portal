import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { InvitationLink } from '@/types/database';
import { Link2, Copy, Trash2, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

export default function AdminInvitationLinks() {
  const { isSuperAdmin, usuario } = useAuth();

  const { data: links, isLoading } = useQuery({
    queryKey: ['invitation-links', usuario?.id_empresa],
    queryFn: async () => {
      let query = supabase
        .from('invitation_links')
        .select('*, empresas(nome)')
        .order('created_at', { ascending: false });

      if (!isSuperAdmin && usuario?.id_empresa) {
        query = query.eq('id_empresa', usuario.id_empresa);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as InvitationLink[];
    },
  });

  const copyToClipboard = (token: string) => {
    const url = `${window.location.origin}/novo-cadastro?token=${token}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copiado para a área de transferência');
  };

  const getStatusBadge = (link: InvitationLink) => {
    if (!link.active) {
      return <Badge variant="secondary">Inativo</Badge>;
    }
    if (link.expires_at && new Date(link.expires_at) < new Date()) {
      return <Badge variant="destructive">Expirado</Badge>;
    }
    if (link.max_uses && link.current_uses >= link.max_uses) {
      return <Badge variant="destructive">Esgotado</Badge>;
    }
    return <Badge variant="default">Ativo</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Links de Convite</h1>
            <p className="text-muted-foreground">
              Gerencie links de cadastro para suas empresas
            </p>
          </div>
          <Button className="gap-2">
            <Link2 className="h-4 w-4" />
            Gerar Novo Link
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Links Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Token</TableHead>
                    <TableHead>Usos</TableHead>
                    <TableHead>Expira em</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Carregando...
                      </TableCell>
                    </TableRow>
                  ) : links && links.length > 0 ? (
                    links.map((link) => (
                      <TableRow key={link.id}>
                        <TableCell className="font-medium">{link.empresas?.nome}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {link.token.substring(0, 8)}...
                        </TableCell>
                        <TableCell>
                          {link.current_uses}
                          {link.max_uses ? ` / ${link.max_uses}` : ' / ∞'}
                        </TableCell>
                        <TableCell>
                          {link.expires_at 
                            ? format(new Date(link.expires_at), 'dd/MM/yyyy')
                            : 'Sem expiração'
                          }
                        </TableCell>
                        <TableCell>{getStatusBadge(link)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(link.token)}
                              title="Copiar link"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Ativar/Desativar">
                              {link.active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="sm" title="Excluir">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Nenhum link encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
