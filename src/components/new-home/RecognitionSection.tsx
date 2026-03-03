import { CreditCard, Heart, Home, Shield, Users, Wallet, FileText, Scale, ShoppingBag } from 'lucide-react';

const items = [
{ icon: Wallet, label: 'Dívidas e nome sujo' },
{ icon: Heart, label: 'Conflitos e questões familiares' },
{ icon: Home, label: 'Problemas com moradia e aluguel' },
{ icon: Shield, label: 'Golpes e fraudes digitais' },
{ icon: FileText, label: 'Familia, inventário e Herança' },
{ icon: CreditCard, label: 'Problemas com compras e garantia' },
{ icon: Users, label: 'Separação e guarda de filhos' },
{ icon: Scale, label: 'Revisão e pagamento de pensão' },
{ icon: ShoppingBag, label: 'Cobranças e taxas indevidas' }];


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

          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">Sem um destino claro, essas situações não desaparecem.
Elas apenas passam a ser administradas informalmente pela empresa.
O RH vira o ponto de apoio informal para questões pessoais sensíveis, gerando sobrecarga, ruído e exposição desnecessária.<br />
            Elas apenas passam a ser administradas informalmente pela empresa.
            <br />
            O RH vira o ponto de apoio informal para questões pessoais sensíveis.
          </p>
        </div>
      </div>
    </section>);

}