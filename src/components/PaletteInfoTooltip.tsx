import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Info } from 'lucide-react';
import { multicolorHexMap, MATTE_PALETTE_COLORS, paletteColorToRal } from '@/data/multicolorPalettes';
import { PaletteColorSwatch } from '@/components/PaletteColorSwatch';

/**
 * Click/tap-activated tooltip listing all palettes and their colors.
 * Each swatch uses PaletteColorSwatch (HoverCard-based) so the hover info stays visible.
 */
export function PaletteInfoTooltip() {
  const [open, setOpen] = useState(false);

  const palettes = [
    {
      name: 'Base',
      description: 'Uses the mandatory colors defined for the selected material (PLA/PETG/etc.)',
      colors: null, // dynamic
    },
    {
      name: 'Earth',
      description: 'Beige, Brown, Grey, White',
      colors: ['Beige', 'Brown', 'Grey', 'White'],
    },
    {
      name: 'Accent',
      description: 'Yellow, Orange, Red, Blue',
      colors: ['Yellow', 'Orange', 'Red', 'Blue'],
    },
    {
      name: 'Matte',
      description: 'Rose Quartz, Mist Blue, Mint Green, Lavender',
      colors: MATTE_PALETTE_COLORS.map(c => c.name),
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Palette information"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs text-xs z-[100] space-y-2.5" side="top" align="start">
        <p className="font-semibold text-foreground text-sm">Palettes</p>
        {palettes.map((p) => (
          <div key={p.name} className="space-y-1">
            <p className="font-medium text-foreground">{p.name}</p>
            <p className="text-muted-foreground">{p.description}</p>
            {p.colors && (
              <div className="flex gap-1">
                {p.colors.map((c) => (
                  <PaletteColorSwatch key={c} colorName={c} size="sm" />
                ))}
              </div>
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
