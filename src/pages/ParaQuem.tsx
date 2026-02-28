import { Link } from 'react-router-dom';
import { Factory, ShoppingBag, Headphones, Truck, Shield, Cpu, Calendar, ArrowRight, Scale, BookOpen } from 'lucide-react';
import { SEOHead } from '@/components/ui/SEOHead';
import { BRAND } from '@/lib/constants';

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
    context: 'Em operações com turnos, um colaborador desestabilizado representa risco. Mas ninguém sabe como encaminhar sem parecer invasivo.',
    example: '"Um operador de produção começou a faltar toda segunda-feira. O supervisor tentou conversar, mas não sabia como abordar. Três meses depois, o colaborador pediu demissão."',
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
    context: 'A rotatividade já é alta. Quando um colaborador está lidando com algo pessoal grave, a produtividade cai antes de qualquer aviso.',
    example: '"Uma vendedora top performer começou a ter conflitos com colegas. Descobriu-se depois que estava passando por uma separação difícil. A loja perdeu a melhor do time."',
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
    context: 'A pressão do atendimento já é intensa. Quando somada a problemas pessoais não resolvidos, o resultado é absenteísmo e turnover.',
    example: '"Um operador com problemas de guarda dos filhos passou a sair antes do fim do turno. O supervisor não tinha como ajudar e a produtividade da célula inteira caiu."',
  },
];

const alsoServe = [
  { icon: Truck, label: 'Logística e transporte' },
  { icon: Shield, label: 'Serviços (facilities, segurança)' },
  { icon: Cpu, label: 'Tecnologia (startups em crescimento)' },
];

const ParaQuem = () => {
  return (
    <>
      <SEOHead
        title="Para Quem — Juripass | Benefício Jurídico para Indústria, Varejo e Call Center"
        description="Empresas com mais de 200 colaboradores onde situações pessoais impactam a operação. Solução para gestão de pessoas e conformidade com NR-01."
      />
      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Para quem a Juripass faz mais sentido
            </h1>
            <p className="text-lg text-muted-foreground">
              Empresas onde situações pessoais dos colaboradores já impactam a operação — mesmo que ninguém fale sobre isso.
            </p>
          </div>
        </div>
      </section>

      {/* Segmentos expandidos */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {segments.map((seg) => (
              <div key={seg.title} className="p-6 md:p-8 rounded-xl bg-card border border-border space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shrink-0">
                    <seg.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">{seg.title}</h2>
                    <p className="text-sm text-primary font-medium">{seg.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {seg.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground">{seg.context}</p>
                <blockquote className="border-l-2 border-primary/40 pl-4 text-sm italic text-muted-foreground">
                  {seg.example}
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Também atendemos */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Também atendemos
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {alsoServe.map((item) => (
                <div key={item.label} className="p-6 rounded-xl bg-card border border-border text-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <p className="font-medium text-foreground">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Qualquer empresa com mais de 200 colaboradores, onde o RH já percebe que situações pessoais impactam o dia a dia.
            </p>
          </div>
        </div>
      </section>

      {/* Saiba mais */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Saiba mais
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link to="/nr-01" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Nova NR-01</h3>
                <p className="text-sm text-muted-foreground mb-3">Entenda as obrigações da nova norma sobre riscos psicossociais.</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Saiba mais <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link to="/blog/absenteismo-juridico-problema-silencioso" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Absenteísmo Jurídico</h3>
                <p className="text-sm text-muted-foreground mb-3">O problema silencioso que impacta a produtividade da sua equipe.</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Ler artigo <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link to="/blog/como-implementar-acolhimento-juridico" className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Guia de Implementação</h3>
                <p className="text-sm text-muted-foreground mb-3">Passo a passo para implementar um programa de acolhimento jurídico.</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Ler artigo <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/90 to-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              Sua empresa se encaixa? Vale uma conversa rápida.
            </h2>
            <a
              href={BRAND.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-background text-foreground font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              <Calendar className="h-5 w-5" />
              Agende uma conversa
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ParaQuem;
