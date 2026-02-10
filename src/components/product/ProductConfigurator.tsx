import { useState, useEffect, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product, ProductType, Maker } from '@/types';
import { mockMakers } from '@/data/mockData';
import { 
  calculateBuyerPrice, 
  calculateFullBreakdown,
  MATERIAL_SURCHARGES,
  ARTISTIC_MATERIAL_SURCHARGES,
  QUALITY_SURCHARGES,
  ARTISTIC_QUALITY_SURCHARGES,
  MIN_PRODUCT_PRICE
} from '@/lib/pricing';
import { productTypeLabels } from '@/data/categories';
import { Palette, Layers, Sparkles, Info, Printer, Building2, CreditCard, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type SizeOption = 'S' | 'M' | 'L';

interface ProductConfiguratorProps {
  product: Product;
  selectedMakerId?: string | null;
  onPriceChange?: (price: number) => void;
  onConfigChange?: (config: ConfigState) => void;
}

export interface ConfigState {
  selectedColor: string | null;
  selectedMaterial: string;
  selectedQuality: 'standard' | 'premium' | 'ultra';
  selectedSize: SizeOption;
}

// Size scaling factors
const SIZE_PRICE_FACTORS: Record<SizeOption, number> = { S: 0.75, M: 1, L: 1.35 };
const SIZE_DIM_FACTORS: Record<SizeOption, number> = { S: 0.75, M: 1, L: 1.25 };

/** Round to nearest integer ending in 0 or 5 */
export function roundDimTo5(val: number): number {
  const rounded = Math.round(val);
  const lower = Math.floor(rounded / 5) * 5;
  const upper = lower + 5;
  const dLower = Math.abs(rounded - lower);
  const dUpper = Math.abs(rounded - upper);
  return dLower <= dUpper ? lower : upper;
}

export function getSizeDimensions(
  base: { length: number; width: number; height: number; unit: string },
  size: SizeOption
) {
  const f = SIZE_DIM_FACTORS[size];
  return {
    length: roundDimTo5(base.length * f),
    width: roundDimTo5(base.width * f),
    height: roundDimTo5(base.height * f),
    unit: base.unit,
  };
}

export function hasSizeOptions(category: string): boolean {
  return !['gaming', 'repair'].includes(category);
}

// Material tooltip descriptions
const materialTooltips: Record<string, string> = {
  PLA: 'Easy to print, nice finish; less heat/impact resistant',
  ABS: 'Heat resistant, strong; requires enclosed printer',
  PETG: 'More durable; water/chemical resistant',
  Nylon: 'Very strong/tough; great for functional/wear parts',
  Resin: 'Highest detail/smooth surface; more brittle and needs post-processing',
  TPU: 'Flexible material; great for grips and shock absorption',
};

// Quality tooltip descriptions (Spanish as requested)
const qualityTooltips: Record<string, string> = {
  standard: 'FDM, 0.32 height layer',
  premium: 'FDM · 0.16 mm layer height',
  ultra: 'Resin, 0.05 height layer',
};

export function ProductConfigurator({ product, selectedMakerId, onPriceChange, onConfigChange }: ProductConfiguratorProps) {
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
  const [selectedSize, setSelectedSize] = useState<SizeOption>('M');
  
  const showSizeOptions = hasSizeOptions(product.category);
  
  // Handle Resin ↔ Ultra pairing for Artistic products
  useEffect(() => {
    if (isArtistic) {
      // If Resin is selected, auto-select Ultra
      if (selectedMaterial === 'Resin' && selectedQuality !== 'ultra') {
        setSelectedQuality('ultra');
      }
      // If Ultra is selected and material is not Resin, switch to Resin
      if (selectedQuality === 'ultra' && selectedMaterial !== 'Resin' && availableMaterials.includes('Resin')) {
        setSelectedMaterial('Resin');
      }
      // If Premium is selected, ensure material is not Resin (switch to PLA)
      if (selectedQuality === 'premium' && selectedMaterial === 'Resin') {
        setSelectedMaterial(availableMaterials.includes('PLA') ? 'PLA' : availableMaterials[0]);
      }
    }
  }, [selectedMaterial, selectedQuality, isArtistic, availableMaterials]);
  
  // Handle material change with Resin↔Ultra pairing
  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
    if (isArtistic && material === 'Resin') {
      setSelectedQuality('ultra');
    } else if (isArtistic && material !== 'Resin' && selectedQuality === 'ultra') {
      setSelectedQuality('premium');
    }
  };
  
  // Handle quality change with Resin↔Ultra pairing
  const handleQualityChange = (quality: 'standard' | 'premium' | 'ultra') => {
    setSelectedQuality(quality);
    if (isArtistic && quality === 'ultra' && selectedMaterial !== 'Resin' && availableMaterials.includes('Resin')) {
      setSelectedMaterial('Resin');
    } else if (isArtistic && quality === 'premium' && selectedMaterial === 'Resin') {
      setSelectedMaterial(availableMaterials.includes('PLA') ? 'PLA' : availableMaterials[0]);
    }
  };
  
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
  
  
  // Calculate buyer price (enforcing $15 minimum), applying size factor
  const buyerPrice = useMemo(() => {
    const calculated = calculateBuyerPrice({
      basePrice: product.price,
      material: selectedMaterial,
      quality: selectedQuality,
      isArtistic,
    });
    const sizeFactor = showSizeOptions ? SIZE_PRICE_FACTORS[selectedSize] : 1;
    return Math.max(Math.round(calculated * sizeFactor), MIN_PRODUCT_PRICE);
  }, [product.price, selectedMaterial, selectedQuality, isArtistic, selectedSize, showSizeOptions]);
  
  // Calculate full breakdown
  const breakdown = useMemo(() => {
    return calculateFullBreakdown(buyerPrice, product.productType);
  }, [buyerPrice, product.productType]);
  
  // Notify parent of price changes
  useEffect(() => {
    onPriceChange?.(buyerPrice);
    onConfigChange?.({ selectedColor, selectedMaterial, selectedQuality, selectedSize });
  }, [buyerPrice, selectedColor, selectedMaterial, selectedQuality, selectedSize, onPriceChange, onConfigChange]);
  
  // Get surcharge label for material - show "Base" for first material
  const getMaterialLabel = (material: string, index: number) => {
    if (index === 0) return 'Base';
    return null;
  };
  
  // Get surcharge label for quality - show "Base" for first quality
  const getQualityLabel = (quality: string, index: number) => {
    if (index === 0) return 'Base';
    return null;
  };
  
  // Basic (always available) colors per material
  const materialBasicColors: Record<string, string[]> = {
    PLA: ['White', 'Black', 'Grey', 'Red', 'Blue', 'Green'],
    PETG: ['White', 'Black', 'Grey'],
    ABS: ['White', 'Black', 'Grey'],
    Nylon: ['White', 'Black', 'Grey'],
    Resin: ['White', 'Grey'],
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
    'Bronze': '#CD7F32',
    'Gold': '#FFD700',
  };

  // Derive basic and optional colors for current material
  const basicColors = useMemo(() => {
    const basics = materialBasicColors[selectedMaterial] || [];
    return availableColors.filter(c => basics.includes(c));
  }, [selectedMaterial, availableColors]);

  // Derive optional colors from the selected maker's additionalColorsByMaterial
  const selectedMakerData = useMemo(() => {
    if (!selectedMakerId) return null;
    return mockMakers.find(m => m.id === selectedMakerId) || null;
  }, [selectedMakerId]);

  const optionalColors = useMemo(() => {
    if (!selectedMakerData) return [];
    const basics = materialBasicColors[selectedMaterial] || [];
    const makerAdditional = selectedMakerData.additionalColorsByMaterial?.[selectedMaterial] || [];
    // Filter out any that duplicate basic colors
    return makerAdditional.filter(c => !basics.includes(c));
  }, [selectedMaterial, selectedMakerData]);

  // Reset color when material or maker changes
  useEffect(() => {
    const allAvailable = [...basicColors, ...optionalColors];
    if (selectedColor && !allAvailable.includes(selectedColor)) {
      setSelectedColor(basicColors[0] || null);
    } else if (!selectedColor && basicColors.length > 0) {
      setSelectedColor(basicColors[0]);
    }
  }, [basicColors, optionalColors, selectedColor]);
  
  return (
    <div className="space-y-5">
      {/* Product Type Badge (read-only) */}
      <div className="flex items-center gap-2">
        <Label className="text-muted-foreground text-sm">Product Type:</Label>
        <Badge variant="secondary" className="capitalize text-xs">
          {productTypeLabels[product.productType]}
        </Badge>
      </div>
      
      {/* Color Selector */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-sm">
          <Palette className="h-4 w-4" />
          Color
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-muted-foreground cursor-help text-xs border border-muted-foreground rounded-full h-4 w-4 inline-flex items-center justify-center">ⓘ</span>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              Color may vary slightly depending on manufacturing settings and the filament manufacturer.
            </TooltipContent>
          </Tooltip>
        </Label>

        {!selectedMaterial ? (
          <p className="text-xs text-muted-foreground">Select a material to see available colors.</p>
        ) : (
          <div className="space-y-3">
            {/* Always available */}
            {basicColors.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">Always available</p>
                <div className="flex flex-wrap gap-2">
                  {basicColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "h-8 w-8 rounded-lg border-2 transition-all relative",
                        selectedColor === color
                          ? "border-secondary scale-110 shadow-md"
                          : "border-border hover:scale-105"
                      )}
                      style={{ backgroundColor: colorHexMap[color] || '#CCC' }}
                      title={color}
                    >
                      {selectedColor === color && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className={cn(
                            "h-2 w-2 rounded-full",
                            ['White', 'Clear', 'Natural', 'Pearl White', 'Yellow', 'Gold'].includes(color)
                              ? 'bg-foreground'
                              : 'bg-white'
                          )} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Optional colors */}
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                Optional colors
                {!selectedMakerId && (
                  <span className="text-xs italic text-muted-foreground/70">— To see all optional colors, select a maker.</span>
                )}
              </p>
              {selectedMakerId ? (
                optionalColors.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {optionalColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "h-8 w-8 rounded-lg border-2 transition-all relative",
                          selectedColor === color
                            ? "border-secondary scale-110 shadow-md"
                            : "border-border hover:scale-105"
                        )}
                        style={{ backgroundColor: colorHexMap[color] || '#CCC' }}
                        title={color}
                      >
                        {selectedColor === color && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className={cn(
                              "h-2 w-2 rounded-full",
                              ['White', 'Clear', 'Natural', 'Pearl White', 'Yellow', 'Gold'].includes(color)
                                ? 'bg-foreground'
                                : 'bg-white'
                            )} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">No optional colors available for this maker.</p>
                )
              ) : null}
            </div>
          </div>
        )}

        {selectedColor && (
          <p className="text-xs text-muted-foreground">Selected: {selectedColor}</p>
        )}
      </div>
      
      {/* Material Selector */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm">
          <Layers className="h-4 w-4" />
          Material
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-muted-foreground cursor-help text-xs border border-muted-foreground rounded-full h-4 w-4 inline-flex items-center justify-center">ⓘ</span>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              <div className="space-y-1.5">
                {Object.entries(materialTooltips).map(([mat, desc]) => (
                  <p key={mat}><strong>{mat}:</strong> {desc}</p>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </Label>
        <div className="flex flex-wrap gap-2">
          {availableMaterials.map((material, index) => {
            const label = getMaterialLabel(material, index);
            return (
              <Tooltip key={material}>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedMaterial === material ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => handleMaterialChange(material)}
                    className="gap-1 h-8 text-xs"
                  >
                    {material}
                    {label && <span className="text-xs opacity-70">({label})</span>}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="text-xs">
                  {materialTooltips[material] || material}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
      
      {/* Quality Selector */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4" />
          Quality
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-muted-foreground cursor-help text-xs border border-muted-foreground rounded-full h-4 w-4 inline-flex items-center justify-center">ⓘ</span>
            </TooltipTrigger>
            <TooltipContent className="text-xs">
              <div className="space-y-1">
                <p><strong>Standard:</strong> FDM, 0,32 height layer</p>
                <p><strong>Premium:</strong> FDM · 0.16 mm layer height</p>
                <p><strong>Ultra:</strong> Resin, 0,05 height layer</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </Label>
        <div className="flex flex-wrap gap-2">
          {availableQualities.map((quality, index) => {
            const label = getQualityLabel(quality, index);
            return (
              <Tooltip key={quality}>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedQuality === quality ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => handleQualityChange(quality)}
                    className="gap-1 capitalize h-8 text-xs"
                  >
                    {quality}
                    {label && <span className="text-xs opacity-70">({label})</span>}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="text-xs">
                  {qualityTooltips[quality]}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* Size Selector (not for gaming/repair) */}
      {showSizeOptions && (
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm">
            <Maximize2 className="h-4 w-4" />
            Size
          </Label>
          <div className="flex flex-wrap gap-2">
            {(['S', 'M', 'L'] as SizeOption[]).map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedSize(size)}
                className="h-8 text-xs min-w-[3rem]"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Live Price Display */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold">${buyerPrice.toFixed(2)}</span>
          <span className="text-muted-foreground text-sm">{product.currency}</span>
        </div>
        
        {/* Fees & Payout Breakdown - Amounts only, no percentages */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Info className="h-3.5 w-3.5 text-secondary" />
            Fees & Payout Breakdown
          </div>
          
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted-foreground">Buyer price</span>
              <span className="font-semibold">${breakdown.buyerPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-1.5 border-t border-border bg-accent/5 -mx-4 px-4">
              <span className="flex items-center gap-1.5 font-medium text-xs">
                <Printer className="h-3 w-3 text-accent" />
                Maker earns
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-muted-foreground cursor-help text-xs border border-muted-foreground rounded-full h-3.5 w-3.5 inline-flex items-center justify-center">ⓘ</span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">
                    This amount covers file and printer setup, supervision, support removal, basic post-processing, and quality checks before shipping.
                  </TooltipContent>
                </Tooltip>
              </span>
              <span className="font-bold text-accent text-sm">${breakdown.makerPayout.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-1">
              <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <Palette className="h-3 w-3" />
                Designer earns
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-muted-foreground cursor-help text-xs border border-muted-foreground rounded-full h-3.5 w-3.5 inline-flex items-center justify-center">ⓘ</span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">
                    Creative design license. It supports the designer and helps them keep creating new models.
                  </TooltipContent>
                </Tooltip>
              </span>
              <span className="text-xs text-primary">${breakdown.designerRoyalty.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-1">
              <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <Building2 className="h-3 w-3" />
                Platform fee
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-muted-foreground cursor-help text-xs border border-muted-foreground rounded-full h-3.5 w-3.5 inline-flex items-center justify-center">ⓘ</span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">
                    Platform service: support and mediation if issues arise, order management, and coordination between the designer and the maker. It also covers platform maintenance and development.
                  </TooltipContent>
                </Tooltip>
              </span>
              <span className="text-xs">${breakdown.platformFee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-1">
              <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <CreditCard className="h-3 w-3" />
                Payment processing
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-muted-foreground cursor-help text-xs border border-muted-foreground rounded-full h-3.5 w-3.5 inline-flex items-center justify-center">ⓘ</span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs">
                    Charged by the payment provider to process the transaction and help prevent fraud; calculated on the order total.
                  </TooltipContent>
                </Tooltip>
              </span>
              <span className="text-xs">${breakdown.paymentProcessing.toFixed(2)}</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            Product type ({productTypeLabels[product.productType]}) is set by the designer.
          </p>
        </div>
      </div>
    </div>
  );
}
