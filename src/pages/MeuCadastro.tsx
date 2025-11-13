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
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { perfilSchema } from '@/lib/validators';
import { maskCPF, formatPhone, cleanPhone } from '@/lib/cpfUtils';
import { toast } from 'sonner';
import { Loader2, Edit2, Save, X } from 'lucide-react';

type PerfilForm = z.infer<typeof perfilSchema>;

export default function MeuCadastro() {
  const { usuario } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PerfilForm>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      nome: usuario?.nome || '',
      email: usuario?.email || '',
      telefone: usuario?.telefone || '',
    },
  });

  // Atualizar valores do formulário quando usuario for carregado
  useEffect(() => {
    if (usuario) {
      reset({
        nome: usuario.nome || '',
        email: usuario.email || '',
        telefone: usuario.telefone || '',
      });
    }
  }, [usuario, reset]);

  const onSubmit = async (data: PerfilForm) => {
    if (!usuario) return;

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('usuarios')
        .update({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone ? cleanPhone(data.telefone) : null,
        } as any)
        .eq('id', usuario.id);

      if (error) throw error;

      toast.success('Cadastro atualizado com sucesso!');
      setIsEditing(false);
      
      // Refresh page to update data
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
      nome: usuario?.nome || '',
      email: usuario?.email || '',
      telefone: usuario?.telefone || '',
    });
    setIsEditing(false);
  };

  const formatarDataAdesao = (dataISO: string) => {
    return format(new Date(dataISO), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  if (!usuario) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meu Cadastro</h1>
            <p className="text-muted-foreground mt-2">
              Visualize e edite suas informações pessoais
            </p>
          </div>

          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="mr-2 h-4 w-4" />
              Editar
            </Button>
          )}
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Informações da Conta</CardTitle>
            <CardDescription>
              Dados da sua conta no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data de Adesão</Label>
                <Input value={formatarDataAdesao(usuario.created_at)} disabled />
              </div>

              <div className="space-y-2">
                <Label>Número do Cliente</Label>
                <Input value={usuario.numero_cliente} disabled />
              </div>

              <div className="space-y-2">
                <Label>Tipo de Usuário</Label>
                <Input
                  value={usuario.tipo_usuario === 'principal' ? 'Principal' : 'Dependente'}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label>Empresa</Label>
                <Input value={usuario.empresas?.nome || 'N/A'} disabled />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>
              {isEditing
                ? 'Edite os campos abaixo e clique em Salvar'
                : 'Suas informações cadastradas no sistema'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label>CPF</Label>
                <Input value={maskCPF(usuario.cpf_criptografado)} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  {...register('nome')}
                  disabled={!isEditing || isLoading}
                />
                {errors.nome && (
                  <p className="text-sm text-destructive">{errors.nome.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  disabled={!isEditing || isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  {...register('telefone')}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    setValue('telefone', formatted);
                  }}
                  disabled={!isEditing || isLoading}
                />
                {errors.telefone && (
                  <p className="text-sm text-destructive">{errors.telefone.message}</p>
                )}
              </div>

              {usuario.tipo_usuario === 'dependente' && (
                <div className="space-y-2">
                  <Label>Grau de Parentesco</Label>
                  <Input value={usuario.grau_parentesco || 'N/A'} disabled />
                </div>
              )}

              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Alterações
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancelar
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
