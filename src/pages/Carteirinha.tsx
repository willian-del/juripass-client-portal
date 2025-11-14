import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

export default function Carteirinha() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CreditCard className="h-8 w-8 text-juripass-primary" />
            Minha Carteirinha Juripass
          </h1>
          <p className="text-muted-foreground mt-2">
            Visualize e baixe sua carteirinha digital
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Carteirinha Digital</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Funcionalidade em desenvolvimento...
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
