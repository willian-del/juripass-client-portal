import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, X, AlertTriangle, Building2, 
  Lightbulb, ArrowRight, Shield, Users, Heart,
  Scale, Lock, Rocket, Clock, BadgeCheck, Phone, Mail, Globe,
  Brain, ShieldAlert, Unplug, MousePointerClick, UserCheck, ShieldCheck,
  Download, ChevronDown, Wallet, Home, ShoppingBag, HeartPulse
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface SlideData {
  render: () => React.ReactNode;
  gradient?: string;
}

function SlideWrapper({ children, gradient }: { children: React.ReactNode; gradient?: string }) {
  return (
    <div 
      className="w-full h-full flex items-center justify-center p-8 md:p-16 text-white"
      style={{ background: gradient || 'linear-gradient(135deg, #2C3E7D 0%, #1e2d5e 100%)' }}
    >
      {children}
    </div>
  );
}

function IconBox({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-white/10 backdrop-blur-sm border border-white/20">
      <Icon className="h-7 w-7 text-[#4A9FD8]" />
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10 ${className}`}>
      {children}
    </div>
  );
}

function ThemeBadge({ label }: { label: string }) {
  return (
    <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#4A9FD8]/15 text-[#4A9FD8] border border-[#4A9FD8]/25">
      {label}
    </span>
  );
}

const slides: SlideData[] = [
  // 1 — Capa
  {
    gradient: 'linear-gradient(160deg, #2C3E7D 0%, #1a2654 60%, #2C3E7D 100%)',
    render: () => (
      <div className="text-center space-y-8 max-w-3xl">
        <img 
          src="/images/branding/juripass-logo-white.png" 
          alt="Juripass" 
          className="h-16 md:h-20 object-contain mx-auto"
        />
        <div className="space-y-5">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Plataforma de prevenção e monitoramento{' '}
            <span className="text-[#4A9FD8]">de riscos humanos</span>
          </h1>
          <div className="w-24 h-1 bg-[#4A9FD8] mx-auto rounded-full" />
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            Estruturamos um canal jurídico externo e confidencial para acolher questões pessoais 
            sensíveis dos colaboradores — antes que evoluam para conflitos internos ou impactem o clima e a produtividade.
          </p>
        </div>
      </div>
    ),
  },
  // 2 — O problema de encaminhamento
  {
    gradient: 'linear-gradient(145deg, #253570 0%, #2C3E7D 50%, #1e2d5e 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Contexto</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            O RH não tem um problema jurídico.
            <br />
            <span className="text-[#4A9FD8]">Tem um problema de encaminhamento.</span>
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 py-4">
          {[
            { icon: UserCheck, label: 'Colaborador', sub: 'com problema pessoal', danger: false },
            { icon: Users, label: 'Gestor', sub: 'Gestores atuam como conselheiros informais', danger: false },
            { icon: Building2, label: 'RH', sub: 'O RH recebe relatos delicados fora do seu escopo', danger: false },
            { icon: AlertTriangle, label: 'Desgaste', sub: 'Questões pessoais começam a afetar clima e operação', danger: true },
          ].map((step, i) => (
            <div key={step.label} className="flex flex-col md:flex-row items-center">
              {i > 0 && (
                <>
                  <ChevronDown className="block md:hidden text-white/30 my-1" size={20} />
                  <ChevronRight className="hidden md:block text-white/30 mx-2" size={20} />
                </>
              )}
              <div className={`flex flex-col items-center justify-center gap-3 px-4 py-4 rounded-2xl border w-[240px] md:w-[180px] h-[130px] md:h-[160px] ${
                step.danger 
                  ? 'bg-red-500/10 border-red-400/30' 
                  : 'bg-white/5 border-white/10'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.danger ? 'bg-red-500/20 text-red-400' : 'bg-[#4A9FD8]/20 text-[#4A9FD8]'
                }`}>
                  <step.icon size={20} />
                </div>
                <div className="text-center">
                  <p className={`font-semibold text-sm ${step.danger ? 'text-red-400' : 'text-white'}`}>{step.label}</p>
                  <p className={`text-xs mt-1 ${step.danger ? 'text-red-400/70' : 'text-white/50'}`}>{step.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-white/50 text-center text-sm">
          Gestores tentam ajudar. O RH tenta orientar. Mas nenhum deles foi estruturado para assumir esse papel.
        </p>
      </div>
    ),
  },
  // 3 — Onde a Juripass organiza risco
  {
    gradient: 'linear-gradient(150deg, #1e2d5e 0%, #2C3E7D 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Os riscos</p>
          <h2 className="text-3xl md:text-4xl font-bold">Onde a Juripass organiza risco para o RH</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Brain, title: 'Risco psicossocial', desc: 'Demandas pessoais não estruturadas impactam clima, produtividade, absenteísmo e turnover. A Juripass organiza esse fluxo antes que afete a operação.' },
            { icon: ShieldAlert, title: 'Risco relacional', desc: 'Ao absorver informalmente questões jurídicas pessoais, o RH assume responsabilidades fora de sua função. O canal externo cria clareza de papéis.' },
            { icon: AlertTriangle, title: 'Risco de escalada', desc: 'Situações sensíveis, quando mal conduzidas, podem evoluir para conflitos formais. A Juripass atua preventivamente.' },
          ].map((item, i) => (
            <Card key={i} className="h-full">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4A9FD8] to-[#4A9FD8]/60 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
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
    gradient: 'linear-gradient(135deg, #2C3E7D 0%, #344785 50%, #1e2d5e 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">A solução</p>
          <h2 className="text-3xl md:text-4xl font-bold">Como a Juripass ajuda o RH a prevenir riscos humanos?</h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Estruturamos, como política corporativa, um canal jurídico externo e confidencial para acolher 
            questões pessoais sensíveis dos colaboradores. Os atendimentos geram indicadores agregados que 
            ajudam o RH a identificar padrões de vulnerabilidade e antecipar fatores de risco psicossocial.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Unplug, title: 'Canal externo e independente', desc: 'Sem vínculo com a empresa, sem conflito de interesse. Sigilo total.' },
            { icon: Heart, title: 'Acolhimento de questões pessoais', desc: 'Triagem, orientação e encaminhamento de demandas sensíveis dos colaboradores.' },
            { icon: Brain, title: 'Inteligência preventiva para o RH', desc: 'Indicadores agregados e anonimizados que antecipam riscos psicossociais.' },
          ].map((item, i) => (
            <Card key={i} className="h-full text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#4A9FD8]/15 flex items-center justify-center mx-auto">
                <item.icon className="h-7 w-7 text-[#4A9FD8]" />
              </div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  // 5 — Impacto positivo (4 colunas)
  {
    gradient: 'linear-gradient(160deg, #1e2d5e 0%, #2C3E7D 60%, #253570 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">O impacto</p>
          <h2 className="text-3xl md:text-4xl font-bold">O impacto positivo</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: ShieldCheck, title: 'Para o RH', points: ['Menos relatos delicados no dia a dia', 'Apoio à gestão de pessoas e mediação inicial', 'Foco nas demandas estratégicas', 'Fortalecimento do employer branding'] },
            { icon: Users, title: 'Para os Gestores', points: ['Deixam de mediar problemas pessoais', 'Menos desgaste emocional', 'Relação profissional preservada', 'Aderência à prevenção de riscos psicossociais (NR-1)'] },
            { icon: UserCheck, title: 'Para os Colaboradores', points: ['Orientação sem custo no atendimento inicial', 'Decisões importantes com mais clareza', 'Canal confidencial e sem julgamento', 'Conteúdos educativos preventivos'] },
            { icon: Building2, title: 'Para a Organização', points: ['Indicadores agregados de riscos humanos e psicossociais', 'Clima organizacional mais saudável', 'Conformidade com a Nova NR-01', 'Diferencial competitivo na atração de talentos'] },
          ].map((col, i) => (
             <Card key={i} className="h-full">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A9FD8] to-[#4A9FD8]/60 flex items-center justify-center shrink-0">
                    <col.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-xl">{col.title}</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {col.points.map((p) => (
                    <span key={p} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A9FD8]/60 shrink-0" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  // 6 — Como funciona (3 passos)
  {
    gradient: 'linear-gradient(135deg, #2C3E7D 0%, #1a2654 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Jornada</p>
          <h2 className="text-3xl md:text-4xl font-bold">Como funciona</h2>
        </div>
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          {[
            { step: '1', title: 'O Colaborador entra em contato direto', desc: 'Via WhatsApp ou aplicativo, de forma simples e confidencial.' },
            { step: '2', title: 'Equipe treinada acolhe e organiza a demanda', desc: 'Recebe orientação informativa em linguagem clara e acessível sobre direitos e caminhos possíveis.' },
            { step: '3', title: 'Situação é encaminhada adequadamente', desc: 'Quando necessário, é encaminhado a advogado, sem sobrecarregar a empresa.' },
          ].map((s, i) => (
            <div key={i} className="flex-1 flex flex-col md:flex-row items-center gap-4">
               <Card className="h-full flex-1 w-full text-center space-y-3 min-h-[220px] flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#4A9FD8] text-white flex items-center justify-center text-xl font-bold mx-auto">
                  {s.step}
                </div>
                <h3 className="font-semibold text-base">{s.title}</h3>
                <p className="text-sm text-white/60">{s.desc}</p>
              </Card>
              {i < 2 && (
                <>
                  <ChevronRight className="hidden md:block h-8 w-8 text-white/20 shrink-0" />
                  <ChevronDown className="md:hidden h-8 w-8 text-white/20" />
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
          <Clock className="h-4 w-4 text-[#4A9FD8]" />
          <span>Primeiro retorno em até 1 dia útil</span>
        </div>
      </div>
    ),
  },
  // 7 — Alinhamento NR-01
  {
    gradient: 'linear-gradient(150deg, #253570 0%, #2C3E7D 100%)',
    render: () => (
      <div className="max-w-3xl w-full space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Conformidade</p>
          <h2 className="text-3xl md:text-4xl font-bold">Alinhamento com a NR-01</h2>
        </div>
        <Card className="space-y-5">
          <p className="text-base leading-relaxed text-white/70">
            A atualização da NR-01 amplia a necessidade de <strong className="text-[#4A9FD8]">gestão de riscos psicossociais</strong> no ambiente de trabalho. 
            A Juripass contribui oferecendo suporte preventivo e identificando padrões de risco por meio de dados anonimizados.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'Suporte preventivo estruturado',
              'Identificação de padrões de risco',
              'Aderência a políticas de bem-estar',
            ].map((t) => (
              <div key={t} className="flex items-center gap-3 p-3 rounded-xl bg-[#4A9FD8]/10 border border-[#4A9FD8]/20">
                <BadgeCheck className="h-5 w-5 text-[#4A9FD8] shrink-0" />
                <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    ),
  },
  // 8 — Confidencialidade e LGPD
  {
    gradient: 'linear-gradient(140deg, #1e2d5e 0%, #2C3E7D 100%)',
    render: () => (
      <div className="max-w-3xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Segurança</p>
          <h2 className="text-3xl md:text-4xl font-bold">Confidencialidade e LGPD</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: Lock, text: 'O conteúdo dos atendimentos não é compartilhado com a empresa' },
            { icon: Shield, text: 'A empresa recebe apenas dados estatísticos agregados e anonimizados' },
            { icon: Users, text: 'Os dados pertencem ao colaborador' },
            { icon: Scale, text: 'Sigilo profissional e controles de segurança da informação' },
          ].map((item, i) => (
            <Card key={i} className="h-full">
              <div className="flex items-start gap-4">
                <IconBox icon={item.icon} />
                <p className="text-white/70 text-sm leading-relaxed pt-1">{item.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  // 9 — Implantação
  {
    gradient: 'linear-gradient(135deg, #2C3E7D 0%, #344785 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Implementação</p>
          <h2 className="text-3xl md:text-4xl font-bold">Implantação simples</h2>
        </div>
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          {[
            { step: '1', title: 'Kick-off', desc: 'Reunião de alinhamento e planejamento com RH' },
            { step: '2', title: 'Comunicação', desc: 'Material de comunicação interna e treinamento da equipe' },
            { step: '3', title: 'Ativação', desc: 'Acompanhamento de engajamento e suporte contínuo' },
          ].map((s, i) => (
            <div key={i} className="flex-1 flex flex-col md:flex-row items-center gap-3">
              <Card className="h-full flex-1 w-full text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#4A9FD8] text-white flex items-center justify-center text-xl font-bold mx-auto">
                  {s.step}
                </div>
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-white/60">{s.desc}</p>
              </Card>
              {i < 2 && (
                <>
                  <ChevronRight className="hidden md:block h-6 w-6 text-white/20 shrink-0" />
                  <ChevronDown className="md:hidden h-6 w-6 text-white/20" />
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 text-sm text-white/50">
          <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#4A9FD8]" /> Até 15 dias para ativação</span>
          <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#4A9FD8]" /> Sem taxa de implantação</span>
        </div>
      </div>
    ),
  },
  // 10 — Escopo e Limitações
  {
    gradient: 'linear-gradient(150deg, #1e2d5e 0%, #2C3E7D 50%, #253570 100%)',
    render: () => (
      <div className="max-w-3xl w-full space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Transparência</p>
          <h2 className="text-3xl md:text-4xl font-bold">Escopo e Limitações</h2>
        </div>
        <Card className="space-y-5">
          <p className="text-base leading-relaxed text-white/70">
            O atendimento consiste em orientação inicial de caráter informativo, não substituindo consulta jurídica formal, parecer jurídico ou atuação profissional.
          </p>
          <ul className="space-y-3 text-white/60 text-sm">
            {[
              'Não inclui elaboração de peças processuais',
              'Não inclui análise aprofundada de contratos complexos',
              'Não inclui representação judicial ou administrativa',
              'O atendimento inicial não gera custo ao colaborador',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-[#4A9FD8] mt-0.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 pt-4">
            <p className="text-xs text-white/40 leading-relaxed">
              Eventuais serviços advocatícios são contratados diretamente entre colaborador e advogado escolhido, 
              conforme critérios do profissional e tabela da OAB, sem qualquer custo ou responsabilidade para a empresa.
            </p>
          </div>
        </Card>
      </div>
    ),
  },
  // 11 — Encerramento
  {
    gradient: 'linear-gradient(160deg, #2C3E7D 0%, #1a2654 60%, #2C3E7D 100%)',
    render: () => (
      <div className="max-w-3xl w-full space-y-8 text-center">
        <img 
          src="/images/branding/juripass-logo-white.png" 
          alt="Juripass" 
          className="h-14 md:h-16 object-contain mx-auto"
        />
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold">
            Com prevenção e monitoramento de riscos humanos, a empresa amplia sua política de cuidado com o colaborador
          </h2>
          <p className="text-white/60 text-lg">
            Permanecemos à disposição para esclarecimentos e eventuais adequações.
          </p>
        </div>
        <div className="w-24 h-1 bg-[#4A9FD8] mx-auto rounded-full" />
        <div className="flex flex-col items-center gap-2 text-sm text-white/50">
          <p className="font-semibold text-white">Frederico Werneck — Diretor</p>
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
    <div className={`${standalone ? 'min-h-screen' : 'fixed inset-0 z-50'} bg-[#2C3E7D] flex flex-col`}>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .slides-print-container, .slides-print-container * { visibility: visible !important; }
          .slides-print-container { 
            position: absolute; left: 0; top: 0; width: 100%;
          }
          .slide-print-page {
            page-break-after: always;
            width: 100vw; height: 100vh;
            display: flex; align-items: center; justify-content: center;
          }
          .print-hidden { display: none !important; }
          @page { size: landscape; margin: 0; }
        }
      `}</style>

      {/* Progress bar */}
      <div className="h-1 w-full bg-white/5 print-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#4A9FD8] to-[#4A9FD8]/60"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 print-hidden">
        <img 
          src="/images/branding/juripass-logo-white.png" 
          alt="Juripass" 
          className="h-8 object-contain"
        />
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/50 font-medium tabular-nums">
            {current + 1} / {slides.length}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => window.print()}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <Download className="h-4 w-4 mr-1" />
            Baixar PDF
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white/60 hover:text-white hover:bg-white/10">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Slide Content - Interactive */}
      <div className="flex-1 relative overflow-hidden print-hidden">
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
            <SlideWrapper gradient={slide.gradient}>
              {slide.render()}
            </SlideWrapper>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Print-only: all slides */}
      <div className="hidden slides-print-container">
        {slides.map((s, i) => (
          <div key={i} className="slide-print-page">
            <SlideWrapper gradient={s.gradient}>
              {s.render()}
            </SlideWrapper>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 print-hidden">
        <Button variant="ghost" size="sm" onClick={prev} disabled={current === 0} className="text-white/60 hover:text-white hover:bg-white/10 disabled:text-white/20">
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
                  ? 'w-6 bg-[#4A9FD8]' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <Button variant="ghost" size="sm" onClick={next} disabled={current === slides.length - 1} className="text-white/60 hover:text-white hover:bg-white/10 disabled:text-white/20">
          Próximo
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
