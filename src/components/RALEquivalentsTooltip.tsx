import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info } from 'lucide-react';
import { getEquivalents } from '@/data/ralEquivalents';
import type { RALColor } from '@/data/ralColors';

interface Props {
  color: RALColor;
}

/**
 * Click/tap-activated popover showing approximate filament brand equivalents
 * for a given RAL color. MVP shows "coming soon" fallback.
 */
export function RALEquivalentsTooltip({ color }: Props) {
  const [open, setOpen] = useState(false);
  const equivalents = getEquivalents(color.code);
  const hasAnyMatch = equivalents.some((e) => e.match);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center h-4 w-4 text-muted-foreground hover:text-foreground transition-colors shrink-0"
          aria-label={`Filament equivalents for ${color.code}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Info className="h-3 w-3" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="max-w-xs text-xs z-[100] space-y-2"
        side="top"
        align="start"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-semibold text-foreground text-sm">
          Filament equivalents (approx.)
        </p>
        <p className="text-muted-foreground flex items-center gap-1.5">
          <span
            className="inline-block h-3 w-3 rounded-full border border-border shrink-0"
            style={{ backgroundColor: color.hex }}
          />
          {color.code} {color.name}
        </p>
        {hasAnyMatch ? (
          <div className="space-y-1">
            {equivalents.map(({ label, match }) => (
              <p key={label} className="text-muted-foreground">
                <span className="font-medium text-foreground">{label}</span>
                {' — '}
                {match
                  ? `Closest match: ${match.name} (confidence: ${match.confidence})`
                  : 'No reliable match'}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground italic">
            Equivalences coming soon. For now, use RAL approx. as a reference.
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}
