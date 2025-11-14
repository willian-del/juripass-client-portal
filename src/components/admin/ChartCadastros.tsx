import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

export function ChartCadastros() {
  const { isSuperAdmin, usuario } = useAuth();

  const { data: chartData, isLoading } = useQuery({
    queryKey: ['chart-cadastros', usuario?.id_empresa],
    queryFn: async () => {
      const thirtyDaysAgo = subDays(new Date(), 30);
      const empresaFilter = isSuperAdmin ? {} : { id_empresa: usuario?.id_empresa };

      const { data, error } = await supabase
        .from('usuarios')
        .select('created_at')
        .is('deleted_at', null)
        .gte('created_at', thirtyDaysAgo.toISOString())
        .match(empresaFilter)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Agrupar por data
      const grouped = data.reduce((acc: Record<string, number>, user) => {
        const date = format(new Date(user.created_at), 'dd/MM');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      // Criar array com todos os dias (últimos 30)
      const chartArray = [];
      for (let i = 29; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const dateKey = format(date, 'dd/MM');
        chartArray.push({
          data: dateKey,
          cadastros: grouped[dateKey] || 0,
        });
      }

      return chartArray;
    },
  });

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="data"
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="cadastros"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--primary))' }}
          name="Novos Cadastros"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
