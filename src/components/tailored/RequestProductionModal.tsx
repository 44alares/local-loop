import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, X } from 'lucide-react';
import type { TailoredProduct, TailoredParam } from '@/data/tailoredProducts';
import { calculateFullBreakdown } from '@/lib/pricing';
import { BreakdownRows } from '@/components/product/ProductConfigurator';

interface RequestProductionModalProps {
  open: boolean;
  onClose: () => void;
  product: TailoredProduct;
  params: Record<string, number | boolean>;
  buyerPrice: number;
}

const mockMakerResults = [
  { id: 'm1', name: 'Maria Santos', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop', rating: 4.9, distance: '2.3 km', availability: 'Available this week' },
  { id: 'm2', name: 'Hans Mueller', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', rating: 4.8, distance: '5.1 km', availability: 'Available this week' },
  { id: 'm3', name: 'Kenji Yamamoto', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', rating: 5.0, distance: '12.4 km', availability: 'Available this week' },
];

export function RequestProductionModal({ open, onClose, product, params, buyerPrice }: RequestProductionModalProps) {
  const [step, setStep] = useState(1);
  const [postalCode, setPostalCode] = useState('');
  const [email, setEmail] = useState('');
  const [showMakers, setShowMakers] = useState(false);

  const breakdown = calculateFullBreakdown(buyerPrice, 'functional');

  const paramLabels = product.params.reduce<Record<string, TailoredParam>>((acc, p) => {
    acc[p.key] = p;
    return acc;
  }, {});

  const handlePostalChange = (val: string) => {
    setPostalCode(val);
    if (val.length >= 5) {
      setShowMakers(true);
    } else {
      setShowMakers(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md border-secondary/30">
        <DialogHeader>
          <DialogTitle className="text-lg">Your custom {product.name}</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            {/* Chosen parameters */}
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-muted-foreground">Your measurements</p>
              <div className="space-y-1">
                {product.params.map(p => (
                  <div key={p.key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{p.label}</span>
                    <span className="font-medium">
                      {p.type === 'toggle'
                        ? (params[p.key] ? 'Yes' : 'No')
                        : `${params[p.key]}${p.unit ? ` ${p.unit}` : ''}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price breakdown */}
            <div className="p-3 rounded-lg bg-card border border-border">
              <BreakdownRows breakdown={breakdown} productType="functional" />
            </div>

            <Button onClick={() => setStep(2)} className="w-full" variant="secondary">
              Continue — Find a maker
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Enter your postal code</p>
              <Input
                placeholder="e.g. 28001"
                value={postalCode}
                onChange={(e) => handlePostalChange(e.target.value)}
                maxLength={10}
              />
            </div>

            {showMakers && (
              <div className="space-y-3 animate-fade-in">
                <p className="text-sm flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-secondary" />
                  📍 3 makers available within 15 km
                </p>

                <div className="space-y-2">
                  {mockMakerResults.map(m => (
                    <div key={m.id} className="p-3 rounded-lg border border-border flex items-center gap-3">
                      <img src={m.avatar} alt={m.name} className="h-10 w-10 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{m.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-0.5">
                            <Star className="h-3 w-3 fill-accent text-accent" />
                            {m.rating}
                          </span>
                          <span>{m.distance}</span>
                        </div>
                        <p className="text-xs text-secondary">{m.availability}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={() => setStep(3)} className="w-full" variant="secondary">
                  Continue
                </Button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Button disabled className="w-full" variant="secondary">
              Confirm order (coming soon)
            </Button>

            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">Or join the waitlist</p>
              <div className="flex gap-2">
                <Input
                  placeholder="your@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="sm" disabled={!email.includes('@')}>
                  Join
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                No spam. We'll notify you when available in your area.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
