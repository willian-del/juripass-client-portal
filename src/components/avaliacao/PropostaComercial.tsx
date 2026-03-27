import { useState } from 'react';
import { Printer, X, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PropostaComercialProps {
  onClose?: () => void;
  standalone?: boolean;
}

const PRICING_TABLE = [
  { min: 0, max: 300, label: 'até 300', price: 1990 },
  { min: 301, max: 600, label: '301 a 600', price: 3490 },
  { min: 601, max: 1000, label: '601 a 1.000', price: 5490 },
  { min: 1001, max: 1500, label: '1.001 a 1.500', price: 7490 },
  { min: 1501, max: 2500, label: '1.501 a 2.500', price: 9990 },
  { min: 2501, max: 4000, label: '2.501 a 4.000', price: 14990 },
  { min: 4001, max: Infinity, label: 'acima de 4.000', price: null },
];

function formatCurrency(value: number | null): string {
  if (value === null) return 'sob consulta';
  return `R$ ${value.toLocaleString('pt-BR')}`;
}

function getActiveTier(count: number) {
  return PRICING_TABLE.find(t => count >= t.min && count <= t.max) || null;
}

export function PropostaComercial({ onClose, standalone = false }: PropostaComercialProps) {
  const today = new Date().toISOString().split('T')[0];
  const [clientName, setClientName] = useState('{{client_name}}');
  const [proposalDate, setProposalDate] = useState(today);
  const [employeeCount, setEmployeeCount] = useState(500);
  const [showSpecial, setShowSpecial] = useState(false);
  const [specialConditions, setSpecialConditions] = useState('');
  const [exporting, setExporting] = useState(false);

  const activeTier = getActiveTier(employeeCount);
  const formattedDate = new Date(proposalDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  const handleDownloadPDF = async () => {
    setExporting(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pages = ['proposal-page-1', 'proposal-page-2'];

      for (let i = 0; i < pages.length; i++) {
        const el = document.getElementById(pages[i]);
        if (!el) continue;

        const canvas = await html2canvas(el, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdfWidth = 210;
        const pdfHeight = 297;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }

      const fileName = clientName === '{{client_name}}'
        ? 'Proposta_Juripass.pdf'
        : `Proposta_${clientName.replace(/\s+/g, '_')}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className={`${standalone ? '' : 'fixed inset-0 z-50'} bg-white overflow-auto`}>
      {/* Controls bar */}
      <div className="print:hidden sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between z-10">
        <span className="text-sm text-gray-500">Proposta Comercial</span>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-1" />
            Imprimir
          </Button>
          <Button size="sm" onClick={handleDownloadPDF} disabled={exporting}>
            <Download className="h-4 w-4 mr-1" />
            {exporting ? 'Gerando...' : 'Baixar PDF'}
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Dynamic fields form */}
      <div className="print:hidden max-w-[210mm] mx-auto px-8 py-4 bg-gray-50 border-b">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Campos dinâmicos</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Nome da empresa</label>
            <Input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Nome da empresa" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Data da proposta</label>
            <Input type="date" value={proposalDate} onChange={e => setProposalDate(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Nº de colaboradores</label>
            <Input type="number" min={1} value={employeeCount} onChange={e => setEmployeeCount(parseInt(e.target.value) || 0)} />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowSpecial(!showSpecial)}>
            {showSpecial ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
            Condições especiais
          </Button>
          {showSpecial && (
            <div className="flex-1">
              <Textarea
                value={specialConditions}
                onChange={e => setSpecialConditions(e.target.value)}
                placeholder="Ex: desconto de 10% para pagamento anual antecipado..."
                rows={2}
                className="text-sm"
              />
            </div>
          )}
        </div>
      </div>

      {/* ═══════════ PAGE 1 ═══════════ */}
      <div id="proposal-page-1" className="max-w-[210mm] mx-auto bg-white print:shadow-none shadow-lg my-4 print:my-0" style={{ minHeight: '297mm' }}>
        {/* Header */}
        <div className="bg-[#2C3E7D] px-10 py-5">
          <img src="/images/branding/juripass-logo-white.png" alt="Juripass" className="h-8 object-contain mb-3" />
          <h1 className="text-white text-lg font-bold leading-snug">Proposta Comercial</h1>
          <p className="text-white/70 text-sm mt-0.5">Acolhimento Jurídico, Gestão de Riscos Humanos e Canal de Integridade</p>
          <div className="flex gap-6 mt-3 text-white/60 text-xs">
            <span>Cliente: <span className="text-white font-medium">{clientName}</span></span>
            <span>Data: <span className="text-white font-medium">{formattedDate}</span></span>
          </div>
        </div>

        <div className="px-10 py-6 space-y-5 text-[#1a1a1a]" style={{ fontSize: '11px', lineHeight: '1.6' }}>
          {/* 1. Visão Geral */}
          <section>
            <SectionTitle number="1">Visão Geral</SectionTitle>
            <p className="mt-2 text-gray-700">
              A Juripass é uma solução integrada que combina acolhimento jurídico ao colaborador, gestão de
              riscos humanos e um canal estruturado de integridade. Atuamos de forma preventiva sobre
              fatores pessoais e organizacionais que impactam o ambiente de trabalho, reduzindo riscos,
              conflitos e demandas informais direcionadas ao RH.
            </p>
          </section>

          <Divider />

          {/* 2. Frentes de Atuação */}
          <section>
            <SectionTitle number="2">Frentes de Atuação</SectionTitle>

            <div className="mt-3 space-y-4">
              {/* Colaborador */}
              <div>
                <h4 className="font-bold text-[#2C3E7D] text-xs">Para o Colaborador | Canal de Acolhimento Jurídico</h4>
                <ul className="mt-1.5 space-y-1 text-gray-700 ml-4">
                  <li className="flex items-start gap-2"><Bullet />Orientação sobre dívidas, família, moradia, consumo e contratos</li>
                  <li className="flex items-start gap-2"><Bullet />Atendimento humano, confidencial e acessível, com linguagem simples e prática</li>
                  <li className="flex items-start gap-2"><Bullet />Sem custo inicial ao colaborador</li>
                  <li className="flex items-start gap-2"><Bullet />Treinamentos e conteúdos educativos</li>
                </ul>
                <p className="mt-1.5 text-gray-500 italic text-[10px] ml-4">
                  Caso necessário, o colaborador poderá contratar diretamente um advogado de sua confiança,
                  inclusive entre os parceiros da Juripass, sem qualquer custo ou responsabilidade para a empresa.
                </p>
              </div>

              {/* RH Gestão */}
              <div>
                <h4 className="font-bold text-[#2C3E7D] text-xs">Para o RH | Gestão de Riscos Humanos</h4>
                <ul className="mt-1.5 space-y-1 text-gray-700 ml-4">
                  <li className="flex items-start gap-2"><Bullet />Monitoramento contínuo de riscos humanos</li>
                  <li className="flex items-start gap-2"><Bullet />Identificação de padrões e indicadores de vulnerabilidade (anonimizados)</li>
                  <li className="flex items-start gap-2"><Bullet />Relatórios periódicos e estatísticas de uso</li>
                  <li className="flex items-start gap-2"><Bullet />Apoio às diretrizes da NR-01 (fatores psicossociais)</li>
                </ul>
              </div>

              {/* Canal de Integridade */}
              <div>
                <h4 className="font-bold text-[#2C3E7D] text-xs">Para o RH | Canal de Integridade</h4>
                <ul className="mt-1.5 space-y-1 text-gray-700 ml-4">
                  <li className="flex items-start gap-2"><Bullet />Canal estruturado para relatos de assédio, discriminação e desvios de conduta</li>
                  <li className="flex items-start gap-2"><Bullet />Atendimento confidencial e independente</li>
                  <li className="flex items-start gap-2"><Bullet />Registro e organização dos relatos</li>
                  <li className="flex items-start gap-2"><Bullet />Encaminhamento estruturado à empresa</li>
                </ul>
                <p className="mt-1.5 text-gray-500 italic text-[10px] ml-4">
                  A Juripass atua como canal de recebimento e triagem, sendo a apuração e eventuais medidas de
                  responsabilidade da empresa.
                </p>
              </div>
            </div>
          </section>

          <Divider />

          {/* 3. O que a empresa Ganha? */}
          <section>
            <SectionTitle number="3">O que a empresa Ganha?</SectionTitle>
            <ul className="mt-2 space-y-1 text-gray-700 ml-4">
              <li className="flex items-start gap-2"><Bullet />Redução de demandas informais ao RH</li>
              <li className="flex items-start gap-2"><Bullet />Apoio estruturado à NR-01</li>
              <li className="flex items-start gap-2"><Bullet />Canal de integridade independente</li>
              <li className="flex items-start gap-2"><Bullet />Maior segurança jurídica e organizacional</li>
            </ul>
          </section>

          <Divider />

          {/* 4. Componentes da Solução */}
          <section>
            <SectionTitle number="4">Componentes da Solução</SectionTitle>
            <p className="mt-2 text-gray-700">
              A Juripass integra tecnologia, atendimento especializado e inteligência de dados em uma única
              solução corporativa.
            </p>
            <ul className="mt-2 space-y-1 text-gray-700 ml-4">
              <li className="flex items-start gap-2"><Bullet />Atendimento via WhatsApp e Aplicativo Juripass</li>
              <li className="flex items-start gap-2"><Bullet />Plataforma de gestão para o RH</li>
              <li className="flex items-start gap-2"><Bullet />Monitoramento contínuo de riscos humanos</li>
              <li className="flex items-start gap-2"><Bullet />Relatórios de inteligência com dados anonimizados</li>
              <li className="flex items-start gap-2"><Bullet />Treinamentos e conteúdos educativos</li>
              <li className="flex items-start gap-2"><Bullet />Acompanhamento contínuo da operação</li>
            </ul>
          </section>
        </div>

        {/* Footer page 1 */}
        <div className="bg-[#2C3E7D] px-10 py-3 mt-auto">
          <div className="flex items-center justify-center">
            <img src="/images/branding/juripass-logo-white.png" alt="Juripass" className="h-5 object-contain opacity-60" />
          </div>
        </div>
      </div>

      {/* ═══════════ PAGE 2 ═══════════ */}
      <div id="proposal-page-2" className="max-w-[210mm] mx-auto bg-white print:shadow-none shadow-lg my-4 print:my-0 print:break-before-page" style={{ minHeight: '297mm' }}>
        {/* Header */}
        <div className="bg-[#2C3E7D] px-10 py-5">
          <img src="/images/branding/juripass-logo-white.png" alt="Juripass" className="h-8 object-contain mb-3" />
          <h1 className="text-white text-lg font-bold leading-snug">Proposta Comercial</h1>
          <p className="text-white/70 text-sm mt-0.5">Acolhimento Jurídico, Gestão de Riscos Humanos e Canal de Integridade</p>
        </div>

        <div className="px-10 py-6 space-y-5 text-[#1a1a1a]" style={{ fontSize: '11px', lineHeight: '1.6' }}>
          {/* 5. Tabela de Valores */}
          <section>
            <SectionTitle number="5">Tabela de Valores</SectionTitle>
            <div className="mt-3 border border-gray-200 rounded overflow-hidden">
              <table className="w-full" style={{ fontSize: '11px' }}>
                <thead>
                  <tr className="bg-[#2C3E7D] text-white">
                    <th className="text-left px-4 py-2.5 font-semibold">Faixa de colaboradores</th>
                    <th className="text-right px-4 py-2.5 font-semibold">Valor mensal</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_TABLE.map((tier, i) => {
                    const isActive = activeTier === tier;
                    return (
                      <tr
                        key={i}
                        className={`border-t border-gray-100 transition-colors ${isActive ? 'bg-[#4A9FD8]/12 font-semibold' : i % 2 === 0 ? 'bg-gray-50/50' : ''}`}
                      >
                        <td className={`px-4 py-2 ${isActive ? 'text-[#2C3E7D]' : 'text-gray-700'}`}>
                          {isActive && <span className="inline-block w-2 h-2 rounded-full bg-[#4A9FD8] mr-2" />}
                          {tier.label}
                        </td>
                        <td className={`px-4 py-2 text-right ${isActive ? 'text-[#2C3E7D]' : 'text-gray-700'}`}>
                          {formatCurrency(tier.price)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <Divider />

          {/* 6. Investimento */}
          <section>
            <SectionTitle number="6">Investimento</SectionTitle>
            <div className="mt-3 bg-[#f0f5fa] border border-[#4A9FD8]/20 rounded-lg px-5 py-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Faixa Aplicável:</span>
                <span className="font-bold text-[#2C3E7D]">{activeTier ? `${activeTier.label} colaboradores` : '—'}</span>
              </div>
              <div className="flex justify-between items-baseline border-t border-[#4A9FD8]/15 pt-2">
                <span className="font-semibold text-[#2C3E7D]">Valor Mensal Contratado:</span>
                <span className="font-bold text-[#2C3E7D] text-base">{formatCurrency(activeTier?.price ?? null)}</span>
              </div>
              {specialConditions.trim() && (
                <div className="border-t border-[#4A9FD8]/15 pt-2 text-gray-600 italic">
                  {specialConditions}
                </div>
              )}
            </div>
            <p className="mt-2 text-gray-500 italic text-[10px]">
              Os valores apresentados não incluem tributos, que serão acrescidos conforme a legislação aplicável.
            </p>
          </section>

          <Divider />

          {/* 7. Condições Comerciais */}
          <section>
            <SectionTitle number="7">Condições Comerciais</SectionTitle>
            <ul className="mt-2 space-y-1 text-gray-700 ml-4">
              <li className="flex items-start gap-2"><Bullet />Prazo contratual de 12 meses</li>
              <li className="flex items-start gap-2"><Bullet />Cancelamento a qualquer momento, mediante aviso prévio de 30 dias</li>
              <li className="flex items-start gap-2"><Bullet />Início em até 15 dias após a contratação</li>
              <li className="flex items-start gap-2"><Bullet />Sem taxa de implantação</li>
            </ul>
          </section>

          <Divider />

          {/* 8. Escopo e Limitações */}
          <section>
            <SectionTitle number="8">Escopo e Limitações</SectionTitle>
            <p className="mt-2 text-gray-700">
              O atendimento jurídico possui caráter preventivo e orientativo, com foco em questões pessoais
              de natureza cível.
            </p>
            <p className="mt-2 text-[#2C3E7D] font-semibold">
              A Juripass atua de forma independente e não representa colaboradores em demandas contra
              a empresa contratante.
            </p>
            <p className="mt-3 text-gray-700 font-semibold">Não estão contemplados:</p>
            <ul className="mt-1 space-y-1 text-gray-700 ml-4">
              <li className="flex items-start gap-2"><Bullet />Temas relacionados ao direito do trabalho (relação colaborador-empresa)</li>
              <li className="flex items-start gap-2"><Bullet />Questões de natureza criminal</li>
              <li className="flex items-start gap-2"><Bullet />Situações relacionadas a políticas internas ou código de ética da empresa</li>
            </ul>
          </section>

          <Divider />

          {/* Closing line */}
          <section>
            <p className="text-[#4A9FD8] font-semibold text-xs text-center">
              Solução simples de implementar, com alto impacto na redução de riscos e no bem-estar dos colaboradores
            </p>
          </section>
        </div>

        {/* Footer page 2 */}
        <div className="bg-[#2C3E7D] px-10 py-3 mt-auto">
          <div className="flex items-center justify-center">
            <img src="/images/branding/juripass-logo-white.png" alt="Juripass" className="h-5 object-contain opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold text-[#2C3E7D] flex items-center gap-2">
      <span className="text-[#4A9FD8]">{number}.</span>
      {children}
    </h2>
  );
}

function Bullet() {
  return <span className="w-1.5 h-1.5 rounded-full bg-[#4A9FD8] mt-[5px] shrink-0" />;
}

function Divider() {
  return <div className="border-t border-gray-200" />;
}
