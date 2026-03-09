import { Printer, X, Phone, Heart, Lightbulb, ArrowRight, Shield, Lock, Mail, Globe, BadgeCheck, Clock, Building2, Scale, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnePagerProps {
  onClose?: () => void;
  standalone?: boolean;
}

export function OnePager({ onClose, standalone = false }: OnePagerProps) {
  return (
    <div className={`${standalone ? '' : 'fixed inset-0 z-50'} bg-white overflow-auto`}>
      {/* Print controls */}
      {!standalone && (
        <div className="print:hidden sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between z-10">
          <span className="text-sm text-gray-500">Material Institucional — Resumo</span>
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
          <img 
            src="/images/branding/juripass-logo-white.png" 
            alt="Juripass" 
            className="h-10 object-contain"
          />
          <div className="text-right">
            <p className="text-white/60 text-sm">Programa de Acolhimento e Orientação Jurídica</p>
          </div>
        </div>

        <div className="px-8 py-6 space-y-5 text-[#2C3E7D] print:text-black">

          {/* 1. Sobre */}
          <section className="space-y-2">
            <SectionTitle number="1">Sobre a Juripass</SectionTitle>
            <p className="text-sm leading-relaxed text-gray-600">
              A Juripass é uma plataforma de gestão preventiva para o RH que estrutura, como política corporativa, 
              um canal jurídico externo e confidencial para acolher questões pessoais sensíveis dos colaboradores. 
              Antes que impactem o clima, a produtividade ou evoluam para conflitos internos.
            </p>
            <p className="text-sm leading-relaxed text-gray-600">
              O programa tem como objetivo reduzir preocupações extra laborais que impactam diretamente o desempenho, 
              a concentração e o bem-estar do colaborador.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Finanças', 'Família', 'Moradia', 'Consumo', 'Saúde'].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-[#4A9FD8]/10 text-[#4A9FD8] border border-[#4A9FD8]/20 print:border-gray-300 print:text-gray-600 print:bg-gray-50">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <Divider />

          {/* 2. O que oferece */}
          <section className="space-y-3">
            <SectionTitle number="2">O que o programa oferece</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-[#4A9FD8]">Para o Colaborador</p>
                <ul className="text-xs space-y-1.5 text-gray-600">
                  {[
                    'Canal de acolhimento e triagem de demandas',
                    'Orientação informativa sobre direitos e caminhos legais',
                    'Esclarecimento de dúvidas iniciais',
                    'Organização da situação e próximos passos',
                    'Encaminhamento a advogado quando necessário',
                    'Conteúdos educativos preventivos',
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
                    'Redução de demandas pessoais ao RH e gestores',
                    'Apoio à gestão de pessoas e mediação de conflitos',
                    'Menor impacto emocional no ambiente de trabalho',
                    'Fortalecimento do employer branding',
                    'Aderência a políticas de bem-estar e NR-01',
                    'Estatísticas de uso e mapa de risco psicossocial',
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

          {/* 3. Como funciona */}
          <section className="space-y-3">
            <SectionTitle number="3">Como funciona</SectionTitle>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Phone, step: '1', title: 'Contato', desc: 'Via WhatsApp ou aplicativo.' },
                { icon: Heart, step: '2', title: 'Acolhimento', desc: 'Triagem e organização da demanda.' },
                { icon: Lightbulb, step: '3', title: 'Orientação', desc: 'Informação clara sobre direitos.' },
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

          {/* 4. Escopo e Limitações + 5. Confidencialidade */}
          <div className="grid grid-cols-2 gap-6">
            <section className="space-y-2">
              <SectionTitle number="4">Escopo e Limitações</SectionTitle>
              <p className="text-[10px] text-gray-500 leading-relaxed">
                O atendimento consiste em orientação inicial informativa, não substituindo consulta jurídica formal.
              </p>
              <ul className="text-xs space-y-1.5 text-gray-600">
                <li className="flex items-start gap-1.5"><AlertCircle className="h-3 w-3 text-gray-400 mt-0.5 shrink-0" />Não inclui elaboração de peças processuais</li>
                <li className="flex items-start gap-1.5"><AlertCircle className="h-3 w-3 text-gray-400 mt-0.5 shrink-0" />Não inclui análise de contratos complexos</li>
                <li className="flex items-start gap-1.5"><AlertCircle className="h-3 w-3 text-gray-400 mt-0.5 shrink-0" />Não inclui representação judicial</li>
                <li className="flex items-start gap-1.5"><BadgeCheck className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />Sem custo ao colaborador na orientação inicial</li>
              </ul>
            </section>
            <section className="space-y-2">
              <SectionTitle number="5">Confidencialidade e LGPD</SectionTitle>
              <ul className="text-xs space-y-1.5 text-gray-600">
                <li className="flex items-start gap-1.5"><Shield className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />Atendimentos não compartilhados com a empresa</li>
                <li className="flex items-start gap-1.5"><Shield className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />Apenas dados agregados e anonimizados</li>
                <li className="flex items-start gap-1.5"><Shield className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />Dados pertencem ao colaborador</li>
                <li className="flex items-start gap-1.5"><Shield className="h-3 w-3 text-[#4A9FD8] mt-0.5 shrink-0" />Sigilo profissional e LGPD</li>
              </ul>
            </section>
          </div>

          <Divider />

          {/* 6. Natureza do Serviço */}
          <section className="space-y-2">
            <SectionTitle number="6">Natureza do Serviço</SectionTitle>
            <p className="text-sm leading-relaxed text-gray-600">
              A Juripass não presta serviços advocatícios, não emite parecer jurídico e não substitui advogado. 
              Atua exclusivamente como plataforma de acolhimento, triagem e facilitação de acesso a profissionais habilitados, 
              preservando a autonomia da relação entre colaborador e advogado eventualmente contratado.
            </p>
          </section>

          <Divider />

          {/* 7. Encerramento */}
          <section className="space-y-2">
            <p className="text-sm leading-relaxed text-gray-600">
              Ao oferecer orientação preventiva e acesso facilitado à informação jurídica, a empresa amplia sua política de cuidado 
              com o colaborador, reduz fatores pessoais que impactam produtividade e fortalece o ambiente organizacional.
            </p>
            <p className="text-xs text-gray-400">
              Permanecemos à disposição para esclarecimentos e eventuais adequações necessárias.
            </p>
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

function SectionTitle({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold flex items-center gap-2 text-[#2C3E7D] print:text-black">
      <span className="w-5 h-5 rounded-full bg-[#2C3E7D] text-white text-[10px] font-bold flex items-center justify-center shrink-0 print:bg-gray-700">
        {number}
      </span>
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="border-t border-gray-200" />;
}
