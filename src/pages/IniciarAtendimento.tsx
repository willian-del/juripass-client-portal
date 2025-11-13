import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, ExternalLink } from 'lucide-react';

const WHATSAPP_NUMBER = '5511999999999'; // Número do WhatsApp da Juripass

export default function IniciarAtendimento() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Gostaria de iniciar um atendimento.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Iniciar Atendimento</h1>
          <p className="text-muted-foreground mt-2">
            Entre em contato com nossa equipe via WhatsApp
          </p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center">
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Atendimento via WhatsApp</CardTitle>
            <CardDescription>
              Nossa equipe está pronta para ajudá-lo com todas as suas necessidades jurídicas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-medium">Atendimento Rápido</p>
                  <p className="text-sm text-muted-foreground">
                    Resposta em até 24 horas úteis
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-medium">Equipe Especializada</p>
                  <p className="text-sm text-muted-foreground">
                    Profissionais qualificados prontos para ajudar
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="font-medium">Seguro e Confidencial</p>
                  <p className="text-sm text-muted-foreground">
                    Suas informações estão protegidas
                  </p>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleWhatsAppClick}
              className="w-full h-14 text-lg"
              size="lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Iniciar Atendimento no WhatsApp
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Horário de atendimento: Segunda a Sexta, 9h às 18h
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
