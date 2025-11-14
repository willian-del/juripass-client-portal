import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

const STATUS_COLORS = {
  pendente: '#f59e0b',
  em_andamento: '#3b82f6',
  concluido: '#10b981',
  cancelado: '#ef4444',
};

const STATUS_LABELS = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  concluido: 'Concluído',
  cancelado: 'Cancelado',
};

export function ChartAtendimentos() {
  const { isSuperAdmin, usuario } = useAuth();

  const { data: chartData, isLoading } = useQuery({
    queryKey: ['chart-atendimentos', usuario?.id_empresa],
    queryFn: async () => {
      const empresaFilter = isSuperAdmin ? {} : { id_empresa: usuario?.id_empresa };

      const { data, error } = await supabase
        .from('atendimentos')
        .select('status')
        .is('deleted_at', null)
        .match(empresaFilter);

      if (error) throw error;

      // Agrupar por status
      const grouped = data.reduce((acc: Record<string, number>, atendimento) => {
        acc[atendimento.status] = (acc[atendimento.status] || 0) + 1;
        return acc;
      }, {});

      // Criar array para o gráfico
      return Object.entries(grouped).map(([status, count]) => ({
        status: STATUS_LABELS[status as keyof typeof STATUS_LABELS] || status,
        quantidade: count,
        fill: STATUS_COLORS[status as keyof typeof STATUS_COLORS] || '#6b7280',
      }));
    },
  });

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="status"
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
        <Bar
          dataKey="quantidade"
          name="Quantidade"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
