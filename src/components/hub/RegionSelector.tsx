import { macroAreas, regions } from '@/data/memberHub';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RegionSelectorProps {
  macroArea: string | null;
  region: string | null;
  onMacroAreaChange: (v: string) => void;
  onRegionChange: (v: string) => void;
}

export function RegionSelector({ macroArea, region, onMacroAreaChange, onRegionChange }: RegionSelectorProps) {
  const filteredRegions = macroArea ? regions.filter((r) => r.macroAreaId === macroArea) : regions;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Select value={macroArea ?? ''} onValueChange={onMacroAreaChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All areas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All areas</SelectItem>
          {macroAreas.map((a) => (
            <SelectItem key={a.id} value={a.id}>{a.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={region ?? ''} onValueChange={onRegionChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All regions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All regions</SelectItem>
          {filteredRegions.map((r) => (
            <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
