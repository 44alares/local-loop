import { useHub } from '@/components/hub/HubContext';
import { RoleSelector } from '@/components/hub/RoleSelector';
import { RegionSelector } from '@/components/hub/RegionSelector';
import { GroupBuyCard } from '@/components/hub/GroupBuyCard';
import { DealCard } from '@/components/hub/DealCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockGroupBuys, mockDeals, MemberRole } from '@/data/memberHub';
import { Link } from 'react-router-dom';
import { ShoppingCart, Tag, Building2, BookOpen, Users, Headphones, ArrowRight, Shield } from 'lucide-react';

const benefitCards = [
  { icon: ShoppingCart, title: 'Regional Group Buys', desc: 'Pool demand with local makers for better material pricing.', cta: 'Join a group buy', href: '/hub/group-buys' },
  { icon: Tag, title: 'Member-only Deals', desc: 'Exclusive pricing, bundles, and credits for the community.', cta: 'View deals', href: '/hub/deals' },
  { icon: Building2, title: 'Supplier Agreements', desc: 'Vetted suppliers with community-negotiated terms.', cta: 'See suppliers', href: '/hub/suppliers' },
  { icon: BookOpen, title: 'Role-specific Resources', desc: 'Guides, checklists, and tools tailored to your role.', cta: 'Open resources', href: '/hub/resources' },
  { icon: Users, title: 'Community Events', desc: 'Workshops, AMAs, meetups, and print clinics.', cta: 'Browse events', href: '/hub/community' },
  { icon: Headphones, title: 'Priority Support', desc: 'Faster response times and dedicated help channels.', cta: 'Learn more', href: '/hub/membership' },
];

const roleBenefitHighlights: Record<MemberRole, string[]> = {
  maker: ['Material group buys at volume pricing', 'Maintenance & tools deals', 'Production optimization resources', 'Supplier agreements for consumables'],
  designer: ['IP & licensing guidance', 'Listing quality resources', 'Promotion tools & visibility', 'Collaboration playbooks'],
  buyer: ['Discounts & credits on orders', 'Early access to new drops', 'Trusted maker network perks', 'Buying & customization guides'],
};

export default function HubOverview() {
  const { role, setRole, macroArea, setMacroArea, region, setRegion } = useHub();

  const activeGroupBuys = mockGroupBuys.filter((gb) => gb.status === 'active').slice(0, 2);
  const endingSoon = mockDeals.slice(0, 2);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container max-w-4xl text-center space-y-6">
          <h1 className="text-display-sm md:text-display font-bold">Member Hub</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Community-powered perks for Makers, Designers, and Buyers—better access, better terms, and practical resources.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild><Link to="/hub/group-buys">Explore benefits</Link></Button>
            <div className="text-sm text-muted-foreground">or</div>
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
            <h2 className="text-xl font-semibold mb-6">Your benefits as a {role}</h2>
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
            Alone we're small. Together we unlock more.
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Choose the perks that help you—no pressure, no noise.
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
                  <Button variant="link" className="p-0 h-auto text-secondary" asChild>
                    <Link to={card.href}>{card.cta} <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
                  </Button>
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
              { step: '01', title: 'Choose your role & region', desc: 'Tell us how you use MakeHug and where you are.' },
              { step: '02', title: 'Join perks you need', desc: 'Browse group buys, deals, and resources. No pressure.' },
              { step: '03', title: 'Unlock better terms together', desc: 'When the community reaches thresholds, better conditions unlock.' },
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

      {/* Dashboard widgets preview */}
      <section className="py-16">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">Active Group Buys</p>
              <p className="text-2xl font-bold">{mockGroupBuys.filter(g => g.status === 'active').length}</p>
              <Button variant="link" className="p-0 h-auto text-sm mt-2" asChild>
                <Link to="/hub/group-buys">View all</Link>
              </Button>
            </Card>
            <Card className="p-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">Deals Ending Soon</p>
              <p className="text-2xl font-bold">{mockDeals.length}</p>
              <Button variant="link" className="p-0 h-auto text-sm mt-2" asChild>
                <Link to="/hub/deals">View all</Link>
              </Button>
            </Card>
            <Card className="p-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">Resources for You</p>
              <p className="text-2xl font-bold">14</p>
              <Button variant="link" className="p-0 h-auto text-sm mt-2" asChild>
                <Link to="/hub/resources">Browse</Link>
              </Button>
            </Card>
            <Card className="p-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">Community Votes Open</p>
              <p className="text-2xl font-bold">2</p>
              <Button variant="link" className="p-0 h-auto text-sm mt-2" asChild>
                <Link to="/hub/group-buys">Vote now</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Transparency block */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-3xl text-center space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 mx-auto">
            <Shield className="h-6 w-6 text-secondary" />
          </div>
          <h2 className="text-display-sm font-semibold">Transparent by design</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Clear terms before joining</h3>
              <p className="text-sm text-muted-foreground">Every group buy and deal shows its terms upfront. You always know what you're signing up for.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">No risk if thresholds aren't met</h3>
              <p className="text-sm text-muted-foreground">If a group buy doesn't reach its target, no one is charged. Pre-authorizations are released automatically.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Access, not obligation</h3>
              <p className="text-sm text-muted-foreground">Membership is about coordination and access—not forcing anyone into anything. Join what helps you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
