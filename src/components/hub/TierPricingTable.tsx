import { PriceTier } from '@/data/memberHub';
import { Lock, Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TierPricingTableProps {
  tiers: PriceTier[];
}

export function TierPricingTable({ tiers }: TierPricingTableProps) {
  return (
    <div className="space-y-2">
      {tiers.map((tier, i) => (
        <div
          key={i}
          className={cn(
            'flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors',
            tier.unlocked
              ? 'border-secondary/30 bg-secondary/5'
              : 'border-border bg-muted/30 opacity-70'
          )}
        >
          <div className="flex items-center gap-2">
            {tier.unlocked ? (
              <Unlock className="h-3.5 w-3.5 text-secondary" />
            ) : (
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
            )}
            <span className="font-medium">{tier.label}</span>
            <span className="text-muted-foreground">({tier.threshold}+ units)</span>
          </div>
          <span className={cn('font-semibold', tier.unlocked ? 'text-secondary' : 'text-muted-foreground')}>
            €{tier.pricePerUnit.toFixed(2)} / unit
          </span>
        </div>
      ))}
    </div>
  );
}
