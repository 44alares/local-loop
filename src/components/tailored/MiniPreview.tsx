import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { DrawerHandleGeometry } from './DrawerHandleGeometry';
import { DrawerOrganizerGeometry } from './DrawerOrganizerGeometry';
import { ShelfBracketGeometry } from './ShelfBracketGeometry';

interface MiniPreviewProps {
  productSlug: string;
  params: Record<string, number | boolean>;
}

function SceneContent({ productSlug, params }: MiniPreviewProps) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} />

      <group rotation={[0.3, 0.6, 0]}>
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
      </group>
    </>
  );
}

export function MiniPreview({ productSlug, params }: MiniPreviewProps) {
  return (
    <div className="w-full aspect-square rounded-md overflow-hidden bg-[hsl(0_0%_7%)]">
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Loading…</div>}>
        <Canvas
          camera={{ position: [3, 2, 3], fov: 35 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#111111' }}
        >
          <SceneContent productSlug={productSlug} params={params} />
        </Canvas>
      </Suspense>
    </div>
  );
}
