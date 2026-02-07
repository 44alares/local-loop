import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Upload, DollarSign, BarChart3, Globe, ArrowRight, Check, Palette, Users } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const benefits = [
  {
    icon: DollarSign,
    title: 'Earn Per Print',
    description: 'Earn passive income every time your design is printed anywhere in the world.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Your designs reach customers in 150+ cities without managing logistics.',
  },
  {
    icon: Users,
    title: 'Maker Network',
    description: 'Access our network of 2,300+ verified makers who bring your designs to life.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track views, prints, revenue, and see where your designs are most popular.',
  },
];

const steps = [
  'Sign up and create your designer profile',
  'Upload your STL files with specifications',
  'Designs reviewed within 24-48 hours',
  'Go live and start earning royalties',
];

export default function Designer() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-12 md:py-20">
        <div className="container">
          <div className="flex items-start gap-4 md:grid md:grid-cols-2 md:gap-10 md:items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
                <Palette className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">For Designers</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Your Designs. Their Hands.{' '}
                <span className="text-secondary">Your Earnings.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                Upload your STL. Earn royalties when it's printed worldwide.
                You focus on creativity, we handle the rest.
              </p>
              
              {/* Primary CTA row - same row on mobile */}
              <div className="flex flex-row gap-3">
                <Button variant="hero-accent" asChild className="flex-1 md:flex-none">
                  <Link to="/start-creating">
                    Start Creating
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" asChild className="flex-1 md:flex-none">
                  <Link to="/shop">Browse Designs</Link>
                </Button>
              </div>

              {/* Founders Club CTA - Centered below with spacing */}
              <div className="flex justify-center md:justify-start pt-4">
                <Button
                  variant="outline"
                  size="default"
                  className="border-accent text-accent hover:bg-accent/10 text-base"
                  asChild
                >
                  <Link to="/founders-club">Join Founders Club</Link>
                </Button>
              </div>
            </div>

            {/* Mobile Hero Image - Small square */}
            <div className="w-24 shrink-0 md:hidden">
              <div className="rounded-xl overflow-hidden shadow-card border border-border">
                <AspectRatio ratio={1}>
                  <img
                    alt="3D design process"
                    className="h-full w-full object-cover"
                    src="/lovable-uploads/238a0a94-ff14-4890-8997-da10e32d14ba.png"
                  />
                </AspectRatio>
              </div>
            </div>

            {/* Desktop Hero Image */}
            <div className="relative hidden md:block">
              <img
                alt="3D design process"
                className="rounded-2xl shadow-2xl"
                src="/lovable-uploads/238a0a94-ff14-4890-8997-da10e32d14ba.png"
              />
              <div className="absolute -bottom-4 -left-4 p-4 bg-card rounded-xl shadow-card-hover">
                <p className="text-2xl font-bold text-accent">Earn royalties</p>
                <p className="text-sm text-muted-foreground">on every print</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-3">Why Designers Love MakeHug</h2>
            <p className="text-muted-foreground">
              Focus on what you do best — designing. We'll handle production,
              payments, and customer service.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-5 rounded-xl bg-card shadow-card card-hover"
              >
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <benefit.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-bold mb-1 text-sm">{benefit.title}</h3>
                <p className="text-muted-foreground text-xs">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-16 md:py-20 bg-cream-dark/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Getting Started Is Easy</h2>
              <p className="text-muted-foreground mb-6">
                Join our community of designers and start earning from your
                creative work in just a few steps.
              </p>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <Check className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
              <Button variant="accent" size="lg" className="mt-6" asChild>
                <Link to="/start-creating">
                  Start Creating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="font-bold mb-4">What You'll Need</h3>
                <ul className="space-y-3">
                  {[
                    'Portfolio or 3+ original STL designs',
                    'IP declaration confirming original work',
                    'Agreement to our royalty terms',
                    'Payment method for royalty payouts',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-secondary" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Turn Your Designs Into Income?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of designers who are already earning royalties
              on MakeHug. Your creativity deserves to reach the world.
            </p>
            <Button variant="hero-accent" asChild>
              <Link to="/start-creating">
                Start Creating Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
