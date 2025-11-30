import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Building, Users } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        navigate('/dashboard');
        toast({
          title: 'Login realizado com sucesso!',
        });
        onOpenChange(false);
      }
    } catch (error: any) {
      toast({
        title: 'Erro ao fazer login',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const goToRegister = () => {
    onOpenChange(false);
    navigate('/novo-cadastro');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Área do Cliente</DialogTitle>
          <DialogDescription>
            Acesse sua conta para gerenciar seus atendimentos
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="beneficiario" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="beneficiario" className="text-xs">
              <User className="w-3 h-3 mr-1" />
              Beneficiário
            </TabsTrigger>
            <TabsTrigger value="rh" className="text-xs">
              <Building className="w-3 h-3 mr-1" />
              RH
            </TabsTrigger>
            <TabsTrigger value="dependente" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              Dependente
            </TabsTrigger>
          </TabsList>

          <TabsContent value="beneficiario" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-beneficiario">E-mail</Label>
                <Input
                  id="email-beneficiario"
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-beneficiario">Senha</Label>
                <Input
                  id="password-beneficiario"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="rh" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-rh">E-mail</Label>
                <Input
                  id="email-rh"
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  placeholder="rh@empresa.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-rh">Senha</Label>
                <Input
                  id="password-rh"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="dependente" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-dependente">E-mail</Label>
                <Input
                  id="email-dependente"
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-dependente">Senha</Label>
                <Input
                  id="password-dependente"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center space-y-2 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Primeiro acesso?
          </p>
          <Button variant="link" onClick={goToRegister} className="text-primary">
            Complete seu cadastro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
