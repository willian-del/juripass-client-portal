import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainLayout } from "./layouts/MainLayout";
import { LeadFormProvider } from "./contexts/LeadFormContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const LegacyHome = lazy(() => import("./pages/LegacyHome"));
const ComoFunciona = lazy(() => import("./pages/ComoFunciona"));
const ParaQuem = lazy(() => import("./pages/ParaQuem"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Avaliacao = lazy(() => import("./pages/Avaliacao"));
const NR01 = lazy(() => import("./pages/NR01"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ParaSeuColaborador = lazy(() => import("./pages/ParaSeuColaborador"));
const GestaoRiscosPsicossociais = lazy(() => import("./pages/GestaoRiscosPsicossociais"));
const NR01RiscosPsicossociais = lazy(() => import("./pages/NR01RiscosPsicossociais"));
const GestaoRiscosHumanos = lazy(() => import("./pages/GestaoRiscosHumanos"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminMaterials = lazy(() => import("./pages/admin/AdminMaterials"));
const MaterialViewer = lazy(() => import("./pages/MaterialViewer"));

const App = () => (
  <TooltipProvider>
    <LeadFormProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/como-funciona" element={<ComoFunciona />} />
              <Route path="/para-quem" element={<ParaQuem />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/nr-01" element={<NR01 />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/para-seus-colaboradores" element={<ParaSeuColaborador />} />
              <Route path="/avaliacao" element={<Avaliacao />} />
              <Route path="/gestao-riscos-psicossociais-nr01" element={<GestaoRiscosPsicossociais />} />
              <Route path="/nr01-riscos-psicossociais" element={<NR01RiscosPsicossociais />} />
              <Route path="/gestao-riscos-humanos-rh" element={<GestaoRiscosHumanos />} />
            </Route>
            <Route path="/site-anterior" element={<LegacyHome />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/leads" element={<AdminLeads />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LeadFormProvider>
  </TooltipProvider>
);

export default App;
