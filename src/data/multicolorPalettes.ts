// Standardized multi-color palettes by material
export type PaletteId = 'base' | 'earth' | 'accent';

export interface PaletteDefinition {
  id: PaletteId;
  label: string;
  required: boolean;
  colors: string[];
}

export const MULTICOLOR_PALETTES: Record<string, PaletteDefinition[]> = {
  PLA: [
    { id: 'base', label: 'Base', required: true, colors: ['Black', 'White', 'Grey', 'Red', 'Blue', 'Green'] },
    { id: 'earth', label: 'Earth', required: false, colors: ['Black', 'Grey', 'Beige', 'Brown'] },
    { id: 'accent', label: 'Accent', required: false, colors: ['Black', 'White', 'Yellow', 'Red'] },
  ],
  PETG: [
    { id: 'base', label: 'Base', required: true, colors: ['Black', 'White', 'Grey', 'Blue'] },
    { id: 'earth', label: 'Earth', required: false, colors: ['Black', 'Grey', 'Beige', 'Brown'] },
    { id: 'accent', label: 'Accent', required: false, colors: ['Black', 'White', 'Red', 'Blue'] },
  ],
};

// Color hex map for multi-color display
export const multicolorHexMap: Record<string, string> = {
  'White': '#FFFFFF',
  'Black': '#1A1A1A',
  'Grey': '#808080',
  'Red': '#E53935',
  'Blue': '#1E88E5',
  'Green': '#43A047',
  'Yellow': '#FDD835',
  'Beige': '#D4C5A9',
  'Brown': '#795548',
};

export function getPalettesForMaterial(material: string): PaletteDefinition[] {
  return MULTICOLOR_PALETTES[material] || [];
}

export function getAvailablePalettes(
  material: string,
  makerPalettesReady?: PaletteId[]
): PaletteDefinition[] {
  const palettes = getPalettesForMaterial(material);
  if (!makerPalettesReady) {
    // No maker selected - show only base
    return palettes.filter(p => p.required);
  }
  return palettes.filter(p => p.required || makerPalettesReady.includes(p.id));
}
