import { useState } from 'react';
import { useHub } from '@/components/hub/HubContext';
import { RoleSelector } from '@/components/hub/RoleSelector';
import { RegionSelector } from '@/components/hub/RegionSelector';
import { GroupBuyCard } from '@/components/hub/GroupBuyCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockGroupBuys, groupBuyCategories, GroupBuyCategory } from '@/data/memberHub';
import { cn } from '@/lib/utils';

export default function HubGroupBuys() {
  const { role, setRole, macroArea, setMacroArea, region, setRegion } = useHub();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = mockGroupBuys.filter((gb) => {
    if (statusFilter !== 'all' && gb.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && gb.category !== categoryFilter) return false;
    if (macroArea && !gb.macroAreaIds.includes(macroArea)) return false;
    if (region && !gb.regionIds.includes(region)) return false;
    if (role && !gb.eligibleRoles.includes(role)) return false;
    return true;
  });

  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-hero py-12">
        <div className="container space-y-6">
          <h1 className="text-display-sm font-bold">Group Buys</h1>
          <p className="text-muted-foreground max-w-2xl">
            Regional by design: pool demand with your local community to unlock better terms. Clear thresholds, clear terms, clear outcomes.
          </p>
          <RoleSelector value={role} onChange={setRole} />
        </div>
      </section>

      <section className="py-8">
        <div className="container space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <RegionSelector macroArea={macroArea} region={region} onMacroAreaChange={setMacroArea} onRegionChange={setRegion} />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {groupBuyCategories.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-muted-foreground">No group buys match your filters.</p>
              <p className="text-sm text-muted-foreground">Not available in your region?</p>
              <Button variant="outline">Request this in my region</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((gb) => <GroupBuyCard key={gb.id} groupBuy={gb} />)}
            </div>
          )}

          {/* Vote section */}
          <div className="border-t border-border pt-12 mt-12">
            <h2 className="text-xl font-semibold mb-2">Next up — vote</h2>
            <p className="text-sm text-muted-foreground mb-6">Help shape the next group buys. Vote on materials and suppliers for your region.</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {['ABS Filament Bulk Order', 'Flexible TPU Spools', 'Build Plate Upgrade Kit'].map((item) => (
                <div key={item} className="rounded-lg border p-4 space-y-3 card-hover">
                  <p className="font-medium text-sm">{item}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">Vote</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
