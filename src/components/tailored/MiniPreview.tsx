import { Suspense, lazy, ComponentType } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface MiniPreviewProps {
  productSlug: string;
  params: Record<string, number | boolean>;
}

const LazyMiniCanvas = lazy(() => import('./MiniPreviewCanvas'));

export function MiniPreview({ productSlug, params }: MiniPreviewProps) {
  return (
    <div className="w-full aspect-square rounded-md overflow-hidden bg-[hsl(0_0%_7%)]">
      <ErrorBoundary>
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Loading 3D viewer…</div>}>
          <LazyMiniCanvas productSlug={productSlug} params={params} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
