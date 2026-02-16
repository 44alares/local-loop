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
 * Enforces a minimum of 5 brands per RAL by auto-filling from the brand universe
 * using a deterministic selection based on the RAL code hash.
 */
export function getEquivalents(
  ralCode: string
): { brand: BrandKey; label: string; match: BrandMatch }[] {
  const MIN_BRANDS = 5;
  const explicit = ralEquivalents[ralCode] || {};

  // Start with brands that have explicit entries (in fixed order)
  const result: { brand: BrandKey; label: string; match: BrandMatch }[] = [];
  const usedBrands = new Set<BrandKey>();

  for (const key of BRAND_ORDER) {
    if (explicit[key]) {
      result.push({
        brand: key,
        label: BRAND_LABELS[key],
        match: { ...explicit[key]!, ref: getFakeBrandRef(ralCode, key) },
      });
      usedBrands.add(key);
    }
  }

  // Auto-fill remaining brands deterministically until we reach MIN_BRANDS
  if (result.length < MIN_BRANDS) {
    const remaining = BRAND_ORDER.filter((k) => !usedBrands.has(k));
    // Deterministic shuffle based on RAL code
    const h = hashCode(ralCode);
    const sorted = remaining.sort((a, b) => {
      const ha = hashCode(`${ralCode}::fill::${a}`) % 1000;
      const hb = hashCode(`${ralCode}::fill::${b}`) % 1000;
      return ha - hb;
    });

    for (const key of sorted) {
      if (result.length >= MIN_BRANDS) break;
      result.push({
        brand: key,
        label: BRAND_LABELS[key],
        match: {
          name: `PLA ${BRAND_LABELS[key]}`,
          ref: getFakeBrandRef(ralCode, key),
          confidence: 'Low' as const,
        },
      });
    }
  }

  // Re-sort result into the canonical BRAND_ORDER
  return result.sort(
    (a, b) => BRAND_ORDER.indexOf(a.brand) - BRAND_ORDER.indexOf(b.brand)
  );
}
