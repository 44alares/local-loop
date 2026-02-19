import { Suspense, lazy } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface MiniPreviewProps {
  productSlug: string;
  params: Record<string, number | boolean>;
}

const LazyMiniCanvas = lazy(() => import('./MiniPreviewCanvas'));

export function MiniPreview({ productSlug, params }: MiniPreviewProps) {
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
