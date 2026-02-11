import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Users, Sparkles, Upload, Printer, MapPin, ArrowRight, Globe, Shield, Zap } from 'lucide-react';
import { SocialPillarsModal } from '@/components/about/SocialPillarsModal';
const values = [{
  icon: Leaf,
  title: 'Local‑first production',
  description: 'Products travel meters, not oceans. Every item is made in your neighborhood, eliminating global shipping emissions.'
}, {
  icon: Shield,
  title: 'Verified Quality',
  description: 'Every maker is verified. Every design is curated. We prioritize quality and transparency over volume.'
}, {
  icon: Users,
  title: 'Community First',
  description: 'The majority of every purchase stays with your local Maker. We believe in neighborhood prosperity over distant profits.'
}, {
  icon: Sparkles,
  title: 'Circular Design',
  description: 'Fight planned obsolescence. Our Repair Hub provides spare parts to extend the life of what you already own.'
}];
const steps = [{
  number: '01',
  icon: Upload,
  title: 'Designer Uploads',
  description: 'Talented designers from around the world upload their original STL files to our platform.'
}, {
  number: '02',
  icon: Printer,
  title: 'Maker Prints Locally',
  description: 'Verified makers in your area produce the design using quality materials and expert craftsmanship.'
}, {
  number: '03',
  icon: MapPin,
  title: 'You Pick Up Nearby',
  description: 'Collect your unique piece from a nearby location — no international shipping, no waiting weeks.'
}];
export default function About() {
  return <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-display font-bold mb-6">
              The Future is{' '}
              <span className="text-secondary">Local</span>
            </h1>
            <p className="text-lg font-medium text-foreground mb-4">
              MakeHug was founded by individual designers and makers.
            </p>
            <p className="text-xl text-muted-foreground mb-8">
              Makehug is an ethical ecosystem where products are manufactured by neighbors, 
              not shipped across oceans. We connect designers, local makers, and conscious 
              buyers to create a zero-kilometer economy.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <Button variant="hero" asChild>
                <Link to="/shop">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <SocialPillarsModal />
              <Link to="/nda-terms" className="text-sm text-muted-foreground hover:text-secondary underline underline-offset-2 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display-sm font-bold mb-6">Our Approach</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We have developed a pricing method to eliminate unfair price competition. Prices are calculated based on material and time, not bidding wars.
              </p>
              <p className="text-lg text-muted-foreground mb-6">Makers are assigned based solely on proximity to the buyer to reduce carbon footprint. All Makers must be certified to ensure that the quality matches the "Real Scale Proof" photo provided by the designer.</p>
              <p className="text-lg text-muted-foreground mb-6">
                This system creates a fair marketplace where everyone wins: designers earn royalties, 
                makers receive fair compensation, and buyers get quality products made locally.
              </p>
              
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=500&fit=crop" alt="3D printing in action" className="rounded-2xl shadow-card" />
              <div className="absolute -bottom-6 -left-6 p-6 bg-card rounded-xl shadow-card-hover">
                <div className="flex items-center gap-3">
                  <Globe className="h-8 w-8 text-secondary" />
                  <div>
                    <p className="font-bold">Global Network</p>
                    <p className="text-sm text-muted-foreground">Local Production</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-cream-dark/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-display-sm font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              Four pillars that guide everything we do.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(value => <div key={value.title} className="p-6 rounded-2xl bg-card shadow-card">
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-display-sm font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              From digital design to your hands — three simple steps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => <div key={step.number} className="relative text-center">
                {index < steps.length - 1 && <div className="hidden md:block absolute top-12 left-[60%] right-0 h-0.5 bg-border" />}
                <div className="relative inline-flex mb-6">
                  <div className="h-24 w-24 rounded-full bg-secondary/10 flex items-center justify-center">
                    <step.icon className="h-10 w-10 text-secondary" />
                  </div>
                  <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">{step.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl bg-secondary/5 border border-secondary/20">
            <h2 className="text-2xl font-bold mb-3">Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Learn more about how MakeHug works, our intellectual property policies, and quality standards.
            </p>
            <Button variant="hero-outline" asChild>
              <Link to="/faq">
                View FAQ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-display-sm font-bold mb-6">
              Ready to Join the Movement?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're a designer, maker, or simply someone who appreciates 
              well-crafted objects — we'd love to have you in our community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" asChild>
                <Link to="/shop">
                  Start Shopping
                </Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <Link to="/designer">
                  I'm a Designer
                </Link>
              </Button>
              <Button variant="hero-outline" asChild>
                <Link to="/maker">
                  I'm a Maker
                </Link>
              </Button>
            </div>
            
            {/* Contact Button */}
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>;
}