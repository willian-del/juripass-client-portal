import { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, X, ArrowRight,
  Shield, Users, Heart, Scale, Lock,
  Clock, BadgeCheck, Phone, Mail, Globe,
  Download, ChevronDown, MessageCircle, Gavel,
  BadgePercent, ShieldCheck, CheckCircle2, Gift, BookOpen,
  ShoppingBag, Home, Wallet, FileText, HeartPulse,
  UserCheck, Loader2, XCircle, Briefcase, AlertTriangle,
  BarChart3, Eye, GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

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
            Programa Juripass{' '}
            <span className="text-[#4A9FD8]">para Colaboradores</span>
          </h1>
          <div className="w-24 h-1 bg-[#4A9FD8] mx-auto rounded-full" />
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            Como o benefício jurídico funciona na prática — e por que ele é o canal ideal
            para mensurar riscos humanos.
          </p>
        </div>
      </div>
    ),
  },
  // 2 — O problema (para o RH)
  {
    gradient: 'linear-gradient(145deg, #253570 0%, #2C3E7D 50%, #1e2d5e 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">O desafio</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Problemas pessoais dos colaboradores{' '}
            <span className="text-[#4A9FD8]">impactam o ambiente de trabalho</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Wallet, title: 'Endividamento e dívidas', desc: 'Colaboradores com problemas financeiros apresentam maior absenteísmo, distração e queda de produtividade.' },
            { icon: Users, title: 'Conflitos familiares', desc: 'Divórcio, guarda de filhos e pensão alimentícia geram estresse emocional que transborda para o trabalho.' },
            { icon: ShoppingBag, title: 'Problemas de consumo', desc: 'Golpes, fraudes e cobranças indevidas consomem tempo e energia dos colaboradores, gerando demandas ao RH.' },
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
        <p className="text-white/50 text-center text-sm">
          Quando o colaborador não encontra orientação, o problema cresce — e se transforma em absenteísmo, presenteísmo e turnover.
        </p>
      </div>
    ),
  },
  // 3 — Canal de Acolhimento Jurídico (o benefício)
  {
    gradient: 'linear-gradient(135deg, #2C3E7D 0%, #344785 50%, #1e2d5e 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">O Benefício</p>
          <h2 className="text-3xl md:text-4xl font-bold">Canal de Acolhimento Jurídico</h2>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Um benefício que o colaborador tem interesse real em utilizar — orientação jurídica gratuita para questões pessoais do dia a dia.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: BookOpen, text: 'Orientação sobre dívidas, família, moradia, consumo e contratos' },
            { icon: Heart, text: 'Atendimento humano, confidencial e acessível, com linguagem simples e prática' },
            { icon: Shield, text: 'Sem custo inicial ao colaborador' },
            { icon: GraduationCap, text: 'Treinamentos e conteúdos educativos sobre direitos e prevenção' },
            { icon: Clock, text: 'Primeiro retorno em até 1 dia útil' },
            { icon: UserCheck, text: 'Canal externo e independente — sem vínculo com a empresa' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4A9FD8]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <item.icon className="h-5 w-5 text-[#4A9FD8]" />
              </div>
              <p className="text-white/80 text-base leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-white/40 text-sm italic leading-relaxed text-center max-w-2xl mx-auto">
          Caso necessário, o colaborador poderá contratar diretamente um advogado de sua confiança,
          inclusive entre os parceiros da Juripass, sem qualquer custo ou responsabilidade para a empresa.
        </p>
      </div>
    ),
  },
  // 4 — Por que este canal é o melhor para mensuração de risco humano
  {
    gradient: 'linear-gradient(140deg, #1e2d5e 0%, #2C3E7D 60%, #253570 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">{"\n"}</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            O mesmo canal que acolhe{' '}
            <span className="text-[#4A9FD8]">é o que mensura</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Ao oferecer um benefício que o colaborador quer usar, a empresa cria um canal ativo e confiável para mensurar riscos humanos em múltiplas frentes.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: BarChart3,
              title: 'Pulsos e Pesquisas',
              desc: 'O canal ativo permite coletar pulsos periódicos e pesquisas qualitativas sobre o clima e vulnerabilidades dos colaboradores.',
            },
            {
              icon: Shield,
              title: 'Canal de Denúncias e Integridade',
              desc: 'O mesmo canal serve como via segura e independente para relatos de assédio, discriminação e desvios de conduta.',
            },
            {
              icon: Eye,
              title: 'Indicadores de Risco Humano',
              desc: 'Dados anonimizados e agregados alimentam relatórios que permitem ao RH identificar padrões de vulnerabilidade e agir preventivamente.',
            },
          ].map((item, i) => (
            <Card key={i} className="h-full text-center space-y-4 p-6">
              <div className="w-14 h-14 rounded-full bg-[#4A9FD8]/15 flex items-center justify-center mx-auto">
                <item.icon className="h-7 w-7 text-[#4A9FD8]" />
              </div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
        <Card className="bg-[#4A9FD8]/10 border-[#4A9FD8]/30 text-center py-4 px-6">
          <p className="text-white/80 text-sm leading-relaxed">
            <span className="font-semibold text-[#4A9FD8]">Por que funciona:</span> Diferente de pesquisas de clima tradicionais, o colaborador já está engajado porque o canal resolve problemas reais dele. O RH ganha visibilidade sem precisar "empurrar" mais uma ferramenta.
          </p>
        </Card>
      </div>
    ),
  },
  // 4 — Cobertura
  {
    gradient: 'linear-gradient(150deg, #1e2d5e 0%, #2C3E7D 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Áreas de atuação</p>
          <h2 className="text-3xl md:text-4xl font-bold">Áreas cobertas pelo programa</h2>
          <p className="text-white/60">Orientação jurídica nas principais áreas do direito que afetam o dia a dia do colaborador</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: ShoppingBag, title: 'Direito do Consumidor', desc: 'Cobranças indevidas, produtos com defeito, cancelamentos e contratos abusivos.' },
            { icon: Users, title: 'Divórcio e Pensão', desc: 'Separação, guarda dos filhos, pensão alimentícia e acordos familiares.' },
            { icon: Home, title: 'Propriedade e Moradia', desc: 'Aluguel, compra e venda de imóveis, conflitos com vizinhança e condomínio.' },
            { icon: Scale, title: 'Herança e Sucessão', desc: 'Inventário, partilha de bens, testamentos e planejamento sucessório.' },
            { icon: Shield, title: 'Responsabilidade Civil', desc: 'Acidentes, danos morais e materiais, indenizações e reparações.' },
            { icon: FileText, title: 'Contratos', desc: 'Elaboração, revisão e rescisão de contratos pessoais e comerciais.' },
          ].map((item, i) => (
            <Card key={i} className="h-full text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#4A9FD8]/15 flex items-center justify-center mx-auto">
                <item.icon className="h-6 w-6 text-[#4A9FD8]" />
              </div>
              <h3 className="font-semibold text-base">{item.title}</h3>
              <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  // 5 — Exclusões
  {
    gradient: 'linear-gradient(150deg, #2C3E7D 0%, #1e2d5e 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-400">Importante</p>
          <h2 className="text-3xl md:text-4xl font-bold">Áreas fora do escopo</h2>
          <p className="text-white/60">Algumas áreas não fazem parte do escopo do programa</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Briefcase, title: 'Direito do Trabalho', desc: 'Consultas, dúvidas, ações e reclamações trabalhistas' },
            { icon: AlertTriangle, title: 'Direito Criminal', desc: 'Processos criminais e penais' },
            { icon: FileText, title: 'Código de Ética', desc: 'Denúncias e temas relacionados ao código de ética da empresa' },
          ].map((item, i) => (
            <Card key={i} className="bg-red-500/10 border-red-500/20 text-center space-y-4 p-6">
              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mx-auto">
                <item.icon className="h-7 w-7 text-red-400" />
              </div>
              <h3 className="font-semibold text-lg text-red-300">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  // 6 — Vantagens para o colaborador (tom RH)
  {
    gradient: 'linear-gradient(160deg, #1e2d5e 0%, #2C3E7D 60%, #253570 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Benefícios</p>
          <h2 className="text-3xl md:text-4xl font-bold">Vantagens para o colaborador</h2>
          <p className="text-white/60">O que o colaborador percebe como valor ao utilizar o programa</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: MessageCircle, title: 'Atendimento rápido e sem complicações' },
            { icon: Gavel, title: 'Contato direto com advogado especializado' },
            { icon: Scale, title: 'Diferentes especialidades e áreas de atuação' },
            { icon: BadgePercent, title: 'Honorários apenas em casos de sucesso' },
            { icon: ShieldCheck, title: 'Confidencialidade e sigilo garantidos' },
            { icon: CheckCircle2, title: 'Agilidade e praticidade no atendimento' },
            { icon: Gift, title: 'Benefício sem custo para o colaborador' },
            { icon: BookOpen, title: 'Educação e consciência jurídica' },
          ].map((item, i) => (
            <Card key={i} className="text-center space-y-3 p-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A9FD8] to-[#4A9FD8]/60 flex items-center justify-center mx-auto">
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-medium text-sm leading-tight">{item.title}</h3>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  // 7 — Como funciona (jornada do colaborador, narrada em 3ª pessoa)
  {
    gradient: 'linear-gradient(135deg, #2C3E7D 0%, #1a2654 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Jornada</p>
          <h2 className="text-3xl md:text-4xl font-bold">Jornada do colaborador</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
          {[
            { step: '1', title: 'O colaborador entra em contato', desc: 'Via WhatsApp ou aplicativo, de forma simples e direta.' },
            { step: '2', title: 'A equipe acolhe a demanda', desc: 'Uma equipe treinada acolhe e organiza a demanda com empatia.' },
            { step: '3', title: 'Recebe orientação clara', desc: 'O colaborador recebe orientação sobre seus direitos e opções disponíveis.' },
            { step: '4', title: 'Encaminhamento formal', desc: 'Se necessário, é encaminhado a um advogado especialista para acompanhamento.' },
          ].map((s, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <Card className="w-full h-full min-h-[200px] p-5 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#4A9FD8] text-white flex items-center justify-center text-xl font-bold">
                  {s.step}
                </div>
                <h3 className="font-semibold text-sm min-h-[40px] flex items-center justify-center">{s.title}</h3>
                <p className="text-xs text-white/60">{s.desc}</p>
              </Card>
              {i < 3 && (
                <ChevronRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
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
  // 8 — Segurança e conformidade (tom RH)
  {
    gradient: 'linear-gradient(140deg, #1e2d5e 0%, #2C3E7D 100%)',
    render: () => (
      <div className="max-w-3xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Segurança</p>
          <h2 className="text-3xl md:text-4xl font-bold">Segurança e conformidade</h2>
          <p className="text-white/60 text-lg">A empresa recebe indicadores agregados — nunca dados individuais</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: Lock, text: 'O conteúdo dos atendimentos não é compartilhado com a empresa em nenhuma circunstância' },
            { icon: Shield, text: 'A empresa não tem acesso a dados individuais — recebe apenas indicadores agregados e anonimizados' },
            { icon: UserCheck, text: 'Os dados pertencem exclusivamente ao colaborador, conforme exigido pela LGPD' },
            { icon: BarChart3, text: 'O RH recebe relatórios de risco humano com padrões de vulnerabilidade — sem identificar indivíduos' },
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
  // 9 — Exemplos de demandas atendidas
  {
    gradient: 'linear-gradient(150deg, #253570 0%, #2C3E7D 100%)',
    render: () => (
      <div className="max-w-3xl w-full space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Exemplos</p>
          <h2 className="text-3xl md:text-4xl font-bold">Exemplos de demandas atendidas</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: Wallet, label: 'Endividamento e cobranças' },
            { icon: Users, label: 'Conflitos familiares' },
            { icon: Home, label: 'Moradia e aluguel' },
            { icon: ShoppingBag, label: 'Golpes e fraudes' },
            { icon: HeartPulse, label: 'Planos de saúde' },
            { icon: FileText, label: 'Contratos pessoais' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-[#4A9FD8]/10 border border-[#4A9FD8]/20">
              <item.icon className="h-5 w-5 text-[#4A9FD8] shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
        <Card className="text-center space-y-3">
          <p className="text-white/70 text-sm leading-relaxed">
            Mesmo que a demanda do colaborador não se encaixe nestas categorias, a equipe Juripass
            pode orientá-lo sobre os próximos passos adequados.
          </p>
        </Card>
      </div>
    ),
  },
  // 10 — Encerramento
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
            O benefício que protege o colaborador{' '}
            <span className="text-[#4A9FD8]">— e informa o RH</span>
          </h2>
          <p className="text-white/60 text-lg">
            O canal de acolhimento jurídico é a ferramenta que gera indicadores reais
            para mensuração de risco humano — sem expor dados individuais.
          </p>
        </div>
        <div className="w-24 h-1 bg-[#4A9FD8] mx-auto rounded-full" />
        <div className="flex flex-col items-center gap-2 text-sm text-white/50">
          <p className="font-semibold text-white">Juripass — Plataforma de Prevenção e Monitoramento de Riscos Humanos</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> contato@juripass.com.br</span>
            <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> juripass.com.br</span>
          </div>
        </div>
      </div>
    ),
  },
];

interface SlidesColaboradorProps {
  onClose?: () => void;
  standalone?: boolean;
}

export function SlidesColaborador({ onClose, standalone = false }: SlidesColaboradorProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

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

  const handleExportPDF = async () => {
    if (isExporting || !exportRef.current) return;
    setIsExporting(true);

    try {
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const sections = Array.from(exportRef.current.querySelectorAll('[data-pdf-section]')) as HTMLElement[];

      for (let i = 0; i < sections.length; i++) {
        const canvas = await html2canvas(sections[i], {
          scale: 1.5,
          useCORS: true,
          backgroundColor: '#FFFFFF',
          width: 1280,
          height: 720,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.75);
        const pageW = 297;
        const pageH = 210;

        const imgWidth = pageW;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const offsetY = (pageH - imgHeight) / 2;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, Math.max(0, offsetY), imgWidth, imgHeight);
      }

      pdf.save('Apresentacao_Juripass_Colaborador.pdf');
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`${standalone ? 'min-h-screen' : 'fixed inset-0 z-50'} bg-white flex flex-col`}>
      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-100">
        <motion.div
          className="h-full bg-gradient-to-r from-[#4A9FD8] to-[#4A9FD8]/60"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <img
          src="/images/branding/juripass-logo-full.png"
          alt="Juripass"
          className="h-10 object-contain"
        />
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium tabular-nums">
            {current + 1} / {slides.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExportPDF}
            disabled={isExporting}
            className="text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            {isExporting ? (
              <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Exportando...</>
            ) : (
              <><Download className="h-4 w-4 mr-1" /> Baixar PDF</>
            )}
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-800 hover:bg-gray-100">
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
            <SlideWrapper gradient={slide.gradient}>
              {slide.render()}
            </SlideWrapper>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Offscreen container for PDF export */}
      <div ref={exportRef} style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        {slides.map((s, i) => (
          <div key={i} data-pdf-section style={{ width: 1280, height: 720 }}>
            <SlideWrapper gradient={s.gradient}>
              {s.render()}
            </SlideWrapper>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
        <Button variant="ghost" size="sm" onClick={prev} disabled={current === 0} className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 disabled:text-gray-300">
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
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <Button variant="ghost" size="sm" onClick={next} disabled={current === slides.length - 1} className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 disabled:text-gray-300">
          Próximo
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
