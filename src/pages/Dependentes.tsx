import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dependenteSchema, finalizarDependenteSchema } from '@/lib/validators';
import { maskCPF, formatCPF, cleanCPF, formatPhone, cleanPhone } from '@/lib/cpfUtils';
import { toast } from 'sonner';
import { ArrowLeft, UserPlus, Users, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Usuario, TipoUsuario } from '@/types/database';
import { z } from 'zod';

type Step = 'list' | 'validate-cpf' | 'complete-form';
type DependenteForm = z.infer<typeof dependenteSchema>;
type FinalizarDependenteForm = z.infer<typeof finalizarDependenteSchema>;

export default function Dependentes() {
  const { usuario, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [dependentes, setDependentes] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState<Step>('list');
  const [cpfValidado, setCpfValidado] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const cpfForm = useForm<DependenteForm>({
    resolver: zodResolver(dependenteSchema),
    defaultValues: {
      cpf: '',
    },
  });

  const dependenteForm = useForm<FinalizarDependenteForm>({
    resolver: zodResolver(finalizarDependenteSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      grau_parentesco: 'filho',
      senha: '',
      confirmar_senha: '',
    },
  });

  useEffect(() => {
    if (usuario) {
      loadDependentes();
    }
  }, [usuario]);

  const loadDependentes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id_usuario_principal', usuario?.id)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDependentes((data || []) as Usuario[]);
    } catch (error) {
      console.error('Erro ao carregar dependentes:', error);
      toast.error('Erro ao carregar dependentes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidateCPF = async (data: DependenteForm) => {
    try {
      setIsSaving(true);
      const cpfLimpo = cleanCPF(data.cpf);

      // Verificar limite
      if (dependentes.length >= 4) {
        toast.error('Limite de 4 dependentes atingido');
        return;
      }

      // Buscar no banco
      const { data: usuarios, error } = await supabase
        .rpc('find_user_by_cpf', { cpf_plain: cpfLimpo });

      if (error) throw error;

      if (usuarios && usuarios.length > 0) {
        toast.error('CPF já cadastrado no sistema');
        return;
      }

      setCpfValidado(cpfLimpo);
      setStep('complete-form');
      toast.success('CPF validado com sucesso!');
    } catch (error) {
      console.error('Erro ao validar CPF:', error);
      toast.error('Erro ao validar CPF');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateDependente = async (formData: FinalizarDependenteForm) => {
    try {
      setIsSaving(true);

      // 1. Criar conta no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Erro ao criar usuário');

      // 2. Criptografar CPF
      const { data: cpfCripto, error: cpfError } = await supabase
        .rpc('encrypt_cpf', { cpf_plain: cpfValidado });

      if (cpfError) throw cpfError;

      // 3. Inserir na tabela usuarios (sem id_auth no insert, será preenchido pelo trigger ou constraint default)
      const { error: insertError } = await supabase
        .from('usuarios')
        .insert([{
          cpf_criptografado: cpfCripto as string,
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone ? cleanPhone(formData.telefone) : null,
          tipo_usuario: 'dependente',
          id_usuario_principal: usuario?.id,
          id_empresa: usuario?.id_empresa!,
          grau_parentesco: formData.grau_parentesco,
          ativo: true,
        } as any]);

      if (insertError) throw insertError;

      toast.success('Dependente cadastrado com sucesso!');

      // 4. Resetar e voltar
      await loadDependentes();
      setStep('list');
      setCpfValidado('');
      cpfForm.reset();
      dependenteForm.reset();
    } catch (error: any) {
      console.error('Erro ao cadastrar dependente:', error);
      
      if (error.message?.includes('already registered')) {
        toast.error('E-mail já está em uso');
      } else {
        toast.error('Erro ao cadastrar dependente');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setStep('list');
    setCpfValidado('');
    cpfForm.reset();
    dependenteForm.reset();
  };

  const getGrauParentescoLabel = (grau: string) => {
    const labels: Record<string, string> = {
      conjuge: 'Cônjuge',
      filho: 'Filho(a)',
      pai_mae: 'Pai/Mãe',
      irmao: 'Irmão(ã)',
      outro: 'Outro',
    };
    return labels[grau] || grau;
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10" />
            <div className="flex-1">
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <Card>
            <CardContent className="py-12">
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (!usuario) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Cabeçalho */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Meus Dependentes
            </h1>
            <Badge className="bg-juripass-accent text-white text-xs sm:text-sm">
              {dependentes.length} / 4
            </Badge>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Adicione até 4 dependentes à sua conta
          </p>

          {step === 'list' && (
            <Button
              onClick={() => setStep('validate-cpf')}
              disabled={dependentes.length >= 4}
              className="w-full sm:w-auto bg-juripass-primary hover:bg-juripass-primary-dark shadow-primary"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Adicionar Dependente
            </Button>
          )}
        </div>

        {/* Lista de Dependentes */}
        {step === 'list' && (
          <div className="space-y-4">
            {isLoading ? (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </CardContent>
              </Card>
            ) : dependentes.length === 0 ? (
              <Card className="shadow-primary">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Users className="h-12 w-12 text-juripass-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-juripass-primary-dark">Nenhum dependente cadastrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Você pode cadastrar até 4 dependentes
                  </p>
                  <Button 
                    onClick={() => setStep('validate-cpf')}
                    className="bg-juripass-primary hover:bg-juripass-primary-dark shadow-primary"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Adicionar Primeiro Dependente
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {dependentes.map((dep) => (
                  <Card key={dep.id} className="shadow-primary border-juripass-primary/20 hover:border-juripass-primary/40 transition-colors">
                    <CardHeader className="pb-3 p-4 sm:p-6">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base sm:text-lg text-juripass-primary-dark break-words">{dep.nome}</CardTitle>
                        <Badge className="bg-juripass-accent text-white text-xs shrink-0">Ativo</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 text-xs sm:text-sm p-4 sm:p-6 pt-0">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CPF:</span>
                        <span className="font-medium">{maskCPF(dep.cpf_criptografado)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Grau:</span>
                        <span className="font-medium">
                          {getGrauParentescoLabel(dep.grau_parentesco || '')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Número:</span>
                        <span className="font-medium">{dep.numero_cliente}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cadastrado em:</span>
                        <span className="font-medium">
                          {new Date(dep.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Passo 1: Validar CPF */}
        {step === 'validate-cpf' && (
          <Card className="shadow-primary border-juripass-primary/30">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-juripass-primary-dark text-lg sm:text-xl">Validar CPF do Dependente</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <Form {...cpfForm}>
                <form onSubmit={cpfForm.handleSubmit(handleValidateCPF)} className="space-y-4">
                  <FormField
                    control={cpfForm.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="000.000.000-00"
                            onChange={(e) => field.onChange(formatCPF(e.target.value))}
                            maxLength={14}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="border-juripass-primary text-juripass-primary hover:bg-juripass-primary/10"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSaving}
                      className="bg-juripass-primary hover:bg-juripass-primary-dark shadow-primary"
                    >
                      {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Validar CPF
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Passo 2: Dados Completos */}
        {step === 'complete-form' && (
          <Card className="shadow-primary border-juripass-primary/30">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-juripass-primary-dark text-lg sm:text-xl">Dados do Dependente</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">
                CPF: <span className="text-juripass-primary font-medium">{formatCPF(cpfValidado)}</span> (validado)
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <Form {...dependenteForm}>
                <form onSubmit={dependenteForm.handleSubmit(handleCreateDependente)} className="space-y-4">
                  <FormField
                    control={dependenteForm.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nome completo" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={dependenteForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="email@exemplo.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={dependenteForm.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="(00) 00000-0000"
                            onChange={(e) => field.onChange(formatPhone(e.target.value))}
                            maxLength={15}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={dependenteForm.control}
                    name="grau_parentesco"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grau de Parentesco *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="conjuge">Cônjuge</SelectItem>
                            <SelectItem value="filho">Filho(a)</SelectItem>
                            <SelectItem value="pai_mae">Pai/Mãe</SelectItem>
                            <SelectItem value="irmao">Irmão(ã)</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={dependenteForm.control}
                    name="senha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha *</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" placeholder="Mínimo 6 caracteres" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={dependenteForm.control}
                    name="confirmar_senha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Senha *</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" placeholder="Confirme a senha" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="border-juripass-primary text-juripass-primary hover:bg-juripass-primary/10"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSaving}
                      className="bg-juripass-primary hover:bg-juripass-primary-dark shadow-primary"
                    >
                      {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Cadastrar Dependente
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
