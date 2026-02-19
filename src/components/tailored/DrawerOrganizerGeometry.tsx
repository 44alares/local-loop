interface DrawerOrganizerGeometryProps {
  totalWidth: number;
  totalDepth: number;
  totalHeight: number;
  colDivisions: number;
  rowDivisions: number;
}

export function DrawerOrganizerGeometry({ totalWidth, totalDepth, totalHeight, colDivisions, rowDivisions }: DrawerOrganizerGeometryProps) {
  const s = 0.01;
  const w = totalWidth * s;
  const d = totalDepth * s;
  const h = totalHeight * s;
  const wall = 0.02; // 2mm walls

  const mat = { color: '#cccccc', metalness: 0.3, roughness: 0.6 } as const;

  // Walls and dividers
  const meshes: JSX.Element[] = [];

  // Bottom
  meshes.push(
    <mesh key="bottom" position={[0, wall / 2, 0]}>
      <boxGeometry args={[w, wall, d]} />
      <meshStandardMaterial {...mat} />
    </mesh>
  );

  // Front wall
  meshes.push(
    <mesh key="front" position={[0, h / 2, d / 2 - wall / 2]}>
      <boxGeometry args={[w, h, wall]} />
      <meshStandardMaterial {...mat} />
    </mesh>
  );

  // Back wall
  meshes.push(
    <mesh key="back" position={[0, h / 2, -(d / 2 - wall / 2)]}>
      <boxGeometry args={[w, h, wall]} />
      <meshStandardMaterial {...mat} />
    </mesh>
  );

  // Left wall
  meshes.push(
    <mesh key="left" position={[-(w / 2 - wall / 2), h / 2, 0]}>
      <boxGeometry args={[wall, h, d]} />
      <meshStandardMaterial {...mat} />
    </mesh>
  );

  // Right wall
  meshes.push(
    <mesh key="right" position={[w / 2 - wall / 2, h / 2, 0]}>
      <boxGeometry args={[wall, h, d]} />
      <meshStandardMaterial {...mat} />
    </mesh>
  );

  // Column dividers (vertical walls along X axis)
  for (let i = 1; i < colDivisions; i++) {
    const x = -w / 2 + (w / colDivisions) * i;
    meshes.push(
      <mesh key={`col-${i}`} position={[x, h / 2, 0]}>
        <boxGeometry args={[wall, h, d - wall * 2]} />
        <meshStandardMaterial {...mat} />
      </mesh>
    );
  }

  // Row dividers (walls along Z axis)
  for (let i = 1; i < rowDivisions; i++) {
    const z = -d / 2 + (d / rowDivisions) * i;
    meshes.push(
      <mesh key={`row-${i}`} position={[0, h / 2, z]}>
        <boxGeometry args={[w - wall * 2, h, wall]} />
        <meshStandardMaterial {...mat} />
      </mesh>
    );
  }

  return <group>{meshes}</group>;
}
