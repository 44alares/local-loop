import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Printer,
  DollarSign,
  Clock,
  Globe,
  ArrowRight,
  Check,
  Shield,
  Users,
} from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: 'Earn Per Print',
    description: 'Keep the majority of each print. Cover your costs and earn a healthy profit.',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Accept orders on your terms. Set your own lead times and capacity.',
  },
  {
    icon: Globe,
    title: 'Global Designs',
    description: 'Access curated designs from talented designers worldwide.',
  },
  {
    icon: Users,
    title: 'Local Customers',
    description: 'Connect with customers in your area who value local production.',
  },
];

const steps = [
  'Sign up with your printer details and location',
  'Upload photos of your setup for verification',
  'Select materials and colors you offer',
  'Choose designs you want to print',
  'Start receiving orders and earning',
];

export default function Maker() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
                <Printer className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">For Makers</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Print Locally. <span className="text-accent">Earn Globally.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Your skills, your rules. Print designs you love, serve customers
                in your area, and earn on every print.
              </p>
              
              {/* Primary CTA row */}
              <div className="flex flex-wrap gap-3">
                <Button variant="hero-accent" asChild>
                  <Link to="/join-as-maker">
                    Join as Maker
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" asChild>
                  <Link to="/shop">See Available Designs</Link>
                </Button>
              </div>

              {/* Founders Club CTA - Centered below with spacing */}
              <div className="flex justify-center md:justify-start pt-4">
                <Button
                  variant="outline"
                  size="default"
                  className="border-accent text-accent hover:bg-accent/10"
                  asChild
                >
                  <Link to="/founders-club">Join Founders Club</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop"
                alt="3D printer in action"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 p-4 bg-card rounded-xl shadow-card-hover">
                <p className="text-2xl font-bold text-secondary">$10.50</p>
                <p className="text-sm text-muted-foreground">avg. per print</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-3">Why Makers Love MakeHug</h2>
            <p className="text-muted-foreground">
              Turn your 3D printing hobby into a business. We bring you customers,
              you focus on quality.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-5 rounded-xl bg-card shadow-card card-hover"
              >
                <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                  <benefit.icon className="h-5 w-5 text-secondary" />
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
            <div className="order-2 lg:order-1">
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="font-bold mb-4">What You'll Need</h3>
                <ul className="space-y-3">
                  {[
                    'FDM, SLA, or SLS 3D printer(s)',
                    'Photo verification of your setup',
                    'Materials inventory (PLA, ABS, Resin, etc.)',
                    'Space for local pickup or shipping capability',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-bold mb-4">Become a Verified Maker</h2>
              <p className="text-muted-foreground mb-6">
                Join our growing network of makers and start earning from
                your printing skills.
              </p>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center shrink-0 text-accent-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
              <Button variant="accent" size="lg" className="mt-6" asChild>
                <Link to="/join-as-maker">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-secondary" />
            <h2 className="text-2xl font-bold mb-4">Verified & Trusted</h2>
            <p className="text-muted-foreground mb-6">
              All makers go through our verification process. This builds trust
              with customers and ensures quality across our network. Verified
              makers receive a badge on their profile and priority in search results.
            </p>
            <Button variant="hero-accent" asChild>
              <Link to="/join-as-maker">
                Start Your Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
