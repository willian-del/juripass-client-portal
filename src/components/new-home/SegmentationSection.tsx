import { Factory, ShoppingBag, Headphones } from 'lucide-react';

const segments = [
  {
    icon: Factory,
    title: 'Indústria',
    subtitle: 'Quando a vida pessoal impacta o turno',
    points: [
      'Colaborador chega desestabilizado e rende menos',
      'Gestor de linha absorve problemas pessoais',
      'Absenteísmo e afastamentos aumentam sem causa aparente',
    ],
  },
  {
    icon: ShoppingBag,
    title: 'Varejo',
    subtitle: 'O cliente percebe primeiro',
    points: [
      'Atendimento cai quando o colaborador está preocupado',
      'Alta rotatividade dificulta qualquer acompanhamento',
      'Gerente de loja vira "psicólogo" da equipe',
    ],
  },
  {
    icon: Headphones,
    title: 'Call center',
    subtitle: 'O supervisor não deveria ser apoio emocional',
    points: [
      'Operador lida com pressão interna e externa ao mesmo tempo',
      'Pausas e afastamentos crescem sem diagnóstico claro',
      'Supervisor acumula papel que não é dele',
    ],
  },
];

export function SegmentationSection() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            Quem mais sente isso no dia a dia
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {segments.map((seg) => (
              <div
                key={seg.title}
                className="p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:-translate-y-1 transition-transform space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <seg.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{seg.title}</h3>
                  <p className="text-sm text-primary font-medium mt-1">{seg.subtitle}</p>
                </div>
                <ul className="space-y-2">
                  {seg.points.map((point) => (
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
