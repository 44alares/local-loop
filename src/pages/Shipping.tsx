import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { MapPin, Store, Truck } from 'lucide-react';

const deliveryOptions = [
  {
    icon: MapPin,
    name: 'Direct Local Pickup',
    description: 'Pick up directly from the Maker — Zero emissions!',
    price: 'FREE',
    recommended: true,
    iconColor: 'text-secondary',
  },
  {
    icon: Store,
    name: 'Local Pickup Point',
    description: 'Pick up at a partner neighborhood shop (café, bookstore) or locker.',
    price: '2.00',
    recommended: false,
    iconColor: 'text-accent',
  },
  {
    icon: Truck,
    name: 'Home Delivery',
    description: 'Delivered to your door via local Courier.',
    price: '5.00',
    recommended: false,
    iconColor: 'text-muted-foreground',
  },
];

export default function Shipping() {
  return (
    <Layout>
      <section className="bg-gradient-hero py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-display-sm font-bold mb-4">Delivery Options</h1>
            <p className="text-lg text-muted-foreground">
              Choose how you'd like to receive your locally made products.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="max-w-2xl mx-auto space-y-4">
          {deliveryOptions.map((option) => (
            <div
              key={option.name}
              className={`rounded-xl border p-6 flex items-start gap-4 ${
                option.recommended ? 'border-secondary bg-secondary/5' : 'border-border bg-card'
              }`}
            >
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                option.recommended ? 'bg-secondary/10' : 'bg-muted'
              }`}>
                <option.icon className={`h-5 w-5 ${option.iconColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{option.name}</h3>
                  {option.recommended && (
                    <Badge variant="secondary" className="text-xs">Recommended</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
              <span className={`font-bold text-lg shrink-0 ${
                option.price === 'FREE' ? 'text-secondary' : ''
              }`}>
                {option.price}
              </span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
