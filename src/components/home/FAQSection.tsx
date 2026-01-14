import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'O que é o Programa Juripass?',
    answer: 'O Programa de Acolhimento Jurídico Juripass é um benefício corporativo que oferece acesso a orientação e suporte jurídico de qualidade para colaboradores e seus dependentes, abrangendo diversas áreas do direito de forma humanizada e acessível.'
  },
  {
    question: 'Quem pode utilizar o benefício?',
    answer: 'O benefício pode ser utilizado pelo colaborador titular e seus dependentes diretos, incluindo cônjuge e filhos, conforme o plano contratado pela empresa.'
  },
  {
    question: 'Quais áreas jurídicas são cobertas?',
    answer: 'O programa cobre diversas áreas do direito, incluindo Direito do Consumidor, Família e Sucessões, Propriedade e Contratos, Trabalhista e Previdenciário, entre outras. Cada caso é analisado individualmente para garantir o melhor suporte.'
  },
  {
    question: 'Como funciona o atendimento?',
    answer: 'O processo é simples: o colaborador entra em contato pelos canais disponíveis, passa por uma triagem inicial para entender sua necessidade e é encaminhado para um advogado especialista na área correspondente, tudo de forma rápida e descomplicada.'
  },
  {
    question: 'O atendimento é realmente confidencial?',
    answer: 'Sim, absolutamente. Todo o atendimento é protegido pelo sigilo profissional advogado-cliente. A empresa não tem acesso aos detalhes dos casos individuais, apenas a relatórios agregados de utilização do benefício.'
  },
  {
    question: 'Quanto tempo leva para implementar na empresa?',
    answer: 'A implementação é rápida e pode ser concluída em até 48 horas após a contratação. Nossa equipe cuida de todo o processo de onboarding e comunicação com os colaboradores.'
  },
  {
    question: 'Qual o custo para a empresa?',
    answer: 'Oferecemos planos flexíveis com valores acessíveis por colaborador/mês. O investimento varia conforme o tamanho da empresa e o nível de cobertura desejado. Entre em contato para uma proposta personalizada.'
  },
  {
    question: 'A empresa tem acesso aos casos dos colaboradores?',
    answer: 'Não. A empresa recebe apenas relatórios gerenciais com dados agregados de utilização, como número de atendimentos por área jurídica, sem qualquer identificação individual dos colaboradores ou detalhes dos casos.'
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-12 md:py-20 bg-muted/30 scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Tire suas dúvidas</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Respostas para as principais dúvidas sobre o Programa Juripass
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg border border-border/50 px-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
