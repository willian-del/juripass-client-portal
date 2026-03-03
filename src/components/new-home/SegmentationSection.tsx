import { Factory, ShoppingBag, Headphones, Building, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const segments = [
  {
    icon: Factory,
    title: 'Indústria',
    points: [
      'Colaborador desestabilizado rende menos',
      'Gestor absorve problemas pessoais',
      'Absenteísmo cresce sem causa aparente',
      'Turnover alto em funções críticas',
    ],
  },
  {
    icon: ShoppingBag,
    title: 'Varejo',
    points: [
      'Atendimento cai com colaborador preocupado',
      'Alta rotatividade dificulta acompanhamento',
      'Gerente vira "psicólogo" da equipe',
      'Clima contamina a experiência do cliente',
    ],
  },
  {
    icon: Headphones,
    title: 'Call center',
    points: [
      'Operador lida com pressão interna e externa',
      'Pausas e afastamentos sem diagnóstico',
      'Supervisor acumula papel que não é dele',
      'Produtividade oscila sem explicação',
    ],
  },
  {
    icon: Building,
    title: 'Facilities',
    points: [
      'Terceirizados sem canal de apoio estruturado',
      'Pouca visibilidade sobre bem-estar do time',
      'Problemas pessoais afetam o serviço',
      'Dificuldade de reter talentos de suporte',
    ],
  },
];

export function SegmentationSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            Quem mais sente isso no dia a dia
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {segments.map((seg) => (
              <div
                key={seg.title}
                className="p-6 rounded-2xl bg-card border border-border shadow-md space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shrink-0">
                    <seg.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-xl text-foreground">{seg.title}</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {seg.points.map((point) => (
                    <span key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link to="/para-quem" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              Ver mais detalhes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
