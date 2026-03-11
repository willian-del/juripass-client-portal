import { Button } from '@/components/ui/button';
import { Printer, X, ChevronLeft, ChevronRight, Phone, MessageSquare, Check, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface PostersViewerProps {
  standalone?: boolean;
  onClose?: () => void;
  posterId?: string;
}

const WHATSAPP_NUMBER = '(11) 5039-5554';
const WHATSAPP_LINK = 'https://wa.me/551150395554';
const QR_SRC = '/images/branding/qrcode-whatsapp.png';

/* ── poster data ── */
type PosterData = {
  id: string;
  title: string;
  subtitle: string;
  sectionTitle: string;
  items: string[];
  steps: { num: number; title: string; desc: string }[];
  note: string;
};

const posters: PosterData[] = [
  {
    id: 'family',
    title: 'Problemas de família?',
    subtitle: 'Pensão, guarda dos filhos ou separação podem ser momentos difíceis. Você não precisa enfrentar isso sozinho.',
    sectionTitle: 'PODEMOS AJUDAR COM',
    items: ['Pensão alimentícia — pagar ou receber', 'Guarda dos filhos', 'Separação ou divórcio', 'Reconhecimento de paternidade', 'Divisão de bens ou herança'],
    steps: [
      { num: 1, title: 'Abra o WhatsApp', desc: 'Mande mensagem para a Juripass' },
      { num: 2, title: 'Conte o que está acontecendo', desc: 'O atendimento é completamente confidencial' },
      { num: 3, title: 'Receba orientação jurídica', desc: 'Um advogado vai orientar você com cuidado e respeito' },
    ],
    note: 'Assuntos de família são delicados. Você merece uma orientação de qualidade, com cuidado e respeito.',
  },
  {
    id: 'debt',
    title: 'Endividado ou sendo cobrado?',
    subtitle: 'Nem toda cobrança é justa. Saiba quais são seus direitos.',
    sectionTitle: 'PODEMOS AJUDAR QUANDO VOCÊ ESTIVER ENFRENTANDO',
    items: ['Cobranças abusivas', 'Nome negativado', 'Dívidas com banco ou cartão', 'Juros excessivos', 'Renegociação de dívidas'],
    steps: [
      { num: 1, title: 'Abra o WhatsApp', desc: 'Mande mensagem para a Juripass' },
      { num: 2, title: 'Explique sua situação', desc: 'Conte qual é a dívida e o que está acontecendo' },
      { num: 3, title: 'Receba orientação jurídica', desc: 'Um advogado vai analisar e orientar você' },
    ],
    note: 'Antes de pagar ou fazer um acordo, entenda quais são seus direitos.',
  },
  {
    id: 'work',
    title: 'Problemas no trabalho?',
    subtitle: 'Situações no ambiente de trabalho podem gerar muitas dúvidas.',
    sectionTitle: 'PODEMOS ORIENTAR SOBRE',
    items: ['Demissão e rescisão', 'Direitos trabalhistas', 'Assédio moral', 'Horas extras', 'Dúvidas sobre contrato de trabalho'],
    steps: [
      { num: 1, title: 'Abra o WhatsApp', desc: 'Mande mensagem para a Juripass' },
      { num: 2, title: 'Conte o que aconteceu', desc: 'Explique a situação com tranquilidade' },
      { num: 3, title: 'Receba orientação jurídica', desc: 'Um advogado vai orientar você sobre o que fazer' },
    ],
    note: 'Informação correta ajuda você a tomar decisões com mais segurança.',
  },
  {
    id: 'housing',
    title: 'Problemas com aluguel ou imóvel?',
    subtitle: 'Conflitos com proprietário ou inquilino são mais comuns do que parecem.',
    sectionTitle: 'PODEMOS AJUDAR COM',
    items: ['Problemas com contrato de aluguel', 'Aumento abusivo de aluguel', 'Despejo', 'Caução ou garantia', 'Direitos de inquilino e proprietário'],
    steps: [
      { num: 1, title: 'Abra o WhatsApp', desc: 'Mande mensagem para a Juripass' },
      { num: 2, title: 'Explique sua situação', desc: 'Conte o que está acontecendo com seu imóvel' },
      { num: 3, title: 'Receba orientação jurídica', desc: 'Um advogado vai orientar você sobre seus direitos' },
    ],
    note: 'Conhecer seus direitos pode evitar muitos problemas.',
  },
  {
    id: 'consumer',
    title: 'Comprou algo e teve problema?',
    subtitle: 'Você tem direitos como consumidor.',
    sectionTitle: 'PODEMOS AJUDAR EM SITUAÇÕES COMO',
    items: ['Produto com defeito', 'Serviço que não foi entregue', 'Cobrança indevida', 'Cancelamento de contrato', 'Problemas com garantia'],
    steps: [
      { num: 1, title: 'Abra o WhatsApp', desc: 'Mande mensagem para a Juripass' },
      { num: 2, title: 'Conte o que aconteceu', desc: 'Se tiver nota fiscal ou foto, pode enviar' },
      { num: 3, title: 'Receba orientação jurídica', desc: 'Um advogado vai explicar o que você pode fazer' },
    ],
    note: 'Muitas situações podem ser resolvidas quando você conhece seus direitos.',
  },
];

/* ── Helper components ── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold tracking-[0.15em] uppercase text-[#2C3E7D] print:text-black">
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="border-t border-gray-200" />;
}

/* ── Shared header band ── */
function PosterHeader({ tagline }: { tagline: string }) {
  return (
    <div className="bg-[#2C3E7D] px-8 py-6 flex items-center justify-between">
      <img src="/images/branding/juripass-logo-white.png" alt="Juripass" className="h-10 object-contain" />
      <p className="text-white/60 text-sm text-right">{tagline}</p>
    </div>
  );
}

/* ── Shared footer band ── */
function PosterFooter() {
  return (
    <>
      <div className="bg-[#2C3E7D] px-8 py-5 flex items-center justify-between gap-6">
        <div className="flex-1 space-y-2 text-white">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/70">FALE CONOSCO VIA WHATSAPP</p>
          <p className="text-lg font-bold flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {WHATSAPP_NUMBER}
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white no-underline bg-[#4A9FD8] hover:opacity-90 transition-opacity print:bg-gray-600"
          >
            <MessageSquare className="h-4 w-4" />
            Abrir conversa no WhatsApp →
          </a>
          <p className="text-[10px] text-white/50 mt-1">
            Não ligue nem envie SMS. O atendimento é exclusivamente via WhatsApp.
          </p>
        </div>
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <img src={QR_SRC} alt="QR Code WhatsApp Juripass" className="w-20 h-20 rounded-lg bg-white p-1" />
          <span className="text-[10px] text-white/70 text-center tracking-wide font-medium leading-tight">
            ESCANEIE PARA FALAR<br />COM UM ADVOGADO
          </span>
        </div>
      </div>
      <div className="bg-[#5B8EC9] px-8 py-3 flex items-center justify-between">
        <img src="/images/branding/juripass-logo-stacked-white.png" alt="Juripass" className="h-7" />
        <div className="text-right text-white">
          <p className="text-xs font-semibold tracking-wide uppercase">Acolhimento jurídico na palma da sua mão</p>
          <p className="text-[10px] opacity-70 mt-0.5">Dúvidas? Procure o RH da empresa.</p>
        </div>
      </div>
    </>
  );
}

/* ── Shared steps section ── */
function StepsSection({ steps }: { steps: { num: number; title: string; desc: string }[] }) {
  return (
    <section className="space-y-3">
      <SectionTitle>COMO PEDIR AJUDA</SectionTitle>
      <div className="grid grid-cols-3 gap-4">
        {steps.map((s) => (
          <div key={s.num} className="text-center space-y-1">
            <div className="w-9 h-9 rounded-full bg-[#4A9FD8] text-white flex items-center justify-center text-sm font-bold mx-auto print:bg-gray-700">
              {s.num}
            </div>
            <p className="text-sm font-semibold text-[#2C3E7D]">{s.title}</p>
            <p className="text-xs text-gray-500 leading-tight">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Single Thematic Poster ── */
function Poster({ data }: { data: PosterData }) {
  return (
    <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-white print:shadow-none shadow-lg my-4 print:my-0 flex flex-col" data-poster-root>
      <PosterHeader tagline="Acolhimento jurídico para colaboradores" />

      <div className="flex-1 flex flex-col justify-between px-10 py-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold leading-tight text-[#2C3E7D] print:text-black">{data.title}</h1>
          <p className="text-lg leading-relaxed text-gray-500">{data.subtitle}</p>
        </div>

        <Divider />

        <section className="space-y-3">
          <SectionTitle>{data.sectionTitle}</SectionTitle>
          <ul className="space-y-2 pl-1">
            {data.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-base text-gray-700">
                <span className="w-2 h-2 rounded-full bg-[#4A9FD8] mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        <StepsSection steps={data.steps} />

        <Divider />

        <div className="rounded-md px-5 py-4 text-sm leading-relaxed border-l-4 border-[#4A9FD8] bg-[#F8FAFC] text-gray-600">
          {data.note}
        </div>

        <p className="text-center text-base font-semibold italic text-[#2C3E7D]">
          Atendimento confidencial e sem julgamentos.
        </p>
      </div>

      <PosterFooter />
    </div>
  );
}

/* ── Institutional Poster ── */
function InstitutionalPoster() {
  const situations = [
    { label: 'Problemas de família', detail: 'pensão, separação, guarda dos filhos' },
    { label: 'Dívidas e cobranças', detail: 'nome negativado, renegociação de dívidas' },
    { label: 'Problemas com compras ou serviços', detail: 'produto com defeito, cobrança indevida' },
    { label: 'Questões relacionadas a aluguel ou moradia', detail: '' },
    { label: 'Dúvidas jurídicas sobre situações do cotidiano', detail: '' },
  ];

  const included = [
    'Orientação jurídica com advogado',
    'Esclarecimento de dúvidas',
    'Explicação dos seus direitos',
    'Avaliação inicial da situação',
  ];

  const excluded = [
    'Direito trabalhista',
    'Direito criminal ou penal',
    'Denúncias ou situações ligadas ao Código de Ética da empresa',
  ];

  const steps = [
    { num: 1, title: 'Abra o WhatsApp', desc: 'Mande mensagem para a Juripass' },
    { num: 2, title: 'Conte brevemente o que está acontecendo', desc: 'O atendimento é confidencial' },
    { num: 3, title: 'Receba orientação de um advogado', desc: 'De forma simples e acolhedora' },
  ];

  return (
    <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-white print:shadow-none shadow-lg my-4 print:my-0 flex flex-col" data-poster-root>
      <PosterHeader tagline="Benefício jurídico disponível para colaboradores desta empresa" />

      <div className="flex-1 flex flex-col justify-between px-10 py-6 gap-3">
        {/* Headline */}
        <div className="text-center space-y-1.5">
          <h1 className="text-3xl font-extrabold leading-tight text-[#2C3E7D] print:text-black">
            Tem dúvidas ou problemas jurídicos<br />no seu dia a dia?
          </h1>
          <p className="text-base leading-relaxed text-gray-500">
            A Juripass pode orientar você. Converse com um advogado para entender seus direitos e saber quais são suas opções.
          </p>
        </div>

        <Divider />

        {/* O que é */}
        <section className="space-y-1.5">
          <SectionTitle>O QUE É A JURIPASS</SectionTitle>
          <p className="text-sm text-gray-600 leading-relaxed">
            A Juripass é um canal de orientação jurídica oferecido pela empresa para ajudar colaboradores e seus familiares em situações jurídicas do dia a dia.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Você pode conversar com um advogado e receber orientação clara, segura e confidencial.
          </p>
        </section>

        <Divider />

        {/* Situações */}
        <section className="space-y-2">
          <SectionTitle>EM QUAIS SITUAÇÕES PODEMOS AJUDAR</SectionTitle>
          <ul className="space-y-1.5 pl-1">
            {situations.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="w-2 h-2 rounded-full bg-[#4A9FD8] mt-1.5 shrink-0" />
                <span>
                  <strong>{s.label}</strong>
                  {s.detail && <span className="text-gray-500"> ({s.detail})</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* Incluído / Não incluído — side by side */}
        <div className="grid grid-cols-2 gap-6">
          <section className="space-y-2">
            <SectionTitle>O QUE ESTÁ INCLUÍDO</SectionTitle>
            <ul className="space-y-1.5">
              {included.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-[#4A9FD8] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs font-semibold text-[#2C3E7D] mt-1">
              Primeiro atendimento gratuito e confidencial.
            </p>
          </section>

          <section className="space-y-2">
            <SectionTitle>O QUE NÃO ESTÁ INCLUÍDO</SectionTitle>
            <ul className="space-y-1.5">
              {excluded.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-1">
              Esses temas devem ser tratados pelos canais internos da empresa ou pelas autoridades competentes.
            </p>
          </section>
        </div>

        <Divider />

        {/* Passos */}
        <StepsSection steps={steps} />

        {/* Nota de acolhimento */}
        <div className="rounded-md px-5 py-3 text-sm leading-relaxed border-l-4 border-[#4A9FD8] bg-[#F8FAFC] text-gray-600">
          Problemas jurídicos fazem parte da vida. Ter orientação adequada ajuda você a tomar decisões com mais segurança.
        </div>

        <p className="text-center text-base font-semibold italic text-[#2C3E7D]">
          Atendimento confidencial e sem julgamentos.
        </p>
      </div>

      <PosterFooter />
    </div>
  );
}

/* ── Poster ID to label map ── */
const POSTER_LABELS: Record<string, string> = {
  institutional: 'Cartaz Institucional',
  family: 'Família',
  debt: 'Endividamento',
  work: 'Trabalho',
  housing: 'Aluguel e Imóvel',
  consumer: 'Consumo',
};

/* ── All poster IDs in display order ── */
const ALL_POSTER_IDS = ['institutional', ...posters.map((p) => p.id)];

/* ── Main component ── */
export function PostersViewer({ standalone, onClose, posterId }: PostersViewerProps) {
  const visibleIds = posterId ? [posterId] : ALL_POSTER_IDS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSingle = visibleIds.length === 1;
  const currentId = visibleIds[isSingle ? 0 : currentIndex];

  const label = posterId
    ? `Cartaz — ${POSTER_LABELS[posterId] || posterId}`
    : 'Cartazes Informativos';

  const renderPoster = (id: string) => {
    if (id === 'institutional') return <InstitutionalPoster />;
    const data = posters.find((p) => p.id === id);
    return data ? <Poster data={data} /> : null;
  };

  return (
    <div className={standalone ? 'min-h-screen bg-muted/40' : 'h-full overflow-auto bg-muted/40'}>
      {/* Top bar */}
      <div className="print:hidden sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <span className="text-sm text-gray-500">{label}</span>
        <div className="flex items-center gap-3">
          {!isSingle && (
            <div className="flex items-center gap-1 mr-2">
              <Button variant="ghost" size="sm" disabled={currentIndex === 0} onClick={() => setCurrentIndex((i) => i - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground min-w-[60px] text-center">
                {currentIndex + 1} / {visibleIds.length}
              </span>
              <Button variant="ghost" size="sm" disabled={currentIndex === visibleIds.length - 1} onClick={() => setCurrentIndex((i) => i + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Button size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-1" />
            Imprimir / Salvar como PDF
          </Button>
          {onClose && (
            <>
              <div className="w-px h-6 bg-gray-200" />
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Poster */}
      <div className="py-8 print:py-0">
        {renderPoster(currentId)}
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          html, body { overflow: visible !important; margin: 0 !important; padding: 0 !important; }
          body > *:not(#root) { display: none !important; }
          .print\\:hidden { display: none !important; }
          nav, header, footer, [data-sidebar], [role="banner"] { display: none !important; }
          *::-webkit-scrollbar { display: none !important; }
          * { scrollbar-width: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          [data-poster-root] { box-shadow: none !important; page-break-inside: avoid; min-height: 297mm; width: 210mm; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>
    </div>
  );
}
