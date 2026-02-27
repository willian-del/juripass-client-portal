import { CreditCard, Heart, Home, Shield, Users, Wallet, FileText, Scale, ShoppingBag } from 'lucide-react';

const items = [
  { icon: Wallet, label: 'Endividamento e negativação' },
  { icon: Heart, label: 'Conflitos e questões familiares' },
  { icon: Home, label: 'Problemas com moradia e aluguel' },
  { icon: Shield, label: 'Golpes e fraudes digitais' },
  { icon: FileText, label: 'Inventários e regularização de documentos' },
  { icon: CreditCard, label: 'Direitos do consumidor e compras' },
  { icon: Users, label: 'Separação e guarda de filhos' },
  { icon: Scale, label: 'Revisão e pagamento de pensão' },
  { icon: ShoppingBag, label: 'Cobranças e taxas indevidas' },
];

export function RecognitionSection() {
  return (
    <section className="py-16 md:py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            O que costuma chegar ao RH —{' '}
            <span className="text-primary">mesmo não sendo tema do RH</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 min-h-[72px]"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Sem um destino claro, essas situações não desaparecem.
            <br />
            Elas apenas passam a ser administradas informalmente pela empresa.
          </p>
        </div>
      </div>
    </section>
  );
}
