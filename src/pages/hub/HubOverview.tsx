import { useState } from 'react';
import { useHub } from '@/components/hub/HubContext';
import { RoleSelector } from '@/components/hub/RoleSelector';

import { GroupBuyProgressBar } from '@/components/hub/GroupBuyProgressBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockGroupBuys, mockDeals, regions, roleLabels, MemberRole } from '@/data/memberHub';
import { ShoppingCart, Tag, Building2, BookOpen, Users, Headphones, ArrowRight, Shield, MapPin, Calendar, MessageCircle, ArrowDown } from 'lucide-react';

const benefitCards = [
  { icon: ShoppingCart, title: 'Group Buys', desc: 'Pool orders with nearby makers and get better prices on materials.', anchor: '#group-buys' },
  { icon: Tag, title: 'Community Deals', desc: 'Discounts and offers we collect from suppliers — grab what helps you.', anchor: '#deals' },
  { icon: Building2, title: 'Supplier Contacts', desc: 'Vetted suppliers with fair terms we negotiated for the community.' },
  { icon: BookOpen, title: 'Guides & Resources', desc: 'Practical stuff: material guides, pricing help, packaging tips.' },
  { icon: Users, title: 'Events & Workshops', desc: 'Online meetups, Q&As with suppliers, and the occasional print clinic.' },
  { icon: Headphones, title: 'Direct Help', desc: 'Got a question? Just ask. We actually reply.' },
];

const roleBenefitHighlights: Record<MemberRole, string[]> = {
  maker: ['Better prices on filament and materials', 'Maintenance and tool deals', 'Production tips and cost calculators', 'Supplier contacts for consumables'],
  designer: ['Licensing and IP basics explained simply', 'Checklist to make your listings better', 'Tools to get more visibility', 'Tips for working with makers'],
  buyer: ['Discounts and credits on orders', 'Early access to new stuff', 'Find trusted makers near you', 'Guides on materials and customization'],
};

export default function HubOverview() {
  const { role, setRole, macroArea, setMacroArea, region, setRegion } = useHub();
  const [requestRole, setRequestRole] = useState<string>('');
  const [requestRegion, setRequestRegion] = useState<string>('');
  const [requestText, setRequestText] = useState('');
  const [requestEmail, setRequestEmail] = useState('');

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
      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container max-w-4xl text-center space-y-6">
          <Badge variant="outline" className="text-xs font-medium">Beta</Badge>
          <h1 className="text-display-sm md:text-display font-bold">Member Hub</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A place where makers, designers, and buyers can save money together. Group buys, deals, and useful resources — all collected here.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1">No membership required.</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1">No hidden fees.</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1">Still in beta — if something feels off, tell us.</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button size="lg" asChild>
              <a href="#deals">See what's available <ArrowDown className="h-4 w-4 ml-2" /></a>
            </Button>
          </div>
          <div className="flex justify-center">
            <RoleSelector value={role} onChange={setRole} />
          </div>
        </div>
      </section>

      {/* Role-specific highlights */}
      {role && (
        <section className="py-12 bg-secondary/5">
          <div className="container max-w-4xl">
            <h2 className="text-xl font-semibold mb-6">What's useful for you as a {role}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {roleBenefitHighlights[role].map((b, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-secondary/20 bg-background p-4">
                  <div className="h-2 w-2 rounded-full bg-secondary mt-1.5 shrink-0" />
                  <span className="text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefit cards */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-display-sm font-semibold text-center mb-4">
            On our own, we're small. Together, we get better deals.
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Pick what helps you. Skip what doesn't. No pressure.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitCards.map((card) => (
              <Card key={card.title} className="card-hover">
                <CardContent className="p-6 space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                    <card.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                  {card.anchor && (
                    <Button variant="link" className="p-0 h-auto text-secondary" asChild>
                      <a href={card.anchor}>Take a look <ArrowRight className="h-3.5 w-3.5 ml-1" /></a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="text-display-sm font-semibold text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Tell us who you are', desc: 'Pick your role and region so we show you relevant stuff.' },
              { step: '02', title: 'Grab what helps', desc: 'Browse deals and group buys. Join what makes sense for you.' },
              { step: '03', title: 'Better terms, together', desc: 'When enough people join, we all get better prices. Simple.' },
            ].map((s) => (
              <div key={s.step} className="text-center space-y-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">{s.step}</div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's new this week — replaces the old stat rectangles */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <h2 className="text-lg font-semibold mb-4">What's happening right now</h2>
          <div className="space-y-2">
            <a href="#deals" className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 hover:bg-muted/50 transition-colors group">
              <Tag className="h-4 w-4 text-secondary shrink-0" />
              <span className="text-sm font-medium">Latest deals from suppliers</span>
              <ArrowDown className="h-3.5 w-3.5 text-muted-foreground ml-auto group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a href="#group-buys" className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 hover:bg-muted/50 transition-colors group">
              <ShoppingCart className="h-4 w-4 text-secondary shrink-0" />
              <span className="text-sm font-medium">Group buys looking for more people</span>
              <ArrowDown className="h-3.5 w-3.5 text-muted-foreground ml-auto group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a href="#suggest" className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 hover:bg-muted/50 transition-colors group">
              <MessageCircle className="h-4 w-4 text-secondary shrink-0" />
              <span className="text-sm font-medium">Request a deal or group buy for your area</span>
              <ArrowDown className="h-3.5 w-3.5 text-muted-foreground ml-auto group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Deals section */}
      <section id="deals" className="py-16 bg-muted/30">
        <div className="container max-w-3xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold">Deals you can grab</h2>
            <p className="text-sm text-muted-foreground">
              Offers from suppliers and partners. Claim what's useful, ignore the rest.
            </p>
          </div>

          {filteredDeals.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-8 text-center space-y-3">
              <p className="text-muted-foreground">Nothing for your area yet.</p>
              <p className="text-sm text-muted-foreground">Tell us what you'd like and we'll try to bring it.</p>
              <Button variant="outline" size="sm" asChild>
                <a href="#suggest"><MessageCircle className="h-4 w-4 mr-2" />Suggest a deal</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDeals.map((deal) => {
                const regionLbls = deal.regionIds
                  .map((id) => regions.find((r) => r.id === id)?.label)
                  .filter(Boolean)
                  .join(', ');
                return (
                  <div key={deal.id} className="rounded-lg border border-border bg-background p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-sm">{deal.title}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>For: {deal.forRoles.map(r => roleLabels[r]).join(', ')}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{regionLbls}</span>
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

      {/* Group buys section */}
      <section id="group-buys" className="py-16">
        <div className="container max-w-3xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold">Group buys</h2>
            <p className="text-sm text-muted-foreground">
              Right now it's an interest list — if enough people join, we confirm the next step. Nobody gets charged unless it actually happens.
            </p>
          </div>

          {filteredGroupBuys.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-8 text-center space-y-3">
              <p className="text-muted-foreground">No group buys in your area right now.</p>
              <p className="text-sm text-muted-foreground">Want something specific? Let us know.</p>
              <Button variant="outline" size="sm" asChild>
                <a href="#suggest"><MessageCircle className="h-4 w-4 mr-2" />Request a group buy</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredGroupBuys.map((gb) => {
                const regionLbls = gb.regionIds
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
                          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{regionLbls}</span>
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

      {/* Transparency block */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-3xl text-center space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 mx-auto">
            <Shield className="h-6 w-6 text-secondary" />
          </div>
          <h2 className="text-display-sm font-semibold">How we keep things honest</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">You see the terms first</h3>
              <p className="text-sm text-muted-foreground">Every deal and group buy shows its conditions upfront. No surprises.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">No charge if it doesn't work out</h3>
              <p className="text-sm text-muted-foreground">If a group buy doesn't reach its target, nobody pays. Pre-authorizations get released automatically.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Use what helps, skip the rest</h3>
              <p className="text-sm text-muted-foreground">This isn't a subscription or a commitment. It's just a place to find useful stuff. Join what makes sense for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Request section */}
      <section id="suggest" className="py-16">
        <div className="container max-w-xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold">Want a deal in your area?</h2>
            <p className="text-sm text-muted-foreground">
              Tell us what material or tool you need and where you are. If more people ask for the same thing, we'll try to make it happen.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">I'm a</label>
                <Select value={requestRole} onValueChange={setRequestRole}>
                  <SelectTrigger><SelectValue placeholder="Choose role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maker">Maker</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="buyer">Buyer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">My region</label>
                <Select value={requestRegion} onValueChange={setRequestRegion}>
                  <SelectTrigger><SelectValue placeholder="Choose region" /></SelectTrigger>
                  <SelectContent>
                    {regions.map((r) => (
                      <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">What are you looking for?</label>
              <Textarea
                placeholder="e.g. Bulk PETG in Berlin, nozzle deals in LA, packaging supplies..."
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email (optional)</label>
              <Input
                type="email"
                placeholder="So we can let you know if it happens"
                value={requestEmail}
                onChange={(e) => setRequestEmail(e.target.value)}
              />
            </div>
            <Button className="w-full">Send request</Button>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-2xl text-center space-y-4">
          <h2 className="text-lg font-semibold">That's it for now</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This page is early. We're adding new deals and group buys as they come in. If you have ideas, want to suggest a supplier,
            or think something could work better — just tell us. This is built for the community, so your input actually matters.
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
