import { Product } from '@/types';
import {
  calculateBuyerPrice,
  calculateFullBreakdown,
  MIN_PRODUCT_PRICE,
} from '@/lib/pricing';
import { hasSizeOptions, type SizeOption } from '@/components/product/ProductConfigurator';

const SIZE_PRICE_FACTORS: Record<SizeOption, number> = { S: 0.75, M: 1, L: 1.35 };
const SIZES: SizeOption[] = ['S', 'M', 'L'];

export interface CheapestCombo {
  size: SizeOption;
  material: string;
  quality: 'standard' | 'premium' | 'ultra';
  displayPrice: number;
  rawBuyerPrice: number;
}

export function getCheapestCombo(product: Product): CheapestCombo {
  const isArtistic = product.category === 'artistic';

  const materials = isArtistic
    ? product.materials.filter(m => ['PLA', 'Resin'].includes(m))
    : product.materials;

  const qualities: ('standard' | 'premium' | 'ultra')[] = isArtistic
    ? (product.supportedQualities.filter(q => ['premium', 'ultra'].includes(q)) as any)
    : (product.supportedQualities.filter(q => ['standard', 'premium'].includes(q)) as any);

  const sizes: SizeOption[] = hasSizeOptions(product.category) ? SIZES : ['M'];

  let best: CheapestCombo | null = null;

  // Iterate in tie-break order: smallest size first, lowest quality first, first material first
  for (const size of sizes) {
    for (const quality of qualities) {
      for (const material of materials) {
        // Artistic pairing rules: Resin requires ultra, ultra requires Resin
        if (isArtistic) {
          if (material === 'Resin' && quality !== 'ultra') continue;
          if (quality === 'ultra' && material !== 'Resin') continue;
        }

        const rawPrice = calculateBuyerPrice({
          basePrice: product.price,
          material,
          quality,
          isArtistic,
        });
        const sizeFactor = SIZE_PRICE_FACTORS[size];
        const buyerPrice = Math.max(Math.round(rawPrice * sizeFactor), MIN_PRODUCT_PRICE);
        const breakdown = calculateFullBreakdown(buyerPrice, product.productType);
        const displayPrice = breakdown.buyerPrice;

        if (!best || displayPrice < best.displayPrice) {
          best = { size, material, quality, displayPrice, rawBuyerPrice: buyerPrice };
        }
      }
    }
  }

  // Fallback (should never happen)
  return best || { size: 'M', material: materials[0] || 'PLA', quality: qualities[0] || 'standard', displayPrice: product.price, rawBuyerPrice: product.price };
}
