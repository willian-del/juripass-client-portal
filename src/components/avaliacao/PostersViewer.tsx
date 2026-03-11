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
    id: 'generic',
    title: 'Seu advogado no WhatsApp.',
    subtitle: 'Um benefício gratuito da empresa para você e sua família.',
    sectionTitle: 'PODE PEDIR AJUDA PARA',
    items: [
      { text: 'Problemas com banco ou cartão' },
      { text: 'Dívidas ou nome sujo' },
      { text: 'Compra com defeito ou que não chegou' },
      { text: 'Dúvidas sobre trabalho e seus direitos' },
      { text: 'Pensão, guarda de filhos ou separação' },
      { text: 'Problemas com aluguel ou moradia' },
    ],
    stepsTitle: 'COMO FUNCIONA',
    steps: [
      { num: 1, title: 'Salve o contato', desc: 'Escaneie o QR Code ou salve o número abaixo' },
      { num: 2, title: 'Acesse o WhatsApp', desc: 'Abra nosso canal de atendimento' },
      { num: 3, title: 'Mande uma mensagem', desc: 'Conte o que aconteceu e receba orientação' },
    ],
    note: 'Se precisar entrar na Justiça, o advogado explica tudo antes — inclusive os custos.',
    pills: ['Grátis', 'Sigiloso', 'WhatsApp', 'Família inclusa'],
  },
  {
    id: 'debt',
    title: 'Está com o nome sujo?',
    subtitle: 'Antes de desistir, fale com um advogado. Pode ser que você tenha mais direitos do que imagina.',
    sectionTitle: 'VOCÊ SABIA QUE',
    items: [
      { text: 'O banco pode estar cobrando valor errado' },
      { text: 'Dívidas antigas podem ter prescrição' },
      { text: 'Podem estar cobrando juros abusivos' },
      { text: 'Você tem direito de negociar e entender a dívida' },
    ],
    stepsTitle: 'COMO PEDIR AJUDA',
    steps: [
      { num: 1, title: 'Abra o WhatsApp', desc: 'Mande mensagem para a Juripass' },
      { num: 2, title: 'Conte o problema', desc: 'Qual é a dívida? Com qual empresa? Qual o valor?' },
      { num: 3, title: 'Receba orientação', desc: 'Um advogado vai orientar você sobre o que fazer' },
    ],
    note: 'Não tome decisão sozinho. Fale primeiro com um advogado — é grátis e sigiloso.',
  },
  {
    id: 'bank',
    title: 'Problema com banco ou cartão?',
    subtitle: 'Sabia que muita gente paga juros abusivos no banco sem saber? Um advogado pode analisar seu caso.',
    sectionTitle: 'ISSO JÁ ACONTECEU COM VOCÊ?',
    items: [
      { text: 'Cobrança no cartão que você não fez' },
      { text: 'Empréstimo com juros muito altos' },
      { text: 'Desconto no salário que não autorizou' },
      { text: 'Caiu em golpe do Pix ou boleto falso' },
      { text: 'Tarifa ou cobrança que não entende' },
    ],
    stepsTitle: 'COMO USAR',
    steps: [
      { num: 1, title: 'Abra o WhatsApp', desc: 'Fale com a Juripass' },
      { num: 2, title: 'Explique o problema', desc: 'Se tiver extrato ou comprovante, pode enviar a foto' },
      { num: 3, title: 'Receba análise', desc: 'Um advogado vai analisar e orientar você' },
    ],
    note: 'Consulte um advogado antes de assinar qualquer contrato ou renegociar uma dívida.',
  },
  {
    id: 'consumer',
    title: 'Comprou algo e deu problema?',
    subtitle: 'Produto com defeito, entrega que não chegou, dinheiro que não devolveram — você tem direitos.',
    sectionTitle: 'ISSO PODE TER ACONTECIDO COM VOCÊ',
    items: [
      { text: 'Comprou e não entregaram' },
      { text: 'Produto veio com defeito' },
      { text: 'Não querem devolver o dinheiro' },
      { text: 'Serviço que não foi feito como prometido' },
      { text: 'Empresa sumiu depois que você pagou' },
    ],
    stepsTitle: 'COMO PEDIR AJUDA',
    steps: [
      { num: 1, title: 'Abra o WhatsApp', desc: 'Fale com a Juripass' },
      { num: 2, title: 'Conte o que aconteceu', desc: 'Se tiver nota fiscal ou foto do produto, pode enviar' },
      { num: 3, title: 'Saiba seus direitos', desc: 'Um advogado vai explicar o que pode fazer' },
    ],
    note: 'O Código de Defesa do Consumidor protege você. Não desista sem antes consultar um advogado.',
  },
  {
    id: 'family',
    title: 'Problema de família?',
    subtitle: 'Pensão, guarda dos filhos, separação... você não precisa enfrentar isso sozinho.',
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
      { num: 1, title: 'Abra o WhatsApp', desc: 'Pode ser de casa, no intervalo — quando for melhor para você' },
      { num: 2, title: 'Conte o que acontece', desc: 'O atendimento é completamente confidencial' },
      { num: 3, title: 'Receba orientação', desc: 'Um advogado vai orientar você com cuidado e respeito' },
    ],
    note: 'Assuntos de família são delicados. Você merece uma orientação de qualidade, sem julgamentos.',
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

/* ── Single Poster (wall poster A4 — large readable type) ── */
function Poster({ data }: { data: PosterData }) {
  return (
    <div data-poster-root
      className="w-[210mm] h-[297mm] mx-auto bg-white flex flex-col overflow-hidden shadow-lg"
      style={{ fontFamily: "'Nunito', 'Inter', system-ui, sans-serif" }}
    >
      {/* Header */}
      <div className="flex flex-col items-center justify-center py-3" style={{ backgroundColor: '#FFFFFF' }}>
        <img src="/images/branding/juripass-logo-full.png" alt="Juripass" className="h-10" />
      </div>

      {/* Accent line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${DARK_BLUE}, ${ACCENT_BLUE})` }} />

      {/* Body */}
      <div className="flex-1 px-12 py-4 flex flex-col gap-5">
        {/* Title block */}
        <div className="text-center space-y-2">
          <h1 className="text-6xl font-extrabold leading-tight" style={{ color: DARK_BLUE }}>
            {data.title}
          </h1>
          <p className="text-2xl leading-relaxed" style={{ color: '#64748B' }}>
            {data.subtitle}
          </p>
        </div>

        {/* Items section */}
        <div className="space-y-2.5">
          <h2
            className="text-lg font-bold tracking-[0.2em] uppercase"
            style={{ color: MID_BLUE }}
          >
            {data.sectionTitle}
          </h2>
          <ul className="space-y-2 pl-1">
            {data.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-2xl" style={{ color: '#334155' }}>
                <BulletIcon />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pills (generic poster only) */}
        {data.pills && (
          <div className="flex flex-wrap justify-center gap-2.5">
            {data.pills.map((label, i) => (
              <span
                key={i}
                className="inline-flex items-center px-5 py-1.5 rounded-full text-lg font-semibold border"
                style={{ borderColor: ACCENT_BLUE, color: MID_BLUE }}
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Steps */}
        <div className="space-y-2.5">
          <h2
            className="text-lg font-bold tracking-[0.2em] uppercase"
            style={{ color: MID_BLUE }}
          >
            {data.stepsTitle}
          </h2>
          <div className="space-y-3">
            {data.steps.map((s) => (
              <div key={s.num} className="flex items-start gap-3">
                <IconBox num={s.num} />
                <div style={{ color: '#334155' }}>
                  <span className="text-2xl font-bold" style={{ color: DARK_BLUE }}>{s.title}</span>
                  <span className="block text-lg mt-0.5" style={{ color: '#64748B' }}>{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div
          className="rounded-md px-4 py-2.5 text-lg leading-relaxed border-l-4"
          style={{ borderColor: ACCENT_BLUE, backgroundColor: '#F8FAFC', color: '#475569' }}
        >
          {data.note}
        </div>
      </div>

      {/* CTA section */}
      <div
        className="px-8 py-2 flex items-center justify-between gap-6"
        style={{ backgroundColor: DARK_BLUE }}
      >
        <div className="flex-1 space-y-1.5 text-white">
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-80">FALE CONOSCO VIA WHATSAPP</p>
          <p className="text-xl font-bold">📱 {WHATSAPP_NUMBER}</p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-lg text-lg font-bold text-white no-underline transition-opacity hover:opacity-90"
            style={{ backgroundColor: MID_BLUE }}
          >
            Abrir conversa no WhatsApp →
          </a>
        </div>
        <div className="flex flex-col items-center gap-1">
          <img src={QR_SRC} alt="QR Code WhatsApp Juripass" className="w-[4.5rem] h-[4.5rem] rounded-lg bg-white p-1" />
          <span className="text-[9px] text-white/60 text-center tracking-wide">ESCANEIE E ABRA<br />NO WHATSAPP</span>
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-10 py-1.5 flex items-center justify-between"
        style={{ backgroundColor: FOOTER_BLUE }}
      >
        <img src="/images/branding/juripass-logo-stacked-white.png" alt="Juripass" className="h-6" />
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
  generic: 'Genérico',
  debt: 'Endividamento',
  bank: 'Bancos',
  consumer: 'Consumo',
  family: 'Família',
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
          body > *:not(#root) { display: none !important; }
          .print\\:hidden { display: none !important; }
          nav, header, footer, [data-sidebar], [role="banner"] { display: none !important; }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          [data-poster-root] {
            box-shadow: none !important;
          }

          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>
    </div>
  );
}
