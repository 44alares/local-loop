import { useHub } from '@/components/hub/HubContext';
import { RoleSelector } from '@/components/hub/RoleSelector';
import { RegionSelector } from '@/components/hub/RegionSelector';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockEvents, regions, roleLabels } from '@/data/memberHub';
import { Calendar, MapPin, Video, Users } from 'lucide-react';

const typeLabels: Record<string, string> = {
  workshop: 'Workshop',
  ama: 'AMA',
  qa: 'Q&A',
  clinic: 'Print Clinic',
  meetup: 'Meetup',
};

export default function HubCommunity() {
  const { role, setRole, macroArea, setMacroArea, region, setRegion } = useHub();

  const filtered = mockEvents.filter((e) => {
    if (role && !e.forRoles.includes(role)) return false;
    if (region && !e.regionIds.includes(region)) return false;
    return true;
  });

  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-hero py-12">
        <div className="container space-y-6">
          <h1 className="text-display-sm font-bold">Community & Events</h1>
          <p className="text-muted-foreground max-w-2xl">
            Workshops, AMAs, supplier Q&As, print clinics, and meetups—learn together, grow together.
          </p>
          <RoleSelector value={role} onChange={setRole} />
        </div>
      </section>

      <section className="py-8">
        <div className="container space-y-6">
          <RegionSelector macroArea={macroArea} region={region} onMacroAreaChange={setMacroArea} onRegionChange={setRegion} />

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No events match your filters right now.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((event) => {
                const eventRegions = event.regionIds.map(id => regions.find(r => r.id === id)?.label).filter(Boolean).join(', ');
                return (
                  <Card key={event.id} className="card-hover">
                    <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10 shrink-0">
                        <Calendar className="h-6 w-6 text-secondary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{event.title}</h3>
                          <Badge variant="outline" className="text-xs">{typeLabels[event.type]}</Badge>
                          {event.isOnline ? (
                            <Badge variant="secondary" className="text-xs"><Video className="h-3 w-3 mr-1" />Online</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs"><Users className="h-3 w-3 mr-1" />In-person</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{eventRegions}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="shrink-0">RSVP</Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
