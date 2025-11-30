import { Card } from '@/components/ui/card';
import { FileCheck, Users, Megaphone, MessageSquare, BarChart } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: FileCheck,
      number: '01',
      title: 'Contratação',
      description: 'Escolha o plano ideal para o tamanho e necessidades da sua empresa'
    },
    {
      icon: Users,
      number: '02',
      title: 'Onboarding',
      description: 'Cadastramos seus colaboradores na plataforma de forma simples e rápida'
    },
    {
      icon: Megaphone,
      number: '03',
      title: 'Comunicação',
      description: 'Fornecemos materiais de divulgação para engajar sua equipe'
    },
    {
      icon: MessageSquare,
      number: '04',
      title: 'Utilização',
      description: 'Colaboradores acessam atendimento de forma confidencial e descomplicada'
    },
    {
      icon: BarChart,
      number: '05',
      title: 'Relatórios',
      description: 'Acompanhe indicadores de utilização e satisfação periodicamente'
    }
  ];

  return (
    <section id="empresas" className="py-16 md:py-24 bg-muted/30 scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Como Funciona para sua Empresa
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Processo simples e transparente do início ao acompanhamento contínuo
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline Line - Desktop */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary" />

            <div className="grid lg:grid-cols-5 gap-8 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Timeline Dot - Desktop */}
                  <div className="hidden lg:flex absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

                  <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-3xl font-bold text-primary/20">
                          {step.number}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <p className="text-center text-lg text-foreground">
              <span className="font-bold">Implementação em até 48 horas.</span>{' '}
              Nossa equipe cuida de toda a operação para que você foque no que importa.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
