import { Suspense, lazy } from 'react';
import { Badge } from '@/components/ui/badge';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import type { TailoredProduct } from '@/data/tailoredProducts';
import drawerHandlePreview from '@/assets/tailored/drawer-handle-preview.jpg';

interface TailoredViewerProps {
  product: TailoredProduct;
  params: Record<string, number | boolean>;
}

const LazyViewerCanvas = lazy(() => import('./TailoredViewerCanvas'));

export function TailoredViewer({ product, params }: TailoredViewerProps) {
  const useStaticImage = product.slug === 'drawer-handle';

  return (
    <div className="relative w-full h-full min-h-[360px] rounded-lg overflow-hidden">
      <div className="absolute top-3 left-3 z-10">
        <Badge variant="secondary" className="text-xs bg-secondary/90 text-secondary-foreground">
          Approximate preview
        </Badge>
      </div>
      {useStaticImage ? (
        <img
          src={drawerHandlePreview}
          alt="Drawer handle preview"
          className="w-full h-full min-h-[360px] object-cover bg-[hsl(0_0%_7%)]"
        />
      ) : (
        <ErrorBoundary>
          <Suspense fallback={<div className="w-full h-full min-h-[360px] flex items-center justify-center text-sm text-muted-foreground bg-[hsl(0_0%_7%)]">Loading 3D viewer…</div>}>
            <LazyViewerCanvas product={product} params={params} />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
}
