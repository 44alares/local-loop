import { Deal, regions, roleLabels, MemberRole } from '@/data/memberHub';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

const typeLabels: Record<string, string> = {
  'member-price': 'Member-only price',
  bundle: 'Bundle pack',
  'limited-promo': 'Limited-time promo',
  credits: 'Credits / rewards',
  shipping: 'Shipping perk',
};

export function DealCard({ deal }: { deal: Deal }) {
  const regionLabels = deal.regionIds
    .map((id) => regions.find((r) => r.id === id)?.label)
    .filter(Boolean)
    .join(', ');

  return (
    <Card className="card-hover">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{deal.title}</CardTitle>
          <Badge variant="secondary" className="shrink-0 text-xs">{typeLabels[deal.type]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{deal.description}</p>
        <div className="flex flex-wrap gap-1">
          {deal.forRoles.map((r) => (
            <Badge key={r} variant="outline" className="text-xs capitalize">{roleLabels[r]}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{regionLabels}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />Expires {new Date(deal.expiration).toLocaleDateString()}</span>
        </div>
        <Button size="sm" className="w-full">{deal.cta}</Button>
      </CardContent>
    </Card>
  );
}
