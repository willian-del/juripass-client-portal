import { Button } from '@/components/ui/button';
import { Download, X, MessageCircle, Phone } from 'lucide-react';

interface PostersViewerProps {
  standalone?: boolean;
  onClose?: () => void;
}

const WHATSAPP_NUMBER = '(11) 5039-5554';
const WHATSAPP_LINK = 'https://wa.me/551150395554';
const QR_SRC = '/images/branding/qrcode-whatsapp.png';

/* ── shared colors (matching PDF) ── */
const DARK_BLUE = '#1B3A6B';
const MID_BLUE = '#2C3E7D';
const ACCENT_BLUE = '#4A9FD8';

/* ── poster data ── */
type PosterData = {
  id: string;
  themeColor: string;
  themeBg: string;
  title: string;
  subtitle: string;
  sectionTitle: string;
  items: { icon: string; text: string }[];
  badge: string;
  stepsTitle: string;
  steps: { num: number; text: string; sub?: string }[];
  note: { icon: string; text: string };
  pills?: { icon: string; label: string }[];
};

const posters: PosterData[] = [
  {
    id: 'generic',
    themeColor: ACCENT_BLUE,
    themeBg: '#EBF5FB',
    title: 'Seu advogado no WhatsApp.',
    subtitle: 'Um benefício gratuito da empresa para você e sua família.',
    sectionTitle: 'PODE PEDIR AJUDA PARA...',
    items: [
      { icon: '💳', text: 'Problemas com banco ou cartão' },
      { icon: '💸', text: 'Dívidas ou nome sujo' },
      { icon: '📦', text: 'Compra com defeito ou que não chegou' },
      { icon: '👷', text: 'Dúvidas sobre trabalho e seus direitos' },
      { icon: '👨‍👩‍👧', text: 'Pensão, guarda de filhos ou separação' },
      { icon: '🏠', text: 'Problemas com aluguel ou moradia' },
    ],
    badge: 'A orientação é totalmente GRATUITA',
    stepsTitle: 'COMO FUNCIONA',
    steps: [
      { num: 1, text: 'Salve o contato ou escaneie o QR Code' },
      { num: 2, text: 'Acesse nosso canal no WhatsApp' },
      { num: 3, text: 'Mande uma mensagem e conte o que aconteceu' },
    ],
    note: { icon: '⚠', text: 'Se precisar entrar na Justiça, o advogado explica tudo antes — inclusive os custos.' },
    pills: [
      { icon: '✅', label: 'Grátis' },
      { icon: '🔒', label: 'Sigiloso' },
      { icon: '📱', label: 'WhatsApp' },
      { icon: '👨‍👩‍👧', label: 'Família inclusa' },
    ],
  },
  {
    id: 'debt',
    themeColor: '#E67E22',
    themeBg: '#FEF5E7',
    title: 'Está com o nome sujo?',
    subtitle: 'Antes de desistir, fale com um advogado. Pode ser que você tenha mais direitos do que imagina.',
    sectionTitle: 'VOCÊ SABIA QUE...',
    items: [
      { icon: '❌', text: 'O banco pode estar cobrando valor errado' },
      { icon: '❌', text: 'Dívidas antigas podem ter prescrição' },
      { icon: '❌', text: 'Podem estar cobrando juros abusivos' },
      { icon: '✅', text: 'Você tem direito de negociar e entender a dívida' },
    ],
    badge: 'A orientação é totalmente GRATUITA',
    stepsTitle: 'COMO PEDIR AJUDA',
    steps: [
      { num: 1, text: 'Abra o WhatsApp e mande mensagem para a Juripass' },
      { num: 2, text: 'Conte o problema:', sub: 'Qual é a dívida? Com qual empresa? Qual o valor?' },
      { num: 3, text: 'Um advogado vai orientar você sobre o que fazer' },
    ],
    note: { icon: '⚠', text: 'Não tome decisão sozinho. Fale primeiro com um advogado — é grátis e sigiloso.' },
  },
  {
    id: 'bank',
    themeColor: '#2980B9',
    themeBg: '#EBF5FB',
    title: 'Problema com banco ou cartão?',
    subtitle: 'Sabia que muita gente paga juros abusivos no banco sem saber? Um advogado pode analisar seu caso.',
    sectionTitle: 'ISSO JÁ ACONTECEU COM VOCÊ?',
    items: [
      { icon: '💳', text: 'Cobrança no cartão que você não fez' },
      { icon: '💰', text: 'Empréstimo com juros muito altos' },
      { icon: '💸', text: 'Desconto no salário que não autorizou' },
      { icon: '🔒', text: 'Caiu em golpe do Pix ou boleto falso' },
      { icon: '❓', text: 'Tarifa ou cobrança que não entende' },
    ],
    badge: 'Consulte seus direitos — é GRÁTIS',
    stepsTitle: 'COMO USAR',
    steps: [
      { num: 1, text: 'Abra o WhatsApp e fale com a Juripass' },
      { num: 2, text: 'Explique o problema', sub: 'Se tiver extrato ou comprovante, pode enviar a foto' },
      { num: 3, text: 'Um advogado vai analisar e orientar você' },
    ],
    note: { icon: '💡', text: 'Consulte um advogado antes de assinar qualquer contrato ou renegociar uma dívida.' },
  },
  {
    id: 'consumer',
    themeColor: '#D4A017',
    themeBg: '#FEF9E7',
    title: 'Comprou algo e deu problema?',
    subtitle: 'Produto com defeito, entrega que não chegou, dinheiro que não devolveram — você tem direitos.',
    sectionTitle: 'ISSO PODE TER ACONTECIDO COM VOCÊ',
    items: [
      { icon: '📦', text: 'Comprou e não entregaram' },
      { icon: '🔧', text: 'Produto veio com defeito' },
      { icon: '💸', text: 'Não querem devolver o dinheiro' },
      { icon: '📵', text: 'Serviço que não foi feito como prometido' },
      { icon: '🛒', text: 'Empresa sumiu depois que você pagou' },
    ],
    badge: 'Você tem direito — consulte GRÁTIS',
    stepsTitle: 'COMO PEDIR AJUDA',
    steps: [
      { num: 1, text: 'Abra o WhatsApp e fale com a Juripass' },
      { num: 2, text: 'Conte o que aconteceu.', sub: 'Se tiver nota fiscal ou foto do produto, pode enviar.' },
      { num: 3, text: 'Um advogado vai explicar seus direitos e o que pode fazer.' },
    ],
    note: { icon: '💡', text: 'O Código de Defesa do Consumidor protege você. Não desista sem antes consultar um advogado.' },
  },
  {
    id: 'family',
    themeColor: '#8E44AD',
    themeBg: '#F4ECF7',
    title: 'Problema de família?',
    subtitle: 'Pensão, guarda dos filhos, separação... você não precisa enfrentar isso sozinho.',
    sectionTitle: 'PODEMOS AJUDAR COM',
    items: [
      { icon: '💰', text: 'Pensão alimentícia — pagar ou receber' },
      { icon: '👶', text: 'Guarda dos filhos' },
      { icon: '💔', text: 'Separação ou divórcio' },
      { icon: '👨‍👦', text: 'Reconhecimento de paternidade' },
      { icon: '🏠', text: 'Divisão de bens ou herança' },
    ],
    badge: 'Atendimento sigiloso e GRATUITO',
    stepsTitle: 'COMO PEDIR AJUDA',
    steps: [
      { num: 1, text: 'Abra o WhatsApp de onde você estiver', sub: 'Pode ser de casa, no intervalo — quando for melhor para você' },
      { num: 2, text: 'Conte o que está acontecendo', sub: 'O atendimento é completamente confidencial' },
      { num: 3, text: 'Um advogado vai orientar você com cuidado e respeito' },
    ],
    note: { icon: '💜', text: 'Assuntos de família são delicados. Você merece uma orientação de qualidade, sem julgamentos.' },
  },
];

/* ── Single Poster ── */
function Poster({ data }: { data: PosterData }) {
  return (
    <div
      className="w-[210mm] min-h-[297mm] mx-auto bg-white flex flex-col overflow-hidden shadow-lg"
      style={{ pageBreakAfter: 'always', fontFamily: "'Nunito', 'Inter', system-ui, sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center justify-center py-5" style={{ backgroundColor: '#F5F7FA' }}>
        <img src="/images/branding/juripass-logo-full.png" alt="Juripass" className="h-12" />
      </div>

      {/* Body */}
      <div className="flex-1 px-10 py-6 flex flex-col gap-5">
        {/* Title block */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold leading-tight" style={{ color: data.themeColor }}>
            {data.title}
          </h1>
          <p className="text-base" style={{ color: '#4A5568' }}>
            {data.subtitle}
          </p>
        </div>

        {/* Items section */}
        <div className="rounded-xl p-5 space-y-3" style={{ backgroundColor: data.themeBg }}>
          <h2
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: data.themeColor }}
          >
            {data.sectionTitle}
          </h2>
          <ul className="space-y-2">
            {data.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#2D3748' }}>
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Badge */}
        <div className="text-center">
          <span
            className="inline-block px-5 py-1.5 rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: data.themeColor }}
          >
            {data.badge}
          </span>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          <h2
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: DARK_BLUE }}
          >
            {data.stepsTitle}
          </h2>
          <div className="space-y-2">
            {data.steps.map((s) => (
              <div key={s.num} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: data.themeColor }}
                >
                  {s.num}
                </span>
                <div className="text-sm" style={{ color: '#2D3748' }}>
                  <span className="font-semibold">{s.text}</span>
                  {s.sub && <span className="block text-xs mt-0.5" style={{ color: '#718096' }}>{s.sub}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pills (generic poster only) */}
        {data.pills && (
          <div className="flex flex-wrap justify-center gap-2">
            {data.pills.map((p, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border"
                style={{ borderColor: data.themeColor, color: data.themeColor }}
              >
                {p.icon} {p.label}
              </span>
            ))}
          </div>
        )}

        {/* Note */}
        <div
          className="rounded-lg px-4 py-3 text-xs flex items-start gap-2"
          style={{ backgroundColor: '#FFF8E1', color: '#5D4037' }}
        >
          <span className="text-base flex-shrink-0">{data.note.icon}</span>
          <span>{data.note.text}</span>
        </div>
      </div>

      {/* CTA section */}
      <div
        className="px-10 py-5 flex items-center justify-between gap-6"
        style={{ backgroundColor: DARK_BLUE }}
      >
        <div className="flex-1 space-y-2 text-white">
          <p className="text-xs font-bold tracking-widest uppercase opacity-80">FALE COM A JURIPASS</p>
          <p className="text-lg font-bold flex items-center gap-2">
            <Phone className="h-4 w-4" /> {WHATSAPP_NUMBER}
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white no-underline"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle className="h-4 w-4" /> Iniciar atendimento no WhatsApp
          </a>
        </div>
        <div className="flex flex-col items-center gap-1">
          <img src={QR_SRC} alt="QR Code WhatsApp Juripass" className="w-24 h-24 rounded-lg bg-white p-1" />
          <span className="text-[10px] text-white/70 text-center">ESCANEIE E FALE<br />COM A JURIPASS</span>
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-10 py-3 flex items-center justify-between"
        style={{ backgroundColor: MID_BLUE }}
      >
        <img src="/images/branding/juripass-logo-full-white.png" alt="Juripass" className="h-6" />
        <div className="text-right text-white">
          <p className="text-[10px] opacity-80">Acolhimento jurídico na palma da sua mão</p>
          <p className="text-[10px] opacity-60">Dúvidas? Procure o RH da empresa.</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export function PostersViewer({ standalone, onClose }: PostersViewerProps) {
  const handlePrint = () => window.print();

  return (
    <div className={standalone ? 'min-h-screen bg-muted/40' : 'h-full overflow-auto bg-muted/40'}>
      {/* Top bar (hidden in print) */}
      <div className="print:hidden sticky top-0 z-10 bg-card border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/branding/juripass-logo-full.png" alt="Juripass" className="h-8" />
          <span className="text-sm font-semibold text-foreground">Cartazes Informativos</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Download className="h-4 w-4 mr-1" /> Imprimir / Salvar PDF
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4 mr-1" /> Fechar
            </Button>
          )}
        </div>
      </div>

      {/* Posters */}
      <div className="py-8 space-y-8 print:py-0 print:space-y-0">
        {posters.map((p) => (
          <Poster key={p.id} data={p} />
        ))}
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print\\:hidden { display: none !important; }
          [data-poster-root], [data-poster-root] * { visibility: visible; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>
    </div>
  );
}
