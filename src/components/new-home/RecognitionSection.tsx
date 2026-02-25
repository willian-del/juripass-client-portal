import { CreditCard, Heart, Home, ShieldX, Users, Wallet } from 'lucide-react';

const items = [
  { icon: Wallet, label: 'Dívidas e cobranças' },
  { icon: Heart, label: 'Separação' },
  { icon: Home, label: 'Problemas de moradia' },
  { icon: ShieldX, label: 'Negativas de plano de saúde' },
  { icon: Users, label: 'Conflitos familiares' },
  { icon: CreditCard, label: 'Decisões financeiras urgentes' },
];

export function RecognitionSection() {
  return (
    <section className="py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            O que costuma chegar ao RH —{' '}
            <span className="text-primary">mesmo não sendo tema do RH</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:-translate-y-1 transition-transform"
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
