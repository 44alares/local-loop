// RAL filament equivalents lookup — MVP with deterministic fake ref codes
export interface BrandMatch {
  name: string;
  ref: string; // 8-char alphanumeric code
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

// Deterministic fake ref code generator (stable per RAL+brand pair)
const refCache: Record<string, string> = {};

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function getFakeBrandRef(ralCode: string, brandKey: BrandKey): string {
  const cacheKey = `${ralCode}::${brandKey}`;
  if (refCache[cacheKey]) return refCache[cacheKey];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let hash = hashCode(cacheKey);
  let ref = '';
  for (let i = 0; i < 8; i++) {
    ref += chars[hash % chars.length];
    hash = Math.floor(hash / chars.length) + (hash % 7) + i;
  }
  refCache[cacheKey] = ref;
  return ref;
}

// MVP: partial mappings — only brands with known equivalents are listed per RAL code.
// Not every brand appears for every RAL.
export const ralEquivalents: Record<string, Partial<Record<BrandKey, Omit<BrandMatch, 'ref'>>>> = {
  'RAL 9005': {
    bambulab: { name: 'PLA Basic Black', confidence: 'High' },
    esun: { name: 'PLA+ Black', confidence: 'High' },
    elegoo: { name: 'PLA Black', confidence: 'High' },
    sunlu: { name: 'PLA Black', confidence: 'High' },
    overture: { name: 'PLA Black', confidence: 'High' },
    polymaker: { name: 'PolyLite PLA Black', confidence: 'High' },
    prusament: { name: 'PLA Jet Black', confidence: 'High' },
    creality: { name: 'Ender PLA Black', confidence: 'Med' },
  },
  'RAL 9010': {
    bambulab: { name: 'PLA Basic White', confidence: 'High' },
    esun: { name: 'PLA+ White', confidence: 'High' },
    overture: { name: 'PLA White', confidence: 'High' },
    polymaker: { name: 'PolyLite PLA White', confidence: 'High' },
    prusament: { name: 'PLA Signal White', confidence: 'High' },
  },
  'RAL 3020': {
    bambulab: { name: 'PLA Basic Red', confidence: 'Med' },
    esun: { name: 'PLA+ Fire Engine Red', confidence: 'Med' },
    sunlu: { name: 'PLA Red', confidence: 'Med' },
    polymaker: { name: 'PolyLite PLA Red', confidence: 'Med' },
  },
  'RAL 5010': {
    bambulab: { name: 'PLA Basic Blue', confidence: 'Med' },
    esun: { name: 'PLA+ Blue', confidence: 'Med' },
    overture: { name: 'PLA Blue', confidence: 'Med' },
  },
  'RAL 6029': {
    bambulab: { name: 'PLA Basic Green', confidence: 'Med' },
    esun: { name: 'PLA+ Green', confidence: 'Med' },
  },
  'RAL 1023': {
    bambulab: { name: 'PLA Basic Yellow', confidence: 'Med' },
    sunlu: { name: 'PLA Yellow', confidence: 'Med' },
  },
  'RAL 7035': {
    bambulab: { name: 'PLA Basic Grey', confidence: 'Med' },
    prusament: { name: 'PLA Light Grey', confidence: 'Med' },
  },
  'RAL 2004': {
    esun: { name: 'PLA+ Orange', confidence: 'Med' },
    sunlu: { name: 'PLA Orange', confidence: 'Med' },
  },
  'RAL 8017': {
    polymaker: { name: 'PolyLite PLA Brown', confidence: 'Low' },
    prusament: { name: 'PLA Chocolate Brown', confidence: 'Low' },
  },
};

/**
 * Get equivalents for a RAL code.
 * Only returns brands that have an entry (subset of all brands).
 */
export function getEquivalents(
  ralCode: string
): { brand: BrandKey; label: string; match: BrandMatch | null }[] {
  const matches = ralEquivalents[ralCode] || {};
  // Only return brands that have a match for this RAL code
  return BRAND_ORDER
    .filter((key) => matches[key] != null)
    .map((key) => ({
      brand: key,
      label: BRAND_LABELS[key],
      match: matches[key] ? { ...matches[key]!, ref: getFakeBrandRef(ralCode, key) } : null,
    }));
}
