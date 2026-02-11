import { useHub } from '@/components/hub/HubContext';
import { RoleSelector } from '@/components/hub/RoleSelector';
import { RegionSelector } from '@/components/hub/RegionSelector';
import { DealCard } from '@/components/hub/DealCard';
import { GroupBuyProgressBar } from '@/components/hub/GroupBuyProgressBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockGroupBuys, mockDeals, regions, roleLabels } from '@/data/memberHub';
import { MapPin, Calendar, Users, MessageCircle } from 'lucide-react';

export default function HubOverview() {
  const { role, setRole, macroArea, setMacroArea, region, setRegion } = useHub();

  // Filter deals by role/region
  const filteredDeals = mockDeals.filter((d) => {
    if (macroArea && !d.macroAreaIds.includes(macroArea)) return false;
    if (region && !d.regionIds.includes(region)) return false;
    if (role && !d.forRoles.includes(role)) return false;
    return true;
  }).slice(0, 5);

  // Filter group buys
  const filteredGroupBuys = mockGroupBuys.filter((gb) => {
    if (macroArea && !gb.macroAreaIds.includes(macroArea)) return false;
    if (region && !gb.regionIds.includes(region)) return false;
    if (gb.status === 'completed') return false;
    return true;
  }).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero — warm, beta feel */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container max-w-3xl text-center space-y-6">
          <Badge variant="outline" className="text-xs font-medium">Beta</Badge>
          <h1 className="text-display-sm md:text-display font-bold">Member Hub</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A small space where the community can save money together. Deals, group buys, and useful stuff — all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1">No membership required.</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1">No hidden fees.</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1">This is beta — if something feels off, tell me.</span>
          </div>
        </div>
      </section>

      {/* Role + Region selectors */}
      <section className="py-8 border-b border-border">
        <div className="container max-w-3xl space-y-4">
          <p className="text-sm text-muted-foreground">Show me what's relevant:</p>
          <div className="flex flex-wrap items-center gap-3">
            <RoleSelector value={role} onChange={setRole} />
            <RegionSelector
              macroArea={macroArea}
              region={region}
              onMacroAreaChange={setMacroArea}
              onRegionChange={setRegion}
            />
          </div>
        </div>
      </section>

      {/* Section A — What this is */}
      <section className="py-16">
        <div className="container max-w-3xl space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold">A small beta to help the community save money</h2>
          <p className="text-muted-foreground leading-relaxed">
            This is a simple experiment. Sometimes brands and suppliers share discounts or batch deals with communities. 
            I'm just putting them in one place so makers, designers, and buyers can actually benefit from them.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            No fancy programs. No complicated tiers. If something here helps you save money or find better materials — great. If not, no worries.
          </p>
        </div>
      </section>

      {/* Section B — Deals you can grab */}
      <section id="deals" className="py-16 bg-muted/30">
        <div className="container max-w-3xl space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold">Deals you can grab</h2>
          <p className="text-sm text-muted-foreground">
            Simple offers from suppliers and partners. Claim what's useful, ignore the rest.
          </p>

          {filteredDeals.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-8 text-center space-y-3">
              <p className="text-muted-foreground">Nothing for your area yet.</p>
              <p className="text-sm text-muted-foreground">Tell me what you'd like and I'll try to bring it.</p>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Suggest a deal
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDeals.map((deal) => {
                const regionLabels = deal.regionIds
                  .map((id) => regions.find((r) => r.id === id)?.label)
                  .filter(Boolean)
                  .join(', ');

                return (
                  <div key={deal.id} className="rounded-lg border border-border bg-background p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-sm">{deal.title}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>For: {deal.forRoles.map(r => roleLabels[r]).join(', ')}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{regionLabels}</span>
                        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />Expires {new Date(deal.expiration).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0 self-start sm:self-center">
                      {deal.cta}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Section C — Group buys (interest-based) */}
      <section id="group-buys" className="py-16">
        <div className="container max-w-3xl space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold">Group buys (interest-based)</h2>
          <p className="text-sm text-muted-foreground">
            For now, it's just an interest list — if enough people join, we'll confirm the next step. No one gets charged unless it actually happens.
          </p>

          {filteredGroupBuys.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-8 text-center space-y-3">
              <p className="text-muted-foreground">No group buys in your area right now.</p>
              <p className="text-sm text-muted-foreground">Want something specific? Let me know and I'll see what I can do.</p>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Request a group buy
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredGroupBuys.map((gb) => {
                const regionLabels = gb.regionIds
                  .map((id) => regions.find((r) => r.id === id)?.label)
                  .filter(Boolean)
                  .join(', ');

                return (
                  <div key={gb.id} className="rounded-lg border border-border bg-background p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{gb.itemName}</p>
                        <p className="text-sm text-muted-foreground">{gb.supplierName}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{regionLabels}</span>
                          <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />Deadline: {new Date(gb.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Badge variant={gb.status === 'active' ? 'default' : 'outline'} className="capitalize shrink-0 self-start">
                        {gb.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <GroupBuyProgressBar current={gb.currentUnits} target={gb.targetUnits} />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                        <Users className="h-3 w-3" />
                        <span>{gb.currentUnits} interested</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full sm:w-auto">
                      I'm interested
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Closing — light, honest */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-2xl text-center space-y-4">
          <h2 className="text-lg font-semibold">That's it for now</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This page is early. I'm adding new deals and group buys as they come in. If you have ideas, want to suggest a supplier, 
            or think something could work better — just tell me. This is built for the community, so your input actually matters.
          </p>
          <Button variant="outline" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            Share feedback
          </Button>
        </div>
      </section>
    </div>
  );
}
