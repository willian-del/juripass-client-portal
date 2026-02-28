import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainLayout } from "./layouts/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const LegacyHome = lazy(() => import("./pages/LegacyHome"));
const ComoFunciona = lazy(() => import("./pages/ComoFunciona"));
const ParaQuem = lazy(() => import("./pages/ParaQuem"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Avaliacao = lazy(() => import("./pages/Avaliacao"));
const NR01 = lazy(() => import("./pages/NR01"));

const App = () => (
  <TooltipProvider>
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
            <Route path="/avaliacao" element={<Avaliacao />} />
          </Route>
          <Route path="/site-anterior" element={<LegacyHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
