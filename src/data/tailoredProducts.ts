export interface TailoredParam {
  key: string;
  label: string;
  min: number;
  max: number;
  default: number;
  step: number;
  unit: string;
  type: 'slider' | 'integer' | 'toggle';
}

export interface TailoredPreviewVariant {
  label: string;
  params: Record<string, number | boolean>;
}

export interface TailoredProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  tags: string[];
  price: number;
  setOf?: number;
  params: TailoredParam[];
  previewVariants: TailoredPreviewVariant[];
}

export const tailoredProducts: TailoredProduct[] = [
  {
    id: 'tailored-drawer-handle',
    slug: 'drawer-handle',
    name: 'Drawer Handle — 4 units',
    description: 'For kitchens, wardrobes and furniture. Your exact measurements.',
    tags: ['length', 'hole spacing', 'height', 'thickness'],
    price: 19,
    setOf: 4,
    params: [
      { key: 'length', label: 'Length', min: 80, max: 250, default: 120, step: 1, unit: 'mm', type: 'slider' },
      { key: 'holeSpacing', label: 'Hole spacing', min: 32, max: 200, default: 96, step: 1, unit: 'mm', type: 'slider' },
      { key: 'legHeight', label: 'Leg height', min: 15, max: 60, default: 30, step: 1, unit: 'mm', type: 'slider' },
      { key: 'thickness', label: 'Thickness', min: 6, max: 18, default: 10, step: 1, unit: 'mm', type: 'slider' },
      { key: 'holeDiameter', label: 'Hole diameter', min: 3, max: 8, default: 4, step: 0.5, unit: 'mm', type: 'slider' },
    ],
    previewVariants: [
      { label: 'Short (80mm)', params: { length: 80, holeSpacing: 64, legHeight: 25, thickness: 8, holeDiameter: 4 } },
      { label: 'Long (200mm)', params: { length: 200, holeSpacing: 160, legHeight: 30, thickness: 10, holeDiameter: 4 } },
      { label: 'Tall legs (120mm)', params: { length: 120, holeSpacing: 96, legHeight: 50, thickness: 10, holeDiameter: 5 } },
      { label: 'Thick (160mm)', params: { length: 160, holeSpacing: 128, legHeight: 30, thickness: 16, holeDiameter: 6 } },
    ],
  },
  {
    id: 'tailored-drawer-organizer',
    slug: 'drawer-organizer',
    name: 'Drawer Organizer',
    description: 'Custom compartments that fit perfectly inside any drawer.',
    tags: ['width', 'depth', 'height', 'compartments'],
    price: 20,
    params: [
      { key: 'totalWidth', label: 'Width', min: 50, max: 250, default: 200, step: 1, unit: 'mm', type: 'slider' },
      { key: 'totalDepth', label: 'Depth', min: 50, max: 250, default: 150, step: 1, unit: 'mm', type: 'slider' },
      { key: 'totalHeight', label: 'Height', min: 20, max: 80, default: 40, step: 1, unit: 'mm', type: 'slider' },
      { key: 'colDivisions', label: 'Columns', min: 1, max: 8, default: 3, step: 1, unit: '', type: 'integer' },
      { key: 'rowDivisions', label: 'Rows', min: 1, max: 6, default: 2, step: 1, unit: '', type: 'integer' },
    ],
    previewVariants: [
      { label: '2×2 shallow', params: { totalWidth: 150, totalDepth: 150, totalHeight: 25, colDivisions: 2, rowDivisions: 2 } },
      { label: '3×1 deep', params: { totalWidth: 200, totalDepth: 100, totalHeight: 60, colDivisions: 3, rowDivisions: 1 } },
      { label: '4×2 medium', params: { totalWidth: 300, totalDepth: 200, totalHeight: 40, colDivisions: 4, rowDivisions: 2 } },
      { label: '2×3 tall', params: { totalWidth: 150, totalDepth: 250, totalHeight: 70, colDivisions: 2, rowDivisions: 3 } },
    ],
  },
  {
    id: 'tailored-shelf-bracket',
    slug: 'shelf-bracket',
    name: 'Shelf Bracket — 4 units',
    description: 'Strong and adjustable. With or without diagonal reinforcement.',
    tags: ['length', 'height', 'thickness', 'reinforcement'],
    price: 22,
    setOf: 4,
    params: [
      { key: 'lengthH', label: 'Length', min: 50, max: 200, default: 100, step: 1, unit: 'mm', type: 'slider' },
      { key: 'heightV', label: 'Height', min: 50, max: 150, default: 80, step: 1, unit: 'mm', type: 'slider' },
      { key: 'thickness', label: 'Thickness', min: 5, max: 20, default: 8, step: 1, unit: 'mm', type: 'slider' },
      { key: 'depth', label: 'Depth', min: 20, max: 60, default: 30, step: 1, unit: 'mm', type: 'slider' },
      { key: 'reinforcement', label: 'Reinforcement', min: 0, max: 1, default: 1, step: 1, unit: '', type: 'toggle' },
      { key: 'holeDiameter', label: 'Hole diameter', min: 4, max: 12, default: 6, step: 0.5, unit: 'mm', type: 'slider' },
    ],
    previewVariants: [
      { label: 'Small (50×50)', params: { lengthH: 50, heightV: 50, thickness: 6, depth: 25, reinforcement: false, holeDiameter: 5 } },
      { label: 'Large + reinf.', params: { lengthH: 180, heightV: 120, thickness: 12, depth: 40, reinforcement: true, holeDiameter: 8 } },
      { label: 'Medium no reinf.', params: { lengthH: 100, heightV: 80, thickness: 8, depth: 30, reinforcement: false, holeDiameter: 6 } },
      { label: 'Wide + reinf.', params: { lengthH: 200, heightV: 100, thickness: 10, depth: 35, reinforcement: true, holeDiameter: 6 } },
    ],
  },
];

export function getTailoredProduct(slug: string): TailoredProduct | undefined {
  return tailoredProducts.find(p => p.slug === slug);
}
