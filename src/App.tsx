import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NovoCadastro from "./pages/NovoCadastro";
import Dashboard from "./pages/Dashboard";
import IniciarAtendimento from "./pages/IniciarAtendimento";
import MeuCadastro from "./pages/MeuCadastro";
import Dependentes from "./pages/Dependentes";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminEmpresas from "./pages/admin/AdminEmpresas";
import AdminInvitationLinks from "./pages/admin/AdminInvitationLinks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/novo-cadastro" element={<NovoCadastro />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/atendimento" element={<ProtectedRoute><IniciarAtendimento /></ProtectedRoute>} />
            <Route path="/dashboard/meu-cadastro" element={<ProtectedRoute><MeuCadastro /></ProtectedRoute>} />
            <Route path="/dashboard/dependentes" element={<ProtectedRoute><Dependentes /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute requireRole={['super_admin', 'admin_empresa']} requireAnyRole={true}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/usuarios" element={<ProtectedRoute requireRole={['super_admin', 'admin_empresa']} requireAnyRole={true}><AdminUsuarios /></ProtectedRoute>} />
            <Route path="/admin/empresas" element={<ProtectedRoute requireRole={['super_admin']}><AdminEmpresas /></ProtectedRoute>} />
            <Route path="/admin/convites" element={<ProtectedRoute requireRole={['super_admin', 'admin_empresa']} requireAnyRole={true}><AdminInvitationLinks /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
