import { Printer, X, Phone, Heart, Lightbulb, ArrowRight, Shield, Lock, Rocket, Mail, Globe, BadgeCheck, Clock, Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogoJuripass } from '@/components/ui/LogoJuripass';

interface OnePagerProps {
  onClose?: () => void;
  standalone?: boolean;
}

export function OnePager({ onClose, standalone = false }: OnePagerProps) {
  return (
    <div className={`${standalone ? '' : 'fixed inset-0 z-50'} bg-white overflow-auto`}>
      {/* Print controls */}
      {!standalone && (
        <div className="print:hidden sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[hsl(var(--border))] px-6 py-3 flex items-center justify-between z-10">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Proposta Comercial — Resumo</span>
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
      )}

      {/* Printable A4 content */}
      <div className="max-w-[210mm] mx-auto bg-white print:shadow-none shadow-lg my-4 print:my-0">
        
        {/* Header band */}
        <div className="bg-[#2C3E7D] px-8 py-6 flex items-center justify-between">
          <LogoJuripass variant="full" color="white" size="md" format="png" clickable={false} />
          <div className="text-right">
            <p className="text-white text-xl font-bold">Proposta Comercial</p>
            <p className="text-white/60 text-sm">Programa de Acolhimento e Orientação Jurídica</p>
          </div>
        </div>

        <div className="px-8 py-6 space-y-5 text-[#2C3E7D] print:text-black">

          {/* Sobre */}
          <section className="space-y-2">
            <SectionTitle icon={Building2}>Sobre a Juripass</SectionTitle>
            <p className="text-sm leading-relaxed text-gray-600">
              Plataforma de acolhimento, triagem e facilitação de acesso a profissionais habilitados, 
              permitindo aos colaboradores e familiares obter orientação informativa sobre direitos e caminhos legais 
              em situações do dia a dia — reduzindo preocupações que impactam desempenho e bem-estar.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Finanças', 'Família', 'Moradia', 'Golpes digitais', 'Inventários', 'Consumo'].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-[#4A9FD8]/10 text-[#4A9FD8] border border-[#4A9FD8]/20 print:border-gray-300 print:text-gray-600 print:bg-gray-50">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <Divider />

          {/* O que oferece */}
          <section className="space-y-3">
            <SectionTitle icon={BadgeCheck}>O que o programa oferece</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-[#4A9FD8]">Para o Colaborador</p>
                <ul className="text-xs space-y-1.5 text-gray-600">
                  {[
                    'Canal de acolhimento e triagem',
                    'Orientação sobre direitos e caminhos',
                    'Esclarecimento de dúvidas iniciais',
                    'Organização da situação e próximos passos',
                    'Encaminhamento a advogado quando necessário',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#4A9FD8] mt-1.5 shrink-0" />{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-[#4A9FD8]">Para a Empresa</p>
                <ul className="text-xs space-y-1.5 text-gray-600">
                  {[
                    'Redução de demandas pessoais ao RH',
                    'Apoio à gestão de pessoas',
                    'Menor impacto emocional no trabalho',
                    'Employer branding fortalecido',
                    'Aderência NR-01 e bem-estar',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#4A9FD8] mt-1.5 shrink-0" />{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <Divider />

          {/* Como funciona */}
          <section className="space-y-3">
            <SectionTitle icon={Rocket}>Como funciona</SectionTitle>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Phone, step: '1', title: 'Contato', desc: 'Via WhatsApp, sem passar pelo RH.' },
                { icon: Heart, step: '2', title: 'Acolhimento', desc: 'Triagem e organização da demanda.' },
                { icon: Lightbulb, step: '3', title: 'Orientação', desc: 'Informação clara sobre caminhos.' },
                { icon: ArrowRight, step: '4', title: 'Encaminhamento', desc: 'Advogado habilitado se necessário.' },
              ].map((s) => (
                <div key={s.step} className="text-center space-y-1">
                  <div className="w-8 h-8 rounded-full bg-[#4A9FD8] text-white flex items-center justify-center text-sm font-bold mx-auto print:bg-gray-700">
                    {s.step}
                  </div>
                  <p className="text-xs font-semibold">{s.title}</p>
                  <p className="text-[10px] text-gray-500 leading-tight">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* LGPD + Implantação side by side */}
          <div className="grid grid-cols-2 gap-6">
            <section className="space-y-2">
              <SectionTitle icon={Lock}>Confidencialidade</SectionTitle>
              <ul className="text-xs space-y-1.5 text-gray-600">
                <li className="flex items-start gap-1.5"><Shield className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />Atendimentos não compartilhados com a empresa</li>
                <li className="flex items-start gap-1.5"><Shield className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />Apenas dados agregados e anonimizados</li>
                <li className="flex items-start gap-1.5"><Shield className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />Dados pertencem ao colaborador</li>
                <li className="flex items-start gap-1.5"><Shield className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />Sigilo profissional e LGPD</li>
              </ul>
            </section>
            <section className="space-y-2">
              <SectionTitle icon={Clock}>Implantação</SectionTitle>
              <ul className="text-xs space-y-1.5 text-gray-600">
                <li className="flex items-start gap-1.5"><BadgeCheck className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />Reunião de kick-off</li>
                <li className="flex items-start gap-1.5"><BadgeCheck className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />Comunicação interna + treinamento</li>
                <li className="flex items-start gap-1.5"><BadgeCheck className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />Ativação em até 15 dias</li>
                <li className="flex items-start gap-1.5"><BadgeCheck className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />Sem taxa de implantação</li>
              </ul>
            </section>
          </div>

          <Divider />

          {/* Investimento */}
          <section className="space-y-2">
            <SectionTitle icon={Users}>Investimento</SectionTitle>
            <div className="bg-[#2C3E7D]/5 rounded-xl p-4 border border-[#2C3E7D]/10 print:bg-gray-50 print:border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Licença corporativa — acesso irrestrito</p>
                  <p className="text-xs text-gray-500">Sem custo por atendimento • Inclui dependentes</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#2C3E7D]">R$ 9.990<span className="text-sm font-normal text-gray-500">/mês</span></p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[#2C3E7D]/10 print:border-gray-200">
                <p className="text-xs text-[#4A9FD8] font-semibold">
                  🚀 Piloto 90 dias com 50% de desconto: R$ 4.995/mês — Contrato de 12 meses
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer band */}
        <div className="bg-[#2C3E7D] px-8 py-4 flex items-center justify-between">
          <div className="text-white/80 text-xs">
            <p className="font-semibold text-white">Frederico Werneck — Diretor</p>
          </div>
          <div className="flex items-center gap-4 text-white/60 text-xs">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> contato@juripass.com.br</span>
            <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> juripass.com.br</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold flex items-center gap-2 text-[#2C3E7D] print:text-black">
      <Icon className="h-4 w-4 text-[#4A9FD8]" />
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="border-t border-gray-200" />;
}
