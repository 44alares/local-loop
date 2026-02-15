export interface Designer {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  totalDesigns: number;
}

export type MulticolorCapability = 'none' | 'automatic' | 'manual';

export interface MakerMulticolorConfig {
  capability: MulticolorCapability;
  maxColors: number;
  palettesReady: ('base' | 'earth' | 'accent')[];
  loadedColors?: string[];
}

export interface Maker {
  id: string;
  name: string;
  avatar: string;
  location: string;
  city: string;
  country: string;
  zipcode: string;
  rating: number;
  reviewCount: number;
  materials: string[];
  colors: string[];
  additionalColorsByMaterial?: Record<string, string[]>;
  multicolorByMaterial?: Record<string, MakerMulticolorConfig>;
  leadTime: string;
  verified: boolean;
}

export type ProductType = 'basic' | 'functional' | 'artistic';

export interface ProductColorSpec {
  pla?: string[];
  resin?: string[];
  default?: string[];
}

export type MulticolorMethod = 'automatic' | 'by-parts' | 'manual-layer';

export interface ProductMulticolorConfig {
  method: MulticolorMethod;
  recommendedPalettes: ('base' | 'earth' | 'accent')[];
  minColors: number;
  maxColors: number;
  criticalColors?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  currency: string;
  designer: Designer;
  category: ProductCategory;
  productType: ProductType;
  style: ProductStyle;
  materials: string[];
  availableColors: ProductColorSpec;
  supportedQualities: ('standard' | 'premium' | 'ultra')[];
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  leadTime: string;
  rating: number;
  reviewCount: number;
  makerCount: number;
  supports_multicolor?: boolean;
  multicolorConfig?: ProductMulticolorConfig;
}

export type ProductCategory = 'functional' | 'desktop' | 'decoration' | 'kids' | 'gaming' | 'repair' | 'artistic' | 'other';
export type ProductStyle = 'geometric' | 'colorful' | 'hybrid' | 'industrial' | 'sculptural';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  photos?: string[];
}

export interface Order {
  id: string;
  productId: string;
  makerId: string;
  buyerId: string;
  quantity: number;
  material: string;
  color: string;
  size: string;
  priceTotal: number;
  status: OrderStatus;
  orderDate: string;
  deliveryDate?: string;
}

export type OrderStatus = 'pending' | 'accepted' | 'printing' | 'qa_check' | 'ready' | 'picked_up' | 'shipped';

export interface PriceBreakdown {
  basePrice: number;
  designerRoyalty: number;
  makerMargin: number;
  platformFee: number;
  paymentFee: number;
  total: number;
}
