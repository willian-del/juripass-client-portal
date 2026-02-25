import { Printer, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogoJuripass } from '@/components/ui/LogoJuripass';

interface OnePagerProps {
  onClose: () => void;
}

export function OnePager({ onClose }: OnePagerProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background overflow-auto">
      {/* Print controls - hidden when printing */}
      <div className="print:hidden sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-3 flex items-center justify-between z-10">
        <span className="text-sm text-muted-foreground">Resumo em uma página</span>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-1" />
            Imprimir / Salvar como PDF
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Printable content */}
      <div className="max-w-[210mm] mx-auto p-8 md:p-12 space-y-6 text-foreground print:p-8 print:text-black">
        {/* Logo */}
        <div className="flex justify-center print:justify-start">
          <LogoJuripass variant="full" size="md" format="png" clickable={false} />
        </div>

        <hr className="border-border print:border-gray-300" />

        {/* O problema */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold">O problema</h2>
          <p className="text-sm leading-relaxed">
            Colaboradores enfrentam situações pessoais delicadas — divórcios, dívidas, conflitos familiares — e acabam buscando orientação dentro da empresa. 
            O RH vira conselheiro informal, gestores mediam problemas que não são deles, e a empresa se expõe a riscos desnecessários.
          </p>
        </div>

        {/* A solução */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold">O que a Juripass faz</h2>
          <p className="text-sm leading-relaxed">
            Canal externo, confidencial e acessível via WhatsApp. O colaborador recebe orientação inicial sobre sua situação 
            e é encaminhado adequadamente a um profissional, sem envolvimento da empresa.
          </p>
        </div>

        {/* Como funciona */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold">Como funciona</h2>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <p className="font-semibold">1. Contato direto</p>
              <p className="text-muted-foreground print:text-gray-600">Via WhatsApp, sem passar pelo RH.</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">2. Orientação clara</p>
              <p className="text-muted-foreground print:text-gray-600">Entende a situação e os caminhos possíveis.</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold">3. Encaminhamento</p>
              <p className="text-muted-foreground print:text-gray-600">Direcionado a profissional especializado.</p>
            </div>
          </div>
        </div>

        {/* Piloto */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold">Piloto</h2>
          <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground print:text-gray-600">
            <li>Duração: 90 dias</li>
            <li>Sem compromisso de continuidade</li>
            <li>Implementação em até 2 semanas</li>
            <li>Relatório de utilização ao final</li>
          </ul>
        </div>

        {/* Investimento */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold">Investimento</h2>
          <p className="text-sm">
            Aproximadamente <strong>R$5 mil mensais</strong>. Valor fixo, sem cobrança por colaborador ou utilização.
          </p>
        </div>

        <hr className="border-border print:border-gray-300" />

        {/* Contato */}
        <div className="text-sm text-muted-foreground print:text-gray-600">
          <p><strong>Contato:</strong> WhatsApp — wa.me/5511999999999</p>
          <p>juripass.com.br</p>
        </div>
      </div>
    </div>
  );
}
