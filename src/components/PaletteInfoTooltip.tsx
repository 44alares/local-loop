import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { multicolorHexMap, MATTE_PALETTE_COLORS, paletteColorToRal } from '@/data/multicolorPalettes';

/**
 * Click/tap-activated tooltip listing all palettes and their colors.
 * Each swatch shows name, hex value, and RAL equivalent on hover.
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
              <TooltipProvider delayDuration={150}>
                <div className="flex gap-1">
                  {p.colors.map((c) => {
                    const hex = multicolorHexMap[c] || '#CCC';
                    const ral = paletteColorToRal[c];
                    return (
                      <Tooltip key={c}>
                        <TooltipTrigger asChild>
                          <span
                            className="h-4 w-4 rounded-full border border-border inline-block cursor-pointer"
                            style={{ backgroundColor: hex }}
                            tabIndex={0}
                            aria-label={c}
                          />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs z-[200]">
                          <div className="flex items-center gap-2">
                            <div>
                              <p className="font-medium">{c}</p>
                              <p className="text-muted-foreground">{hex}</p>
                            </div>
                            <p className="text-muted-foreground border-l border-border pl-2">
                              {ral || 'RAL: N/A'}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
