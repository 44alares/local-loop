import { Suspense, lazy } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useIsMobile } from '@/hooks/use-mobile';

interface MiniPreviewProps {
  productSlug: string;
  params: Record<string, number | boolean>;
}

const LazyMiniCanvas = lazy(() => import('./MiniPreviewCanvas'));

/** Static CSS placeholder for mobile — shows a simplified handle silhouette */
function StaticPlaceholder({ productSlug, params }: MiniPreviewProps) {
  if (productSlug === 'drawer-handle') {
    const length = (params.length as number) || 120;
    const legHeight = (params.legHeight as number) || 30;
    const thickness = (params.thickness as number) || 10;
    // Normalize to fit in the box
    const barW = Math.min(85, 30 + (length / 250) * 55); // %
    const barH = Math.max(8, (thickness / 18) * 16); // px
    const legH = Math.max(10, (legHeight / 60) * 30); // px
    const legW = Math.max(4, barH * 0.6);
    return (
      <div style={{ width: '100%', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="bg-[hsl(0_0%_7%)]">
        <div className="flex flex-col items-center">
          <div style={{ width: `${barW}%`, minWidth: '40px', height: `${barH}px`, borderRadius: '3px' }} className="bg-muted-foreground/40" />
          <div className="flex justify-between" style={{ width: `${barW}%`, minWidth: '40px' }}>
            <div style={{ width: `${legW}px`, height: `${legH}px`, borderRadius: '0 0 2px 2px' }} className="bg-muted-foreground/40" />
            <div style={{ width: `${legW}px`, height: `${legH}px`, borderRadius: '0 0 2px 2px' }} className="bg-muted-foreground/40" />
          </div>
        </div>
      </div>
    );
  }

  if (productSlug === 'drawer-organizer') {
    const cols = (params.colDivisions as number) || 3;
    const rows = (params.rowDivisions as number) || 2;
    return (
      <div style={{ width: '100%', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="bg-[hsl(0_0%_7%)]">
        <div className="grid gap-0.5 p-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, width: '70%', height: '60%' }}>
          {Array.from({ length: cols * rows }).map((_, i) => (
            <div key={i} className="bg-muted-foreground/30 rounded-sm border border-muted-foreground/20" />
          ))}
        </div>
      </div>
    );
  }

  if (productSlug === 'shelf-bracket') {
    const reinforcement = params.reinforcement as boolean;
    return (
      <div style={{ width: '100%', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="bg-[hsl(0_0%_7%)]">
        <div className="relative" style={{ width: '50px', height: '50px' }}>
          {/* Vertical arm */}
          <div className="absolute left-0 top-0 bg-muted-foreground/40 rounded-sm" style={{ width: '8px', height: '100%' }} />
          {/* Horizontal arm */}
          <div className="absolute left-0 top-0 bg-muted-foreground/40 rounded-sm" style={{ width: '100%', height: '8px' }} />
          {/* Diagonal */}
          {reinforcement && (
            <div className="absolute bg-muted-foreground/30" style={{ width: '2px', height: '60px', transformOrigin: 'top left', transform: 'rotate(-45deg)', left: '6px', top: '6px' }} />
          )}
        </div>
      </div>
    );
  }

  // Generic fallback
  return (
    <div style={{ width: '100%', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="bg-[hsl(0_0%_7%)] text-xs text-muted-foreground">
      Preview
    </div>
  );
}

export function MiniPreview({ productSlug, params }: MiniPreviewProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div style={{ width: '100%', minHeight: '120px', display: 'block' }} className="rounded-md overflow-hidden">
        <StaticPlaceholder productSlug={productSlug} params={params} />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', minHeight: '120px', display: 'block' }} className="rounded-md overflow-hidden bg-[hsl(0_0%_7%)]">
      <ErrorBoundary>
        <Suspense fallback={<div style={{ width: '100%', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="text-xs text-muted-foreground">Loading 3D viewer…</div>}>
          <LazyMiniCanvas productSlug={productSlug} params={params} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
