import { Upload, Printer, MapPin, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Designers Upload',
    description: 'Talented designers upload their STL files and creative ideas to our platform.',
    color: 'secondary' as const,
  },
  {
    number: '02',
    icon: Printer,
    title: 'Makers Print Locally',
    description: 'Verified makers in your area produce the designs using quality materials.',
    color: 'accent' as const,
  },
  {
    number: '03',
    icon: MapPin,
    title: 'You Pick Up Nearby',
    description: 'Collect your unique piece from a nearby location — zero international shipping.',
    color: 'primary' as const,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-display-sm font-bold mb-4">
            How MakeHug Works
          </h2>
          <p className="text-lg text-muted-foreground">
            From digital design to your hands — locally, sustainably, beautifully.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-secondary via-accent to-primary -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="flex md:hidden justify-center py-4">
                    <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
                  </div>
                )}
                
                <div className="text-center">
                  {/* Icon Circle */}
                  <div className="relative inline-flex mb-6">
                    <div className={`h-24 w-24 rounded-full flex items-center justify-center relative z-10 ${
                      step.color === 'secondary' ? 'bg-secondary/10' :
                      step.color === 'accent' ? 'bg-accent/10' :
                      'bg-primary/10'
                    }`}>
                      <step.icon className={`h-10 w-10 ${
                        step.color === 'secondary' ? 'text-secondary' :
                        step.color === 'accent' ? 'text-accent' :
                        'text-primary'
                      }`} />
                    </div>
                    {/* Number Badge */}
                    <span className={`absolute -top-2 -right-2 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      step.color === 'secondary' ? 'bg-secondary' :
                      step.color === 'accent' ? 'bg-accent' :
                      'bg-primary'
                    }`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-4">
            Ready to experience the future of local production?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Browse Designs
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
