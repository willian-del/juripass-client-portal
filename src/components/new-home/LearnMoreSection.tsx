import { Link } from 'react-router-dom';
import { FileText, HelpCircle, BookOpen, ArrowRight } from 'lucide-react';

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
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
          Saiba Mais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Acessar <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
