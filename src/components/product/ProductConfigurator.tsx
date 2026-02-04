import { useState, useEffect, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product, ProductType } from '@/types';
import { 
  calculateBuyerPrice, 
  calculateFullBreakdown,
  MATERIAL_SURCHARGES,
  ARTISTIC_MATERIAL_SURCHARGES,
  QUALITY_SURCHARGES,
  ARTISTIC_QUALITY_SURCHARGES,
  DESIGNER_RATES 
} from '@/lib/pricing';
import { productTypeLabels } from '@/data/categories';
import { Palette, Layers, Sparkles, Info, Printer, Building2, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductConfiguratorProps {
  product: Product;
  onPriceChange?: (price: number) => void;
  onConfigChange?: (config: ConfigState) => void;
}

export interface ConfigState {
  selectedColor: string | null;
  selectedMaterial: string;
  selectedQuality: 'standard' | 'premium' | 'ultra';
}

export function ProductConfigurator({ product, onPriceChange, onConfigChange }: ProductConfiguratorProps) {
  const isArtistic = product.category === 'artistic';
  
  // Get available materials based on product type
  const availableMaterials = useMemo(() => {
    if (isArtistic) {
      // Artistic only allows PLA and Resin (filtered by what product supports)
      return product.materials.filter(m => ['PLA', 'Resin'].includes(m));
    }
    return product.materials;
  }, [product.materials, isArtistic]);
  
  // Get available qualities based on product type
  const availableQualities = useMemo(() => {
    if (isArtistic) {
      return product.supportedQualities.filter(q => ['premium', 'ultra'].includes(q)) as ('premium' | 'ultra')[];
    }
    return product.supportedQualities.filter(q => ['standard', 'premium'].includes(q)) as ('standard' | 'premium')[];
  }, [product.supportedQualities, isArtistic]);
  
  const [selectedMaterial, setSelectedMaterial] = useState<string>(availableMaterials[0] || 'PLA');
  const [selectedQuality, setSelectedQuality] = useState<'standard' | 'premium' | 'ultra'>(
    isArtistic ? 'premium' : (availableQualities[0] || 'standard')
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  // Get available colors based on selected material
  const availableColors = useMemo(() => {
    if (isArtistic) {
      if (selectedMaterial === 'PLA') {
        return product.availableColors.pla || product.availableColors.default || [];
      }
      if (selectedMaterial === 'Resin') {
        return product.availableColors.resin || [];
      }
    }
    return product.availableColors.default || product.availableColors.pla || [];
  }, [selectedMaterial, product.availableColors, isArtistic]);
  
  // Reset color when material changes
  useEffect(() => {
    if (availableColors.length > 0 && !availableColors.includes(selectedColor || '')) {
      setSelectedColor(availableColors[0]);
    }
  }, [availableColors, selectedColor]);
  
  // Calculate buyer price
  const buyerPrice = useMemo(() => {
    return calculateBuyerPrice({
      basePrice: product.price,
      material: selectedMaterial,
      quality: selectedQuality,
      isArtistic,
    });
  }, [product.price, selectedMaterial, selectedQuality, isArtistic]);
  
  // Calculate full breakdown
  const breakdown = useMemo(() => {
    return calculateFullBreakdown(buyerPrice, product.productType);
  }, [buyerPrice, product.productType]);
  
  // Notify parent of price changes
  useEffect(() => {
    onPriceChange?.(buyerPrice);
    onConfigChange?.({ selectedColor, selectedMaterial, selectedQuality });
  }, [buyerPrice, selectedColor, selectedMaterial, selectedQuality, onPriceChange, onConfigChange]);
  
  // Get surcharge display for material
  const getMaterialSurcharge = (material: string) => {
    const surcharge = isArtistic 
      ? ARTISTIC_MATERIAL_SURCHARGES[material] 
      : MATERIAL_SURCHARGES[material];
    if (!surcharge || surcharge === 0) return null;
    return `+${Math.round(surcharge * 100)}%`;
  };
  
  // Get surcharge display for quality
  const getQualitySurcharge = (quality: string) => {
    const surcharge = isArtistic 
      ? ARTISTIC_QUALITY_SURCHARGES[quality] 
      : QUALITY_SURCHARGES[quality];
    if (!surcharge || surcharge === 0) return null;
    return `+${Math.round(surcharge * 100)}%`;
  };
  
  // Color hex map (simplified)
  const colorHexMap: Record<string, string> = {
    'White': '#FFFFFF',
    'Black': '#1A1A1A',
    'Grey': '#808080',
    'Red': '#E53935',
    'Blue': '#1E88E5',
    'Green': '#43A047',
    'Yellow': '#FDD835',
    'Orange': '#FB8C00',
    'Purple': '#8E24AA',
    'Pink': '#D81B60',
    'Natural': '#E8DCC4',
    'Clear': '#E8F4F8',
    'Matte Black': '#2D2D2D',
    'Glossy Black': '#0A0A0A',
    'Pearl White': '#F5F5F5',
  };
  
  return (
    <div className="space-y-6">
      {/* Product Type Badge (read-only) */}
      <div className="flex items-center gap-2">
        <Label className="text-muted-foreground">Product Type:</Label>
        <Badge variant="secondary" className="capitalize">
          {productTypeLabels[product.productType]}
        </Badge>
        <span className="text-xs text-muted-foreground">
          ({Math.round(DESIGNER_RATES[product.productType] * 100)}% designer commission)
        </span>
      </div>
      
      {/* Color Selector */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Color
        </Label>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "h-10 w-10 rounded-lg border-2 transition-all relative",
                selectedColor === color 
                  ? "border-secondary scale-110 shadow-lg" 
                  : "border-border hover:scale-105"
              )}
              style={{ backgroundColor: colorHexMap[color] || '#CCC' }}
              title={color}
            >
              {selectedColor === color && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className={cn(
                    "h-3 w-3 rounded-full",
                    ['White', 'Clear', 'Natural', 'Pearl White', 'Yellow'].includes(color) 
                      ? 'bg-foreground' 
                      : 'bg-white'
                  )} />
                </span>
              )}
            </button>
          ))}
        </div>
        {selectedColor && (
          <p className="text-sm text-muted-foreground">Selected: {selectedColor}</p>
        )}
      </div>
      
      {/* Material Selector */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Layers className="h-4 w-4" />
          Material
        </Label>
        <div className="flex flex-wrap gap-2">
          {availableMaterials.map((material) => {
            const surcharge = getMaterialSurcharge(material);
            return (
              <Button
                key={material}
                variant={selectedMaterial === material ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedMaterial(material)}
                className="gap-1"
              >
                {material}
                {surcharge && (
                  <span className="text-xs opacity-70">{surcharge}</span>
                )}
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* Quality Selector */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Quality
        </Label>
        <div className="flex flex-wrap gap-2">
          {availableQualities.map((quality) => {
            const surcharge = getQualitySurcharge(quality);
            return (
              <Button
                key={quality}
                variant={selectedQuality === quality ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedQuality(quality)}
                className="gap-1 capitalize"
              >
                {quality}
                {surcharge && (
                  <span className="text-xs opacity-70">{surcharge}</span>
                )}
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* Live Price Display */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold">${buyerPrice.toFixed(2)}</span>
          <span className="text-muted-foreground">{product.currency}</span>
          {buyerPrice !== product.price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Fees & Payout Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Info className="h-4 w-4 text-secondary" />
            Fees & Payout Breakdown
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1.5 border-b border-border/50">
              <span className="text-muted-foreground">Buyer Price (total)</span>
              <span className="font-semibold">${breakdown.buyerPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-1.5">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-3.5 w-3.5" />
                Payment processing (3%)
              </span>
              <span>${breakdown.paymentProcessing.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-1.5">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                Platform fee (14%)
              </span>
              <span>${breakdown.platformFee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-1.5">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Palette className="h-3.5 w-3.5" />
                Designer royalty ({Math.round(breakdown.designerRate * 100)}%)
              </span>
              <span className="text-primary">${breakdown.designerRoyalty.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-t border-border bg-accent/5 -mx-4 px-4 rounded-b-lg">
              <span className="flex items-center gap-2 font-medium">
                <Printer className="h-3.5 w-3.5 text-accent" />
                Maker payout ({Math.round(breakdown.makerRate * 100)}%)
              </span>
              <span className="font-bold text-accent">${breakdown.makerPayout.toFixed(2)}</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            Product type ({productTypeLabels[product.productType]}) is set by the designer and cannot be changed.
          </p>
        </div>
      </div>
    </div>
  );
}