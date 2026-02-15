// Standardized multi-color palettes by material
export type PaletteId = 'base' | 'earth' | 'accent' | 'matte';

export interface PaletteDefinition {
  id: PaletteId;
  label: string;
  required: boolean;
  colors: string[];
}

// Matte palette colors (2025 pastel/decor trend)
export const MATTE_PALETTE_COLORS = [
  { name: 'Rose Quartz', hex: '#E8D4D4' },
  { name: 'Mist Blue', hex: '#D4E4E8' },
  { name: 'Mint Green', hex: '#D4E8D9' },
  { name: 'Lavender', hex: '#E4D4E8' },
];

export const MULTICOLOR_PALETTES: Record<string, PaletteDefinition[]> = {
  PLA: [
    { id: 'base', label: 'Base', required: true, colors: ['Black', 'White', 'Grey', 'Red', 'Blue', 'Green'] },
    { id: 'earth', label: 'Earth', required: false, colors: ['Beige', 'Brown', 'Grey', 'White'] },
    { id: 'accent', label: 'Accent', required: false, colors: ['Yellow', 'Orange', 'Red', 'Blue'] },
    { id: 'matte', label: 'Matte', required: false, colors: ['Rose Quartz', 'Mist Blue', 'Mint Green', 'Lavender'] },
  ],
  PETG: [
    { id: 'base', label: 'Base', required: true, colors: ['Black', 'White', 'Grey', 'Blue'] },
    { id: 'earth', label: 'Earth', required: false, colors: ['Beige', 'Brown', 'Grey', 'White'] },
    { id: 'accent', label: 'Accent', required: false, colors: ['Yellow', 'Orange', 'Red', 'Blue'] },
    { id: 'matte', label: 'Matte', required: false, colors: ['Rose Quartz', 'Mist Blue', 'Mint Green', 'Lavender'] },
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
  'Orange': '#FB8C00',
  'Beige': '#D4C5A9',
  'Brown': '#795548',
  'Rose Quartz': '#E8D4D4',
  'Mist Blue': '#D4E4E8',
  'Mint Green': '#D4E8D9',
  'Lavender': '#E4D4E8',
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
