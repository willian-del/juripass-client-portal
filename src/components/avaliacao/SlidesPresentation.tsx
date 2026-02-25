import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogoJuripass } from '@/components/ui/LogoJuripass';

const slides = [
  {
    title: 'Juripass',
    subtitle: 'Canal externo para situações pessoais dos colaboradores',
    content: 'Uma solução que alivia o RH, protege a empresa e acolhe quem precisa de orientação.',
  },
  {
    title: 'O fenômeno',
    subtitle: 'Situações pessoais que chegam ao RH',
    content: 'Divórcios, dívidas, problemas familiares, questões de saúde mental. Colaboradores não têm a quem recorrer — e acabam buscando ajuda dentro da empresa.',
  },
  {
    title: 'O impacto',
    subtitle: 'Desgaste em RH e gestores',
    content: 'O RH vira conselheiro informal. Gestores mediam conflitos pessoais. O tempo estratégico é consumido por demandas que não são da empresa — mas que afetam diretamente a operação.',
  },
  {
    title: 'Por que acontece',
    subtitle: 'Falta de canal adequado',
    content: 'Não existe um canal externo, acessível e confidencial para situações pessoais. O colaborador não sabe a quem recorrer, e a empresa não tem como oferecer isso sem se expor.',
  },
  {
    title: 'A falha atual',
    subtitle: 'Tentativas informais de resolver',
    content: 'Conselhos entre colegas, orientações improvisadas do RH, gestores que tentam ajudar sem preparo. Boa intenção, mas risco real — para todos os envolvidos.',
  },
  {
    title: 'A Juripass',
    subtitle: 'O que é e como funciona',
    content: 'Canal externo via WhatsApp. O colaborador entra em contato diretamente, recebe orientação inicial e é encaminhado adequadamente. A empresa não participa e não recebe informações.',
  },
  {
    title: 'Redução de risco',
    subtitle: 'Benefícios organizacionais',
    content: 'Menos aconselhamento informal no RH. Gestores focados na operação. Colaboradores com canal seguro. Empresa protegida de envolvimento indevido em questões pessoais.',
  },
  {
    title: 'Piloto',
    subtitle: 'Proposta de teste de 90 dias',
    content: 'Sem compromisso de continuidade. Implementação em até 2 semanas. Relatório de utilização ao final. Investimento aproximado: R$5 mil mensais, valor fixo.',
  },
];

interface SlidesPresentationProps {
  onClose: () => void;
}

export function SlidesPresentation({ onClose }: SlidesPresentationProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1));

  const slide = slides[current];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <LogoJuripass variant="full" size="sm" format="png" clickable={false} />
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {current + 1} / {slides.length}
          </span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center space-y-6">
          {current === 0 && (
            <div className="mb-8">
              <LogoJuripass variant="full" size="lg" format="png" clickable={false} />
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">{slide.title}</h2>
          <p className="text-xl md:text-2xl text-primary font-medium">{slide.subtitle}</p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {slide.content}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border">
        <Button variant="outline" onClick={prev} disabled={current === 0}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === current ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        <Button variant="outline" onClick={next} disabled={current === slides.length - 1}>
          Próximo
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
