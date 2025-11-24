import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, ArrowLeft } from 'lucide-react';

const WHATSAPP_NUMBER = '5511999999999'; // Número do WhatsApp da Juripass

export default function IniciarAtendimento() {
  const navigate = useNavigate();
  
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de iniciar um atendimento.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <DashboardLayout>
      <div className="space-y-3 sm:space-y-4 max-w-lg mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-2 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Dashboard
        </Button>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Iniciar Atendimento</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Entre em contato com nossa equipe via WhatsApp
          </p>
        </div>

        <Card className="shadow-primary">
          <CardHeader className="text-center p-3 sm:p-5">
            <div className="flex justify-center mb-2 sm:mb-3">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-juripass-primary flex items-center justify-center shadow-primary">
                <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-lg sm:text-xl text-juripass-primary">Atendimento via WhatsApp</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Nossa equipe está pronta para ajudá-lo
            </CardDescription>
          </CardHeader>
          
          <Separator className="mx-4" />
          
          <CardContent className="space-y-3 p-3 sm:p-5">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-juripass-primary mt-2 shrink-0" />
                <div>
                  <p className="font-medium text-sm text-juripass-primary-dark">Atendimento Rápido</p>
                  <p className="text-xs text-muted-foreground">
                    Resposta em até 24h úteis
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-juripass-primary mt-2 shrink-0" />
                <div>
                  <p className="font-medium text-sm text-juripass-primary-dark">Equipe Especializada</p>
                  <p className="text-xs text-muted-foreground">
                    Profissionais prontos para ajudar
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-juripass-primary mt-2 shrink-0" />
                <div>
                  <p className="font-medium text-sm text-juripass-primary-dark">Seguro e Confidencial</p>
                  <p className="text-xs text-muted-foreground">
                    Suas informações protegidas
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <Button 
              onClick={handleWhatsAppClick}
              className="w-full h-11 sm:h-12 text-sm sm:text-base bg-juripass-primary hover:bg-juripass-primary-dark shadow-primary"
              size="lg"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Iniciar Atendimento no </span>WhatsApp
            </Button>

            <div className="text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Seg-Sex, 9h às 18h
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
