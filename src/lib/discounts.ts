/**
 * Quantity-based discount tiers.
 * For products with minQty (e.g. 4), the "extra" quantity above minQty
 * determines the discount tier.
 */

export interface DiscountResult {
  rate: number;       // 0, 0.05, 0.08, 0.10
  label: string;      // "", "-5%", "-8%", "-10%"
  originalTotal: number;
  discountedTotal: number;
  hasDiscount: boolean;
}

/**
 * @param unitPrice   price per single unit (for set products, this is price_for_set / setOf)
 * @param quantity    total quantity selected
 * @param minQty      minimum purchase quantity (1 for normal, 4 for sets)
 */
export function getQuantityDiscount(
  unitPrice: number,
  quantity: number,
  minQty: number = 1
): DiscountResult {
  const extraUnits = quantity - minQty;
  const originalTotal = unitPrice * quantity;

  let rate = 0;
  if (extraUnits >= 3) {
    rate = 0.10;
  } else if (extraUnits === 2) {
    rate = 0.08;
  } else if (extraUnits === 1) {
    rate = 0.05;
  }

  const discountedTotal = Math.round(originalTotal * (1 - rate) * 100) / 100;

  return {
    rate,
    label: rate > 0 ? `-${Math.round(rate * 100)}%` : '',
    originalTotal: Math.round(originalTotal * 100) / 100,
    discountedTotal,
    hasDiscount: rate > 0,
  };
}
