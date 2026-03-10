import { CreditCard, Heart, Home, Shield, Users, Wallet, FileText, Scale, ShoppingBag } from 'lucide-react';

const items = [
  { icon: Wallet, label: 'Endividamento e dívidas pessoais' },
  { icon: Heart, label: 'Conflitos familiares' },
  { icon: Home, label: 'Moradia e aluguel' },
  { icon: Shield, label: 'Golpes e fraudes' },
  { icon: FileText, label: 'Herança e inventário' },
  { icon: CreditCard, label: 'Problemas de consumo' },
  { icon: Users, label: 'Separação e guarda' },
  { icon: Scale, label: 'Pensão alimentícia' },
  { icon: ShoppingBag, label: 'Cobranças indevidas' },
];


export function RecognitionSection() {
  return (
    <section className="py-20 md:py-28 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            O que costuma chegar ao RH —{' '}
            <span className="text-primary">mesmo não sendo tema do RH</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {items.map((item) =>
            <div
              key={item.label}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-card border border-border shadow-md hover:shadow-lg transition-shadow duration-200 h-[100px] md:h-[110px]">
              
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground text-center leading-tight">{item.label}</span>
              </div>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">Sem um canal adequado, essas situações não desaparecem. Elas acabam sendo absorvidas informalmente pela empresa — muitas vezes pelo RH — gerando sobrecarga, ruído e exposição desnecessária para a organização.</p>
        </div>
      </div>
    </section>);

}
