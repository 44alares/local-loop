import { useState } from 'react';
import { useHub } from '@/components/hub/HubContext';
import { RoleSelector } from '@/components/hub/RoleSelector';
import { ResourceCard } from '@/components/hub/ResourceCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockResources, MemberRole } from '@/data/memberHub';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HubResources() {
  const { role, setRole } = useHub();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = mockResources.filter((r) => {
    if (role && !r.forRoles.includes(role)) return false;
    if (activeTag && !r.tags.includes(activeTag)) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const allTags = [...new Set(mockResources.filter(r => !role || r.forRoles.includes(role)).flatMap((r) => r.tags))];

  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-hero py-12">
        <div className="container space-y-6">
          <h1 className="text-display-sm font-bold">Resources</h1>
          <p className="text-muted-foreground max-w-2xl">
            Guides, checklists, and tools tailored to your role. Learn, optimize, and grow.
          </p>
          <RoleSelector value={role} onChange={setRole} />
        </div>
      </section>

      <section className="py-8">
        <div className="container space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={activeTag === tag ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {role && (
            <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4">
              <p className="text-sm font-medium text-secondary">
                Recommended for you — showing resources for {role}s
              </p>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No resources match your search.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r) => <ResourceCard key={r.id} resource={r} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
