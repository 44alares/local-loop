import { Link } from 'react-router-dom';
import { Palette, Printer, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const userTypes = [
  {
    id: 'designer',
    icon: Palette,
    title: "I'm a Designer",
    description: "Upload your STL. Earn royalties when it's printed worldwide. You focus on creativity, we handle the rest.",
    cta: "Start Creating",
    href: "/designer",
    highlight: "8% royalty per sale",
    color: "secondary" as const,
  },
  {
    id: 'maker',
    icon: Printer,
    title: "I'm a Maker",
    description: "Print designs you love. Earn per print, reach global customers. Your skills, your rules.",
    cta: "Join as Maker",
    href: "/maker",
    highlight: "75% of each sale",
    color: "accent" as const,
  },
  {
    id: 'buyer',
    icon: ShoppingBag,
    title: "I Want to Buy",
    description: "Find designs you love, printed in your city. Support local makers. Zero-mile delivery.",
    cta: "Browse Shop",
    href: "/shop",
    highlight: "Local pickup available",
    color: "primary" as const,
  },
];

export function UserTypeCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-display-sm font-bold mb-4">
            Join the Movement
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you design, make, or simply love well-crafted objects — 
            there's a place for you in the MakeHug community.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {userTypes.map((type) => (
            <div
              key={type.id}
              className="group relative rounded-2xl p-8 bg-card shadow-card card-hover border border-border/50"
            >
              {/* Icon */}
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl mb-6 ${
                type.color === 'secondary' ? 'bg-secondary/10' :
                type.color === 'accent' ? 'bg-accent/10' :
                'bg-primary/10'
              }`}>
                <type.icon className={`h-7 w-7 ${
                  type.color === 'secondary' ? 'text-secondary' :
                  type.color === 'accent' ? 'text-accent' :
                  'text-primary'
                }`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{type.title}</h3>
              <p className="text-muted-foreground mb-6">{type.description}</p>

              {/* Highlight Badge */}
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-6 ${
                type.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                type.color === 'accent' ? 'bg-accent/10 text-accent' :
                'bg-primary/10 text-primary'
              }`}>
                {type.highlight}
              </div>

              {/* CTA */}
              <Button
                variant={type.color === 'accent' ? 'accent' : type.color === 'secondary' ? 'sage' : 'default'}
                className="w-full group-hover:shadow-md transition-shadow"
                asChild
              >
                <Link to={type.href}>
                  {type.cta}
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
