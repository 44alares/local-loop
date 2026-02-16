// RAL filament equivalents lookup — MVP placeholder, ready for real data
export interface BrandMatch {
  name: string;
  skuOrLine?: string;
  confidence: 'High' | 'Med' | 'Low';
}

export type BrandKey =
  | 'bambulab'
  | 'esun'
  | 'elegoo'
  | 'sunlu'
  | 'overture'
  | 'polymaker'
  | 'inland'
  | 'prusament'
  | 'creality'
  | 'amazonBasics';

export const BRAND_LABELS: Record<BrandKey, string> = {
  bambulab: 'Bambu Lab',
  esun: 'eSUN',
  elegoo: 'ELEGOO',
  sunlu: 'SUNLU',
  overture: 'Overture',
  polymaker: 'Polymaker',
  inland: 'Inland',
  prusament: 'Prusament',
  creality: 'Creality',
  amazonBasics: 'Amazon Basics',
};

export const BRAND_ORDER: BrandKey[] = [
  'bambulab',
  'esun',
  'elegoo',
  'sunlu',
  'overture',
  'polymaker',
  'inland',
  'prusament',
  'creality',
  'amazonBasics',
];

// MVP: No real mappings yet. Structure is ready for plugging real data.
export const ralEquivalents: Record<string, Partial<Record<BrandKey, BrandMatch>>> = {};

export function getEquivalents(
  ralCode: string
): { brand: BrandKey; label: string; match: BrandMatch | null }[] {
  const matches = ralEquivalents[ralCode] || {};
  return BRAND_ORDER.map((key) => ({
    brand: key,
    label: BRAND_LABELS[key],
    match: matches[key] || null,
  }));
}
