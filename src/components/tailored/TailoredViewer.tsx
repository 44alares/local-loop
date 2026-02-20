import { Suspense, lazy, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import type { TailoredProduct } from '@/data/tailoredProducts';

interface TailoredViewerProps {
  product: TailoredProduct;
  params: Record<string, number | boolean>;
}

const LazyViewerCanvas = lazy(() => import('./TailoredViewerCanvas'));

export function TailoredViewer({ product, params }: TailoredViewerProps) {
  const [viewerKey, setViewerKey] = useState(0);

  return (
    <div className="relative w-full h-full min-h-[360px] rounded-lg overflow-hidden">
      <div className="absolute top-3 left-3 z-10">
        <Badge variant="secondary" className="text-xs bg-secondary/90 text-secondary-foreground">
          Approximate preview
        </Badge>
      </div>
      <KeyResetErrorBoundary key={viewerKey} onRetry={() => setViewerKey(k => k + 1)}>
        <Suspense fallback={<div className="w-full h-full min-h-[360px] flex items-center justify-center text-sm text-muted-foreground bg-[hsl(0_0%_7%)]">Loading 3D viewer…</div>}>
          <LazyViewerCanvas product={product} params={params} />
        </Suspense>
      </KeyResetErrorBoundary>
    </div>
  );
}

/* Simple key-reset error boundary with manual retry */
import React from 'react';

interface EBProps { children: React.ReactNode; onRetry: () => void }
interface EBState { hasError: boolean }

class KeyResetErrorBoundary extends React.Component<EBProps, EBState> {
  state: EBState = { hasError: false };

  static getDerivedStateFromError(): EBState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('3D Viewer Error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[360px] flex flex-col items-center justify-center gap-3 bg-[hsl(0_0%_7%)]">
          <p className="text-sm text-muted-foreground">Error al cargar el visor 3D</p>
          <Button variant="outline" size="sm" onClick={this.props.onRetry}>
            Reintentar
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
