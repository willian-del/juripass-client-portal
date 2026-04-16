import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { LogoJuripass } from '@/components/ui/LogoJuripass';
import {
  FileText, Loader2, AlertCircle,
  Presentation, Image, Briefcase, ExternalLink, Send
} from 'lucide-react';
import { SlidesPresentation } from '@/components/avaliacao/SlidesPresentation';
import { SlidesColaborador } from '@/components/avaliacao/SlidesColaborador';
import { OnePager } from '@/components/avaliacao/OnePager';
import { PostersViewer } from '@/components/avaliacao/PostersViewer';
import { PropostaComercial } from '@/components/avaliacao/PropostaComercial';
import { SEOHead } from '@/components/ui/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

type MaterialResult = {
  type: 'file' | 'builtin';
  url?: string;
  title: string;
  file_type: string;
  require_lead_info?: boolean;
};

function getMaterialMeta(fileType: string) {
  if (fileType === 'presentation' || fileType === 'presentation-colaborador') {
    return {
      icon: Presentation,
      category: 'Apresentação',
      description: 'Apresentação executiva com os principais pontos do programa Juripass. Navegue pelos slides ou baixe em PDF.',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    };
  }
  if (fileType === 'one-pager') {
    return {
      icon: FileText,
      category: 'One-Pager',
      description: 'Resumo de uma página com as informações essenciais do programa. Ideal para compartilhar com decisores.',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    };
  }
  if (fileType === 'proposal') {
    return {
      icon: Briefcase,
      category: 'Proposta Comercial',
      description: 'Proposta comercial personalizada com escopo, cobertura e valores do programa Juripass.',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    };
  }
  if (fileType === 'posters' || fileType.startsWith('poster-')) {
    return {
      icon: Image,
      category: 'Material de Divulgação',
      description: 'Cartazes informativos prontos para impressão. Ideais para murais, refeitórios e áreas comuns.',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    };
  }
  return {
    icon: FileText,
    category: 'Documento',
    description: 'Material preparado exclusivamente para você. Clique para visualizar ou baixar.',
    color: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  };
}

const posterMap: Record<string, string> = {
  'poster-family': 'family',
  'poster-debt': 'debt',
  'poster-work': 'work',
  'poster-housing': 'housing',
  'poster-consumer': 'consumer',
};

export default function MaterialViewer() {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [material, setMaterial] = useState<MaterialResult | null>(null);

  // Lead gate state
  const [gateCompleted, setGateCompleted] = useState(false);
  const [gateName, setGateName] = useState('');
  const [gateEmail, setGateEmail] = useState('');
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [gateError, setGateError] = useState('');

  useEffect(() => {
    if (!token) return;
    const fetchMaterial = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke('serve-material', {
          body: { token },
        });
        if (fnError || data?.error) {
          setError(data?.error || 'Material não encontrado');
          return;
        }
        const mat = data as MaterialResult;
        setMaterial(mat);

        // For file-type materials without gate, redirect immediately
        if (mat.type === 'file' && !mat.require_lead_info && mat.url) {
          window.location.href = mat.url;
        }
      } catch {
        setError('Erro ao carregar material');
      } finally {
        setLoading(false);
      }
    };
    fetchMaterial();
  }, [token]);

  const handleGateSubmit = async () => {
    if (!gateName.trim()) { setGateError('Informe seu nome'); return; }
    if (!gateEmail.trim() || !gateEmail.includes('@')) { setGateError('Informe um email válido'); return; }
    setGateSubmitting(true);
    setGateError('');
    try {
      const { data, error: fnError } = await supabase.functions.invoke('serve-material', {
        body: { token, action: 'update_lead_info', name: gateName.trim(), email: gateEmail.trim() },
      });
      if (fnError || data?.error) {
        setGateError(data?.error || 'Erro ao salvar dados');
        return;
      }
      setGateCompleted(true);

      // After gate completion, redirect for file-type materials
      if (material?.type === 'file' && material.url) {
        window.location.href = material.url;
      }
    } catch {
      setGateError('Erro ao salvar dados. Tente novamente.');
    } finally {
      setGateSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <>
        <SEOHead title="Carregando material | Juripass" description="Material Juripass" noindex={true} />
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
          <LogoJuripass variant="full" size="md" format="png" clickable={false} />
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando material...</p>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <SEOHead title="Material não encontrado | Juripass" description="Material Juripass" noindex={true} />
        <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #2C3E7D 0%, #1e2d5e 60%, #162048 100%)' }}>
          <header className="p-6 flex items-center justify-center">
            <LogoJuripass variant="full" size="md" color="white" format="png" clickable={false} />
          </header>
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 max-w-md w-full text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto" />
              <h1 className="text-xl font-bold text-white">{error}</h1>
              <p className="text-white/50 text-sm">Este link pode ter expirado ou ser inválido.</p>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                <a href="https://www.juripass.com.br">Visitar juripass.com.br</a>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!material) return null;

  const needsGate = material.require_lead_info && !gateCompleted;

  // Lead gate — only stop before showing material
  if (needsGate) {
    const meta = getMaterialMeta(material.file_type);
    return (
      <>
        <SEOHead title={`${material.title} | Juripass`} description={meta.description} noindex={true} />
        <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #2C3E7D 0%, #1e2d5e 60%, #162048 100%)' }}>
          <header className="p-6 md:p-8 flex items-center justify-between">
            <LogoJuripass variant="full" size="md" color="white" format="png" clickable={false} />
            <a href="https://www.juripass.com.br" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/70 transition-colors text-sm flex items-center gap-1.5">
              juripass.com.br <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </header>
          <main className="flex-1 flex items-center justify-center px-4 pb-12">
            <div className="max-w-lg w-full space-y-6">
              <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{material.title}</h1>
                  <p className="text-white/50 text-sm leading-relaxed">Para acessar este material, por favor informe seus dados abaixo.</p>
                </div>
                <div className="border-t border-white/10" />
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Input placeholder="Seu nome *" value={gateName} onChange={(e) => setGateName(e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#4A9FD8]" onKeyDown={(e) => e.key === 'Enter' && handleGateSubmit()} />
                    <Input type="email" placeholder="Seu email *" value={gateEmail} onChange={(e) => setGateEmail(e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#4A9FD8]" onKeyDown={(e) => e.key === 'Enter' && handleGateSubmit()} />
                  </div>
                  {gateError && <p className="text-red-400 text-xs">{gateError}</p>}
                  <Button size="lg" className="w-full bg-[#4A9FD8] hover:bg-[#4A9FD8]/90 text-white gap-2" onClick={handleGateSubmit} disabled={gateSubmitting}>
                    {gateSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    {gateSubmitting ? 'Verificando...' : 'Acessar Material'}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 text-white/30 text-xs">
                <span className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  Link seguro
                </span>
                <span>•</span>
                <span>Acesso exclusivo</span>
                <span>•</span>
                <span>Juripass © {new Date().getFullYear()}</span>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  // Render material directly — no intermediate page
  if (material.type === 'builtin') {
    if (material.file_type === 'presentation') return <SlidesPresentation standalone />;
    if (material.file_type === 'presentation-colaborador') return <SlidesColaborador standalone />;
    if (material.file_type === 'one-pager') return <OnePager standalone />;
    if (material.file_type === 'proposal') return <PropostaComercial standalone />;
    if (material.file_type === 'posters') return <PostersViewer standalone />;
    if (posterMap[material.file_type]) return <PostersViewer standalone posterId={posterMap[material.file_type]} />;
  }

  // File type already redirected in useEffect/handleGateSubmit; show fallback loader
  if (material.type === 'file') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Redirecionando para o arquivo...</p>
      </div>
    );
  }

  return null;
}
