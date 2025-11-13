import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { cadastroSchema } from '@/lib/validators';
import { cleanCPF, formatCPF, formatPhone, cleanPhone } from '@/lib/cpfUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { LogoJuripass } from '@/components/ui/LogoJuripass';

type CadastroForm = z.infer<typeof cadastroSchema>;

export default function NovoCadastro() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [empresaNome, setEmpresaNome] = useState('');
  const [cpfChecked, setCpfChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CadastroForm>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      codigo_empresa: searchParams.get('codEmpresa') || '',
    },
  });

  const codigoEmpresa = watch('codigo_empresa');
  const cpf = watch('cpf');

  // Verificar empresa quando o código mudar
  useEffect(() => {
    if (codigoEmpresa) {
      verificarEmpresa(codigoEmpresa);
    }
  }, [codigoEmpresa]);

  // Verificar CPF quando perder o foco
  const handleCPFBlur = async () => {
    if (cpf && cpf.length >= 11 && !cpfChecked) {
      const cpfLimpo = cleanCPF(cpf);
      
      try {
        const { data, error } = await supabase
          .rpc('find_user_by_cpf', { cpf_plain: cpfLimpo });

        if (error) throw error;

        if (data && data.length > 0) {
          const usuario = data[0];
          setValue('nome', usuario.nome);
          setValue('email', usuario.email);
          if (usuario.telefone) setValue('telefone', usuario.telefone);
          if (usuario.id_empresa) {
            // Buscar código da empresa
            const { data: empresaData } = await supabase
              .from('empresas')
              .select('codigo_empresa')
              .eq('id', usuario.id_empresa)
              .single();
            
            if (empresaData) {
              setValue('codigo_empresa', empresaData.codigo_empresa);
            }
          }
          toast.info('Dados encontrados! Complete as informações faltantes.');
        }
      } catch (error) {
        console.error('Error checking CPF:', error);
      }
      
      setCpfChecked(true);
    }
  };

  const verificarEmpresa = async (codigo: string) => {
    try {
      const { data, error } = await supabase
        .from('empresas')
        .select('nome')
        .eq('codigo_empresa', codigo)
        .is('deleted_at', null)
        .single();

      if (error || !data) {
        setEmpresaNome('');
        toast.error('Código de empresa inválido');
        return;
      }

      setEmpresaNome(data.nome);
    } catch (error) {
      console.error('Error checking empresa:', error);
      setEmpresaNome('');
    }
  };

  const onSubmit = async (data: CadastroForm) => {
    if (!empresaNome) {
      toast.error('Código de empresa inválido');
      return;
    }

    setIsLoading(true);

    try {
      const cpfLimpo = cleanCPF(data.cpf);

      // 1. Create auth user
      const redirectUrl = `${window.location.origin}/`;
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.senha,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Erro ao criar usuário');

      // 2. Get empresa ID
      const { data: empresaData, error: empresaError } = await supabase
        .from('empresas')
        .select('id')
        .eq('codigo_empresa', data.codigo_empresa)
        .single();

      if (empresaError || !empresaData) throw new Error('Empresa não encontrada');

      // 3. Create usuario record
      const { error: usuarioError } = await supabase
        .from('usuarios')
        .insert({
          id_auth: authData.user.id,
          cpf_criptografado: cpfLimpo,
        nome: data.nome,
        email: data.email,
        telefone: data.telefone ? cleanPhone(data.telefone) : null,
          tipo_usuario: 'principal',
          id_empresa: empresaData.id,
        } as any);

      if (usuarioError) throw usuarioError;

      toast.success('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      
      if (error.message?.includes('already registered')) {
        toast.error('Este e-mail já está cadastrado');
      } else if (error.message?.includes('duplicate key')) {
        toast.error('CPF já cadastrado');
      } else {
        toast.error('Erro ao realizar cadastro. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-primary">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <LogoJuripass variant="full" size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold">Novo Cadastro</CardTitle>
          <CardDescription>Preencha seus dados para criar sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  {...register('cpf')}
                  onBlur={handleCPFBlur}
                  onChange={(e) => {
                    const formatted = formatCPF(e.target.value);
                    setValue('cpf', formatted);
                    setCpfChecked(false);
                  }}
                  disabled={isLoading}
                />
                {errors.cpf && (
                  <p className="text-sm text-destructive">{errors.cpf.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  placeholder="Seu nome completo"
                  {...register('nome')}
                  disabled={isLoading}
                />
                {errors.nome && (
                  <p className="text-sm text-destructive">{errors.nome.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register('email')}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  placeholder="(00) 00000-0000"
                  {...register('telefone')}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    setValue('telefone', formatted);
                  }}
                  disabled={isLoading}
                />
                {errors.telefone && (
                  <p className="text-sm text-destructive">{errors.telefone.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="codigo_empresa">Código da Empresa *</Label>
                <Input
                  id="codigo_empresa"
                  placeholder="ABC123"
                  {...register('codigo_empresa')}
                  disabled={isLoading}
                />
                {errors.codigo_empresa && (
                  <p className="text-sm text-destructive">{errors.codigo_empresa.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Nome da Empresa</Label>
                <Input
                  value={empresaNome}
                  disabled
                  placeholder="Será preenchido automaticamente"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="senha">Senha *</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  {...register('senha')}
                  disabled={isLoading}
                />
                {errors.senha && (
                  <p className="text-sm text-destructive">{errors.senha.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmar_senha">Confirmar Senha *</Label>
                <Input
                  id="confirmar_senha"
                  type="password"
                  placeholder="Confirme sua senha"
                  {...register('confirmar_senha')}
                  disabled={isLoading}
                />
                {errors.confirmar_senha && (
                  <p className="text-sm text-destructive">{errors.confirmar_senha.message}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || !empresaNome}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                'Criar Conta'
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <a href="/login" className="text-primary hover:underline">
                Faça login
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
