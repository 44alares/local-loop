import { useState } from 'react';
import { useHub } from '@/components/hub/HubContext';
import { RoleSelector } from '@/components/hub/RoleSelector';
import { RegionSelector } from '@/components/hub/RegionSelector';
import { DealCard } from '@/components/hub/DealCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockDeals } from '@/data/memberHub';

export default function HubDeals() {
  const { role, setRole, macroArea, setMacroArea, region, setRegion } = useHub();
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = mockDeals.filter((d) => {
    if (typeFilter !== 'all' && d.type !== typeFilter) return false;
    if (macroArea && !d.macroAreaIds.includes(macroArea)) return false;
    if (region && !d.regionIds.includes(region)) return false;
    if (role && !d.forRoles.includes(role)) return false;
    return true;
  });

  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-hero py-12">
        <div className="container space-y-6">
          <h1 className="text-display-sm font-bold">Member Deals</h1>
          <p className="text-muted-foreground max-w-2xl">
            Instant access to member-only offers. No thresholds—just better terms for the community.
          </p>
          <RoleSelector value={role} onChange={setRole} />
        </div>
      </section>

      <section className="py-8">
        <div className="container space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <RegionSelector macroArea={macroArea} region={region} onMacroAreaChange={setMacroArea} onRegionChange={setRegion} />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Deal type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="member-price">Member-only price</SelectItem>
                <SelectItem value="bundle">Bundle packs</SelectItem>
                <SelectItem value="limited-promo">Limited-time promo</SelectItem>
                <SelectItem value="credits">Credits / rewards</SelectItem>
                <SelectItem value="shipping">Shipping perks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-muted-foreground">No deals available for your current filters.</p>
              <Button variant="outline">Request this in my region</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((d) => <DealCard key={d.id} deal={d} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
