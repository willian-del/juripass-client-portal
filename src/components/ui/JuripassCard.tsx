import React from 'react';
import QRCodeSVG from 'react-qr-code';
import { LogoJuripass } from './LogoJuripass';
import { formatCPF } from '@/lib/cpfUtils';

interface JuripassCardProps {
  cpf?: string;
  nome?: string;
  organizacao?: string;
}

export function JuripassCard({ cpf, nome, organizacao }: JuripassCardProps) {
  const qrCodeUrl = `${window.location.origin}/iniciar-atendimento`;
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-primary via-primary to-blue-700 rounded-2xl shadow-2xl p-6 md:p-8 text-white">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <LogoJuripass 
            variant="horizontal" 
            color="white" 
            size="lg"
            format="png"
          />
        </div>

        {/* Informações do Usuário */}
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">CPF</p>
            <p className="text-sm font-mono font-semibold">
              {cpf ? formatCPF(cpf) : '___.___.___-__'}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Nome</p>
            <p className="text-lg font-semibold">
              {nome || 'Seu nome aqui'}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Organização</p>
            <p className="text-sm opacity-90">
              {organizacao || 'Empresa'}
            </p>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex justify-center pt-4 border-t border-white/20">
          <div className="bg-white p-3 rounded-lg">
            <QRCodeSVG 
              value={qrCodeUrl}
              size={120}
              level="M"
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>
        </div>

        <p className="text-xs text-center mt-3 opacity-75">
          Escaneie para iniciar atendimento
        </p>
      </div>
    </div>
  );
}
