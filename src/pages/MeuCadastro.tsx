import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatPhone, cleanPhone } from '@/lib/cpfUtils';
import { toast } from 'sonner';
import { Loader2, Edit2, Save, X, CheckCircle2, ArrowLeft } from 'lucide-react';

// Schema simplificado - apenas email e telefone são editáveis
const contatoSchema = z.object({
  email: z.string().email('E-mail inválido'),
  telefone: z.string().optional(),
});

type ContatoForm = z.infer<typeof contatoSchema>;

export default function MeuCadastro() {
  const { usuario, isLoading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContatoForm>({
    resolver: zodResolver(contatoSchema),
    defaultValues: {
      email: usuario?.email || '',
      telefone: usuario?.telefone || '',
    },
  });

  useEffect(() => {
    if (usuario) {
      reset({
        email: usuario.email || '',
        telefone: usuario.telefone || '',
      });
    }
  }, [usuario, reset]);

  const onSubmit = async (data: ContatoForm) => {
    if (!usuario) return;

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('usuarios')
        .update({
          email: data.email,
          telefone: data.telefone ? cleanPhone(data.telefone) : null,
        } as any)
        .eq('id', usuario.id);

      if (error) throw error;

      toast.success('Cadastro atualizado com sucesso!');
      setIsEditing(false);
      window.location.reload();
    } catch (error: any) {
      console.error('Update error:', error);
      toast.error('Erro ao atualizar cadastro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset({
      email: usuario?.email || '',
      telefone: usuario?.telefone || '',
    });
    setIsEditing(false);
  };

  const formatarDataAdesao = (dataISO: string) => {
    return format(new Date(dataISO), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8" />
            <div className="flex-1">
              <Skeleton className="h-6 w-48 mb-1" />
              <Skeleton className="h-3 w-72" />
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="p-3 sm:p-4">
                <Skeleton className="h-5 w-40 mb-1" />
                <Skeleton className="h-3 w-56" />
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0 space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-3 sm:p-4">
                <Skeleton className="h-5 w-40 mb-1" />
                <Skeleton className="h-3 w-56" />
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0 space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!usuario) return null;

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Meu Cadastro</h1>
            <p className="text-muted-foreground text-sm">
              Visualize e edite suas informações
            </p>
          </div>

          {!isEditing && (
            <Button 
              onClick={() => setIsEditing(true)}
              size="sm"
              className="bg-juripass-primary hover:bg-juripass-primary-dark w-full sm:w-auto"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Editar Contato
            </Button>
          )}
        </div>

        {/* Card de Informações da Conta - Totalmente Read-only */}
        <Card className="shadow-primary">
          <CardHeader className="p-3 sm:p-4 pb-2">
            <CardTitle className="text-juripass-primary-dark text-base sm:text-lg">Informações da Conta</CardTitle>
            <CardDescription className="text-xs">
              Dados vinculados à sua conta (não editáveis)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Nome Completo</Label>
                <Input value={usuario.nome} disabled className="h-9 text-sm" />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">CPF</Label>
                <div className="flex items-center gap-2 h-9 px-3 rounded-md border bg-muted/50 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>CPF cadastrado e verificado</span>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Data de Adesão</Label>
                <Input value={formatarDataAdesao(usuario.created_at)} disabled className="h-9 text-sm" />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Número do Cliente</Label>
                <Input value={usuario.numero_cliente} disabled className="h-9 text-sm" />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Tipo de Usuário</Label>
                <Input
                  value={usuario.tipo_usuario === 'principal' ? 'Principal' : 'Dependente'}
                  disabled
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Empresa</Label>
                <Input value={usuario.empresas?.nome || 'N/A'} disabled className="h-9 text-sm" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card de Informações de Contato - Editável */}
        <Card className={`shadow-primary ${isEditing ? 'border-juripass-primary border-2' : ''}`}>
          <CardHeader className="p-3 sm:p-4 pb-2">
            <CardTitle className="text-juripass-primary-dark text-base sm:text-lg">Informações de Contato</CardTitle>
            <CardDescription className="text-xs">
              {isEditing
                ? 'Edite os campos e clique em Salvar'
                : 'Seus dados de contato'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs text-muted-foreground">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    disabled={!isEditing || isLoading}
                    className="h-9 text-sm"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="telefone" className="text-xs text-muted-foreground">Telefone</Label>
                  <Input
                    id="telefone"
                    {...register('telefone')}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      setValue('telefone', formatted);
                    }}
                    disabled={!isEditing || isLoading}
                    className="h-9 text-sm"
                  />
                  {errors.telefone && (
                    <p className="text-xs text-destructive">{errors.telefone.message}</p>
                  )}
                </div>

                {usuario.tipo_usuario === 'dependente' && (
                  <div className="space-y-1 sm:col-span-2">
                    <Label className="text-xs text-muted-foreground">Grau de Parentesco</Label>
                    <Input value={usuario.grau_parentesco || 'N/A'} disabled className="h-9 text-sm" />
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-2">
                  <Button 
                    type="submit" 
                    disabled={isLoading} 
                    size="sm"
                    className="flex-1 bg-juripass-primary hover:bg-juripass-primary-dark shadow-primary"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="border-juripass-primary text-juripass-primary hover:bg-juripass-primary/10"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancelar
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Botão Voltar ao Dashboard */}
        <div className="flex justify-center pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = '/dashboard'}
            className="text-muted-foreground hover:text-juripass-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
