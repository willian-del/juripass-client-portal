import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Isso é assistência jurídica?',
    a: 'Não. A Juripass oferece orientação inicial de caráter informativo. Não inclui elaboração de peças processuais, análise de contratos complexos ou representação judicial. Quando necessário, o colaborador é encaminhado a um advogado habilitado.',
  },
  {
    q: 'A empresa assume algum risco?',
    a: 'Não. A Juripass opera de forma independente. A empresa não participa das conversas nem tem acesso ao conteúdo.',
  },
  {
    q: 'Como funciona a confidencialidade?',
    a: 'O conteúdo dos atendimentos não é compartilhado com a empresa. A empresa recebe apenas dados estatísticos agregados e anonimizados. Os dados pertencem ao colaborador, protegidos pela LGPD, com sigilo profissional e controles de segurança da informação.',
  },
  {
    q: 'O RH deixa de apoiar o colaborador?',
    a: 'Não. O RH continua com seu papel. A Juripass cuida do que não cabe ao RH — situações pessoais sensíveis que precisam de orientação especializada.',
  },
  {
    q: 'Os colaboradores realmente usam?',
    a: 'Sim. A adesão média é de 30% nos primeiros 3 meses. Quando o canal existe e é comunicado de forma adequada, os colaboradores utilizam.',
  },
];

export function HomeFAQSection() {
  return (
    <section className="py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            Perguntas frequentes
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
