import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Upload, DollarSign, BarChart3, Globe, ArrowRight, Check, Palette, Users } from 'lucide-react';
const benefits = [{
  icon: DollarSign,
  title: '8-16% Royalty Per Print',
  description: 'Earn passive income every time your design is printed anywhere in the world.'
}, {
  icon: Globe,
  title: 'Global Reach',
  description: 'Your designs reach customers in 150+ cities without managing logistics.'
}, {
  icon: Users,
  title: 'Maker Network',
  description: 'Access our network of 2,300+ verified makers who bring your designs to life.'
}, {
  icon: BarChart3,
  title: 'Analytics Dashboard',
  description: 'Track views, sales, revenue, and see where your designs are most popular.'
}];
const steps = ['Sign up and create your designer profile', 'Upload your STL files with specifications', 'Designs reviewed within 24-48 hours', 'Go live and start earning royalties'];
export default function Designer() {
  return <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
                <Palette className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">For Designers</span>
              </div>
              <h1 className="text-display font-bold mb-6">
                Your Designs. Their Hands.{' '}
                <span className="text-secondary">Your Earnings.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Upload your STL. Earn royalties when it's printed worldwide. 
                You focus on creativity, we handle the rest.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero-accent" asChild>
                  <Link to="/start-creating">
                    Start Creating
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" asChild>
                  <Link to="/shop">
                    Browse Designs
                  </Link>
                </Button>
              </div>
              
              {/* Founders Club CTA */}
              <div className="pt-2">
                <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10" asChild>
                  <Link to="/founders-club">
                    Join Founders Club
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img alt="3D design process" className="rounded-2xl shadow-2xl" src="/lovable-uploads/238a0a94-ff14-4890-8997-da10e32d14ba.png" />
              <div className="absolute -bottom-6 -left-6 p-6 bg-card rounded-xl shadow-card-hover">
                <p className="text-3xl font-bold text-accent">8-16%</p>
                <p className="text-sm text-muted-foreground">avg. royalty per print</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-display-sm font-bold mb-4">
              Why Designers Love MakeHug
            </h2>
            <p className="text-lg text-muted-foreground">
              Focus on what you do best — designing. We'll handle production, 
              payments, and customer service.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(benefit => <div key={benefit.title} className="p-6 rounded-2xl bg-card shadow-card card-hover">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 md:py-28 bg-cream-dark/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display-sm font-bold mb-6">
                Getting Started Is Easy
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join our community of designers and start earning from your 
                creative work in just a few steps.
              </p>
              <div className="space-y-4">
                {steps.map((step, index) => <div key={index} className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <Check className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <p className="text-lg">{step}</p>
                  </div>)}
              </div>
              <Button variant="accent" size="xl" className="mt-8" asChild>
                <Link to="/start-creating">
                  Start Creating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-card rounded-2xl p-8 shadow-card">
                <h3 className="font-bold text-lg mb-6">What You'll Need</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-secondary" />
                    </div>
                    <span>Portfolio or 3+ original STL designs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-secondary" />
                    </div>
                    <span>IP declaration confirming original work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-secondary" />
                    </div>
                    <span>Agreement to our royalty terms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-secondary" />
                    </div>
                    <span>Payment method for royalty payouts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-display-sm font-bold mb-6">
              Ready to Turn Your Designs Into Income?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
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
    </Layout>;
}