// Single source of truth for materials, basic colors, and recommended colors.
// Used by: ProductConfigurator, JoinAsMaker, StartCreating, and any other flow.

export interface MaterialColorDef {
  name: string;
  hex: string;
  ral: string;
}

export interface MaterialConfig {
  basicColors: MaterialColorDef[];
  recommendedColors: MaterialColorDef[];
  supportsMulticolor: boolean;
}

export type MaterialType = 'PLA' | 'PETG' | 'ABS' | 'Nylon' | 'Resin' | 'TPU';

export const MATERIALS_CONFIG: Record<MaterialType, MaterialConfig> = {
  PLA: {
    basicColors: [
      { name: 'White', hex: '#F4F8F4', ral: 'RAL 9010' },
      { name: 'Black', hex: '#0A0A0D', ral: 'RAL 9005' },
      { name: 'Grey', hex: '#C5C7C4', ral: 'RAL 7035' },
      { name: 'Red', hex: '#CC0605', ral: 'RAL 3020' },
      { name: 'Blue', hex: '#007CB0', ral: 'RAL 5015' },
      { name: 'Green', hex: '#57A639', ral: 'RAL 6018' },
    ],
    recommendedColors: [
      { name: 'Yellow', hex: '#F0CA00', ral: 'RAL 1023' },
      { name: 'Orange', hex: '#E25303', ral: 'RAL 2004' },
      { name: 'Brown', hex: '#442F29', ral: 'RAL 8017' },
      { name: 'Beige', hex: '#D0B084', ral: 'RAL 1001' },
    ],
    supportsMulticolor: true,
  },
  PETG: {
    basicColors: [
      { name: 'Black', hex: '#0A0A0D', ral: 'RAL 9005' },
      { name: 'White', hex: '#F4F8F4', ral: 'RAL 9010' },
      { name: 'Grey', hex: '#C5C7C4', ral: 'RAL 7035' },
      { name: 'Blue', hex: '#007CB0', ral: 'RAL 5015' },
    ],
    recommendedColors: [
      { name: 'Red', hex: '#CC0605', ral: 'RAL 3020' },
      { name: 'Green', hex: '#57A639', ral: 'RAL 6018' },
    ],
    supportsMulticolor: true,
  },
  ABS: {
    basicColors: [
      { name: 'Black', hex: '#0A0A0D', ral: 'RAL 9005' },
      { name: 'White', hex: '#F4F8F4', ral: 'RAL 9010' },
      { name: 'Grey', hex: '#C5C7C4', ral: 'RAL 7035' },
    ],
    recommendedColors: [
      { name: 'Red', hex: '#CC0605', ral: 'RAL 3020' },
      { name: 'Blue', hex: '#007CB0', ral: 'RAL 5015' },
    ],
    supportsMulticolor: false,
  },
  Nylon: {
    basicColors: [
      { name: 'Black', hex: '#0A0A0D', ral: 'RAL 9005' },
      { name: 'Grey', hex: '#C5C7C4', ral: 'RAL 7035' },
      { name: 'White', hex: '#F4F8F4', ral: 'RAL 9010' },
    ],
    recommendedColors: [],
    supportsMulticolor: false,
  },
  Resin: {
    basicColors: [
      { name: 'Grey', hex: '#C5C7C4', ral: 'RAL 7035' },
      { name: 'White', hex: '#F4F8F4', ral: 'RAL 9010' },
    ],
    recommendedColors: [
      { name: 'Black', hex: '#0A0A0D', ral: 'RAL 9005' },
    ],
    supportsMulticolor: false,
  },
  TPU: {
    basicColors: [
      { name: 'Black', hex: '#0A0A0D', ral: 'RAL 9005' },
      { name: 'White', hex: '#F4F8F4', ral: 'RAL 9010' },
      { name: 'Grey', hex: '#C5C7C4', ral: 'RAL 7035' },
      { name: 'Blue', hex: '#007CB0', ral: 'RAL 5015' },
      { name: 'Red', hex: '#CC0605', ral: 'RAL 3020' },
    ],
    recommendedColors: [],
    supportsMulticolor: false,
  },
};

export const ALL_MATERIALS: MaterialType[] = ['PLA', 'PETG', 'ABS', 'Nylon', 'Resin', 'TPU'];

/** Get basic color names for a material (used in configurator) */
export function getBasicColorNames(material: string): string[] {
  const config = MATERIALS_CONFIG[material as MaterialType];
  return config ? config.basicColors.map(c => c.name) : [];
}

/** Check if a material supports multi-color */
export function materialSupportsMulticolor(material: string): boolean {
  const config = MATERIALS_CONFIG[material as MaterialType];
  return config?.supportsMulticolor ?? false;
}
