import { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

interface DrawerHandleGeometryProps {
  length: number;
  holeSpacing: number;
  legHeight: number;
  thickness: number;
  holeDiameter?: number;
}

export function DrawerHandleGeometry({ length, holeSpacing, legHeight, thickness, holeDiameter = 4 }: DrawerHandleGeometryProps) {
  const s = 0.01;
  const l = length * s;
  const hs = holeSpacing * s;
  const lh = legHeight * s;
  const t = thickness * s;
  const hr = (holeDiameter / 2) * s;

  // Bevel radius: thickness * 0.08, clamped to max 1.2mm (0.012 scene units)
  const bevel = Math.min(thickness * 0.08 * s, 0.012);

  const holeMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111111' }), []);
  const mat = { color: '#cccccc', metalness: 0.3, roughness: 0.6 } as const;

  return (
    <group>
      {/* Top bar — rounded */}
      <RoundedBox args={[l, t, t]} radius={bevel} smoothness={4} position={[0, lh + t / 2, 0]}>
        <meshStandardMaterial {...mat} />
      </RoundedBox>

      {/* Left leg — sharp edges (standard box) */}
      <mesh position={[-(hs / 2), lh / 2, 0]}>
        <boxGeometry args={[t, lh, t]} />
        <meshStandardMaterial {...mat} />
      </mesh>

      {/* Right leg — sharp edges (standard box) */}
      <mesh position={[hs / 2, lh / 2, 0]}>
        <boxGeometry args={[t, lh, t]} />
        <meshStandardMaterial {...mat} />
      </mesh>

      {/* Hole left — vertical through leg */}
      <mesh position={[-(hs / 2), lh / 2, 0]} material={holeMaterial}>
        <cylinderGeometry args={[hr, hr, lh + 2 * s, 16]} />
      </mesh>

      {/* Hole right — vertical through leg */}
      <mesh position={[hs / 2, lh / 2, 0]} material={holeMaterial}>
        <cylinderGeometry args={[hr, hr, lh + 2 * s, 16]} />
      </mesh>
    </group>
  );
}
