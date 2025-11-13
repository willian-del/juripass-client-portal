import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, User, Users, HelpCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const cards = [
    {
      title: 'Iniciar Atendimento',
      description: 'Entre em contato via WhatsApp',
      icon: MessageSquare,
      path: '/dashboard/atendimento',
      color: 'bg-juripass-primary',
    },
    {
      title: 'Meu Cadastro',
      description: 'Visualize e edite seus dados',
      icon: User,
      path: '/dashboard/meu-cadastro',
      color: 'bg-juripass-accent',
    },
    ...(usuario?.tipo_usuario === 'principal' ? [{
      title: 'Cadastrar Dependentes',
      description: 'Adicione até 4 dependentes',
      icon: Users,
      path: '/dashboard/dependentes',
      color: 'bg-juripass-primary-dark',
    }] : []),
    {
      title: 'Como Utilizar',
      description: 'Tutoriais e perguntas frequentes',
      icon: HelpCircle,
      path: '/dashboard/como-utilizar',
      color: 'bg-juripass-gold',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Bem-vindo, {usuario?.nome?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Escolha uma das opções abaixo para começar
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.path}
                className="hover:shadow-primary transition-all cursor-pointer group shadow-md"
                onClick={() => navigate(card.path)}
              >
                <CardHeader>
                  <div className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-primary',
                    card.color
                  )}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-juripass-primary transition-colors">
                    {card.title}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full text-juripass-primary hover:text-juripass-primary-dark hover:bg-juripass-primary/10">
                    Acessar
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {usuario?.tipo_usuario === 'dependente' && usuario.usuario_principal && (
          <Card className="border-juripass-primary/30 bg-juripass-primary/5 shadow-primary">
            <CardHeader>
              <CardTitle className="text-base text-juripass-primary-dark">Informação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Você é um dependente vinculado ao titular{' '}
                <span className="font-medium text-juripass-primary-dark">
                  {usuario.usuario_principal.nome}
                </span>
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
