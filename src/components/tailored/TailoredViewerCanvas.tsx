import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { DrawerHandleGeometry } from './DrawerHandleGeometry';
import { DrawerOrganizerGeometry } from './DrawerOrganizerGeometry';
import { ShelfBracketGeometry } from './ShelfBracketGeometry';
import type { TailoredProduct } from '@/data/tailoredProducts';

interface Props {
  product: TailoredProduct;
  params: Record<string, number | boolean>;
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
          holeDiameter={params.holeDiameter as number ?? 4}
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
          holeDiameter={params.holeDiameter as number ?? 6}
          depth={params.depth as number ?? 30}
        />
      )}

      {labels.map((label, i) => (
        <Html key={i} position={label.position as [number, number, number]} center zIndexRange={[0, 0]}>
          <div style={{ fontSize: '11px', whiteSpace: 'nowrap', background: 'hsla(0,0%,10%,0.85)', color: '#fff', borderRadius: '4px', padding: '2px 6px', fontWeight: 500, pointerEvents: 'none', userSelect: 'none' }}>
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
    const lh = (params.legHeight as number) * s;
    const t = (params.thickness as number) * s;
    const hs = (params.holeSpacing as number) * s;
    return [
      { text: `← ${params.length} mm →`, position: [0, lh + t + 0.15, 0] },
      { text: `↕ ${params.legHeight} mm`, position: [-(hs / 2) - 0.2, lh / 2, 0] },
      { text: `⌀ ${params.holeDiameter} mm`, position: [(hs / 2) + 0.2, lh * 0.3, 0] },
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
    const d = (params.depth as number || 30) * s;
    const hd = (params.holeDiameter as number) * s;
    return [
      { text: `← ${params.lengthH} mm →`, position: [lh / 2, hv + t + 0.1, 0] },
      { text: `↕ ${params.heightV} mm`, position: [-0.15, hv / 2, 0] },
      { text: `${params.depth || 30} mm ↔`, position: [lh / 2, hv, d / 2 + 0.15] },
      { text: `⌀ ${params.holeDiameter} mm`, position: [lh - hd * 3, hv + t + 0.2, 0.2] },
    ];
  }
  return [];
}

export default function TailoredViewerCanvas({ product, params }: Props) {
  const triggerKey = JSON.stringify(params);

  return (
    <Canvas
      camera={{ position: [4, 3, 4], fov: 35 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#111111' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={0.8} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.4}
        enableDamping
        dampingFactor={0.1}
      />
      <Grid
        args={[10, 10]}
        position={[0, -0.01, 0]}
        cellColor="#222222"
        sectionColor="#333333"
        fadeDistance={8}
        infiniteGrid
      />
      <ModelWithSpring productSlug={product.slug} params={params} triggerKey={triggerKey} />
    </Canvas>
  );
}
