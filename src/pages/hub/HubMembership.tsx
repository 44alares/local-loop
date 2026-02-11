import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: 'Free',
    desc: 'Basic access to the platform.',
    features: [
      'Browse the shop',
      'View public resources',
      'Community forum access',
    ],
    cta: 'Get started',
    highlighted: false,
  },
  {
    name: 'Member',
    price: 'Coming soon',
    desc: 'Access the full Member Hub experience.',
    features: [
      'All free features',
      'Join regional group buys',
      'Member-only deals & pricing',
      'Role-specific resources',
      'Community events & workshops',
      'Supplier agreements access',
      'Priority support',
    ],
    cta: 'Join the waitlist',
    highlighted: true,
  },
  {
    name: 'Pro',
    price: 'Coming soon',
    desc: 'For serious makers and designers who want more.',
    features: [
      'All Member features',
      'Early access to new group buys',
      'Advanced analytics & insights',
      'Featured listing placement',
      'Dedicated account support',
    ],
    cta: 'Learn more',
    highlighted: false,
  },
];

export default function HubMembership() {
  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-hero py-12">
        <div className="container max-w-3xl text-center space-y-4">
          <h1 className="text-display-sm font-bold">Membership & Plans</h1>
          <p className="text-muted-foreground text-lg">
            Join if it helps you. Stay because it's useful.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.highlighted ? 'border-secondary shadow-lg relative' : ''}>
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground">Recommended</Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-2xl font-bold">{plan.price}</p>
                  <p className="text-sm text-muted-foreground">{plan.desc}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.highlighted ? 'default' : 'outline'}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-2xl mx-auto mt-12 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Membership is about access and coordination—not forcing anyone. Cancel or pause anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
