import { Palette, Printer, Building2, CreditCard } from 'lucide-react';
import { COMMISSION_RATES } from '@/lib/pricing';
const breakdown = [{
  icon: Printer,
  label: 'Maker Earnings',
  percentage: COMMISSION_RATES.MAKER * 100,
  color: 'accent',
  description: 'Covers production costs and labor in your community'
}, {
  icon: Building2,
  label: 'Makehug Platform',
  percentage: COMMISSION_RATES.PLATFORM * 100,
  color: 'secondary',
  description: 'Service fee to keep the platform running'
}, {
  icon: Palette,
  label: 'Designer Royalty',
  percentage: COMMISSION_RATES.DESIGNER * 100,
  color: 'primary',
  description: 'IP royalties to the creative mind behind the design'
}, {
  icon: CreditCard,
  label: 'Payment Processing',
  percentage: COMMISSION_RATES.PAYMENT_GATEWAY * 100,
  color: 'muted',
  description: 'Secure payment gateway fees'
}];
export function PricingTransparency() {
  return <section className="py-20 md:py-28 bg-cream-dark/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-display-sm font-bold mb-4">
              Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every purchase supports real people — makers who craft, designers who dream, 
              and local economies that thrive.
            </p>
          </div>

          {/* Visual Breakdown */}
          <div className="bg-card rounded-2xl p-8 shadow-card mb-8">
            {/* Bar Chart */}
            <div className="h-12 rounded-full overflow-hidden flex mb-8">
              <div className="bg-accent h-full" style={{
              width: '75%'
            }} />
              <div className="bg-secondary h-full" style={{
              width: '14%'
            }} />
              <div className="bg-primary h-full" style={{
              width: '8%'
            }} />
              <div className="bg-muted-foreground/30 h-full" style={{
              width: '3%'
            }} />
            </div>

            {/* Legend */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {breakdown.map(item => <div key={item.label} className="flex gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${item.color === 'secondary' ? 'bg-secondary/10' : item.color === 'accent' ? 'bg-accent/10' : item.color === 'primary' ? 'bg-primary/10' : 'bg-muted'}`}>
                    <item.icon className={`h-5 w-5 ${item.color === 'secondary' ? 'text-secondary' : item.color === 'accent' ? 'text-accent' : item.color === 'primary' ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <p className="font-semibold">{Math.round(item.percentage)}%</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Example */}
          <div className="bg-background border border-border rounded-xl p-6 text-center">
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">Example:</strong> For a $25 product
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent">
                Maker: $18.75
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary">Platform: $3.50</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                Designer: $2.00
              </span>
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">
                Payment: $0.75
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>;
}