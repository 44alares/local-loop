import { Suspense, lazy } from 'react';
import { Badge } from '@/components/ui/badge';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import type { TailoredProduct } from '@/data/tailoredProducts';

interface TailoredViewerProps {
  product: TailoredProduct;
  params: Record<string, number | boolean>;
}

const LazyViewerCanvas = lazy(() => import('./TailoredViewerCanvas'));

export function TailoredViewer({ product, params }: TailoredViewerProps) {
  return (
    <div className="relative w-full h-full min-h-[360px] rounded-lg overflow-hidden">
      <div className="absolute top-3 left-3 z-10">
        <Badge variant="secondary" className="text-xs bg-secondary/90 text-secondary-foreground">
          Approximate preview
        </Badge>
      </div>
      <ErrorBoundary>
        <Suspense fallback={<div className="w-full h-full min-h-[360px] flex items-center justify-center text-sm text-muted-foreground bg-[hsl(0_0%_7%)]">Loading 3D viewer…</div>}>
          <LazyViewerCanvas product={product} params={params} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
