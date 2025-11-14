import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Usuario, Empresa } from '@/types/database';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatCPF, cleanCPF, formatPhone, cleanPhone } from '@/lib/cpfUtils';
import { validateCPF } from '@/lib/cpfUtils';
import { Loader2 } from 'lucide-react';

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  usuario?: Usuario;
  onSuccess: () => void;
}

export function UserFormDialog({ open, onOpenChange, mode, usuario, onSuccess }: UserFormDialogProps) {
  const { isSuperAdmin, usuario: currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form fields
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idEmpresa, setIdEmpresa] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState<'principal' | 'dependente'>('principal');
  const [grauParentesco, setGrauParentesco] = useState('');
  const [idUsuarioPrincipal, setIdUsuarioPrincipal] = useState('');
  const [senha, setSenha] = useState('');
  const [ativo, setAtivo] = useState(true);
  
  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: empresas } = useQuery({
    queryKey: ['empresas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('empresas')
        .select('*')
        .is('deleted_at', null)
        .order('nome');
      if (error) throw error;
      return data as Empresa[];
    },
    enabled: mode === 'create' && isSuperAdmin,
  });

  const { data: usuariosPrincipais } = useQuery({
    queryKey: ['usuarios-principais', idEmpresa],
    queryFn: async () => {
      const empresaId = isSuperAdmin ? idEmpresa : currentUser?.id_empresa;
      if (!empresaId) return [];
      
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('tipo_usuario', 'principal')
        .eq('id_empresa', empresaId)
        .is('deleted_at', null)
        .order('nome');
      if (error) throw error;
      return data as Usuario[];
    },
    enabled: tipoUsuario === 'dependente' && open,
  });

  useEffect(() => {
    if (mode === 'edit' && usuario && open) {
      setNome(usuario.nome);
      setEmail(usuario.email);
      setTelefone(usuario.telefone ? formatPhone(usuario.telefone) : '');
      setAtivo(usuario.ativo);
    } else if (mode === 'create' && open) {
      setCpf('');
      setNome('');
      setEmail('');
      setTelefone('');
      setIdEmpresa(isSuperAdmin ? '' : currentUser?.id_empresa || '');
      setTipoUsuario('principal');
      setGrauParentesco('');
      setIdUsuarioPrincipal('');
      setSenha('');
      setAtivo(true);
      setErrors({});
    }
  }, [mode, usuario, open, isSuperAdmin, currentUser]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (mode === 'create') {
      const cleanedCPF = cleanCPF(cpf);
      if (!cleanedCPF) {
        newErrors.cpf = 'CPF é obrigatório';
      } else if (!validateCPF(cleanedCPF)) {
        newErrors.cpf = 'CPF inválido';
      }

      if (!idEmpresa) {
        newErrors.id_empresa = 'Empresa é obrigatória';
      }

      if (tipoUsuario === 'dependente') {
        if (!grauParentesco) {
          newErrors.grau_parentesco = 'Grau de parentesco é obrigatório';
        }
        if (!idUsuarioPrincipal) {
          newErrors.id_usuario_principal = 'Usuário principal é obrigatório';
        }
      }

      if (!senha) {
        newErrors.senha = 'Senha é obrigatória';
      } else if (senha.length < 6) {
        newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
      }
    }

    if (!nome || nome.length < 3) {
      newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === 'create') {
        const cleanedCPF = cleanCPF(cpf);
        
        // Check if CPF already exists
        const { data: existing } = await supabase.rpc('find_user_by_cpf', {
          cpf_plain: cleanedCPF
        });

        if (existing && existing.length > 0) {
          toast.error('CPF já cadastrado no sistema');
          setIsSubmitting(false);
          return;
        }

        // Call edge function to create user
        const { data: result, error } = await supabase.functions.invoke('create-user', {
          body: {
            cpf: cleanedCPF,
            nome,
            email,
            telefone: cleanPhone(telefone),
            id_empresa: idEmpresa,
            tipo_usuario: tipoUsuario,
            grau_parentesco: tipoUsuario === 'dependente' ? grauParentesco : null,
            id_usuario_principal: tipoUsuario === 'dependente' ? idUsuarioPrincipal : null,
            senha,
          },
        });

        if (error) throw error;

        toast.success('Usuário criado com sucesso');
        onSuccess();
        onOpenChange(false);
      } else {
        // Edit mode
        const { error } = await supabase
          .from('usuarios')
          .update({
            nome,
            email,
            telefone: cleanPhone(telefone),
            ativo,
          })
          .eq('id', usuario!.id);

        if (error) throw error;

        toast.success('Usuário atualizado com sucesso');
        onSuccess();
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error('Error saving user:', error);
      toast.error(error.message || 'Erro ao salvar usuário');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Novo Usuário' : 'Editar Usuário'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'create' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(formatCPF(e.target.value))}
                  placeholder="000.000.000-00"
                  maxLength={14}
                />
                {errors.cpf && (
                  <p className="text-sm text-destructive">{errors.cpf}</p>
                )}
              </div>

              {isSuperAdmin && (
                <div className="space-y-2">
                  <Label htmlFor="id_empresa">Empresa *</Label>
                  <Select value={idEmpresa} onValueChange={setIdEmpresa}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      {empresas?.map((empresa) => (
                        <SelectItem key={empresa.id} value={empresa.id}>
                          {empresa.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.id_empresa && (
                    <p className="text-sm text-destructive">{errors.id_empresa}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="tipo_usuario">Tipo de Usuário *</Label>
                <Select value={tipoUsuario} onValueChange={(v) => setTipoUsuario(v as 'principal' | 'dependente')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="principal">Principal</SelectItem>
                    <SelectItem value="dependente">Dependente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {tipoUsuario === 'dependente' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="id_usuario_principal">Usuário Principal *</Label>
                    <Select value={idUsuarioPrincipal} onValueChange={setIdUsuarioPrincipal}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o usuário principal" />
                      </SelectTrigger>
                      <SelectContent>
                        {usuariosPrincipais?.map((u) => (
                          <SelectItem key={u.id} value={u.id}>
                            {u.nome} ({u.numero_cliente})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.id_usuario_principal && (
                      <p className="text-sm text-destructive">{errors.id_usuario_principal}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grau_parentesco">Grau de Parentesco *</Label>
                    <Select value={grauParentesco} onValueChange={setGrauParentesco}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conjuge">Cônjuge</SelectItem>
                        <SelectItem value="filho">Filho(a)</SelectItem>
                        <SelectItem value="pai_mae">Pai/Mãe</SelectItem>
                        <SelectItem value="irmao">Irmão/Irmã</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.grau_parentesco && (
                      <p className="text-sm text-destructive">{errors.grau_parentesco}</p>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo *</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome completo"
            />
            {errors.nome && (
              <p className="text-sm text-destructive">{errors.nome}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(formatPhone(e.target.value))}
              placeholder="(00) 00000-0000"
              maxLength={15}
            />
            {errors.telefone && (
              <p className="text-sm text-destructive">{errors.telefone}</p>
            )}
          </div>

          {mode === 'create' && (
            <div className="space-y-2">
              <Label htmlFor="senha">Senha *</Label>
              <Input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
              {errors.senha && (
                <p className="text-sm text-destructive">{errors.senha}</p>
              )}
            </div>
          )}

          {mode === 'edit' && (
            <div className="flex items-center space-x-2">
              <Switch
                id="ativo"
                checked={ativo}
                onCheckedChange={setAtivo}
              />
              <Label htmlFor="ativo">Usuário ativo</Label>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'create' ? 'Criar Usuário' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
