import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Info } from 'lucide-react';
import { getEquivalents } from '@/data/ralEquivalents';
import type { RALColor } from '@/data/ralColors';
import { useIsMobile } from '@/hooks/use-mobile';

interface Props {
  color: RALColor;
}

/** Shared tooltip body used by both desktop hover-card and mobile popover. */
function TooltipBody({ color }: Props) {
  const equivalents = getEquivalents(color.code);

  return (
    <div className="space-y-2 text-xs" onClick={(e) => e.stopPropagation()}>
      <p className="font-semibold text-foreground text-sm">
        Filament equivalents (approx.)
      </p>
      <p className="text-muted-foreground flex items-center gap-1.5">
        <span
          className="inline-block h-3 w-3 rounded-full border border-border shrink-0"
          style={{ backgroundColor: color.hex }}
        />
        {color.code} — {color.name}
      </p>

      <div className="space-y-1">
        {equivalents.map(({ label, match }) => (
          <p key={label} className="text-muted-foreground">
            <span className="font-medium text-foreground">{label}</span>
            {' — '}
            ref.&nbsp;{match.ref}
          </p>
        ))}
      </div>

      {/* Protabula CTA — always shown */}
      <div className="pt-1.5 mt-1.5 border-t border-border">
        <p className="text-muted-foreground text-[11px]">
          If you can't find an equivalence for your filament, use the{' '}
          <a
            href="https://protabula.com/en/ral-colors/picker?utm_source=chatgpt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary font-medium hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            RAL Color Picker
          </a>
          .
        </p>
      </div>
    </div>
  );
}

/**
 * Desktop: hover-card on RAL chip (+ keyboard focus).
 * Mobile: tap ⓘ icon to open popover.
 */
export function RALEquivalentsTooltip({ color }: Props) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (isMobile) {
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
          className="max-w-xs z-[100]"
          side="top"
          align="start"
          onClick={(e) => e.stopPropagation()}
        >
          <TooltipBody color={color} />
        </PopoverContent>
      </Popover>
    );
  }

  // Desktop: hover card
  return (
    <HoverCard openDelay={200} closeDelay={150}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center h-4 w-4 text-muted-foreground hover:text-foreground transition-colors shrink-0"
          aria-label={`Filament equivalents for ${color.code}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Info className="h-3 w-3" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        className="max-w-xs z-[100] w-72"
        side="top"
        align="start"
      >
        <TooltipBody color={color} />
      </HoverCardContent>
    </HoverCard>
  );
}
