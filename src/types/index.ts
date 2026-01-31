export interface Designer {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  totalDesigns: number;
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
  leadTime: string;
  verified: boolean;
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
  style: ProductStyle;
  materials: string[];
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
}

export type ProductCategory = 'functional' | 'desktop' | 'decoration' | 'kids' | 'gaming' | 'repair' | 'other';
export type ProductStyle = 'geometric' | 'colorful' | 'mixed' | 'industrial';

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
  designerRoyalty: number; // 8%
  makerMargin: number; // 75%
  platformFee: number; // 14%
  paymentFee: number; // 3%
  total: number;
}
