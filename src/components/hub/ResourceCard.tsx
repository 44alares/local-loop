import { Resource, roleLabels, MemberRole } from '@/data/memberHub';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-secondary mb-1">{resource.category}</p>
            <CardTitle className="text-base">{resource.title}</CardTitle>
          </div>
          <Button size="icon" variant="ghost" className="shrink-0 h-8 w-8 text-muted-foreground">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{resource.description}</p>
        <div className="flex flex-wrap gap-1">
          {resource.tags.map((t) => (
            <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          {resource.forRoles.map((r) => (
            <Badge key={r} variant="secondary" className="text-xs capitalize">{roleLabels[r]}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
