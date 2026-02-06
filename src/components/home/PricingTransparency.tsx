import { ArrowRight, ShieldCheck, Eye, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function PricingTransparency() {
  return (
    <section className="py-16 md:py-20 bg-cream-dark/30">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-display-sm font-bold mb-4">
              Transparent Pricing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every purchase supports real people — makers who craft, designers who dream, 
              and local economies that thrive.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
              No surprises: you'll see the full breakdown as amounts before you pay.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              No hidden charges
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium">
              <Eye className="h-4 w-4 text-secondary" />
              Fees shown before payment
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium">
              <Lock className="h-4 w-4 text-secondary" />
              Secure payments & support
            </div>
          </div>

          {/* Contact Button */}
          <div className="text-center">
            <Button variant="hero-outline" asChild>
              <Link to="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
