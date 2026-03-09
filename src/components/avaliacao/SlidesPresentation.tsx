import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, X, AlertTriangle, Building2, 
  MessageCircle, Lightbulb, ArrowRight, Shield, Users, Heart,
  Scale, Lock, Rocket, Clock, BadgeCheck, Phone, Mail, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogoJuripass } from '@/components/ui/LogoJuripass';
import { Progress } from '@/components/ui/progress';

type SlideVariant = 'dark' | 'light';

interface SlideData {
  variant: SlideVariant;
  render: () => React.ReactNode;
}

function SlideWrapper({ variant, children }: { variant: SlideVariant; children: React.ReactNode }) {
  const isDark = variant === 'dark';
  return (
    <div className={`w-full h-full flex items-center justify-center p-8 md:p-16 ${
      isDark 
        ? 'bg-[hsl(var(--juripass-primary-dark))] text-white' 
        : 'bg-white text-[hsl(var(--juripass-primary-dark))]'
    }`}>
      {children}
    </div>
  );
}

function IconBox({ icon: Icon, dark }: { icon: React.ElementType; dark?: boolean }) {
  return (
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
      dark 
        ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
        : 'bg-[hsl(var(--juripass-primary)/0.1)] border border-[hsl(var(--juripass-primary)/0.2)]'
    }`}>
      <Icon className={`h-7 w-7 ${dark ? 'text-[hsl(var(--juripass-primary))]' : 'text-[hsl(var(--juripass-primary))]'}`} />
    </div>
  );
}

function Card({ children, dark, className = '' }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <div className={`rounded-2xl p-6 ${
      dark 
        ? 'bg-white/5 backdrop-blur-sm border border-white/10' 
        : 'bg-[hsl(var(--juripass-primary-dark)/0.03)] border border-[hsl(var(--juripass-primary-dark)/0.08)]'
    } ${className}`}>
      {children}
    </div>
  );
}

const slides: SlideData[] = [
  // 1 — Capa
  {
    variant: 'dark',
    render: () => (
      <div className="text-center space-y-8 max-w-3xl">
        <LogoJuripass variant="full-white" size="lg" format="png" clickable={false} />
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Programa de Acolhimento e Orientação Jurídica ao Colaborador
          </h1>
          <div className="w-24 h-1 bg-[hsl(var(--juripass-primary))] mx-auto rounded-full" />
          <p className="text-lg md:text-xl text-white/70">
            Uma plataforma que ajuda o RH a prevenir conflitos e reduzir passivos
          </p>
        </div>
      </div>
    ),
  },
  // 2 — O desafio do RH
  {
    variant: 'light',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--juripass-primary))]">Contexto</p>
          <h2 className="text-3xl md:text-4xl font-bold">O desafio do RH hoje</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: AlertTriangle, text: 'Conflitos pessoais dos colaboradores impactam diretamente o trabalho' },
            { icon: MessageCircle, text: 'Falta de orientação jurídica acessível para situações do dia a dia' },
            { icon: Heart, text: 'Aumento de riscos psicossociais exige gestão preventiva' },
            { icon: Scale, text: 'A atualização da NR-01 amplia a necessidade de suporte estruturado' },
          ].map((item, i) => (
            <Card key={i}>
              <div className="flex items-start gap-4">
                <IconBox icon={item.icon} />
                <p className="text-base leading-relaxed pt-1">{item.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  // 3 — A lacuna nas empresas
  {
    variant: 'dark',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--juripass-primary))]">O problema</p>
          <h2 className="text-3xl md:text-4xl font-bold">A lacuna nas empresas</h2>
          <p className="text-lg text-white/60">Quando colaboradores enfrentam problemas jurídicos pessoais e não há canal adequado:</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Users, title: 'RH sobrecarregado', desc: 'Vira conselheiro informal, sem preparo ou respaldo para lidar com questões jurídicas.' },
            { icon: Building2, title: 'Gestores expostos', desc: 'Mediam conflitos pessoais, consumindo tempo estratégico e se desgastando.' },
            { icon: AlertTriangle, title: 'Risco corporativo', desc: 'A empresa se envolve informalmente em questões pessoais, criando passivos desnecessários.' },
          ].map((item, i) => (
            <Card key={i} dark>
              <div className="space-y-4">
                <IconBox icon={item.icon} dark />
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  // 4 — O que é a Juripass
  {
    variant: 'light',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--juripass-primary))]">A solução</p>
          <h2 className="text-3xl md:text-4xl font-bold">O que é a Juripass</h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))]">
            Plataforma de acolhimento, triagem e facilitação de acesso a profissionais habilitados para colaboradores e seus familiares.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--juripass-primary))]">Temas frequentemente atendidos</p>
          <div className="flex flex-wrap gap-3">
            {['Endividamento e negativação', 'Conflitos familiares', 'Problemas com moradia', 'Golpes digitais', 'Inventários', 'Relações de consumo'].map((t) => (
              <span key={t} className="px-4 py-2 rounded-full text-sm font-medium bg-[hsl(var(--juripass-primary)/0.08)] text-[hsl(var(--juripass-primary))] border border-[hsl(var(--juripass-primary)/0.15)]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  // 5 — O que o programa oferece
  {
    variant: 'dark',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--juripass-primary))]">O programa</p>
          <h2 className="text-3xl md:text-4xl font-bold">O que o programa oferece</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card dark>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-[hsl(var(--juripass-primary))]" /> Para o Colaborador
              </h3>
              <ul className="space-y-3 text-white/70 text-sm">
                {[
                  'Canal de acolhimento e triagem de demandas',
                  'Orientação informativa sobre direitos e caminhos legais',
                  'Esclarecimento de dúvidas iniciais',
                  'Organização da situação e próximos passos',
                  'Encaminhamento a advogado habilitado quando necessário',
                  'Conteúdos educativos preventivos',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <BadgeCheck className="h-4 w-4 text-[hsl(var(--juripass-primary))] mt-0.5 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          <Card dark>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[hsl(var(--juripass-primary))]" /> Para a Empresa
              </h3>
              <ul className="space-y-3 text-white/70 text-sm">
                {[
                  'Redução de demandas pessoais ao RH e gestores',
                  'Apoio à gestão de pessoas e mediação de conflitos',
                  'Menor impacto emocional no ambiente de trabalho',
                  'Fortalecimento do employer branding',
                  'Aderência a políticas de bem-estar e NR-01',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <BadgeCheck className="h-4 w-4 text-[hsl(var(--juripass-primary))] mt-0.5 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    ),
  },
  // 6 — Como funciona
  {
    variant: 'light',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--juripass-primary))]">Jornada</p>
          <h2 className="text-3xl md:text-4xl font-bold">Como funciona</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Phone, step: '01', title: 'Contato direto', desc: 'Via WhatsApp ou aplicativo, sem passar pelo RH.' },
            { icon: Heart, step: '02', title: 'Acolhimento', desc: 'Equipe treinada para triagem e organização.' },
            { icon: Lightbulb, step: '03', title: 'Orientação', desc: 'Informação clara sobre direitos e caminhos.' },
            { icon: ArrowRight, step: '04', title: 'Encaminhamento', desc: 'Advogado habilitado quando necessário.' },
          ].map((s) => (
            <Card key={s.step} className="text-center space-y-3">
              <span className="text-4xl font-black text-[hsl(var(--juripass-primary)/0.12)]">{s.step}</span>
              <IconBox icon={s.icon} />
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{s.desc}</p>
            </Card>
          ))}
        </div>
        <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
          Prazo estimado de primeiro retorno: até 1 dia útil.
        </p>
      </div>
    ),
  },
  // 7 — Benefícios para o RH
  {
    variant: 'dark',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--juripass-primary))]">Impacto</p>
          <h2 className="text-3xl md:text-4xl font-bold">Benefícios para o RH</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: Shield, title: 'Apoio estruturado ao colaborador', desc: 'Canal profissional e externo substitui aconselhamento informal.' },
            { icon: Users, title: 'Prevenção de conflitos internos', desc: 'Problemas pessoais são tratados fora do ambiente corporativo.' },
            { icon: Heart, title: 'Identificação de riscos psicossociais', desc: 'Relatórios anonimizados revelam padrões e áreas de atenção.' },
            { icon: BadgeCheck, title: 'Cultura de cuidado', desc: 'Fortalece employer branding e percepção organizacional.' },
          ].map((item, i) => (
            <Card key={i} dark>
              <div className="flex items-start gap-4">
                <IconBox icon={item.icon} dark />
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-white/60 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  // 8 — NR-01
  {
    variant: 'light',
    render: () => (
      <div className="max-w-3xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--juripass-primary))]">Conformidade</p>
          <h2 className="text-3xl md:text-4xl font-bold">Alinhamento com a NR-01</h2>
        </div>
        <Card className="space-y-5">
          <p className="text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
            A atualização da NR-01 amplia a necessidade de <strong className="text-[hsl(var(--juripass-primary-dark))]">gestão de riscos psicossociais</strong> no ambiente de trabalho. 
            A Juripass contribui oferecendo suporte preventivo e identificando padrões de risco por meio de dados anonimizados.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'Suporte preventivo estruturado',
              'Identificação de padrões de risco',
              'Aderência a políticas de bem-estar',
            ].map((t) => (
              <div key={t} className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(var(--juripass-primary)/0.06)]">
                <BadgeCheck className="h-5 w-5 text-[hsl(var(--juripass-primary))] shrink-0" />
                <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    ),
  },
  // 9 — Confidencialidade e LGPD
  {
    variant: 'dark',
    render: () => (
      <div className="max-w-3xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--juripass-primary))]">Segurança</p>
          <h2 className="text-3xl md:text-4xl font-bold">Confidencialidade e LGPD</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: Lock, text: 'O conteúdo dos atendimentos não é compartilhado com a empresa' },
            { icon: Shield, text: 'A empresa recebe apenas dados estatísticos agregados e anonimizados' },
            { icon: Users, text: 'Os dados pertencem ao colaborador' },
            { icon: Scale, text: 'Sigilo profissional e controles de segurança da informação' },
          ].map((item, i) => (
            <Card key={i} dark>
              <div className="flex items-start gap-4">
                <IconBox icon={item.icon} dark />
                <p className="text-white/70 text-sm leading-relaxed pt-1">{item.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  // 10 — Implantação
  {
    variant: 'light',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--juripass-primary))]">Implementação</p>
          <h2 className="text-3xl md:text-4xl font-bold">Implantação simples</h2>
        </div>
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          {[
            { step: '1', title: 'Kick-off', desc: 'Reunião de alinhamento e planejamento com RH' },
            { step: '2', title: 'Comunicação', desc: 'Material de comunicação interna e treinamento da equipe' },
            { step: '3', title: 'Ativação', desc: 'Acompanhamento de engajamento e suporte contínuo' },
          ].map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <Card className="flex-1 w-full text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--juripass-primary))] text-white flex items-center justify-center text-xl font-bold mx-auto">
                  {s.step}
                </div>
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{s.desc}</p>
              </Card>
              {i < 2 && (
                <ArrowRight className="h-6 w-6 text-[hsl(var(--juripass-primary)/0.3)] rotate-90 md:rotate-0 my-2 md:hidden" />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 text-sm text-[hsl(var(--muted-foreground))]">
          <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[hsl(var(--juripass-primary))]" /> Até 15 dias para ativação</span>
          <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[hsl(var(--juripass-primary))]" /> Sem taxa de implantação</span>
        </div>
      </div>
    ),
  },
  // 11 — Modelo Comercial
  {
    variant: 'dark',
    render: () => (
      <div className="max-w-3xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--juripass-primary))]">Investimento</p>
          <h2 className="text-3xl md:text-4xl font-bold">Modelo comercial</h2>
        </div>
        <Card dark className="text-center space-y-5">
          <p className="text-white/60 text-sm">Licença corporativa com acesso irrestrito</p>
          <div className="space-y-1">
            <p className="text-white/50 text-sm">Valor mensal</p>
            <p className="text-4xl md:text-5xl font-bold">R$ 9.990</p>
            <p className="text-white/40 text-sm">Faixa: 1.501 a 2.500 colaboradores</p>
          </div>
          <div className="w-full h-px bg-white/10" />
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--juripass-primary)/0.2)] text-[hsl(var(--juripass-primary))] text-sm font-semibold">
              🚀 Piloto 90 dias — 50% desconto: R$ 4.995/mês
            </div>
            <p className="text-white/40 text-xs">A partir do 4º mês: valor integral. Contrato de 12 meses.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-white/50">
            <span>✓ Sem taxa de implantação</span>
            <span>✓ Sem custo por atendimento</span>
            <span>✓ Inclui dependentes</span>
          </div>
        </Card>
      </div>
    ),
  },
  // 12 — Encerramento
  {
    variant: 'light',
    render: () => (
      <div className="max-w-3xl w-full space-y-8 text-center">
        <LogoJuripass variant="full" size="lg" format="png" clickable={false} />
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold">
            Uma nova forma de apoiar colaboradores e prevenir riscos
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-lg">
            Permanecemos à disposição para esclarecimentos e eventuais adequações.
          </p>
        </div>
        <div className="w-24 h-1 bg-[hsl(var(--juripass-primary))] mx-auto rounded-full" />
        <div className="flex flex-col items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
          <p className="font-semibold text-[hsl(var(--juripass-primary-dark))]">Frederico Werneck — Diretor</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> contato@juripass.com.br</span>
            <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> juripass.com.br</span>
          </div>
        </div>
      </div>
    ),
  },
];

interface SlidesPresentationProps {
  onClose?: () => void;
  standalone?: boolean;
}

export function SlidesPresentation({ onClose, standalone = false }: SlidesPresentationProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const go = useCallback((to: number) => {
    setDirection(to > current ? 1 : -1);
    setCurrent(to);
  }, [current]);

  const prev = () => go(Math.max(0, current - 1));
  const next = () => go(Math.min(slides.length - 1, current + 1));

  const slide = slides[current];
  const progress = ((current + 1) / slides.length) * 100;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className={`${standalone ? 'min-h-screen' : 'fixed inset-0 z-50'} bg-white flex flex-col`}>
      {/* Progress bar */}
      <div className="h-1 w-full bg-[hsl(var(--juripass-primary-dark)/0.1)]">
        <motion.div
          className="h-full bg-gradient-to-r from-[hsl(var(--juripass-primary-dark))] to-[hsl(var(--juripass-primary))]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[hsl(var(--border))]">
        <LogoJuripass variant="full" size="sm" format="png" clickable={false} />
        <div className="flex items-center gap-4">
          <span className="text-sm text-[hsl(var(--muted-foreground))] font-medium tabular-nums">
            {current + 1} / {slides.length}
          </span>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <SlideWrapper variant={slide.variant}>
              {slide.render()}
            </SlideWrapper>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-[hsl(var(--border))]">
        <Button variant="outline" size="sm" onClick={prev} disabled={current === 0}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>

        <div className="hidden md:flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current 
                  ? 'w-6 bg-[hsl(var(--juripass-primary))]' 
                  : 'w-2 bg-[hsl(var(--juripass-primary)/0.2)] hover:bg-[hsl(var(--juripass-primary)/0.4)]'
              }`}
            />
          ))}
        </div>

        <Button variant="outline" size="sm" onClick={next} disabled={current === slides.length - 1}>
          Próximo
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
