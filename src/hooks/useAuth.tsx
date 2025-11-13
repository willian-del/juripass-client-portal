import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AppRole, UserRole, Usuario } from '@/types/database';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  usuario: Usuario | null;
  roles: UserRole[];
  isLoading: boolean;
  hasRole: (role: AppRole) => boolean;
  isSuperAdmin: boolean;
  isAdminEmpresa: boolean;
  isUsuario: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Defer fetching user data to avoid blocking auth state change
          setTimeout(() => {
            fetchUserData(session.user.id);
          }, 0);
        } else {
          setUsuario(null);
          setRoles([]);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch usuario data
      const { data: usuarioData, error: usuarioError } = await supabase
        .from('usuarios')
        .select('*, empresas(*)')
        .eq('id_auth', userId)
        .is('deleted_at', null)
        .single();

      if (usuarioError) {
        console.error('Error fetching usuario:', usuarioError);
      } else {
        setUsuario(usuarioData as Usuario);
      }

      // Fetch roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId);

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
      } else {
        setRoles(rolesData || []);
      }
    } catch (error) {
      console.error('Error in fetchUserData:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasRole = (role: AppRole): boolean => {
    return roles.some((r) => r.role === role);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setUsuario(null);
    setRoles([]);
  };

  const value = {
    user,
    session,
    usuario,
    roles,
    isLoading,
    hasRole,
    isSuperAdmin: hasRole('super_admin'),
    isAdminEmpresa: hasRole('admin_empresa'),
    isUsuario: hasRole('usuario'),
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
