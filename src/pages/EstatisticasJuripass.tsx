import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Users, UserCheck, MessageSquare, Loader2, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Estatisticas {
  totalBeneficiarios: number;
  totalDependentes: number;
  atendimentosMes: number;
  atendimentosPorMes: { mes: string; total: number }[];
}

export default function EstatisticasJuripass() {
  const { usuario } = useAuth();
  const { toast } = useToast();
  const [estatisticas, setEstatisticas] = useState<Estatisticas>({
    totalBeneficiarios: 0,
    totalDependentes: 0,
    atendimentosMes: 0,
    atendimentosPorMes: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEstatisticas = async () => {
      if (!usuario?.id_empresa) return;

      try {
        // Fetch beneficiários (titulares)
        const { count: totalBeneficiarios } = await supabase
          .from('usuarios')
          .select('*', { count: 'exact', head: true })
          .eq('id_empresa', usuario.id_empresa)
          .eq('tipo_usuario', 'principal')
          .is('deleted_at', null);

        // Fetch dependentes
        const { count: totalDependentes } = await supabase
          .from('usuarios')
          .select('*', { count: 'exact', head: true })
          .eq('id_empresa', usuario.id_empresa)
          .eq('tipo_usuario', 'dependente')
          .is('deleted_at', null);

        // Fetch atendimentos do mês atual
        const inicioMes = new Date();
        inicioMes.setDate(1);
        inicioMes.setHours(0, 0, 0, 0);

        const { count: atendimentosMes } = await supabase
          .from('atendimentos')
          .select('*', { count: 'exact', head: true })
          .eq('id_empresa', usuario.id_empresa)
          .gte('data', inicioMes.toISOString())
          .is('deleted_at', null);

        // Fetch atendimentos por mês (últimos 6 meses)
        const { data: atendimentos } = await supabase
          .from('atendimentos')
          .select('data')
          .eq('id_empresa', usuario.id_empresa)
          .is('deleted_at', null)
          .gte('data', new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString());

        const atendimentosPorMes = processAtendimentosPorMes(atendimentos || []);

        setEstatisticas({
          totalBeneficiarios: totalBeneficiarios || 0,
          totalDependentes: totalDependentes || 0,
          atendimentosMes: atendimentosMes || 0,
          atendimentosPorMes,
        });
      } catch (error) {
        toast({
          title: 'Erro ao carregar estatísticas',
          description: 'Não foi possível carregar as estatísticas.',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    };

    fetchEstatisticas();
  }, [usuario?.id_empresa, toast]);

  const processAtendimentosPorMes = (atendimentos: { data: string }[]) => {
    const meses: { [key: string]: number } = {};
    const nomeMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const key = `${nomeMeses[date.getMonth()]}/${date.getFullYear().toString().slice(-2)}`;
      meses[key] = 0;
    }

    // Count atendimentos per month
    atendimentos.forEach((a) => {
      const date = new Date(a.data);
      const key = `${nomeMeses[date.getMonth()]}/${date.getFullYear().toString().slice(-2)}`;
      if (meses[key] !== undefined) {
        meses[key]++;
      }
    });

    return Object.entries(meses).map(([mes, total]) => ({ mes, total }));
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
          <h1 className="text-2xl font-bold">Estatísticas Juripass</h1>
          <p className="text-muted-foreground">
            Acompanhe a utilização do benefício na sua empresa
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Beneficiários Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticas.totalBeneficiarios}</div>
              <p className="text-xs text-muted-foreground">titulares cadastrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dependentes</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticas.totalDependentes}</div>
              <p className="text-xs text-muted-foreground">dependentes cadastrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atendimentos no Mês</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticas.atendimentosMes}</div>
              <p className="text-xs text-muted-foreground">atendimentos realizados</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Atendimentos por Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={estatisticas.atendimentosPorMes}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="mes" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
