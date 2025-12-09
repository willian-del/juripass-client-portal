import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { validateCPF, formatCPF, cleanCPF } from '@/lib/cpfUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Loader2, ArrowLeft, CheckCircle, User } from 'lucide-react';
import { LogoJuripass } from '@/components/ui/LogoJuripass';

const cpfSchema = z.object({
  cpf: z.string()
    .min(11, "CPF deve conter 11 dígitos")
    .max(14, "CPF inválido")
    .refine((cpf) => validateCPF(cpf), {
      message: "CPF inválido",
    }),
});

const senhaSchema = z.object({
  senha: z.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(50, "Senha muito longa"),
  confirmar_senha: z.string()
}).refine((data) => data.senha === data.confirmar_senha, {
  message: "As senhas não conferem",
  path: ["confirmar_senha"],
});

type CpfForm = z.infer<typeof cpfSchema>;
type SenhaForm = z.infer<typeof senhaSchema>;

type Step = 'cpf' | 'senha' | 'success';

interface UsuarioData {
  id: string;
  nome_mascarado: string;
  email: string;
  tipo_usuario: string;
  grau_parentesco?: string;
}

export default function PrimeiroAcesso() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('cpf');
  const [isLoading, setIsLoading] = useState(false);
  const [cpfValidado, setCpfValidado] = useState('');
  const [usuarioData, setUsuarioData] = useState<UsuarioData | null>(null);

  const cpfForm = useForm<CpfForm>({
    resolver: zodResolver(cpfSchema),
    defaultValues: { cpf: '' },
  });

  const senhaForm = useForm<SenhaForm>({
    resolver: zodResolver(senhaSchema),
    defaultValues: { senha: '', confirmar_senha: '' },
  });

  const handleValidateCPF = async (data: CpfForm) => {
    setIsLoading(true);

    try {
      const cpfLimpo = cleanCPF(data.cpf);

      const response = await supabase.functions.invoke('first-access-validate', {
        body: { cpf: cpfLimpo }
      });

      // Handle non-2xx responses - error contains the response body
      if (response.error) {
        // Try to parse error context for specific error codes
        const errorContext = response.error.context;
        if (errorContext?.code === 'CPF_NOT_FOUND') {
          toast.error('CPF não encontrado. Verifique se você foi cadastrado como dependente.');
          return;
        } else if (errorContext?.code === 'ALREADY_REGISTERED') {
          toast.error('Este CPF já possui uma conta. Faça login normalmente.');
          return;
        }
        
        // Fallback: try to get message from error
        const errorMsg = response.error.message || 'Erro ao validar CPF';
        if (errorMsg.includes('não encontrado')) {
          toast.error('CPF não encontrado. Verifique se você foi cadastrado como dependente.');
        } else if (errorMsg.includes('já possui')) {
          toast.error('Este CPF já possui uma conta. Faça login normalmente.');
        } else {
          toast.error(errorMsg);
        }
        return;
      }

      const result = response.data;

      if (result.error) {
        if (result.code === 'ALREADY_REGISTERED') {
          toast.error('Este CPF já possui uma conta. Faça login normalmente.');
        } else if (result.code === 'CPF_NOT_FOUND') {
          toast.error('CPF não encontrado. Verifique se você foi cadastrado como dependente.');
        } else {
          toast.error(result.error);
        }
        return;
      }

      setCpfValidado(cpfLimpo);
      setUsuarioData(result.usuario);
      setStep('senha');
      toast.success('CPF encontrado! Agora crie sua senha.');

    } catch (error: any) {
      console.error('Error validating CPF:', error);
      toast.error('Erro ao validar CPF. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePassword = async (data: SenhaForm) => {
    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke('first-access-complete', {
        body: { cpf: cpfValidado, senha: data.senha }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Erro ao criar senha');
      }

      const result = response.data;

      if (result.error) {
        toast.error(result.error);
        return;
      }

      setStep('success');
      toast.success('Conta criada com sucesso!');

    } catch (error: any) {
      console.error('Error creating password:', error);
      toast.error('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const getTipoLabel = (tipo: string, grau?: string) => {
    if (tipo === 'dependente' && grau) {
      const labels: Record<string, string> = {
        conjuge: 'Cônjuge',
        filho: 'Filho(a)',
        pai_mae: 'Pai/Mãe',
        irmao: 'Irmão(ã)',
        outro: 'Dependente',
      };
      return labels[grau] || 'Dependente';
    }
    return tipo === 'principal' ? 'Titular' : 'Dependente';
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-primary">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <LogoJuripass variant="full" size="lg" format="png" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {step === 'cpf' && 'Primeiro Acesso'}
            {step === 'senha' && 'Criar Senha'}
            {step === 'success' && 'Conta Criada!'}
          </CardTitle>
          <CardDescription>
            {step === 'cpf' && 'Digite seu CPF para verificar seu cadastro'}
            {step === 'senha' && 'Crie uma senha para acessar sua conta'}
            {step === 'success' && 'Sua conta foi criada com sucesso'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Step 1: CPF */}
          {step === 'cpf' && (
            <Form {...cpfForm}>
              <form onSubmit={cpfForm.handleSubmit(handleValidateCPF)} className="space-y-4">
                <FormField
                  control={cpfForm.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="000.000.000-00"
                          onChange={(e) => field.onChange(formatCPF(e.target.value))}
                          maxLength={14}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    'Verificar CPF'
                  )}
                </Button>

                <div className="text-center pt-2">
                  <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">
                    <ArrowLeft className="inline-block w-4 h-4 mr-1" />
                    Voltar para o login
                  </Link>
                </div>
              </form>
            </Form>
          )}

          {/* Step 2: Create Password */}
          {step === 'senha' && usuarioData && (
            <div className="space-y-6">
              {/* User Info Card */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{usuarioData.nome_mascarado}</p>
                    <p className="text-sm text-muted-foreground">
                      {getTipoLabel(usuarioData.tipo_usuario, usuarioData.grau_parentesco)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  E-mail: {usuarioData.email}
                </p>
              </div>

              <Form {...senhaForm}>
                <form onSubmit={senhaForm.handleSubmit(handleCreatePassword)} className="space-y-4">
                  <FormField
                    control={senhaForm.control}
                    name="senha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={senhaForm.control}
                    name="confirmar_senha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Senha</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Repita a senha"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep('cpf')}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      Voltar
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        'Criar Conta'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Sua conta foi criada com sucesso. Agora você pode fazer login com seu e-mail e senha.
                </p>
                {usuarioData && (
                  <p className="text-sm font-medium">
                    E-mail: {usuarioData.email}
                  </p>
                )}
              </div>

              <Button onClick={() => navigate('/login')} className="w-full">
                Ir para Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
