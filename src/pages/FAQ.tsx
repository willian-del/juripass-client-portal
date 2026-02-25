import { HomeHeader } from '@/components/home/HomeHeader';
import { Footer } from '@/components/ui/Footer';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { MessageCircle } from 'lucide-react';

const categories = [
  {
    title: 'Sobre o serviço',
    items: [
      {
        q: 'O que exatamente a Juripass faz?',
        a: 'A Juripass é um canal externo de orientação e encaminhamento para situações pessoais sensíveis dos colaboradores — como questões familiares, financeiras ou jurídicas — que não cabem ao RH resolver.',
      },
      {
        q: 'Isso é assistência jurídica?',
        a: 'Não. A Juripass oferece orientação e encaminhamento, não representação legal. O colaborador entende sua situação e é direcionado ao profissional adequado, se necessário.',
      },
      {
        q: 'A Juripass substitui o RH?',
        a: 'Não. O RH continua com seu papel estratégico. A Juripass cuida do que não cabe ao RH: situações pessoais sensíveis que precisam de um canal externo e confidencial.',
      },
    ],
  },
  {
    title: 'Sobre riscos e confidencialidade',
    items: [
      {
        q: 'A empresa assume algum risco?',
        a: 'Não. A Juripass opera de forma completamente independente. A empresa oferece o benefício, mas não participa das conversas nem tem acesso a nenhuma informação.',
      },
      {
        q: 'O colaborador pode processar a empresa por causa da Juripass?',
        a: 'Não. O canal é externo e confidencial. A empresa está oferecendo um benefício — não assumindo responsabilidade sobre o conteúdo das orientações.',
      },
      {
        q: 'A empresa tem acesso ao conteúdo das conversas?',
        a: 'Não. Nenhuma informação individual é compartilhada com a empresa. Os relatórios são completamente anonimizados e mostram apenas dados agregados de utilização.',
      },
    ],
  },
  {
    title: 'Sobre implementação',
    items: [
      {
        q: 'Como é feita a implementação?',
        a: 'Simples: a empresa comunica o benefício aos colaboradores e a Juripass cuida de todo o resto. Não há sistemas para instalar, integrações para configurar ou processos para mudar.',
      },
      {
        q: 'Precisa de integração com sistemas internos?',
        a: 'Não. A Juripass funciona via WhatsApp. Não precisa de nenhuma integração com sistemas de RH, folha de pagamento ou qualquer outro sistema interno.',
      },
      {
        q: 'Quanto tempo leva para começar?',
        a: 'O piloto pode começar em até 2 semanas após a contratação. A implementação é rápida porque não depende de tecnologia nem de mudanças internas.',
      },
    ],
  },
  {
    title: 'Sobre resultados',
    items: [
      {
        q: 'Os colaboradores realmente usam?',
        a: 'Sim. A adesão média é de 30% nos primeiros 3 meses. A simplicidade do canal (WhatsApp) e a confidencialidade são os principais fatores de adoção.',
      },
      {
        q: 'Como medir o resultado?',
        a: 'Através de relatórios anonimizados de utilização. Você vê dados agregados — quantidade de atendimentos, categorias mais frequentes — sem expor nenhum colaborador.',
      },
      {
        q: 'Qual o investimento?',
        a: 'Valor fixo mensal, sem cobrança por colaborador ou por utilização. O modelo é previsível e simples, sem surpresas no orçamento.',
      },
    ],
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <main>
        {/* Hero */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Perguntas frequentes
              </h1>
              <p className="text-lg text-muted-foreground">
                Respostas claras para as dúvidas mais comuns de RHs e gestores sobre a Juripass.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ por categorias */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-10">
              {categories.map((cat) => (
                <div key={cat.title} className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">{cat.title}</h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {cat.items.map((item, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`${cat.title}-${idx}`}
                        className="rounded-xl bg-card border border-border px-5"
                      >
                        <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary/90 to-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                Ainda tem dúvidas? Vamos conversar.
              </h2>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-background text-foreground font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="h-5 w-5" />
                Conversar rapidamente
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
