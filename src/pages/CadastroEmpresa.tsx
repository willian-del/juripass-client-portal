import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Building, Loader2 } from 'lucide-react';

interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  codigo_empresa: string;
}

export default function CadastroEmpresa() {
  const { usuario } = useAuth();
  const { toast } = useToast();
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmpresa = async () => {
      if (!usuario?.id_empresa) return;

      const { data, error } = await supabase
        .from('empresas')
        .select('id, nome, cnpj, codigo_empresa')
        .eq('id', usuario.id_empresa)
        .single();

      if (error) {
        toast({
          title: 'Erro ao carregar dados',
          description: 'Não foi possível carregar os dados da empresa.',
          variant: 'destructive',
        });
      } else {
        setEmpresa(data);
      }
      setIsLoading(false);
    };

    fetchEmpresa();
  }, [usuario?.id_empresa, toast]);

  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
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
          <h1 className="text-2xl font-bold">Cadastro da Empresa</h1>
          <p className="text-muted-foreground">
            Visualize os dados da sua empresa
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Dados da Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Nome da Empresa</Label>
                <Input value={empresa?.nome || ''} disabled />
              </div>
              <div className="space-y-2">
                <Label>CNPJ</Label>
                <Input 
                  value={empresa?.cnpj ? formatCNPJ(empresa.cnpj) : ''} 
                  disabled 
                />
              </div>
              <div className="space-y-2">
                <Label>Código da Empresa</Label>
                <Input value={empresa?.codigo_empresa || ''} disabled />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Para alterações nos dados da empresa, entre em contato com o suporte.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
