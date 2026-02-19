import { useMemo } from 'react';
import * as THREE from 'three';

interface DrawerHandleGeometryProps {
  length: number;
  holeSpacing: number;
  legHeight: number;
  thickness: number;
}

export function DrawerHandleGeometry({ length, holeSpacing, legHeight, thickness }: DrawerHandleGeometryProps) {
  // Scale to Three.js units (mm / 100)
  const s = 0.01;
  const l = length * s;
  const hs = holeSpacing * s;
  const lh = legHeight * s;
  const t = thickness * s;

  const holeMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111111' }), []);

  return (
    <group>
      {/* Top bar */}
      <mesh position={[0, lh + t / 2, 0]}>
        <boxGeometry args={[l, t, t]} />
        <meshStandardMaterial color="#cccccc" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Left leg */}
      <mesh position={[-(hs / 2), lh / 2, 0]}>
        <boxGeometry args={[t, lh, t]} />
        <meshStandardMaterial color="#cccccc" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Right leg */}
      <mesh position={[hs / 2, lh / 2, 0]}>
        <boxGeometry args={[t, lh, t]} />
        <meshStandardMaterial color="#cccccc" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Hole left */}
      <mesh position={[-(hs / 2), t / 2, 0]} rotation={[Math.PI / 2, 0, 0]} material={holeMaterial}>
        <cylinderGeometry args={[1.5 * s, 1.5 * s, (t + 2 * s), 16]} />
      </mesh>

      {/* Hole right */}
      <mesh position={[hs / 2, t / 2, 0]} rotation={[Math.PI / 2, 0, 0]} material={holeMaterial}>
        <cylinderGeometry args={[1.5 * s, 1.5 * s, (t + 2 * s), 16]} />
      </mesh>
    </group>
  );
}
