import { Link } from 'react-router-dom';
import { Palette, Printer, ShoppingBag, ArrowRight, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

const userTypes = [
  {
    id: 'buyer',
    icon: ShoppingBag,
    title: 'I Want to Buy',
    description: 'Find designs you love, printed in your city. Support local makers. Zero-mile delivery.',
    cta: 'Browse Shop',
    href: '/shop',
    highlight: 'Local pickup available',
    color: 'primary' as const,
  },
  {
    id: 'make-my-design',
    icon: Wrench,
    title: 'Make My Design',
    description: "Got an idea or a file? We'll match you with a local maker to bring it to life.",
    cta: 'Get Started',
    href: '/make-my-design',
    highlight: 'Custom production',
    color: 'accent' as const,
  },
  {
    id: 'maker',
    icon: Printer,
    title: "I'm a Maker",
    description: "Print great designs. Earn per print from local orders. Your skills, your rules.",
    cta: 'Join as Maker',
    href: '/maker',
    highlight: 'Majority of each print',
    color: 'accent' as const,
  },
  {
    id: 'designer',
    icon: Palette,
    title: "I'm a Designer",
    description: "Upload your STL. Earn royalties when it's printed worldwide. You focus on creativity, we handle the rest.",
    cta: 'Start Creating',
    href: '/designer',
    highlight: 'Earn royalties per print',
    color: 'secondary' as const,
  },
];

export function UserTypeCTA() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold mb-2">Join the Movement</h2>
          <p className="text-muted-foreground">
            Whether you design, make, or simply love well-crafted objects —
            there's a place for you in the MakeHug community.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {userTypes.map((type) => (
            <div
              key={type.id}
              className="group relative rounded-xl p-5 bg-card shadow-card card-hover border border-border/50"
            >
              {/* Icon + Content - horizontal layout on mobile */}
              <div className="flex items-start gap-4 md:block">
                <div
                  className={`h-12 w-12 flex items-center justify-center rounded-xl shrink-0 md:mb-4 ${
                    type.color === 'secondary'
                      ? 'bg-secondary/10'
                      : type.color === 'accent'
                      ? 'bg-accent/10'
                      : 'bg-primary/10'
                  }`}
                >
                  <type.icon
                    className={`h-6 w-6 ${
                      type.color === 'secondary'
                        ? 'text-secondary'
                        : type.color === 'accent'
                        ? 'text-accent'
                        : 'text-primary'
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{type.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                </div>
              </div>

              {/* CTA */}
              <Button
                variant={
                  type.color === 'accent'
                    ? 'accent'
                    : type.color === 'secondary'
                    ? 'sage'
                    : 'default'
                }
                className="w-full mt-2 md:mt-0 group-hover:shadow-md transition-shadow"
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
