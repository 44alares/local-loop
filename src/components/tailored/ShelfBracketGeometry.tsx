import { useMemo } from 'react';
import * as THREE from 'three';

interface ShelfBracketGeometryProps {
  lengthH: number;
  heightV: number;
  thickness: number;
  reinforcement: boolean;
  holeDiameter?: number;
  depth?: number;
}

export function ShelfBracketGeometry({ lengthH, heightV, thickness, reinforcement, holeDiameter = 6, depth = 30 }: ShelfBracketGeometryProps) {
  const s = 0.01;
  const lh = lengthH * s;
  const hv = heightV * s;
  const t = thickness * s;
  const d = depth * s;
  const hr = (holeDiameter / 2) * s;

  const mat = { color: '#cccccc', metalness: 0.3, roughness: 0.6 } as const;
  const holeMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111111' }), []);

  // Diagonal: from midpoint of vertical arm [0, hv*0.5] to midpoint of horizontal arm [lh*0.5, hv]
  const dx = lh * 0.5;
  const dy = hv * 0.5;
  const diagLength = Math.sqrt(dx * dx + dy * dy);
  const diagAngle = Math.atan2(dy, dx);

  return (
    <group>
      {/* Horizontal arm */}
      <mesh position={[lh / 2 - t / 2, hv, 0]}>
        <boxGeometry args={[lh, t, d]} />
        <meshStandardMaterial {...mat} />
      </mesh>

      {/* Vertical arm */}
      <mesh position={[0, hv / 2, 0]}>
        <boxGeometry args={[t, hv, d]} />
        <meshStandardMaterial {...mat} />
      </mesh>

      {/* Diagonal reinforcement — midpoint to midpoint */}
      {reinforcement && (
        <mesh position={[lh * 0.25, hv * 0.75, 0]} rotation={[0, 0, diagAngle]}>
          <boxGeometry args={[diagLength, t * 0.8, d]} />
          <meshStandardMaterial {...mat} />
        </mesh>
      )}

      {/* Hole in horizontal arm — drilled vertically (Y axis) through arm thickness */}
      <mesh
        position={[lh - holeDiameter * 3 * s, hv, 0]}
        material={holeMaterial}
      >
        <cylinderGeometry args={[hr, hr, t + 0.02, 16]} />
      </mesh>

      {/* Hole in vertical arm — drilled through wide face (along X axis through thickness) */}
      <mesh
        position={[0, holeDiameter * 3 * s, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={holeMaterial}
      >
        <cylinderGeometry args={[hr, hr, t + 0.02, 16]} />
      </mesh>
    </group>
  );
}
