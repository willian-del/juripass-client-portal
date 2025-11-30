import { Card } from '@/components/ui/card';
import { FileCheck, Users, Megaphone, MessageSquare, BarChart } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      icon: FileCheck,
      number: '01',
      title: 'Contratação',
      description: 'Escolha o plano ideal para o tamanho e necessidades da sua empresa',
      gradient: 'from-primary to-primary/60'
    },
    {
      icon: Users,
      number: '02',
      title: 'Onboarding',
      description: 'Cadastramos seus colaboradores na plataforma de forma simples e rápida',
      gradient: 'from-accent to-accent/60'
    },
    {
      icon: Megaphone,
      number: '03',
      title: 'Comunicação',
      description: 'Fornecemos materiais de divulgação para engajar sua equipe',
      gradient: 'from-juripass-primary-light to-primary'
    },
    {
      icon: MessageSquare,
      number: '04',
      title: 'Utilização',
      description: 'Colaboradores acessam atendimento de forma confidencial e descomplicada',
      gradient: 'from-juripass-accent to-primary'
    },
    {
      icon: BarChart,
      number: '05',
      title: 'Relatórios',
      description: 'Acompanhe indicadores de utilização e satisfação periodicamente',
      gradient: 'from-primary to-juripass-primary-dark'
    }
  ];

  return (
    <section id="empresas" className="py-20 md:py-32 bg-background scroll-mt-16 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Como Funciona para sua Empresa
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Processo simples e transparente do início ao acompanhamento contínuo
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline Line - Desktop */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-30" />

            <div className="grid lg:grid-cols-5 gap-8 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Timeline Dot - Desktop */}
                  <div className="hidden lg:flex absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent border-4 border-background shadow-lg z-10" />

                  <Card className="group p-8 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full border-2 border-transparent hover:border-primary/20">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-5xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                          {step.number}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
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
        <div className="mt-20 max-w-3xl mx-auto">
          <Card className="p-10 md:p-12 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-primary/20 backdrop-blur-sm shadow-xl">
            <p className="text-center text-xl md:text-2xl text-foreground font-medium leading-relaxed">
              <span className="font-bold text-primary">Implementação em até 48 horas.</span>{' '}
              Nossa equipe cuida de toda a operação para que você foque no que importa.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
