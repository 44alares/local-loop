import { useMemo } from 'react';
import * as THREE from 'three';

interface ShelfBracketGeometryProps {
  lengthH: number;
  heightV: number;
  thickness: number;
  reinforcement: boolean;
  holeDiameter?: number;
}

export function ShelfBracketGeometry({ lengthH, heightV, thickness, reinforcement, holeDiameter = 6 }: ShelfBracketGeometryProps) {
  const s = 0.01;
  const lh = lengthH * s;
  const hv = heightV * s;
  const t = thickness * s;
  const depth = 0.3; // 30mm
  const hr = (holeDiameter / 2) * s;

  const mat = { color: '#cccccc', metalness: 0.3, roughness: 0.6 } as const;
  const holeMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111111' }), []);

  // Diagonal: from [0,0,0] to [lengthH, heightV, 0]
  const diagLength = Math.sqrt(lh * lh + hv * hv);
  const diagAngle = Math.atan2(hv, lh);

  return (
    <group>
      {/* Horizontal arm */}
      <mesh position={[lh / 2 - t / 2, hv, 0]}>
        <boxGeometry args={[lh, t, depth]} />
        <meshStandardMaterial {...mat} />
      </mesh>

      {/* Vertical arm */}
      <mesh position={[0, hv / 2, 0]}>
        <boxGeometry args={[t, hv, depth]} />
        <meshStandardMaterial {...mat} />
      </mesh>

      {/* Diagonal reinforcement — corner to corner */}
      {reinforcement && (
        <mesh position={[lh / 2, hv / 2, 0]} rotation={[0, 0, diagAngle]}>
          <boxGeometry args={[diagLength, t * 0.8, depth]} />
          <meshStandardMaterial {...mat} />
        </mesh>
      )}

      {/* Hole in horizontal arm — through Z depth */}
      <mesh
        position={[lh - holeDiameter * 2 * s, hv, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={holeMaterial}
      >
        <cylinderGeometry args={[hr, hr, depth + 0.02, 16]} />
      </mesh>

      {/* Hole in vertical arm — through Z depth */}
      <mesh
        position={[0, holeDiameter * 2 * s, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={holeMaterial}
      >
        <cylinderGeometry args={[hr, hr, depth + 0.02, 16]} />
      </mesh>
    </group>
  );
}
