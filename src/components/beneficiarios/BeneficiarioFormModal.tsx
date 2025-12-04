import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { cleanCPF, formatCPF, formatPhone, cleanPhone } from '@/lib/cpfUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const beneficiarioSchema = z.object({
  cpf: z.string().min(11, 'CPF inválido'),
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().optional(),
  tipo_usuario: z.enum(['principal', 'dependente']),
});

type BeneficiarioForm = z.infer<typeof beneficiarioSchema>;

interface Beneficiario {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  tipo_usuario: string;
  ativo: boolean | null;
}

interface BeneficiarioFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  beneficiario?: Beneficiario | null;
  empresaId: string;
  onSuccess: () => void;
}

export function BeneficiarioFormModal({
  open,
  onOpenChange,
  beneficiario,
  empresaId,
  onSuccess,
}: BeneficiarioFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!beneficiario;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<BeneficiarioForm>({
    resolver: zodResolver(beneficiarioSchema),
    defaultValues: {
      tipo_usuario: 'principal',
    },
  });

  useEffect(() => {
    if (beneficiario) {
      setValue('nome', beneficiario.nome);
      setValue('email', beneficiario.email);
      setValue('telefone', beneficiario.telefone || '');
      setValue('tipo_usuario', beneficiario.tipo_usuario as 'principal' | 'dependente');
    } else {
      reset({
        cpf: '',
        nome: '',
        email: '',
        telefone: '',
        tipo_usuario: 'principal',
      });
    }
  }, [beneficiario, setValue, reset]);

  const onSubmit = async (data: BeneficiarioForm) => {
    setIsLoading(true);

    try {
      if (isEditing) {
        // Update existing beneficiary
        const { error } = await supabase
          .from('usuarios')
          .update({
            nome: data.nome,
            email: data.email,
            telefone: data.telefone ? cleanPhone(data.telefone) : null,
            tipo_usuario: data.tipo_usuario,
          })
          .eq('id', beneficiario!.id);

        if (error) throw error;
        toast.success('Beneficiário atualizado com sucesso!');
      } else {
        // Create new beneficiary - need to create auth user first
        const cpfLimpo = cleanCPF(data.cpf);
        const tempPassword = Math.random().toString(36).slice(-8) + 'A1!';

        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: tempPassword,
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('Erro ao criar usuário');

        // Encrypt CPF
        const { data: cpfCriptografado, error: cpfError } = await supabase.rpc(
          'encrypt_cpf',
          { cpf_plain: cpfLimpo }
        );

        if (cpfError || !cpfCriptografado) throw new Error('Erro ao processar CPF');

        // Create usuario record
        const { error: usuarioError } = await supabase.from('usuarios').insert({
          id_auth: authData.user.id,
          cpf_criptografado: cpfCriptografado,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone ? cleanPhone(data.telefone) : null,
          tipo_usuario: data.tipo_usuario,
          id_empresa: empresaId,
        } as any);

        if (usuarioError) throw usuarioError;
        toast.success('Beneficiário cadastrado com sucesso! Uma senha temporária foi gerada.');
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error saving beneficiario:', error);
      if (error.message?.includes('already registered')) {
        toast.error('Este e-mail já está cadastrado');
      } else if (error.message?.includes('duplicate key')) {
        toast.error('CPF já cadastrado');
      } else {
        toast.error('Erro ao salvar beneficiário');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Beneficiário' : 'Novo Beneficiário'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                {...register('cpf')}
                onChange={(e) => {
                  const formatted = formatCPF(e.target.value);
                  setValue('cpf', formatted);
                }}
                placeholder="000.000.000-00"
                maxLength={14}
                disabled={isLoading}
              />
              {errors.cpf && (
                <p className="text-sm text-destructive">{errors.cpf.message}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo *</Label>
            <Input
              id="nome"
              {...register('nome')}
              placeholder="Nome completo"
              disabled={isLoading}
            />
            {errors.nome && (
              <p className="text-sm text-destructive">{errors.nome.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="email@exemplo.com"
              disabled={isLoading || isEditing}
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
              placeholder="(00) 00000-0000"
              maxLength={15}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo_usuario">Tipo *</Label>
            <Select
              value={watch('tipo_usuario')}
              onValueChange={(value) =>
                setValue('tipo_usuario', value as 'principal' | 'dependente')
              }
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="principal">Titular</SelectItem>
                <SelectItem value="dependente">Dependente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : isEditing ? (
                'Salvar'
              ) : (
                'Cadastrar'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
