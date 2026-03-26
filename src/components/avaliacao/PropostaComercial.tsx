import { useState } from 'react';
import { Printer, X, Mail, Globe, User, Building2, Scale, Shield, Phone, Heart, Lightbulb, ArrowRight, MessageSquare, BarChart3, GraduationCap, Headphones, Monitor, FileText, Clock, Lock, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PropostaComercialProps {
  onClose?: () => void;
  standalone?: boolean;
}

const PRICING_TABLE = [
  { min: 0, max: 300, label: 'Até 300', price: 1990 },
  { min: 301, max: 600, label: '301 a 600', price: 3490 },
  { min: 601, max: 1000, label: '601 a 1.000', price: 5490 },
  { min: 1001, max: 1500, label: '1.001 a 1.500', price: 7490 },
  { min: 1501, max: 2500, label: '1.501 a 2.500', price: 9990 },
  { min: 2501, max: 4000, label: '2.501 a 4.000', price: 14990 },
  { min: 4001, max: Infinity, label: 'Acima de 4.000', price: null },
];

function formatCurrency(value: number | null): string {
  if (value === null) return 'Sob consulta';
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

  const activeTier = getActiveTier(employeeCount);
  const formattedDate = new Date(proposalDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className={`${standalone ? '' : 'fixed inset-0 z-50'} bg-white overflow-auto`}>
      {/* Controls bar */}
      <div className="print:hidden sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between z-10">
        <span className="text-sm text-gray-500">Proposta Comercial</span>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-1" />
            Imprimir / Salvar como PDF
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
      <div className="max-w-[210mm] mx-auto bg-white print:shadow-none shadow-lg my-4 print:my-0">
        {/* Header band */}
        <div className="bg-[#2C3E7D] px-8 py-6 flex items-center justify-between">
          <img src="/images/branding/juripass-logo-white.png" alt="Juripass" className="h-10 object-contain" />
          <div className="text-right">
            <p className="text-white/60 text-xs">Proposta Comercial</p>
          </div>
        </div>

        {/* Cover section */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-[#2C3E7D] leading-tight">
            Acolhimento Jurídico, Gestão de Riscos<br />Humanos e Canal de Integridade
          </h1>
          <p className="text-sm text-[#4A9FD8] font-semibold mt-1">Proposta Comercial</p>
          <div className="mt-4 flex gap-8 text-sm text-gray-600">
            <span><span className="font-semibold text-[#2C3E7D]">Cliente:</span> {clientName}</span>
            <span><span className="font-semibold text-[#2C3E7D]">Data:</span> {formattedDate}</span>
          </div>
        </div>

        <div className="px-8 py-5 space-y-5 text-[#2C3E7D]">
          {/* 1. Visão Geral */}
          <section className="space-y-2">
            <SectionTitle number="1">Visão Geral</SectionTitle>
            <p className="text-xs leading-relaxed text-gray-600">
              A Juripass é uma solução integrada que combina acolhimento jurídico ao colaborador, gestão de riscos humanos (NR-01) e canal estruturado de integridade.
              Objetivo: reduzir riscos, conflitos e demandas informais ao RH, atuando de forma preventiva sobre fatores que impactam o ambiente de trabalho.
            </p>
          </section>

          <Divider />

          {/* 2. Frentes de Atuação */}
          <section className="space-y-3">
            <SectionTitle number="2">Frentes de Atuação</SectionTitle>
            <div className="grid grid-cols-3 gap-3">
              {/* Colaborador */}
              <div className="border border-gray-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#4A9FD8]/15 flex items-center justify-center shrink-0">
                    <User className="h-3.5 w-3.5 text-[#4A9FD8]" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#4A9FD8]">Colaborador</p>
                </div>
                <p className="text-[10px] font-semibold text-[#2C3E7D]">Acolhimento Jurídico</p>
                <ul className="text-[9px] space-y-1 text-gray-600">
                  {['Orientação sobre dívidas, família, moradia, consumo e contratos', 'Atendimento humano e acessível', 'Sem custo inicial', 'Linguagem simples e prática', 'Encaminhamento para advogado quando necessário'].map(t => (
                    <li key={t} className="flex items-start gap-1"><span className="w-1 h-1 rounded-full bg-[#4A9FD8] mt-1 shrink-0" />{t}</li>
                  ))}
                </ul>
                <p className="text-[8px] text-gray-400 leading-snug italic border-t border-gray-100 pt-1.5 mt-1">
                  O colaborador pode contratar diretamente um advogado de sua confiança, inclusive entre parceiros da Juripass, sem qualquer custo ou responsabilidade para a empresa.
                </p>
              </div>

              {/* RH */}
              <div className="border border-gray-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#4A9FD8]/15 flex items-center justify-center shrink-0">
                    <Building2 className="h-3.5 w-3.5 text-[#4A9FD8]" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#4A9FD8]">RH</p>
                </div>
                <p className="text-[10px] font-semibold text-[#2C3E7D]">Gestão de Riscos Humanos</p>
                <ul className="text-[9px] space-y-1 text-gray-600">
                  {['Redução de demandas pessoais ao RH', 'Identificação de padrões de risco (anonimizados)', 'Apoio às diretrizes da NR-01', 'Melhoria de clima organizacional'].map(t => (
                    <li key={t} className="flex items-start gap-1"><span className="w-1 h-1 rounded-full bg-[#4A9FD8] mt-1 shrink-0" />{t}</li>
                  ))}
                </ul>
              </div>

              {/* Canal de Integridade */}
              <div className="border border-gray-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#4A9FD8]/15 flex items-center justify-center shrink-0">
                    <Scale className="h-3.5 w-3.5 text-[#4A9FD8]" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#4A9FD8]">Integridade</p>
                </div>
                <p className="text-[10px] font-semibold text-[#2C3E7D]">Canal de Integridade</p>
                <ul className="text-[9px] space-y-1 text-gray-600">
                  {['Assédio moral ou sexual', 'Discriminação', 'Conflitos e conduta', 'Canal confidencial e independente', 'Possibilidade de anonimato', 'Triagem e organização dos relatos'].map(t => (
                    <li key={t} className="flex items-start gap-1"><span className="w-1 h-1 rounded-full bg-[#4A9FD8] mt-1 shrink-0" />{t}</li>
                  ))}
                </ul>
                <p className="text-[8px] text-gray-400 leading-snug italic border-t border-gray-100 pt-1.5 mt-1">
                  A empresa permanece responsável pela apuração e eventuais medidas.
                </p>
              </div>
            </div>
          </section>

          <Divider />

          {/* 3. Como funciona */}
          <section className="space-y-3">
            <SectionTitle number="3">Como Funciona</SectionTitle>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Phone, step: '1', title: 'Acesso', desc: 'Via WhatsApp ou App Juripass' },
                { icon: Heart, step: '2', title: 'Acolhimento', desc: 'Acolhimento inicial da demanda' },
                { icon: Lightbulb, step: '3', title: 'Orientação', desc: 'Orientação e classificação' },
                { icon: ArrowRight, step: '4', title: 'Encaminhamento', desc: 'Quando necessário' },
              ].map(s => (
                <div key={s.step} className="text-center space-y-1">
                  <div className="w-8 h-8 rounded-full bg-[#4A9FD8] text-white flex items-center justify-center text-sm font-bold mx-auto">
                    {s.step}
                  </div>
                  <p className="text-[10px] font-semibold">{s.title}</p>
                  <p className="text-[9px] text-gray-500 leading-tight">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              {[
                { icon: Clock, label: 'SLA: até 1 dia útil' },
                { icon: Lock, label: 'Confidencialidade total' },
                { icon: Shield, label: 'Dados anonimizados' },
                { icon: CheckCircle2, label: 'Conformidade LGPD' },
              ].map(b => (
                <span key={b.label} className="flex items-center gap-1 px-2 py-1 rounded-full text-[8px] font-medium bg-[#4A9FD8]/10 text-[#4A9FD8] border border-[#4A9FD8]/20">
                  <b.icon className="h-2.5 w-2.5" />{b.label}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Footer band page 1 */}
        <div className="bg-[#2C3E7D] px-8 py-3 flex items-center justify-between print:mt-0">
          <p className="text-white/50 text-[9px]">Juripass — Proposta Comercial — Página 1/2</p>
          <div className="flex items-center gap-4 text-white/60 text-[9px]">
            <span className="flex items-center gap-1"><Mail className="h-2.5 w-2.5" /> contato@juripass.com.br</span>
            <span className="flex items-center gap-1"><Globe className="h-2.5 w-2.5" /> juripass.com.br</span>
          </div>
        </div>
      </div>

      {/* ═══════════ PAGE 2 ═══════════ */}
      <div className="max-w-[210mm] mx-auto bg-white print:shadow-none shadow-lg my-4 print:my-0 print:break-before-page">
        {/* Header band */}
        <div className="bg-[#2C3E7D] px-8 py-4 flex items-center justify-between">
          <img src="/images/branding/juripass-logo-white.png" alt="Juripass" className="h-8 object-contain" />
          <p className="text-white/50 text-[9px]">Proposta Comercial — {clientName}</p>
        </div>

        <div className="px-8 py-5 space-y-4 text-[#2C3E7D]">
          {/* 4. Componentes da Solução */}
          <section className="space-y-2">
            <SectionTitle number="4">Componentes da Solução</SectionTitle>
            <p className="text-[9px] text-gray-500">A Juripass integra tecnologia, atendimento especializado e inteligência de dados em uma única solução:</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Headphones, label: 'Canais de atendimento ao colaborador (WhatsApp e App)' },
                { icon: Monitor, label: 'Plataforma de gestão para o RH' },
                { icon: BarChart3, label: 'Monitoramento contínuo de riscos humanos' },
                { icon: FileText, label: 'Relatórios de inteligência com dados anonimizados' },
                { icon: GraduationCap, label: 'Treinamentos e conteúdos educativos' },
                { icon: MessageSquare, label: 'Acompanhamento contínuo da operação' },
              ].map(c => (
                <div key={c.label} className="flex items-start gap-2 text-[9px] text-gray-600 p-2 rounded border border-gray-100">
                  <c.icon className="h-3.5 w-3.5 text-[#4A9FD8] mt-0.5 shrink-0" />
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* 5. Modelo Comercial + Tabela */}
          <section className="space-y-2">
            <SectionTitle number="5">Modelo Comercial</SectionTitle>
            <p className="text-[9px] text-gray-500">
              A Juripass opera por meio de licença corporativa: acesso ilimitado para colaboradores e dependentes, sem custo por atendimento e sem limitação de uso.
            </p>

            {/* Pricing table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden mt-2">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="bg-[#2C3E7D] text-white">
                    <th className="text-left px-4 py-2 font-semibold">Faixa de Colaboradores</th>
                    <th className="text-right px-4 py-2 font-semibold">Valor Mensal</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_TABLE.map((tier, i) => {
                    const isActive = activeTier === tier;
                    return (
                      <tr key={i} className={`border-t border-gray-100 ${isActive ? 'bg-[#4A9FD8]/10 font-semibold' : ''}`}>
                        <td className={`px-4 py-2 ${isActive ? 'text-[#2C3E7D]' : 'text-gray-700'}`}>
                          {isActive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4A9FD8] mr-2" />}
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

            {/* Highlight box */}
            <div className="bg-[#4A9FD8]/8 border border-[#4A9FD8]/25 rounded-lg p-3 mt-2 space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-600">Faixa aplicável:</span>
                <span className="font-semibold text-[#2C3E7D]">{activeTier?.label || '—'}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-600">Nº de colaboradores considerado:</span>
                <span className="font-semibold text-[#2C3E7D]">{employeeCount.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between text-xs border-t border-[#4A9FD8]/20 pt-1.5 mt-1">
                <span className="font-semibold text-[#2C3E7D]">Valor mensal contratado:</span>
                <span className="font-bold text-[#2C3E7D] text-sm">{formatCurrency(activeTier?.price ?? null)}</span>
              </div>
            </div>

            <p className="text-[8px] text-gray-400 italic mt-1">
              Os valores apresentados não incluem tributos, que serão acrescidos conforme a legislação aplicável.
            </p>
          </section>

          <Divider />

          {/* 6. Condições */}
          <section className="space-y-2">
            <SectionTitle number="6">Condições</SectionTitle>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[9px] text-gray-600">
              {[
                'Prazo contratual de 12 meses',
                'Cancelamento a qualquer momento mediante aviso prévio de 30 dias',
                'Início em até 15 dias após contratação',
                'Sem taxa de implantação',
              ].map(c => (
                <p key={c} className="flex items-start gap-1.5"><CheckCircle2 className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />{c}</p>
              ))}
            </div>
          </section>

          <Divider />

          {/* 7. Escopo e Limitações */}
          <section className="space-y-2">
            <SectionTitle number="7">Escopo e Limitações</SectionTitle>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[9px] text-gray-600">
              {[
                'Foco em questões cíveis pessoais',
                'Não contempla direito do trabalho',
                'Não contempla direito criminal',
                'Não contempla temas internos da empresa',
              ].map(c => (
                <p key={c} className="flex items-start gap-1.5"><AlertCircle className="h-3 w-3 text-gray-400 mt-0.5 shrink-0" />{c}</p>
              ))}
            </div>
            <p className="text-[8px] text-gray-400 italic">
              A Juripass não representa colaboradores em demandas contra a empresa contratante.
            </p>
          </section>

          {/* Special conditions (only if filled) */}
          {specialConditions.trim() && (
            <>
              <Divider />
              <section className="space-y-2">
                <SectionTitle number="★">Condições Especiais</SectionTitle>
                <p className="text-[10px] text-gray-600 whitespace-pre-line">{specialConditions}</p>
              </section>
            </>
          )}

          <Divider />

          {/* 8. Encerramento */}
          <section className="space-y-2">
            <p className="text-[10px] leading-relaxed text-gray-600">
              A Juripass atua na interseção entre bem-estar do colaborador, gestão de riscos humanos e integridade organizacional, 
              oferecendo uma solução escalável, estruturada e de alto valor percebido.
            </p>
            <p className="text-[9px] text-gray-400">
              Permanecemos à disposição para esclarecimentos e eventuais adequações.
            </p>
          </section>
        </div>

        {/* Footer band */}
        <div className="bg-[#2C3E7D] px-8 py-4 flex items-center justify-between">
          <div className="text-white/80 text-xs">
            <p className="font-semibold text-white">Frederico Werneck — Diretor</p>
          </div>
          <div className="flex items-center gap-4 text-white/60 text-[9px]">
            <span className="flex items-center gap-1"><Mail className="h-2.5 w-2.5" /> contato@juripass.com.br</span>
            <span className="flex items-center gap-1"><Globe className="h-2.5 w-2.5" /> juripass.com.br</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold flex items-center gap-2 text-[#2C3E7D]">
      <span className="w-5 h-5 rounded-full bg-[#2C3E7D] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
        {number}
      </span>
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="border-t border-gray-200" />;
}
