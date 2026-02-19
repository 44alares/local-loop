import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { DrawerHandleGeometry } from './DrawerHandleGeometry';
import { DrawerOrganizerGeometry } from './DrawerOrganizerGeometry';
import { ShelfBracketGeometry } from './ShelfBracketGeometry';
import { Badge } from '@/components/ui/badge';
import type { TailoredProduct } from '@/data/tailoredProducts';

interface TailoredViewerProps {
  product: TailoredProduct;
  params: Record<string, number | boolean>;
}

function AutoRotate({ speed = 0.4 }: { speed?: number }) {
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    // Access controls from the parent — this is handled via OrbitControls autoRotate
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      autoRotate
      autoRotateSpeed={speed}
      enableDamping
      dampingFactor={0.1}
    />
  );
}

function ModelWithSpring({ productSlug, params, triggerKey }: { productSlug: string; params: Record<string, number | boolean>; triggerKey: string }) {
  const { scale } = useSpring({
    from: { scale: 0.96 },
    to: { scale: 1 },
    config: { duration: 150 },
    reset: true,
    key: triggerKey,
  });

  const labels = getLabels(productSlug, params);

  return (
    <animated.group scale={scale}>
      {productSlug === 'drawer-handle' && (
        <DrawerHandleGeometry
          length={params.length as number}
          holeSpacing={params.holeSpacing as number}
          legHeight={params.legHeight as number}
          thickness={params.thickness as number}
        />
      )}
      {productSlug === 'drawer-organizer' && (
        <DrawerOrganizerGeometry
          totalWidth={params.totalWidth as number}
          totalDepth={params.totalDepth as number}
          totalHeight={params.totalHeight as number}
          colDivisions={params.colDivisions as number}
          rowDivisions={params.rowDivisions as number}
        />
      )}
      {productSlug === 'shelf-bracket' && (
        <ShelfBracketGeometry
          lengthH={params.lengthH as number}
          heightV={params.heightV as number}
          thickness={params.thickness as number}
          reinforcement={params.reinforcement as boolean}
        />
      )}

      {/* Dimension labels */}
      {labels.map((label, i) => (
        <Html key={i} position={label.position as [number, number, number]} center distanceFactor={6}>
          <div className="whitespace-nowrap rounded bg-[hsl(0_0%_10%/0.85)] px-1.5 py-0.5 text-[10px] text-white font-medium pointer-events-none select-none">
            {label.text}
          </div>
        </Html>
      ))}
    </animated.group>
  );
}

function getLabels(slug: string, params: Record<string, number | boolean>) {
  const s = 0.01;
  if (slug === 'drawer-handle') {
    const l = (params.length as number) * s;
    const lh = (params.legHeight as number) * s;
    const t = (params.thickness as number) * s;
    return [
      { text: `← ${params.length} mm →`, position: [0, lh + t + 0.15, 0] },
      { text: `↕ ${params.legHeight} mm`, position: [-((params.holeSpacing as number) * s / 2) - 0.2, lh / 2, 0] },
    ];
  }
  if (slug === 'drawer-organizer') {
    const w = (params.totalWidth as number) * s;
    const h = (params.totalHeight as number) * s;
    const d = (params.totalDepth as number) * s;
    return [
      { text: `← ${params.totalWidth} mm →`, position: [0, 0, d / 2 + 0.15] },
      { text: `↕ ${params.totalHeight} mm`, position: [-(w / 2) - 0.2, h / 2, 0] },
      { text: `${params.totalDepth} mm →`, position: [w / 2 + 0.2, 0, 0] },
    ];
  }
  if (slug === 'shelf-bracket') {
    const lh = (params.lengthH as number) * s;
    const hv = (params.heightV as number) * s;
    const t = (params.thickness as number) * s;
    return [
      { text: `← ${params.lengthH} mm →`, position: [lh / 2, hv + t + 0.1, 0] },
      { text: `↕ ${params.heightV} mm`, position: [-0.15, hv / 2, 0] },
    ];
  }
  return [];
}

export function TailoredViewer({ product, params }: TailoredViewerProps) {
  const triggerKey = JSON.stringify(params);

  return (
    <div className="relative w-full h-full min-h-[360px] rounded-lg overflow-hidden">
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        <Badge variant="secondary" className="text-xs bg-secondary/90 text-secondary-foreground">
          Approximate preview
        </Badge>
      </div>

      <Canvas
        camera={{ position: [4, 3, 4], fov: 35 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#111111' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 4]} intensity={0.8} />
          <AutoRotate speed={0.4} />
          <Grid
            args={[10, 10]}
            position={[0, -0.01, 0]}
            cellColor="#222222"
            sectionColor="#333333"
            fadeDistance={8}
            infiniteGrid
          />
          <ModelWithSpring productSlug={product.slug} params={params} triggerKey={triggerKey} />
        </Suspense>
      </Canvas>
    </div>
  );
}
