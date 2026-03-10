import { ShieldCheck, Users, UserCheck, Building2 } from 'lucide-react';

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
    title: 'Para os Gestores',
    points: [
      'Deixam de mediar problemas pessoais',
      'Menos desgaste emocional',
      'Relação profissional preservada',
      'Aderência à prevenção de riscos psicossociais (NR-1)',
    ],
  },
  {
    icon: UserCheck,
    title: 'Para os Colaboradores',
    points: [
      'Orientação sem custo no atendimento inicial',
      'Decisões importantes com mais clareza',
      'Canal confidencial e sem julgamento',
      'Conteúdos educativos preventivos',
    ],
  },
  {
    icon: Building2,
    title: 'Para a Organização',
    points: [
      'Redução do absenteísmo jurídico',
      'Clima organizacional mais saudável',
      'Conformidade com a Nova NR-01',
      'Diferencial competitivo na atração de talentos',
    ],
  },
];

export function ImpactSection() {
  return (
    <section className="py-20 md:py-28 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            O impacto positivo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                <div className="flex flex-col gap-2">
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
