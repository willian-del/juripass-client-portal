import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ArrowLeft, Zap, Users, Shield } from 'lucide-react';

const WHATSAPP_NUMBER = '5511999999999'; // Número do WhatsApp da Juripass

export default function IniciarAtendimento() {
  const navigate = useNavigate();
  
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de iniciar um atendimento.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 max-w-lg mx-auto">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Iniciar Atendimento</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Entre em contato com nossa equipe via WhatsApp
          </p>
        </div>

        <Card className="shadow-primary">
          <CardHeader className="text-center p-4 sm:p-5 pb-3">
            <div className="flex justify-center mb-3">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary flex items-center justify-center shadow-primary">
                <MessageSquare className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-lg sm:text-xl text-primary">Atendimento via WhatsApp</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Nossa equipe está pronta para ajudá-lo
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 p-4 sm:p-5 pt-0">
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="px-3 py-1.5 gap-1.5 bg-primary/5 border-primary/20">
                <Zap className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium">Atendimento Rápido</span>
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5 gap-1.5 bg-primary/5 border-primary/20">
                <Users className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium">Equipe Especializada</span>
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5 gap-1.5 bg-primary/5 border-primary/20">
                <Shield className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium">Seguro e Confidencial</span>
              </Badge>
            </div>

            <Button 
              onClick={handleWhatsAppClick}
              className="w-full h-11 sm:h-12 text-sm sm:text-base shadow-primary"
              size="lg"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Iniciar Atendimento no </span>WhatsApp
            </Button>

            <p className="text-center text-xs sm:text-sm text-muted-foreground">
              Seg-Sex, 9h às 18h
            </p>
          </CardContent>
        </Card>

        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Dashboard
        </Button>
      </div>
    </DashboardLayout>
  );
}
