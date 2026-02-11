import { cn } from '@/lib/utils';

interface GroupBuyProgressBarProps {
  current: number;
  target: number;
  className?: string;
}

export function GroupBuyProgressBar({ current, target, className }: GroupBuyProgressBarProps) {
  const pct = Math.min(100, Math.round((current / target) * 100));
  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{current} / {target} units</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-secondary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
