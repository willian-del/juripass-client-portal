import { Link } from 'react-router-dom';
import { FileText, HelpCircle, BookOpen, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const items = [
  {
    icon: FileText,
    title: 'NR-01',
    description: 'Entenda a nova norma e como se adequar',
    to: '/nr-01',
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    description: 'Tire suas dúvidas sobre o Juripass',
    to: '/faq',
  },
  {
    icon: BookOpen,
    title: 'Blog',
    description: 'Artigos sobre gestão de pessoas',
    to: '/blog',
  },
];

export function LearnMoreSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            Saiba Mais
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {items.map((item, index) => (
            <ScrollReveal key={item.to} delay={index * 0.15}>
              <Link
                to={item.to}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-all hover:border-primary hover:shadow-md block h-full"
              >
                <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-foreground leading-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
                    {item.description} <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
