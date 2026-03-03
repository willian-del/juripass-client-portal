import { ShieldCheck, Users, UserCheck } from 'lucide-react';

const columns = [
  {
    icon: ShieldCheck,
    title: 'Para o RH',
    points: [
      'Menos relatos delicados no dia a dia',
      'Apoio à gestão de pessoas e mediação inicial',
      'Foco nas demandas estratégicas',
      'Fortalecimento do employer branding',
    ],
  },
  {
    icon: Users,
    title: 'Para gestores',
    points: [
      'Deixam de mediar problemas pessoais',
      'Menos desgaste emocional',
      'Relação profissional preservada',
      'Aderência à prevenção de riscos psicossociais (NR-1)',
    ],
  },
  {
    icon: UserCheck,
    title: 'Para colaboradores',
    points: [
      'Orientação sem custo no atendimento inicial',
      'Decisões importantes com mais clareza',
      'Canal confidencial e sem julgamento',
      'Conteúdos educativos preventivos',
    ],
  },
];

export function ImpactSection() {
  return (
    <section className="py-20 md:py-28 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            O impacto na organização
          </h2>

          <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            {columns.map((col) => (
              <div
                key={col.title}
                className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shrink-0">
                    <col.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-xl text-foreground">{col.title}</h3>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {col.points.map((point) => (
                    <span key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
