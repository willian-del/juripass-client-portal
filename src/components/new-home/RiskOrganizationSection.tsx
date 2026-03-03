import { Brain, ShieldAlert, AlertTriangle } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const risks = [
  {
    icon: Brain,
    title: 'Risco psicossocial',
    description:
      'Demandas pessoais não estruturadas impactam clima, produtividade, absenteísmo e turnover. A Juripass organiza esse fluxo antes que ele afete a operação.',
  },
  {
    icon: ShieldAlert,
    title: 'Risco relacional',
    description:
      'Ao absorver informalmente questões jurídicas pessoais, o RH assume responsabilidades que não fazem parte de sua função. O canal externo cria clareza de papéis e proteção institucional.',
  },
  {
    icon: AlertTriangle,
    title: 'Risco de escalada',
    description:
      'Situações sensíveis, quando mal conduzidas, podem evoluir para conflitos formais. A Juripass atua preventivamente, antes que a tensão se transforme em fricção interna.',
  },
];

export function RiskOrganizationSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            Onde a Juripass organiza risco para o RH
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {risks.map((risk, index) => (
              <ScrollReveal key={risk.title} delay={index * 0.15}>
                <div className="p-6 rounded-2xl bg-card border border-border shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 space-y-4 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <risk.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">{risk.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{risk.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
