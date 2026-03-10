import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { LogoJuripass } from '@/components/ui/LogoJuripass';
import { FileText, Loader2, AlertCircle } from 'lucide-react';
import { SlidesPresentation } from '@/components/avaliacao/SlidesPresentation';
import { OnePager } from '@/components/avaliacao/OnePager';
import { PostersViewer } from '@/components/avaliacao/PostersViewer';

type MaterialResult = {
  type: 'file' | 'builtin';
  url?: string;
  title: string;
  file_type: string;
};

export default function MaterialViewer() {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [material, setMaterial] = useState<MaterialResult | null>(null);

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

        setMaterial(data as MaterialResult);

        if (data.type === 'file' && data.url) {
          window.location.href = data.url;
        }
      } catch {
        setError('Erro ao carregar material');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterial();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <LogoJuripass variant="full" size="md" format="png" clickable={false} />
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Carregando material...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <LogoJuripass variant="full" size="md" format="png" clickable={false} />
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="text-foreground font-medium">{error}</p>
        <p className="text-muted-foreground text-sm">Este link pode ter expirado ou ser inválido.</p>
      </div>
    );
  }

  // Builtin materials — render React components directly
  if (material?.type === 'builtin') {
    if (material.file_type === 'presentation') {
      return <SlidesPresentation standalone />;
    }
    if (material.file_type === 'one-pager') {
      return <OnePager standalone />;
    }
    if (material.file_type === 'posters') {
      return <PostersViewer standalone />;
    }
    // Fallback for unknown builtin types
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-8">
        <LogoJuripass variant="full" size="md" format="png" clickable={false} />
        <FileText className="h-12 w-12 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">{material.title}</h1>
        <p className="text-muted-foreground">
          Este material está disponível para visualização. Entre em contato para mais informações.
        </p>
      </div>
    );
  }

  // File-type materials — show fallback while redirecting
  if (material?.type === 'file') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <LogoJuripass variant="full" size="md" format="png" clickable={false} />
        <FileText className="h-12 w-12 text-primary" />
        <p className="text-foreground font-medium">Redirecionando para o arquivo...</p>
        <a href={material.url} className="text-primary underline text-sm">
          Clique aqui se não redirecionar automaticamente
        </a>
      </div>
    );
  }

  return null;
}
