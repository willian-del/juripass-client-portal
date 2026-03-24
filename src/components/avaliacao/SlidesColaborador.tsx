import { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, X, ArrowRight,
  Shield, Users, Heart, Scale, Lock,
  Clock, BadgeCheck, Phone, Mail, Globe,
  Download, ChevronDown, MessageCircle, Gavel,
  BadgePercent, ShieldCheck, CheckCircle2, Gift, BookOpen,
  ShoppingBag, Home, Wallet, FileText, HeartPulse,
  UserCheck, Loader2
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
            Seu novo{' '}
            <span className="text-[#4A9FD8]">benefício jurídico</span>
          </h1>
          <div className="w-24 h-1 bg-[#4A9FD8] mx-auto rounded-full" />
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            Apoio jurídico acessível, confidencial e sem custo no atendimento inicial — 
            um benefício oferecido pela sua empresa para cuidar de você.
          </p>
        </div>
      </div>
    ),
  },
  // 2 — O problema
  {
    gradient: 'linear-gradient(145deg, #253570 0%, #2C3E7D 50%, #1e2d5e 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">O desafio</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Problemas jurídicos fazem parte da vida.
            <br />
            <span className="text-[#4A9FD8]">Resolvê-los não precisa ser complicado.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Wallet, title: 'Dívidas e cobranças', desc: 'Negativações indevidas, renegociações e contratos abusivos que geram estresse no dia a dia.' },
            { icon: Users, title: 'Conflitos familiares', desc: 'Divórcio, pensão alimentícia, guarda de filhos — situações sensíveis que afetam o emocional.' },
            { icon: ShoppingBag, title: 'Problemas de consumo', desc: 'Produtos com defeito, cobranças indevidas e serviços não prestados que precisam de solução.' },
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
          Quando problemas pessoais não encontram orientação, eles crescem — e impactam sua saúde, suas relações e sua produtividade.
        </p>
      </div>
    ),
  },
  // 3 — O que é a Juripass
  {
    gradient: 'linear-gradient(135deg, #2C3E7D 0%, #344785 50%, #1e2d5e 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">A solução</p>
          <h2 className="text-3xl md:text-4xl font-bold">O que é a Juripass?</h2>
          <p className="text-lg text-white/60 leading-relaxed">
            A Juripass é um programa de acolhimento jurídico oferecido pela sua empresa. 
            Um canal externo, independente e confidencial onde você pode buscar orientação sobre questões 
            jurídicas pessoais — sem custo no atendimento inicial e sem que a empresa tenha acesso ao conteúdo.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Shield, title: 'Canal externo e confidencial', desc: 'Sem vínculo com a empresa. Suas informações são protegidas por sigilo profissional.' },
            { icon: Heart, title: 'Sem custo no atendimento inicial', desc: 'A orientação jurídica informativa é parte do seu benefício, sem nenhum custo para você.' },
            { icon: Scale, title: 'Advogados especializados', desc: 'Acesso a profissionais qualificados em diversas áreas do direito para te orientar.' },
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
  // 4 — Cobertura
  {
    gradient: 'linear-gradient(150deg, #1e2d5e 0%, #2C3E7D 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Áreas de atuação</p>
          <h2 className="text-3xl md:text-4xl font-bold">Cobertura completa</h2>
          <p className="text-white/60">Orientação jurídica nas principais áreas do direito que afetam o seu dia a dia</p>
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
            <Card key={i} className="h-full">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A9FD8] to-[#4A9FD8]/60 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">{item.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  // 5 — Vantagens para o colaborador
  {
    gradient: 'linear-gradient(160deg, #1e2d5e 0%, #2C3E7D 60%, #253570 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Benefícios</p>
          <h2 className="text-3xl md:text-4xl font-bold">Vantagens para você</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: MessageCircle, title: 'Atendimento rápido e sem complicações' },
            { icon: Gavel, title: 'Contato direto com o seu advogado' },
            { icon: Scale, title: 'Diferentes especialidades e áreas de atuação' },
            { icon: BadgePercent, title: 'Honorários apenas em casos de sucesso' },
            { icon: ShieldCheck, title: 'Confidencialidade e sigilo das informações' },
            { icon: CheckCircle2, title: 'Agilidade e praticidade' },
            { icon: Gift, title: 'Benefício oferecido pela empresa' },
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
  // 6 — Como funciona
  {
    gradient: 'linear-gradient(135deg, #2C3E7D 0%, #1a2654 100%)',
    render: () => (
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Jornada</p>
          <h2 className="text-3xl md:text-4xl font-bold">Como funciona</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
          {[
            { step: '1', title: 'Entre em contato', desc: 'Via WhatsApp ou aplicativo, de forma simples e direta.' },
            { step: '2', title: 'Receba orientação', desc: 'Uma equipe treinada acolhe e organiza sua demanda com empatia.' },
            { step: '3', title: 'Compreenda seus caminhos', desc: 'Receba orientação clara sobre seus direitos e opções disponíveis.' },
            { step: '4', title: 'Encaminhamento formal', desc: 'Se necessário, é encaminhado a um advogado especialista.' },
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
  // 7 — Confidencialidade
  {
    gradient: 'linear-gradient(140deg, #1e2d5e 0%, #2C3E7D 100%)',
    render: () => (
      <div className="max-w-3xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Segurança</p>
          <h2 className="text-3xl md:text-4xl font-bold">Confidencialidade total</h2>
          <p className="text-white/60 text-lg">Suas informações são protegidas por sigilo profissional e pela LGPD</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: Lock, text: 'O conteúdo dos seus atendimentos não é compartilhado com a empresa' },
            { icon: Shield, text: 'A empresa não tem acesso a nenhum dado individual sobre seus atendimentos' },
            { icon: UserCheck, text: 'Os dados pertencem exclusivamente a você, o colaborador' },
            { icon: Scale, text: 'Sigilo profissional garantido por lei e controles de segurança da informação' },
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
  // 8 — Temas atendidos
  {
    gradient: 'linear-gradient(150deg, #253570 0%, #2C3E7D 100%)',
    render: () => (
      <div className="max-w-3xl w-full space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#4A9FD8]">Exemplos</p>
          <h2 className="text-3xl md:text-4xl font-bold">Temas que podemos ajudar</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: Wallet, label: 'Dívidas e cobranças' },
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
            Mesmo que sua dúvida não se encaixe em nenhuma dessas categorias, entre em contato. 
            Nossa equipe pode orientar você sobre os próximos passos.
          </p>
        </Card>
      </div>
    ),
  },
  // 9 — Encerramento
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
            Cuidar de você é cuidar do que importa
          </h2>
          <p className="text-white/60 text-lg">
            Sua empresa oferece este benefício porque acredita no seu bem-estar. 
            Use-o sempre que precisar — com confiança e sem julgamentos.
          </p>
        </div>
        <div className="w-24 h-1 bg-[#4A9FD8] mx-auto rounded-full" />
        <div className="flex flex-col items-center gap-2 text-sm text-white/50">
          <p className="font-semibold text-white">Juripass — Benefício Jurídico Corporativo</p>
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
          backgroundColor: '#E8F0FE',
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
    <div className={`${standalone ? 'min-h-screen' : 'fixed inset-0 z-50'} bg-[#E8F0FE] flex flex-col`}>
      {/* Progress bar */}
      <div className="h-1 w-full bg-[#2C3E7D]/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#4A9FD8] to-[#4A9FD8]/60"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#2C3E7D]/10">
        <img
          src="/images/branding/juripass-logo-full.png"
          alt="Juripass"
          className="h-10 object-contain"
        />
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#2C3E7D]/60 font-medium tabular-nums">
            {current + 1} / {slides.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExportPDF}
            disabled={isExporting}
            className="text-[#2C3E7D]/70 hover:text-[#2C3E7D] hover:bg-[#2C3E7D]/10"
          >
            {isExporting ? (
              <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Exportando...</>
            ) : (
              <><Download className="h-4 w-4 mr-1" /> Baixar PDF</>
            )}
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="text-[#2C3E7D]/70 hover:text-[#2C3E7D] hover:bg-[#2C3E7D]/10">
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
      <div className="flex items-center justify-between px-6 py-3 border-t border-[#2C3E7D]/10">
        <Button variant="ghost" size="sm" onClick={prev} disabled={current === 0} className="text-[#2C3E7D]/70 hover:text-[#2C3E7D] hover:bg-[#2C3E7D]/10 disabled:text-[#2C3E7D]/20">
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
                  : 'w-2 bg-[#2C3E7D]/20 hover:bg-[#2C3E7D]/40'
              }`}
            />
          ))}
        </div>

        <Button variant="ghost" size="sm" onClick={next} disabled={current === slides.length - 1} className="text-[#2C3E7D]/70 hover:text-[#2C3E7D] hover:bg-[#2C3E7D]/10 disabled:text-[#2C3E7D]/20">
          Próximo
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
