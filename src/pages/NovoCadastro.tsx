import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { cadastroSchema } from '@/lib/validators';
import { cleanCPF, formatCPF, formatPhone, cleanPhone } from '@/lib/cpfUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Footer } from '@/components/ui/Footer';
import { JuripassCard } from '@/components/ui/JuripassCard';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

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
  const cpfValue = watch('cpf');
  const nomeValue = watch('nome');

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

      // 3. Encrypt CPF before storage
      const { data: cpfCriptografado, error: cpfError } = await supabase
        .rpc('encrypt_cpf', { cpf_plain: cpfLimpo });

      if (cpfError || !cpfCriptografado) throw new Error('Erro ao processar CPF');

      // 4. Create usuario record
      const { error: usuarioError } = await supabase
        .from('usuarios')
        .insert({
          id_auth: authData.user.id,
          cpf_criptografado: cpfCriptografado,
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex flex-col">
      {/* Header */}
      <div className="text-center py-8 md:py-12 px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
          <span className="text-primary">Queremos</span> conhecer você
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
          Para garantir o seu acesso, preencha suas informações nos campos abaixo e complete o seu cadastro.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 flex-grow pb-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
          {/* Formulário */}
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* CPF */}
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    {...register('cpf')}
                    onBlur={handleCPFBlur}
                    onChange={(e) => {
                      const formatted = formatCPF(e.target.value);
                      setValue('cpf', formatted);
                      if (cpfChecked) setCpfChecked(false);
                    }}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    disabled={isLoading}
                  />
                  {errors.cpf && (
                    <p className="text-sm text-destructive">{errors.cpf.message}</p>
                  )}
                </div>

                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    {...register('nome')}
                    placeholder="Seu nome completo"
                    disabled={isLoading}
                  />
                  {errors.nome && (
                    <p className="text-sm text-destructive">{errors.nome.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="seu@email.com"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Telefone */}
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    {...register('telefone')}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      setValue('telefone', formatted);
                    }}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    disabled={isLoading}
                  />
                  {errors.telefone && (
                    <p className="text-sm text-destructive">{errors.telefone.message}</p>
                  )}
                </div>

                {/* Código da Empresa */}
                <div className="space-y-2">
                  <Label htmlFor="codigo_empresa">Código da Empresa *</Label>
                  <Input
                    id="codigo_empresa"
                    {...register('codigo_empresa')}
                    placeholder="Digite o código da empresa"
                    disabled={isLoading}
                  />
                  {empresaNome && (
                    <p className="text-sm text-primary font-medium">
                      Empresa: {empresaNome}
                    </p>
                  )}
                  {errors.codigo_empresa && (
                    <p className="text-sm text-destructive">
                      {errors.codigo_empresa.message}
                    </p>
                  )}
                </div>

                {/* Senha */}
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha *</Label>
                  <Input
                    id="senha"
                    type="password"
                    {...register('senha')}
                    placeholder="Mínimo 6 caracteres"
                    disabled={isLoading}
                  />
                  {errors.senha && (
                    <p className="text-sm text-destructive">{errors.senha.message}</p>
                  )}
                </div>

                {/* Confirmar Senha */}
                <div className="space-y-2">
                  <Label htmlFor="confirmar_senha">Confirmar Senha *</Label>
                  <Input
                    id="confirmar_senha"
                    type="password"
                    {...register('confirmar_senha')}
                    placeholder="Digite a senha novamente"
                    disabled={isLoading}
                  />
                  {errors.confirmar_senha && (
                    <p className="text-sm text-destructive">
                      {errors.confirmar_senha.message}
                    </p>
                  )}
                </div>

                {/* Botão Submit */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    'Finalizar Cadastro'
                  )}
                </Button>

                {/* Link para Login */}
                <p className="text-center text-sm text-muted-foreground">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Faça login
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Carteirinha Juripass */}
          <div className="lg:sticky lg:top-8">
            <JuripassCard 
              cpf={cpfValue}
              nome={nomeValue}
              organizacao={empresaNome}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
