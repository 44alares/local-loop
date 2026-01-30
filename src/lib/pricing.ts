// Updated pricing engine with new commission structure
export interface PriceBreakdown {
  basePrice: number;
  makerEarnings: number;      // 75%
  platformFee: number;        // 14%
  designerRoyalty: number;    // 8%
  paymentGatewayFee: number;  // 3%
  total: number;
}

export const COMMISSION_RATES = {
  MAKER: 0.75,           // 75% - Production costs and labor
  PLATFORM: 0.14,        // 14% - Makehug service fee
  DESIGNER: 0.08,        // 8% - IP Royalties
  PAYMENT_GATEWAY: 0.03, // 3% - Transaction fees
} as const;

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
  const {
    weightGrams,
    printTimeMinutes,
    materialCostPerKg,
    laborRatePerHour,
  } = params;
  
  // Material cost
  const materialCost = (weightGrams / 1000) * materialCostPerKg;
  
  // Labor cost (based on print time + setup)
  const setupTimeHours = 0.25; // 15 min setup
  const printTimeHours = printTimeMinutes / 60;
  const laborCost = (setupTimeHours + printTimeHours) * laborRatePerHour;
  
  // Machine depreciation (roughly $0.02 per minute of print time)
  const machineCost = printTimeMinutes * 0.02;
  
  // Base production cost
  const productionCost = materialCost + laborCost + machineCost;
  
  // Apply markup to ensure maker gets 75% margin
  // Final price = productionCost / 0.75
  const finalPrice = productionCost / COMMISSION_RATES.MAKER;
  
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
    price: 2.50,
    priority: 2,
    isRecommended: false,
  },
  {
    id: 'home-delivery',
    name: 'Home Delivery',
    description: 'Delivered to your door via local courier',
    price: 8.00,
    priority: 3,
    isRecommended: false,
  },
];

export function getShippingOptions(): ShippingOption[] {
  return [...SHIPPING_OPTIONS].sort((a, b) => a.priority - b.priority);
}
