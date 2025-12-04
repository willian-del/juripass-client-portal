import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Users, UserCheck, MessageSquare, Loader2, TrendingUp, Percent } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';

interface Estatisticas {
  totalBeneficiarios: number;
  totalDependentes: number;
  atendimentosMes: number;
  taxaUtilizacao: number;
  atendimentosPorMes: { mes: string; total: number }[];
  distribuicaoTipo: { name: string; value: number }[];
  evolucaoBeneficiarios: { mes: string; titulares: number; dependentes: number }[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted-foreground))'];

export default function EstatisticasJuripass() {
  const { usuario } = useAuth();
  const { toast } = useToast();
  const [estatisticas, setEstatisticas] = useState<Estatisticas>({
    totalBeneficiarios: 0,
    totalDependentes: 0,
    atendimentosMes: 0,
    taxaUtilizacao: 0,
    atendimentosPorMes: [],
    distribuicaoTipo: [],
    evolucaoBeneficiarios: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEstatisticas = async () => {
      if (!usuario?.id_empresa) return;

      try {
        // Fetch beneficiários (titulares) ativos
        const { count: totalBeneficiarios } = await supabase
          .from('usuarios')
          .select('*', { count: 'exact', head: true })
          .eq('id_empresa', usuario.id_empresa)
          .eq('tipo_usuario', 'principal')
          .eq('ativo', true)
          .is('deleted_at', null);

        // Fetch dependentes ativos
        const { count: totalDependentes } = await supabase
          .from('usuarios')
          .select('*', { count: 'exact', head: true })
          .eq('id_empresa', usuario.id_empresa)
          .eq('tipo_usuario', 'dependente')
          .eq('ativo', true)
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

        // Fetch usuarios por mês para evolução
        const { data: usuarios } = await supabase
          .from('usuarios')
          .select('created_at, tipo_usuario')
          .eq('id_empresa', usuario.id_empresa)
          .is('deleted_at', null)
          .gte('created_at', new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString());

        const evolucaoBeneficiarios = processEvolucaoBeneficiarios(usuarios || []);

        // Calculate taxa de utilização
        const totalUsuarios = (totalBeneficiarios || 0) + (totalDependentes || 0);
        const taxaUtilizacao = totalUsuarios > 0 
          ? Math.round(((atendimentosMes || 0) / totalUsuarios) * 100) 
          : 0;

        // Distribuição por tipo
        const distribuicaoTipo = [
          { name: 'Titulares', value: totalBeneficiarios || 0 },
          { name: 'Dependentes', value: totalDependentes || 0 },
        ];

        setEstatisticas({
          totalBeneficiarios: totalBeneficiarios || 0,
          totalDependentes: totalDependentes || 0,
          atendimentosMes: atendimentosMes || 0,
          taxaUtilizacao,
          atendimentosPorMes,
          distribuicaoTipo,
          evolucaoBeneficiarios,
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

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const key = `${nomeMeses[date.getMonth()]}/${date.getFullYear().toString().slice(-2)}`;
      meses[key] = 0;
    }

    atendimentos.forEach((a) => {
      const date = new Date(a.data);
      const key = `${nomeMeses[date.getMonth()]}/${date.getFullYear().toString().slice(-2)}`;
      if (meses[key] !== undefined) {
        meses[key]++;
      }
    });

    return Object.entries(meses).map(([mes, total]) => ({ mes, total }));
  };

  const processEvolucaoBeneficiarios = (
    usuarios: { created_at: string; tipo_usuario: string }[]
  ) => {
    const meses: { [key: string]: { titulares: number; dependentes: number } } = {};
    const nomeMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const key = `${nomeMeses[date.getMonth()]}/${date.getFullYear().toString().slice(-2)}`;
      meses[key] = { titulares: 0, dependentes: 0 };
    }

    usuarios.forEach((u) => {
      const date = new Date(u.created_at);
      const key = `${nomeMeses[date.getMonth()]}/${date.getFullYear().toString().slice(-2)}`;
      if (meses[key] !== undefined) {
        if (u.tipo_usuario === 'principal') {
          meses[key].titulares++;
        } else {
          meses[key].dependentes++;
        }
      }
    });

    return Object.entries(meses).map(([mes, data]) => ({
      mes,
      titulares: data.titulares,
      dependentes: data.dependentes,
    }));
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

        {/* Cards de métricas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Utilização</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticas.taxaUtilizacao}%</div>
              <p className="text-xs text-muted-foreground">do total de beneficiários</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Atendimentos por mês */}
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

          {/* Distribuição por tipo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Distribuição por Tipo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={estatisticas.distribuicaoTipo}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {estatisticas.distribuicaoTipo.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Evolução de beneficiários */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Novos Cadastros por Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={estatisticas.evolucaoBeneficiarios}>
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
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="titulares"
                      name="Titulares"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="dependentes"
                      name="Dependentes"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
