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

  // Diagonal: from midpoint of vertical arm [0, hv*0.5] to midpoint of horizontal arm [lh*0.5, hv]
  const dx = lh * 0.5;
  const dy = hv * 0.5;
  const diagLength = Math.sqrt(dx * dx + dy * dy);
  const diagAngle = Math.atan2(dy, dx);

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

      {/* Diagonal reinforcement — midpoint to midpoint */}
      {reinforcement && (
        <mesh position={[lh * 0.25, hv * 0.75, 0]} rotation={[0, 0, diagAngle]}>
          <boxGeometry args={[diagLength, t * 0.8, depth]} />
          <meshStandardMaterial {...mat} />
        </mesh>
      )}

      {/* Hole in horizontal arm — through Z depth (rotX = PI/2) */}
      <mesh
        position={[lh - holeDiameter * 2 * s, hv, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={holeMaterial}
      >
        <cylinderGeometry args={[hr, hr, depth + 0.02, 16]} />
      </mesh>

      {/* Hole in vertical arm — through Z depth (rotX = PI/2) */}
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
