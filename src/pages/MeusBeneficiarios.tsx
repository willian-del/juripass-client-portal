import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Users, Search, Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Beneficiario {
  id: string;
  nome: string;
  email: string;
  tipo_usuario: string;
  ativo: boolean | null;
  created_at: string;
}

export default function MeusBeneficiarios() {
  const { usuario } = useAuth();
  const { toast } = useToast();
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [filteredBeneficiarios, setFilteredBeneficiarios] = useState<Beneficiario[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBeneficiarios = async () => {
      if (!usuario?.id_empresa) return;

      const { data, error } = await supabase
        .from('usuarios')
        .select('id, nome, email, tipo_usuario, ativo, created_at')
        .eq('id_empresa', usuario.id_empresa)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: 'Erro ao carregar beneficiários',
          description: 'Não foi possível carregar a lista de beneficiários.',
          variant: 'destructive',
        });
      } else {
        setBeneficiarios(data || []);
        setFilteredBeneficiarios(data || []);
      }
      setIsLoading(false);
    };

    fetchBeneficiarios();
  }, [usuario?.id_empresa, toast]);

  useEffect(() => {
    const filtered = beneficiarios.filter(
      (b) =>
        b.nome.toLowerCase().includes(search.toLowerCase()) ||
        b.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBeneficiarios(filtered);
  }, [search, beneficiarios]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'principal':
        return 'Titular';
      case 'dependente':
        return 'Dependente';
      default:
        return tipo;
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Meus Beneficiários</h1>
          <p className="text-muted-foreground">
            Gerencie os beneficiários da sua empresa
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Lista de Beneficiários ({filteredBeneficiarios.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou e-mail..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Cadastro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBeneficiarios.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        Nenhum beneficiário encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBeneficiarios.map((beneficiario) => (
                      <TableRow key={beneficiario.id}>
                        <TableCell className="font-medium">{beneficiario.nome}</TableCell>
                        <TableCell>{beneficiario.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{getTipoLabel(beneficiario.tipo_usuario)}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={beneficiario.ativo ? 'default' : 'secondary'}>
                            {beneficiario.ativo ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(beneficiario.created_at)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
