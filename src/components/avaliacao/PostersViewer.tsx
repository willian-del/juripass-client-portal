import { Button } from '@/components/ui/button';
import { Download, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface PostersViewerProps {
  standalone?: boolean;
  onClose?: () => void;
  posterId?: string;
}

const WHATSAPP_NUMBER = '(11) 5039-5554';
const WHATSAPP_LINK = 'https://wa.me/551150395554';
const QR_SRC = '/images/branding/qrcode-whatsapp.png';

/* ── brand colors (PDF style) ── */
const DARK_BLUE = '#1B3A6B';
const MID_BLUE = '#2563A8';
const ACCENT_BLUE = '#4A9FD8';
const FOOTER_BLUE = '#5B8EC9';

/* ── poster data ── */
type PosterData = {
  id: string;
  title: string;
  subtitle: string;
  sectionTitle: string;
  items: { text: string }[];
  stepsTitle: string;
  steps: { num: number; title: string; desc: string }[];
  note: string;
  pills?: string[];
};

const posters: PosterData[] = [
  {
    id: 'family',
    title: 'Problemas de família?',
    subtitle: 'Pensão, guarda dos filhos ou separação podem ser momentos difíceis. Você não precisa enfrentar isso sozinho.',
    sectionTitle: 'PODEMOS AJUDAR COM',
    items: [
      { text: 'Pensão alimentícia — pagar ou receber' },
      { text: 'Guarda dos filhos' },
      { text: 'Separação ou divórcio' },
      { text: 'Reconhecimento de paternidade' },
      { text: 'Divisão de bens ou herança' },
    ],
    stepsTitle: 'COMO PEDIR AJUDA',
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
    items: [
      { text: 'Cobranças abusivas' },
      { text: 'Nome negativado' },
      { text: 'Dívidas com banco ou cartão' },
      { text: 'Juros excessivos' },
      { text: 'Renegociação de dívidas' },
    ],
    stepsTitle: 'COMO PEDIR AJUDA',
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
    items: [
      { text: 'Demissão e rescisão' },
      { text: 'Direitos trabalhistas' },
      { text: 'Assédio moral' },
      { text: 'Horas extras' },
      { text: 'Dúvidas sobre contrato de trabalho' },
    ],
    stepsTitle: 'COMO PEDIR AJUDA',
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
    items: [
      { text: 'Problemas com contrato de aluguel' },
      { text: 'Aumento abusivo de aluguel' },
      { text: 'Despejo' },
      { text: 'Caução ou garantia' },
      { text: 'Direitos de inquilino e proprietário' },
    ],
    stepsTitle: 'COMO PEDIR AJUDA',
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
    items: [
      { text: 'Produto com defeito' },
      { text: 'Serviço que não foi entregue' },
      { text: 'Cobrança indevida' },
      { text: 'Cancelamento de contrato' },
      { text: 'Problemas com garantia' },
    ],
    stepsTitle: 'COMO PEDIR AJUDA',
    steps: [
      { num: 1, title: 'Abra o WhatsApp', desc: 'Mande mensagem para a Juripass' },
      { num: 2, title: 'Conte o que aconteceu', desc: 'Se tiver nota fiscal ou foto, pode enviar' },
      { num: 3, title: 'Receba orientação jurídica', desc: 'Um advogado vai explicar o que você pode fazer' },
    ],
    note: 'Muitas situações podem ser resolvidas quando você conhece seus direitos.',
  },
];

/* ── Icon box ── */
function IconBox({ num }: { num: number }) {
  return (
    <div
      className="flex-shrink-0 w-11 h-11 rounded-md flex items-center justify-center text-white text-base font-bold"
      style={{ backgroundColor: MID_BLUE }}
    >
      {num}
    </div>
  );
}

function BulletIcon() {
  return (
    <div
      className="flex-shrink-0 w-3 h-3 rounded-full mt-2.5"
      style={{ backgroundColor: ACCENT_BLUE }}
    />
  );
}

/* ── Single Poster (wall poster A4 — large readable type, print-optimized) ── */
function Poster({ data }: { data: PosterData }) {
  return (
    <div data-poster-root
      className="w-[210mm] h-[297mm] mx-auto bg-white flex flex-col overflow-hidden shadow-lg print:shadow-none"
      style={{ fontFamily: "'Nunito', 'Inter', system-ui, sans-serif" }}
    >
      {/* Header */}
      <div className="flex flex-col items-center justify-center py-4" style={{ backgroundColor: '#FFFFFF' }}>
        <img src="/images/branding/juripass-logo-full.png" alt="Juripass" className="h-10" />
      </div>

      {/* Accent line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${DARK_BLUE}, ${ACCENT_BLUE})` }} />

      {/* Body — print margins 20mm */}
      <div className="flex-1 px-[20mm] py-5 flex flex-col gap-7">
        {/* Title block */}
        <div className="text-center space-y-3">
          <h1 className="text-6xl font-extrabold leading-tight" style={{ color: DARK_BLUE }}>
            {data.title}
          </h1>
          <p className="text-2xl leading-relaxed" style={{ color: '#64748B' }}>
            {data.subtitle}
          </p>
        </div>

        {/* Separator */}
        <div className="h-px w-full" style={{ backgroundColor: `${ACCENT_BLUE}33` }} />

        {/* Items section */}
        <div className="space-y-3">
          <h2
            className="text-lg font-bold tracking-[0.2em] uppercase pb-1"
            style={{ color: MID_BLUE, borderBottom: `2px solid ${ACCENT_BLUE}40` }}
          >
            {data.sectionTitle}
          </h2>
          <ul className="space-y-3 pl-1">
            {data.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-2xl" style={{ color: '#334155' }}>
                <BulletIcon />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Confidentiality statement */}
        <p className="text-center text-lg font-semibold italic" style={{ color: MID_BLUE }}>
          Atendimento confidencial e sem julgamentos.
        </p>

        {/* Separator */}
        <div className="h-px w-full" style={{ backgroundColor: `${ACCENT_BLUE}33` }} />

        {/* Steps */}
        <div className="space-y-3">
          <h2
            className="text-lg font-bold tracking-[0.2em] uppercase pb-1"
            style={{ color: MID_BLUE, borderBottom: `2px solid ${ACCENT_BLUE}40` }}
          >
            {data.stepsTitle}
          </h2>
          <div className="space-y-4">
            {data.steps.map((s) => (
              <div key={s.num} className="flex items-start gap-3">
                <IconBox num={s.num} />
                <div style={{ color: '#334155' }}>
                  <span className="text-2xl font-bold" style={{ color: DARK_BLUE }}>{s.title}</span>
                  <span className="block text-lg mt-1" style={{ color: '#64748B' }}>{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div
          className="rounded-md px-5 py-4 text-lg leading-relaxed border-l-4"
          style={{ borderColor: ACCENT_BLUE, backgroundColor: '#F8FAFC', color: '#475569' }}
        >
          {data.note}
        </div>
      </div>

      {/* CTA section */}
      <div
        className="px-[20mm] py-3 flex items-center justify-between gap-6"
        style={{ backgroundColor: DARK_BLUE }}
      >
        <div className="flex-1 space-y-2 text-white">
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-80">FALE CONOSCO VIA WHATSAPP</p>
          <p className="text-xl font-bold">📱 {WHATSAPP_NUMBER}</p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-lg font-bold text-white no-underline transition-opacity hover:opacity-90"
            style={{ backgroundColor: MID_BLUE }}
          >
            Abrir conversa no WhatsApp →
          </a>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <img src={QR_SRC} alt="QR Code WhatsApp Juripass" className="w-[5rem] h-[5rem] rounded-lg bg-white p-1" />
          <span className="text-[10px] text-white/70 text-center tracking-wide font-medium">ESCANEIE E ABRA<br />NO WHATSAPP</span>
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-[20mm] py-2.5 flex items-center justify-between"
        style={{ backgroundColor: FOOTER_BLUE }}
      >
        <img src="/images/branding/juripass-logo-stacked-white.png" alt="Juripass" className="h-7" />
        <div className="text-right text-white">
          <p className="text-xs font-semibold tracking-wide uppercase">Acolhimento jurídico na palma da sua mão</p>
          <p className="text-[10px] opacity-70 mt-0.5">Dúvidas? Procure o RH da empresa.</p>
        </div>
      </div>
    </div>
  );
}

/* ── Poster ID to label map ── */
const POSTER_LABELS: Record<string, string> = {
  family: 'Família',
  debt: 'Endividamento',
  work: 'Trabalho',
  housing: 'Aluguel e Imóvel',
  consumer: 'Consumo',
};

/* ── Main component ── */
export function PostersViewer({ standalone, onClose, posterId }: PostersViewerProps) {
  const handlePrint = () => window.print();

  // Filter posters
  const visiblePosters = posterId
    ? posters.filter((p) => p.id === posterId)
    : posters;

  // Navigation state for multi-poster view
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSingle = visiblePosters.length === 1;
  const showingPoster = isSingle ? visiblePosters[0] : visiblePosters[currentIndex];

  const label = posterId
    ? `Cartaz — ${POSTER_LABELS[posterId] || posterId}`
    : 'Cartazes Informativos';

  return (
    <div className={standalone ? 'min-h-screen bg-muted/40' : 'h-full overflow-auto bg-muted/40'}>
      {/* Top bar (hidden in print) */}
      <div className="print:hidden sticky top-0 z-10 bg-card border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/branding/juripass-logo-full.png" alt="Juripass" className="h-8" />
          <span className="text-sm font-semibold text-foreground">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          {!isSingle && (
            <div className="flex items-center gap-1 mr-2">
              <Button
                variant="ghost" size="sm"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => i - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground min-w-[60px] text-center">
                {currentIndex + 1} / {visiblePosters.length}
              </span>
              <Button
                variant="ghost" size="sm"
                disabled={currentIndex === visiblePosters.length - 1}
                onClick={() => setCurrentIndex((i) => i + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Download className="h-4 w-4" /> Imprimir / Salvar PDF
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" /> Fechar
            </Button>
          )}
        </div>
      </div>

      {/* Poster(s) */}
      <div className="py-8 print:py-0">
        {showingPoster && <Poster data={showingPoster} />}
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          html, body {
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          body > *:not(#root) { display: none !important; }
          .print\\:hidden { display: none !important; }
          nav, header, footer, [data-sidebar], [role="banner"] { display: none !important; }

          /* Hide scrollbars */
          *::-webkit-scrollbar { display: none !important; }
          * { scrollbar-width: none !important; }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          [data-poster-root] {
            box-shadow: none !important;
            page-break-inside: avoid;
          }

          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>
    </div>
  );
}
