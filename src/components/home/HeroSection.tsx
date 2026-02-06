import { ArrowRight, MapPin, Leaf, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
              <Leaf className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Zero-mile production</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
              Made <span className="text-secondary">Nearby</span>.{' '}
              <br className="hidden md:block" />
              Picked up <span className="text-accent">Locally</span>.
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-muted-foreground max-w-lg">
              Connect with talented designers and local makers to bring beautiful,
              sustainable objects to life in your neighborhood.
            </p>

            {/* CTA Buttons - Primary row */}
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" asChild>
                <Link to="/shop">
                  Start Shopping
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <Link to="/about">How It Works</Link>
              </Button>
            </div>

            {/* Founders Club CTA - Centered, separated */}
            <div className="flex justify-center md:justify-start pt-2">
              <Button
                variant="outline"
                size="default"
                className="border-accent text-accent hover:bg-accent/10"
                asChild
              >
                <Link to="/founders-club">Join Founders Club</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10">
                  <MapPin className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">150+ Cities</p>
                  <p className="text-xs text-muted-foreground">Worldwide</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">2,300+</p>
                  <p className="text-xs text-muted-foreground">Local Makers</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Leaf className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">12,450 kg</p>
                  <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image / Visual */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square">
              {/* Main Image */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
                <img
                  alt="3D printed sustainable design"
                  className="h-full w-full object-cover"
                  src="/lovable-uploads/9ef02256-46b9-4af9-983e-904d2e40ec11.png"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
              <div className="absolute -z-10 bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
