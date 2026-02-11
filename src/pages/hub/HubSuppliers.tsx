import { useHub } from '@/components/hub/HubContext';
import { RegionSelector } from '@/components/hub/RegionSelector';
import { SupplierCard } from '@/components/hub/SupplierCard';
import { Button } from '@/components/ui/button';
import { mockSuppliers } from '@/data/memberHub';

export default function HubSuppliers() {
  const { macroArea, setMacroArea, region, setRegion } = useHub();

  const filtered = mockSuppliers.filter((s) => {
    if (macroArea && !s.macroAreaIds.includes(macroArea)) return false;
    if (region && !s.regionIds.includes(region)) return false;
    return true;
  });

  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-hero py-12">
        <div className="container space-y-6">
          <h1 className="text-display-sm font-bold">Suppliers & Agreements</h1>
          <p className="text-muted-foreground max-w-2xl">
            Vetted suppliers with community-negotiated terms. Better terms than typical retail, when available.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container space-y-6">
          <RegionSelector macroArea={macroArea} region={region} onMacroAreaChange={setMacroArea} onRegionChange={setRegion} />

          {filtered.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <p className="text-muted-foreground">No suppliers in this region yet.</p>
              <Button variant="outline">Suggest a supplier</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s) => <SupplierCard key={s.id} supplier={s} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
