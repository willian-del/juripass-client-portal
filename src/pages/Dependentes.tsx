import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dependenteSchema, finalizarDependenteSchema } from '@/lib/validators';
import { formatCPF, cleanCPF, formatPhone, cleanPhone } from '@/lib/cpfUtils';
import { toast } from 'sonner';
import { ArrowLeft, UserPlus, Users, Loader2, CheckCircle2, Edit2, Eye, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Usuario } from '@/types/database';
import { z } from 'zod';
import { LogoJuripass } from '@/components/ui/LogoJuripass';
import { JuripassCard } from '@/components/ui/JuripassCard';

type Step = 'list' | 'validate-cpf' | 'complete-form';
type DependenteForm = z.infer<typeof dependenteSchema>;
type FinalizarDependenteForm = z.infer<typeof finalizarDependenteSchema>;

// Schema para edição de dependente
const editDependenteSchema = z.object({
  email: z.string().email('E-mail inválido'),
  telefone: z.string().optional(),
  grau_parentesco: z.string().min(1, 'Selecione o grau de parentesco'),
});

type EditDependenteForm = z.infer<typeof editDependenteSchema>;

interface DependenteWithEmpresa extends Omit<Usuario, 'empresas'> {
  empresas?: { nome: string } | null;
}

export default function Dependentes() {
  const { usuario, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [dependentes, setDependentes] = useState<DependenteWithEmpresa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState<Step>('list');
  const [cpfValidado, setCpfValidado] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [empresaNome, setEmpresaNome] = useState('');
  
  // Estados para edição
  const [editingDep, setEditingDep] = useState<DependenteWithEmpresa | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Estados para visualização do card
  const [viewCardDep, setViewCardDep] = useState<DependenteWithEmpresa | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

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

  const editForm = useForm<EditDependenteForm>({
    resolver: zodResolver(editDependenteSchema),
    defaultValues: {
      email: '',
      telefone: '',
      grau_parentesco: '',
    },
  });

  useEffect(() => {
    if (usuario) {
      loadDependentes();
      loadEmpresaNome();
    }
  }, [usuario]);

  const loadEmpresaNome = async () => {
    if (!usuario?.id_empresa) return;
    try {
      const { data } = await supabase
        .from('empresas')
        .select('nome')
        .eq('id', usuario.id_empresa)
        .maybeSingle();
      if (data) setEmpresaNome(data.nome);
    } catch (error) {
      console.error('Erro ao carregar empresa:', error);
    }
  };

  const loadDependentes = async () => {
    if (!usuario?.id) return;
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('usuarios')
        .select(`
          *,
          empresas:id_empresa (nome)
        `)
        .eq('id_usuario_principal', usuario.id)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDependentes((data || []) as DependenteWithEmpresa[]);
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

      // 3. Inserir na tabela usuarios com id_auth linkado ao auth user
      const { error: insertError } = await supabase
        .from('usuarios')
        .insert([{
          id_auth: authData.user.id,
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

      // 4. Resetar e voltar - forçar reload completo
      setCpfValidado('');
      cpfForm.reset();
      dependenteForm.reset();
      setStep('list');
      
      // Aguardar um pouco antes de recarregar para garantir que o insert foi processado
      setTimeout(() => {
        loadDependentes();
      }, 500);
      
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

  const handleOpenEdit = (dep: DependenteWithEmpresa) => {
    setEditingDep(dep);
    editForm.reset({
      email: dep.email,
      telefone: dep.telefone ? formatPhone(dep.telefone) : '',
      grau_parentesco: dep.grau_parentesco || '',
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateDependente = async (formData: EditDependenteForm) => {
    if (!editingDep) return;
    
    try {
      setIsUpdating(true);
      
      const { error } = await supabase
        .from('usuarios')
        .update({
          email: formData.email,
          telefone: formData.telefone ? cleanPhone(formData.telefone) : null,
          grau_parentesco: formData.grau_parentesco,
        })
        .eq('id', editingDep.id);

      if (error) throw error;

      toast.success('Dependente atualizado com sucesso!');
      setIsEditModalOpen(false);
      setEditingDep(null);
      loadDependentes();
    } catch (error) {
      console.error('Erro ao atualizar dependente:', error);
      toast.error('Erro ao atualizar dependente');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleViewCard = (dep: DependenteWithEmpresa) => {
    setViewCardDep(dep);
    setIsCardModalOpen(true);
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {dependentes.map((dep) => (
                  <div 
                    key={dep.id} 
                    className="bg-gradient-to-br from-primary via-primary to-blue-700 rounded-2xl shadow-xl p-5 sm:p-6 text-white relative overflow-hidden"
                  >
                    {/* Pattern decorativo */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                    </div>

                    {/* Header do Card */}
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <LogoJuripass 
                        variant="horizontal" 
                        color="white" 
                        size="sm"
                        format="png"
                      />
                      <Badge 
                        className={`text-xs ${dep.ativo ? 'bg-green-500/20 text-green-100 border border-green-400/30' : 'bg-red-500/20 text-red-100 border border-red-400/30'}`}
                      >
                        {dep.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>

                    {/* Informações do Dependente */}
                    <div className="space-y-3 relative z-10">
                      {/* Nome */}
                      <div>
                        <p className="text-xs uppercase tracking-wider opacity-70 mb-0.5">Nome</p>
                        <p className="text-lg font-semibold truncate">{dep.nome}</p>
                      </div>

                      {/* Grid com Número e Grau */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-wider opacity-70 mb-0.5">Número</p>
                          <p className="text-sm font-mono font-medium">{dep.numero_cliente}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider opacity-70 mb-0.5">Grau</p>
                          <p className="text-sm font-medium">
                            {getGrauParentescoLabel(dep.grau_parentesco || '')}
                          </p>
                        </div>
                      </div>

                      {/* CPF Verificado e Data */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/20">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-green-300" />
                          <span className="text-xs opacity-90">CPF verificado</span>
                        </div>
                        <span className="text-xs opacity-70">
                          Desde {new Date(dep.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-white/20 relative z-10">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(dep)}
                        className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
                      >
                        <Edit2 className="mr-1.5 h-3.5 w-3.5" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewCard(dep)}
                        className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
                      >
                        <Eye className="mr-1.5 h-3.5 w-3.5" />
                        Ver Cartão
                      </Button>
                    </div>
                  </div>
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

        {/* Modal de Edição */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Dependente</DialogTitle>
            </DialogHeader>
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(handleUpdateDependente)} className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{editingDep?.nome}</p>
                </div>

                <FormField
                  control={editForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
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
                  control={editForm.control}
                  name="grau_parentesco"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grau de Parentesco</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
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

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditModalOpen(false)}
                    disabled={isUpdating}
                    className="flex-1"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isUpdating}
                    className="flex-1 bg-juripass-primary hover:bg-juripass-primary-dark"
                  >
                    {isUpdating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Salvar
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Modal Ver Cartão */}
        <Dialog open={isCardModalOpen} onOpenChange={setIsCardModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-center">Cartão Juripass</DialogTitle>
            </DialogHeader>
            {viewCardDep && (
              <JuripassCard 
                nome={viewCardDep.nome}
                organizacao={viewCardDep.empresas?.nome || empresaNome || 'Empresa'}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
