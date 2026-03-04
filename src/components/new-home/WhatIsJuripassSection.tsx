import { Unplug, MousePointerClick, BadgeCheck, Wallet, Users, Home, ShoppingBag, HeartPulse } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const pillars = [
{
  icon: Unplug,
  title: 'Canal Externo e independente',
  description: 'Sem vínculo com a empresa, sem conflito de interesse.'
},
{
  icon: MousePointerClick,
  title: 'Sob demanda e confidencial',
  description: 'O colaborador aciona quando quiser, sem intermediários.'
},
{
  icon: BadgeCheck,
  title: 'Sem custo para o colaborador',
  description: 'Orientação inicial gratuita, sem burocracia.'
}];


const themes = [
{ icon: Wallet, label: 'Finanças' },
{ icon: Users, label: 'Família' },
{ icon: Home, label: 'Moradia' },
{ icon: ShoppingBag, label: 'Consumo' },
{ icon: HeartPulse, label: 'Saúde' }];


export function WhatIsJuripassSection() {
  return (
    <section className="py-20 md:py-28 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            O que é a Juripass
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg text-muted-foreground text-center leading-relaxed">Um canal externo de orientação jurídica que o colaborador acessa de forma autônoma. A empresa contrata e o colaborador usa quando precisar, com sigilo total.


            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {themes.map((theme) =>
              <Badge
                key={theme.label}
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 text-sm font-medium">
                
                  <theme.icon className="h-3.5 w-3.5" />
                  {theme.label}
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) =>
            <div
              key={pillar.title}
              className="bg-card border border-border rounded-2xl p-6 text-center space-y-4 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <pillar.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}