import { Canvas } from '@react-three/fiber';
import { DrawerHandleGeometry } from './DrawerHandleGeometry';
import { DrawerOrganizerGeometry } from './DrawerOrganizerGeometry';
import { ShelfBracketGeometry } from './ShelfBracketGeometry';

interface Props {
  productSlug: string;
  params: Record<string, number | boolean>;
}

function SceneContent({ productSlug, params }: Props) {
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
      </group>
    </>
  );
}

export default function MiniPreviewCanvas({ productSlug, params }: Props) {
  return (
    <Canvas
      camera={{ position: [3, 2, 3], fov: 35 }}
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '120px', background: '#111111' }}
    >
      <SceneContent productSlug={productSlug} params={params} />
    </Canvas>
  );
}
