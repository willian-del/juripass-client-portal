import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { LogoJuripass } from '@/components/ui/LogoJuripass';
import { Users, FolderOpen, LogOut } from 'lucide-react';

export default function AdminHub() {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #2C3E7D 0%, #1e2d5e 60%, #162048 100%)' }}>
      <header className="p-6 md:p-8 flex items-center justify-between">
        <LogoJuripass variant="full" size="md" color="white" format="png" clickable={false} />
        <button
          onClick={logout}
          className="text-white/40 hover:text-white/70 transition-colors text-sm flex items-center gap-1.5"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Painel Administrativo
            </h1>
            <p className="text-white/50 text-sm">
              Gerencie leads e materiais comerciais da Juripass
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <button
              onClick={() => navigate('/admin/leads')}
              className="group bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 text-left space-y-4 hover:bg-white/[0.10] hover:border-white/20 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#4A9FD8]/20 flex items-center justify-center group-hover:bg-[#4A9FD8]/30 transition-colors">
                <Users className="h-7 w-7 text-[#4A9FD8]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">CRM</h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  Gerencie leads, acompanhe o funil de vendas e histórico de interações
                </p>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/materiais')}
              className="group bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 text-left space-y-4 hover:bg-white/[0.10] hover:border-white/20 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#4A9FD8]/20 flex items-center justify-center group-hover:bg-[#4A9FD8]/30 transition-colors">
                <FolderOpen className="h-7 w-7 text-[#4A9FD8]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">Materiais</h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  Apresentações, cartazes, propostas e templates de email
                </p>
              </div>
            </button>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center">
        <p className="text-white/20 text-xs">
          Juripass © {new Date().getFullYear()} — Painel Administrativo
        </p>
      </footer>
    </div>
  );
}
