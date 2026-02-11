import { Supplier, regions } from '@/data/memberHub';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, ExternalLink, MapPin } from 'lucide-react';

export function SupplierCard({ supplier }: { supplier: Supplier }) {
  const regionLabels = supplier.regionIds
    .map((id) => regions.find((r) => r.id === id)?.label)
    .filter(Boolean)
    .join(', ');

  return (
    <Card className="card-hover">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <Building2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-base">{supplier.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{supplier.agreementType}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{supplier.description}</p>
        <div className="flex flex-wrap gap-1">
          {supplier.categories.map((c) => (
            <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {regionLabels}
        </div>
        <p className="text-xs text-muted-foreground italic">{supplier.qualityNotes}</p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">View agreement</Button>
          <Button size="sm" variant="ghost"><ExternalLink className="h-4 w-4" /></Button>
        </div>
      </CardContent>
    </Card>
  );
}
