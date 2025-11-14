import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatCard } from '@/components/admin/StatCard';
import { Users, UserCheck, UserPlus, Building2, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminStats } from '@/types/database';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { isSuperAdmin, usuario } = useAuth();
  const navigate = useNavigate();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats', usuario?.id_empresa],
    queryFn: async () => {
      const empresaFilter = isSuperAdmin ? {} : { id_empresa: usuario?.id_empresa };

      // Total de usuários
      const { count: totalUsuarios } = await supabase
        .from('usuarios')
        .select('*', { count: 'exact', head: true })
        .is('deleted_at', null)
        .match(empresaFilter);

      // Usuários ativos
      const { count: usuariosAtivos } = await supabase
        .from('usuarios')
        .select('*', { count: 'exact', head: true })
        .is('deleted_at', null)
        .eq('ativo', true)
        .match(empresaFilter);

      // Novos usuários últimos 7 dias
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const { count: novosUsuarios7d } = await supabase
        .from('usuarios')
        .select('*', { count: 'exact', head: true })
        .is('deleted_at', null)
        .gte('created_at', sevenDaysAgo.toISOString())
        .match(empresaFilter);

      // Total de empresas (apenas super_admin)
      let totalEmpresas = 0;
      if (isSuperAdmin) {
        const { count } = await supabase
          .from('empresas')
          .select('*', { count: 'exact', head: true })
          .is('deleted_at', null);
        totalEmpresas = count || 0;
      }

      // Atendimentos pendentes
      const { count: atendimentosPendentes } = await supabase
        .from('atendimentos')
        .select('*', { count: 'exact', head: true })
        .is('deleted_at', null)
        .eq('status', 'pendente')
        .match(empresaFilter);

      // Taxa de conclusão
      const { count: totalAtendimentos } = await supabase
        .from('atendimentos')
        .select('*', { count: 'exact', head: true })
        .is('deleted_at', null)
        .match(empresaFilter);

      const { count: atendimentosConcluidos } = await supabase
        .from('atendimentos')
        .select('*', { count: 'exact', head: true })
        .is('deleted_at', null)
        .eq('status', 'concluido')
        .match(empresaFilter);

      const taxaConclusao = totalAtendimentos ? 
        Math.round((atendimentosConcluidos || 0) / totalAtendimentos * 100) : 0;

      return {
        total_usuarios: totalUsuarios || 0,
        usuarios_ativos: usuariosAtivos || 0,
        novos_usuarios_7d: novosUsuarios7d || 0,
        total_empresas: totalEmpresas,
        atendimentos_pendentes: atendimentosPendentes || 0,
        taxa_conclusao: taxaConclusao,
      } as AdminStats;
    },
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-64" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">
            Visão geral das métricas e estatísticas do sistema
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="usuarios" onClick={() => navigate('/admin/usuarios')}>
              Usuários
            </TabsTrigger>
            {isSuperAdmin && (
              <TabsTrigger value="empresas" onClick={() => navigate('/admin/empresas')}>
                Empresas
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StatCard
                title="Total de Usuários"
                value={stats?.total_usuarios || 0}
                icon={Users}
                description="Usuários principais e dependentes"
              />
              <StatCard
                title="Usuários Ativos"
                value={stats?.usuarios_ativos || 0}
                icon={UserCheck}
                description="Contas ativas no sistema"
              />
              <StatCard
                title="Novos Usuários (7 dias)"
                value={stats?.novos_usuarios_7d || 0}
                icon={UserPlus}
                description="Cadastros na última semana"
              />
              {isSuperAdmin && (
                <StatCard
                  title="Total de Empresas"
                  value={stats?.total_empresas || 0}
                  icon={Building2}
                  description="Empresas cadastradas"
                />
              )}
              <StatCard
                title="Atendimentos Pendentes"
                value={stats?.atendimentos_pendentes || 0}
                icon={Clock}
                description="Aguardando atendimento"
              />
              <StatCard
                title="Taxa de Conclusão"
                value={`${stats?.taxa_conclusao || 0}%`}
                icon={CheckCircle2}
                description="Atendimentos concluídos"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cadastros ao Longo do Tempo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Gráfico de cadastros em desenvolvimento
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Atendimentos por Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Gráfico de atendimentos em desenvolvimento
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
