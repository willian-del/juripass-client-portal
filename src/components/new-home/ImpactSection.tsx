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
    <section className="py-16 md:py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            O impacto na organização
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {columns.map((col) => (
              <div
                key={col.title}
                className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <col.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">{col.title}</h3>
                <ul className="space-y-2">
                  {col.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
