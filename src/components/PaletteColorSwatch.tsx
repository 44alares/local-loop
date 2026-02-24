import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { multicolorHexMap, paletteColorToRal } from '@/data/multicolorPalettes';

interface Props {
  colorName: string;
  size?: 'sm' | 'md';
}

/**
 * Reusable palette color swatch with hover showing name, hex, and RAL equivalent.
 */
export function PaletteColorSwatch({ colorName, size = 'md' }: Props) {
  const hex = multicolorHexMap[colorName] || '#CCC';
  const ral = paletteColorToRal[colorName];
  const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`${sizeClass} rounded-full border border-border inline-block cursor-pointer shrink-0`}
            style={{ backgroundColor: hex }}
            tabIndex={0}
            aria-label={colorName}
          />
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs z-[200]">
          <div className="flex items-center gap-2">
            <div>
              <p className="font-medium">{colorName}</p>
              <p className="text-muted-foreground">{hex}</p>
            </div>
            <p className="text-muted-foreground border-l border-border pl-2">
              {ral || 'RAL: N/A'}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
