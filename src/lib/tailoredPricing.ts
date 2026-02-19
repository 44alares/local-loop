import type { TailoredParam } from '@/data/tailoredProducts';

/**
 * Compute a price multiplier based on normalized slider positions.
 * All sliders at min → 0.5x, at default → 1.0x, at max → 2.0x
 * Boolean toggles are excluded from the calculation.
 */
export function computeTailoredMultiplier(
  params: Record<string, number | boolean>,
  paramDefs: TailoredParam[]
): number {
  const numericDefs = paramDefs.filter(p => p.type !== 'toggle');
  if (numericDefs.length === 0) return 1;

  let sumNormalized = 0;
  for (const def of numericDefs) {
    const current = params[def.key] as number;
    const range = def.max - def.min;
    const normalized = range > 0 ? (current - def.min) / range : 0;
    sumNormalized += normalized;
  }

  const avgNormalized = sumNormalized / numericDefs.length;
  // Maps: 0 → 0.5, ~0.67 → 1.0, 1.0 → 2.0
  return 0.5 + avgNormalized * 1.5;
}

/* ─── Surface-area based pricing ─── */

function computeDrawerOrganizerSurface(params: Record<string, number | boolean>): number {
  const w = params.totalWidth as number;
  const d = params.totalDepth as number;
  const h = params.totalHeight as number;
  const cols = params.colDivisions as number;
  const rows = params.rowDivisions as number;
  return (
    w * d +                            // bottom
    (1 + rows) * w * h +               // front/back + h-dividers
    (1 + cols) * d * h                  // left/right + v-dividers
  );
}

function computeDrawerHandleSurface(params: Record<string, number | boolean>): number {
  const l = params.length as number;
  const t = params.thickness as number;
  const lh = params.legHeight as number;
  return (
    2 * (l * t) +                       // top bar top + bottom faces
    4 * (l * t) +                       // top bar 4 side faces approx
    2 * (2 * (t * lh) + 2 * (t * t))    // both legs surface
  );
}

function computeShelfBracketSurface(params: Record<string, number | boolean>): number {
  const lH = params.lengthH as number;
  const hV = params.heightV as number;
  const t = params.thickness as number;
  const d = params.depth as number || 30;
  const reinforcement = params.reinforcement as boolean;
  return (
    lH * d +                            // horizontal arm top face
    2 * lH * t +                        // horizontal arm front/back
    hV * d +                            // vertical arm front face
    2 * hV * t +                        // vertical arm sides
    (reinforcement
      ? Math.sqrt(lH ** 2 + hV ** 2) * 0.5 * d  // diagonal approx
      : 0)
  );
}

// Default surfaces computed at default param values
const DEFAULT_SURFACES: Record<string, number> = {
  'drawer-organizer': computeDrawerOrganizerSurface({ totalWidth: 200, totalDepth: 150, totalHeight: 40, colDivisions: 3, rowDivisions: 2 }),
  'drawer-handle': computeDrawerHandleSurface({ length: 120, thickness: 10, legHeight: 30 }),
  'shelf-bracket': computeShelfBracketSurface({ lengthH: 100, heightV: 80, thickness: 8, depth: 30, reinforcement: true }),
};

const SURFACE_FNS: Record<string, (p: Record<string, number | boolean>) => number> = {
  'drawer-organizer': computeDrawerOrganizerSurface,
  'drawer-handle': computeDrawerHandleSurface,
  'shelf-bracket': computeShelfBracketSurface,
};

/**
 * Surface-area based multiplier.
 * Above defaults: (surfaceRatio)^1.15
 * Below defaults: keep existing linear formula (0.5 + norm * 1.5)
 */
export function computeSurfaceMultiplier(
  slug: string,
  params: Record<string, number | boolean>,
  paramDefs: TailoredParam[]
): number {
  const surfaceFn = SURFACE_FNS[slug];
  const defaultSurface = DEFAULT_SURFACES[slug];

  if (!surfaceFn || !defaultSurface) {
    return computeTailoredMultiplier(params, paramDefs);
  }

  const materialSurface = surfaceFn(params);
  const surfaceRatio = materialSurface / defaultSurface;

  if (surfaceRatio >= 1) {
    return Math.pow(surfaceRatio, 1.15);
  }

  // Below default: use existing linear formula
  return computeTailoredMultiplier(params, paramDefs);
}
