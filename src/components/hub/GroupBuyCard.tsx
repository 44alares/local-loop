import { GroupBuy, regions } from '@/data/memberHub';
import { GroupBuyProgressBar } from './GroupBuyProgressBar';
import { TierPricingTable } from './TierPricingTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Share2, FileText, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GroupBuyCardProps {
  groupBuy: GroupBuy;
  compact?: boolean;
}

const statusColors: Record<string, string> = {
  active: 'bg-secondary/10 text-secondary border-secondary/30',
  upcoming: 'bg-accent/10 text-accent border-accent/30',
  completed: 'bg-muted text-muted-foreground border-border',
};

export function GroupBuyCard({ groupBuy, compact }: GroupBuyCardProps) {
  const regionLabels = groupBuy.regionIds
    .map((id) => regions.find((r) => r.id === id)?.label)
    .filter(Boolean)
    .join(', ');

  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-lg">{groupBuy.itemName}</CardTitle>
            <p className="text-sm text-muted-foreground">{groupBuy.supplierName}</p>
          </div>
          <Badge variant="outline" className={cn('capitalize shrink-0', statusColors[groupBuy.status])}>
            {groupBuy.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{regionLabels}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />Deadline: {new Date(groupBuy.deadline).toLocaleDateString()}</span>
        </div>

        <GroupBuyProgressBar current={groupBuy.currentUnits} target={groupBuy.targetUnits} />

        {!compact && <TierPricingTable tiers={groupBuy.tiers} />}

        {compact && (
          <p className="text-sm text-muted-foreground line-clamp-2">{groupBuy.description}</p>
        )}

        <div className="flex items-center gap-2 pt-1">
          {groupBuy.status === 'active' && (
            <Button size="sm" className="flex-1">Join group buy</Button>
          )}
          {groupBuy.status === 'upcoming' && (
            <Button size="sm" variant="outline" className="flex-1">Notify me</Button>
          )}
          <Button size="sm" variant="ghost"><Share2 className="h-4 w-4" /></Button>
          <Button size="sm" variant="ghost"><FileText className="h-4 w-4" /></Button>
        </div>
      </CardContent>
    </Card>
  );
}
