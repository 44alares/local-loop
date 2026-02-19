interface ShelfBracketGeometryProps {
  lengthH: number;
  heightV: number;
  thickness: number;
  reinforcement: boolean;
}

export function ShelfBracketGeometry({ lengthH, heightV, thickness, reinforcement }: ShelfBracketGeometryProps) {
  const s = 0.01;
  const lh = lengthH * s;
  const hv = heightV * s;
  const t = thickness * s;
  const depth = 0.3; // 30mm depth

  const mat = { color: '#cccccc', metalness: 0.3, roughness: 0.6 } as const;

  const hyp = Math.sqrt(lh * lh + hv * hv);
  const diagLength = hyp * 0.65;
  const diagAngle = -Math.atan2(hv, lh);

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

      {/* Diagonal reinforcement */}
      {reinforcement && (
        <mesh position={[lh * 0.3, hv * 0.38, 0]} rotation={[0, 0, diagAngle]}>
          <boxGeometry args={[diagLength, t * 0.7, depth * 0.8]} />
          <meshStandardMaterial {...mat} />
        </mesh>
      )}
    </group>
  );
}
