// Updated pricing engine with new commission structure
import type { ProductType } from '@/types';

// Minimum product price - no product can be below $15
export const MIN_PRODUCT_PRICE = 15;

export interface PriceBreakdown {
  basePrice: number;
  makerEarnings: number;
  platformFee: number;
  designerRoyalty: number;
  paymentGatewayFee: number;
  total: number;
}

export const COMMISSION_RATES = {
  MAKER: 0.70,           // 70% minimum - Production costs and labor (adjusted for maker minimum)
  PLATFORM: 0.14,        // 14% - Makehug service fee
  DESIGNER: 0.08,        // 8% - Base IP Royalties (Functional)
  PAYMENT_GATEWAY: 0.03, // 3% - Transaction fees
} as const;

// Designer commission rates based on product type
export const DESIGNER_RATES: Record<ProductType, number> = {
  basic: 0.08,       // 8%  (was "functional")
  functional: 0.12,  // 12% (was "hybrid")
  artistic: 0.16,    // 16%
};

// Material surcharges for non-Artistic products
export const MATERIAL_SURCHARGES: Record<string, number> = {
  PLA: 0,
  ABS: 0.10,
  PETG: 0.15,
  Nylon: 0.35,
  Resin: 0.50,
  TPU: 0.20,
};

// Material surcharges for Artistic products
export const ARTISTIC_MATERIAL_SURCHARGES: Record<string, number> = {
  PLA: 0,
  Resin: 0.25,
};

// Quality surcharges for non-Artistic products
export const QUALITY_SURCHARGES: Record<string, number> = {
  standard: 0,
  premium: 0.20,
};

// Quality surcharges for Artistic products
export const ARTISTIC_QUALITY_SURCHARGES: Record<string, number> = {
  premium: 0,
  ultra: 0.25,
};

// Multi-color surcharges by color count
export const MULTICOLOR_SURCHARGES: Record<number, number> = {
  2: 0.10,
  3: 0.15,
  4: 0.20,
};

export function getMulticolorSurcharge(colorCount: number): number {
  if (colorCount < 2) return 0;
  const clamped = Math.min(colorCount, 4);
  return MULTICOLOR_SURCHARGES[clamped] || 0;
}

export interface BuyerPriceParams {
  basePrice: number;
  material: string;
  quality: 'standard' | 'premium' | 'ultra';
  isArtistic: boolean;
  multicolorCount?: number;
}

export function calculateBuyerPrice(params: BuyerPriceParams): number {
  const { basePrice, material, quality, isArtistic, multicolorCount } = params;
  
  const materialSurcharge = isArtistic 
    ? (ARTISTIC_MATERIAL_SURCHARGES[material] ?? 0)
    : (MATERIAL_SURCHARGES[material] ?? 0);
  
  const qualitySurcharge = isArtistic
    ? (ARTISTIC_QUALITY_SURCHARGES[quality] ?? 0)
    : (QUALITY_SURCHARGES[quality] ?? 0);
  
  const multicolorSurcharge = multicolorCount ? getMulticolorSurcharge(multicolorCount) : 0;
  
  return basePrice * (1 + materialSurcharge) * (1 + qualitySurcharge) * (1 + multicolorSurcharge);
}

export interface FullPriceBreakdown {
  buyerPrice: number;
  paymentProcessing: number;
  platformFee: number;
  designerRoyalty: number;
  designerRate: number;
  makerPayout: number;
  makerRate: number;
}

// Fixed designer fee added to Basic and Functional products
export const DESIGNER_FIXED_FEE: Record<ProductType, number> = {
  basic: 1.00,
  functional: 1.00,
  artistic: 0,
};

export function calculateFullBreakdown(buyerPrice: number, productType: ProductType): FullPriceBreakdown {
  const fixedFee = DESIGNER_FIXED_FEE[productType];
  const totalBuyerPrice = buyerPrice + fixedFee;
  const designerRate = DESIGNER_RATES[productType];

  if (productType === 'basic') {
    // Basic: fixed 75% maker, 3% payment, then balance designer+platform
    const paymentProcessing = Math.round(totalBuyerPrice * 0.03 * 100) / 100;
    const makerPayout = Math.round(totalBuyerPrice * 0.75 * 100) / 100;
    const baseDesignerRoyalty = Math.round((buyerPrice * designerRate + fixedFee) * 100) / 100;
    let designerRoyalty = baseDesignerRoyalty;
    let platformFee = Math.round((totalBuyerPrice - paymentProcessing - makerPayout - designerRoyalty) * 100) / 100;

    // If platform fee went negative, reduce designer earns
    if (platformFee < 0) {
      designerRoyalty = Math.round((designerRoyalty + platformFee) * 100) / 100;
      platformFee = 0;
    }

    // Final cent adjustment on platform fee to ensure exact reconciliation
    const diff = Math.round((totalBuyerPrice - makerPayout - designerRoyalty - platformFee - paymentProcessing) * 100) / 100;
    if (diff !== 0) {
      platformFee = Math.round((platformFee + diff) * 100) / 100;
    }

    return {
      buyerPrice: totalBuyerPrice,
      paymentProcessing,
      platformFee,
      designerRoyalty,
      designerRate,
      makerPayout,
      makerRate: makerPayout / totalBuyerPrice,
    };
  }

  // Non-functional: existing logic
  const paymentProcessing = totalBuyerPrice * COMMISSION_RATES.PAYMENT_GATEWAY;
  const baseDesignerRoyalty = buyerPrice * designerRate + fixedFee;
  const basePlatformFee = totalBuyerPrice * COMMISSION_RATES.PLATFORM;
  const baseMakerPayout = totalBuyerPrice - paymentProcessing - basePlatformFee - baseDesignerRoyalty;
  const baseMakerRate = baseMakerPayout / totalBuyerPrice;

  let platformFee = basePlatformFee;
  let makerPayout = baseMakerPayout;
  let makerRate = baseMakerRate;

  if (baseMakerRate < 0.70) {
    makerRate = 0.70;
    makerPayout = totalBuyerPrice * 0.70;
    platformFee = totalBuyerPrice - paymentProcessing - baseDesignerRoyalty - makerPayout;
  }

  return {
    buyerPrice: totalBuyerPrice,
    paymentProcessing,
    platformFee,
    designerRoyalty: baseDesignerRoyalty,
    designerRate,
    makerPayout,
    makerRate,
  };
}

export function calculatePriceBreakdown(basePrice: number): PriceBreakdown {
  return {
    basePrice,
    makerEarnings: basePrice * COMMISSION_RATES.MAKER,
    platformFee: basePrice * COMMISSION_RATES.PLATFORM,
    designerRoyalty: basePrice * COMMISSION_RATES.DESIGNER,
    paymentGatewayFee: basePrice * COMMISSION_RATES.PAYMENT_GATEWAY,
    total: basePrice,
  };
}

// Material cost rates per gram for Print My Design
export const PRINT_MATERIAL_RATES: Record<string, number> = {
  PLA: 0.025,
  ABS: 0.028,
  PETG: 0.03,
  Resin: 0.045,
  Nylon: 0.05,
};

// Pricing for "Print My Design" based on file specs
export interface PrintPricingParams {
  weightGrams: number;
  printTimeMinutes: number;
  materialDensity: number; // g/cm³
  materialCostPerKg: number;
  laborRatePerHour: number;
  material?: string;
}

export function calculatePrintPrice(params: PrintPricingParams): number {
  const { weightGrams, printTimeMinutes, material } = params;
  
  const m = PRINT_MATERIAL_RATES[material || 'PLA'] || 0.025;
  
  // Weight component: grams × m
  const weightCost = weightGrams * m;
  
  // Time component: (minutes × 0.17) / 60
  const timeCost = (printTimeMinutes * 0.17) / 60;
  
  // Final price: (weightCost + timeCost) × 4 + 5
  const finalPrice = (weightCost + timeCost) * 4 + 5;
  
  return Math.ceil(finalPrice * 100) / 100;
}

// Shipping options with Zero-KM priority
export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  priority: number; // Lower = higher priority (shown first)
  isRecommended: boolean;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'direct-pickup',
    name: 'Direct Local Pickup',
    description: 'Pick up directly from the Maker — Zero emissions!',
    price: 0,
    priority: 1,
    isRecommended: true,
  },
  {
    id: 'local-point',
    name: 'Local Pickup Point',
    description: 'Pick up at a partner neighborhood shop (café, bookstore) or locker.',
    price: 2.00,
    priority: 2,
    isRecommended: false,
  },
  {
    id: 'home-delivery',
    name: 'Home Delivery',
    description: 'Delivered to your door via local courier',
    price: 5.00,
    priority: 3,
    isRecommended: false,
  },
];

export function getShippingOptions(): ShippingOption[] {
  return [...SHIPPING_OPTIONS].sort((a, b) => a.priority - b.priority);
}
