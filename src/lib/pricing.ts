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
  functional: 0.08,  // 8%
  mixed: 0.12,       // 12%
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

export interface BuyerPriceParams {
  basePrice: number;
  material: string;
  quality: 'standard' | 'premium' | 'ultra';
  isArtistic: boolean;
}

export function calculateBuyerPrice(params: BuyerPriceParams): number {
  const { basePrice, material, quality, isArtistic } = params;
  
  const materialSurcharge = isArtistic 
    ? (ARTISTIC_MATERIAL_SURCHARGES[material] ?? 0)
    : (MATERIAL_SURCHARGES[material] ?? 0);
  
  const qualitySurcharge = isArtistic
    ? (ARTISTIC_QUALITY_SURCHARGES[quality] ?? 0)
    : (QUALITY_SURCHARGES[quality] ?? 0);
  
  return basePrice * (1 + materialSurcharge) * (1 + qualitySurcharge);
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

export function calculateFullBreakdown(buyerPrice: number, productType: ProductType): FullPriceBreakdown {
  const designerRate = DESIGNER_RATES[productType];
  const paymentProcessing = buyerPrice * COMMISSION_RATES.PAYMENT_GATEWAY;
  
  // Calculate maker payout ensuring minimum 70%
  const baseDesignerRoyalty = buyerPrice * designerRate;
  const basePlatformFee = buyerPrice * COMMISSION_RATES.PLATFORM;
  const baseMakerPayout = buyerPrice - paymentProcessing - basePlatformFee - baseDesignerRoyalty;
  const baseMakerRate = baseMakerPayout / buyerPrice;
  
  // If maker would get less than 70%, reduce platform fee
  let platformFee = basePlatformFee;
  let makerPayout = baseMakerPayout;
  let makerRate = baseMakerRate;
  
  if (baseMakerRate < 0.70) {
    // Adjust platform fee to ensure maker gets 70%
    makerRate = 0.70;
    makerPayout = buyerPrice * 0.70;
    platformFee = buyerPrice - paymentProcessing - baseDesignerRoyalty - makerPayout;
  }
  
  return {
    buyerPrice,
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

// Pricing for "Print My Design" based on file specs
export interface PrintPricingParams {
  weightGrams: number;
  printTimeMinutes: number;
  materialDensity: number; // g/cm³
  materialCostPerKg: number;
  laborRatePerHour: number;
}

export function calculatePrintPrice(params: PrintPricingParams): number {
  const { weightGrams, printTimeMinutes } = params;
  
  // Weight component: grams × 0.02
  const weightCost = weightGrams * 0.02;
  
  // Time component: minutes × 0.17
  const timeCost = printTimeMinutes * 0.17;
  
  // Final price: (weightCost + timeCost) × 4 + 5
  const finalPrice = (weightCost + timeCost) * 4 + 5;
  
  return Math.ceil(finalPrice * 100) / 100; // Round up to nearest cent
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
    description: 'Pick up at a partner neighborhood shop (café, bookstore)',
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
