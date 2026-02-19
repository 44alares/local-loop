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
