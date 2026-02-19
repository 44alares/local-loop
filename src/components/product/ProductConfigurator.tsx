import { useState, useEffect, useMemo, useCallback } from 'react';
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
  MIN_PRODUCT_PRICE,
  getMulticolorSurcharge,
} from '@/lib/pricing';
import { getCheapestCombo } from '@/lib/cheapestCombo';
import { productTypeLabels } from '@/data/categories';
import { getAvailablePalettes, multicolorHexMap, type PaletteId } from '@/data/multicolorPalettes';
import { PaletteInfoTooltip } from '@/components/PaletteInfoTooltip';
import { getBasicColorNames, materialSupportsMulticolor } from '@/data/materialsConfig';
import { Palette, Layers, Sparkles, Info, Printer, Building2, CreditCard, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type SizeOption = 'S' | 'M' | 'L';
export type ColorMode = 'single' | 'multi';

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
  colorMode?: ColorMode;
  multicolorCount?: number;
  multicolorPalette?: string;
  multicolorColors?: string[];
  colorMatchPreference?: 'close' | 'exact';
  multicolorSurchargeAmount?: number;
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
  TPU: 'TPU Flexible is a durable, firm-flex material (TPU 95A class). Ideal for grips, bumpers, and impact-resistant parts. +20% surcharge over PLA Base. Available in Standard and Premium. Color availability depends on local maker stock.',
};

// Quality tooltip descriptions
const qualityTooltips: Record<string, string> = {
  standard: 'FDM, 0.32 height layer',
  premium: 'FDM · 0.16 mm layer height',
  ultra: 'Resin, 0.05 height layer',
};

// Color hex map
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
  'Beige': '#D4C5A9',
  'Brown': '#795548',
};

// Breakdown row config
const breakdownRowConfig = [
  {
    key: 'maker',
    label: 'Maker earns',
    icon: Printer,
    iconClass: 'text-accent',
    tooltip: 'This amount covers file and printer setup, supervision, support removal, basic post-processing, and quality checks before shipping.',
    getValue: (b: ReturnType<typeof calculateFullBreakdown>) => b.makerPayout,
    rowClass: 'py-1.5 border-t border-border bg-accent/5 -mx-4 px-4',
    valueClass: 'font-bold text-accent text-sm',
    labelClass: 'font-medium text-xs',
  },
  {
    key: 'designer',
    label: 'Designer earns',
    icon: Palette,
    iconClass: '',
    tooltip: 'Creative design license. It supports the designer and helps them keep creating new models.',
    getValue: (b: ReturnType<typeof calculateFullBreakdown>) => b.designerRoyalty,
    rowClass: 'py-1',
    valueClass: 'text-xs text-primary',
    labelClass: 'text-muted-foreground text-xs',
  },
  {
    key: 'platform',
    label: 'Platform fee',
    icon: Building2,
    iconClass: '',
    tooltip: 'Platform service: support and mediation if issues arise, order management, and coordination between the designer and the maker. It also covers platform maintenance and development.',
    getValue: (b: ReturnType<typeof calculateFullBreakdown>) => b.platformFee,
    rowClass: 'py-1',
    valueClass: 'text-xs',
    labelClass: 'text-muted-foreground text-xs',
  },
  {
    key: 'payment',
    label: 'Payment processing',
    icon: CreditCard,
    iconClass: '',
    tooltip: 'Charged by the payment provider to process the transaction and help prevent fraud; calculated on the order total.',
    getValue: (b: ReturnType<typeof calculateFullBreakdown>) => b.paymentProcessing,
    rowClass: 'py-1',
    valueClass: 'text-xs',
    labelClass: 'text-muted-foreground text-xs',
  },
] as const;

export function BreakdownRows({ breakdown, productType, multicolorSurchargeAmount, quantity = 1, displayTotal }: { breakdown: ReturnType<typeof calculateFullBreakdown>; productType: string; multicolorSurchargeAmount?: number; quantity?: number; displayTotal?: number }) {
  const [openRow, setOpenRow] = useState<string | null>(null);
  const q = quantity;
  const shownTotal = displayTotal != null ? displayTotal : (breakdown.buyerPrice * q);

  return (
    <div className="space-y-1.5 text-sm w-full max-w-full">
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '8px' }} className="py-1 border-b border-border/50">
        <span className="text-stone-100" style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>Total price</span>
        <span className="font-semibold text-stone-100" style={{ flexShrink: 0, textAlign: 'right', whiteSpace: 'nowrap' }}>{shownTotal.toFixed(2)}</span>
      </div>

      {multicolorSurchargeAmount != null && multicolorSurchargeAmount > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '8px' }} className="py-1 border-b border-border/50">
          <span className="text-muted-foreground text-xs flex items-center gap-1" style={{ flex: 1, minWidth: 0 }}>
            <Palette className="h-3 w-3" />
            Multi-color +30%
          </span>
          <span className="text-xs font-medium" style={{ flexShrink: 0, textAlign: 'right', whiteSpace: 'nowrap' }}>{multicolorSurchargeAmount.toFixed(2)}</span>
        </div>
      )}

      {breakdownRowConfig.map((row) => {
        const IconComp = row.icon;
        const value = row.getValue(breakdown);
        return (
          <div key={row.key} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '8px' }} className={row.rowClass}>
            <Popover open={openRow === row.key} onOpenChange={(open) => setOpenRow(open ? row.key : null)}>
              <PopoverTrigger asChild>
                <button type="button" className={`flex items-center gap-1.5 ${row.labelClass} cursor-pointer hover:text-foreground transition-colors`} style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <IconComp className={`h-3 w-3 shrink-0 ${row.iconClass}`} />
                  {row.label}
                  <span className="text-muted-foreground text-xs border border-muted-foreground rounded-full h-3.5 w-3.5 inline-flex items-center justify-center shrink-0">ⓘ</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="max-w-xs text-xs z-[100]" side="top" align="start">
                {row.tooltip}
              </PopoverContent>
            </Popover>
            <span className={row.valueClass} style={{ flexShrink: 0, textAlign: 'right', whiteSpace: 'nowrap' }}>{(value * q).toFixed(2)}</span>
          </div>
        );
      })}
    </div>
  );
}

export function ProductConfigurator({ product, selectedMakerId, onPriceChange, onConfigChange }: ProductConfiguratorProps) {
  const isArtistic = product.category === 'artistic';
  const supportsMulticolor = product.supports_multicolor === true;
  
  // Get available materials based on product type
  const availableMaterials = useMemo(() => {
    if (isArtistic) {
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
  
  const cheapest = useMemo(() => getCheapestCombo(product), [product]);

  // Default to PLA if both PLA and Resin are available
  const defaultMaterial = useMemo(() => {
    if (availableMaterials.includes('PLA')) return 'PLA';
    return cheapest.material;
  }, [availableMaterials, cheapest.material]);
  
  const [selectedMaterial, setSelectedMaterial] = useState<string>(defaultMaterial);
  const [selectedQuality, setSelectedQuality] = useState<'standard' | 'premium' | 'ultra'>(cheapest.quality);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeOption>(cheapest.size);
  
  // Multi-color state
  const [colorMode, setColorMode] = useState<ColorMode>('single');
  const [multicolorPalette, setMulticolorPalette] = useState<PaletteId>('base');
  const [multicolorCount, setMulticolorCount] = useState<number>(2);
  const [multicolorColors, setMulticolorColors] = useState<string[]>([]);
  const [colorMatchPreference, setColorMatchPreference] = useState<'close' | 'exact'>('close');
  
  const showSizeOptions = hasSizeOptions(product.category);

  // Resin disables multi-color: force single when Resin is selected
  const isResin = selectedMaterial === 'Resin';
  const canShowMulticolor = supportsMulticolor && !isResin && materialSupportsMulticolor(selectedMaterial);

  // When material changes to Resin, force single color and clear multi-color state
  useEffect(() => {
    if (isResin && colorMode === 'multi') {
      setColorMode('single');
      setMulticolorPalette('base');
      setMulticolorCount(2);
      setMulticolorColors([]);
      setColorMatchPreference('close');
    }
  }, [isResin]); // Only trigger on material change to Resin
  
  // Get selected maker data
  const selectedMakerData = useMemo(() => {
    if (!selectedMakerId) return null;
    return mockMakers.find(m => m.id === selectedMakerId) || null;
  }, [selectedMakerId]);

  // Available palettes for current material and maker
  const availablePalettes = useMemo(() => {
    const makerConfig = selectedMakerData?.multicolorByMaterial?.[selectedMaterial];
    const makerPalettes = makerConfig?.palettesReady;
    return getAvailablePalettes(selectedMaterial, makerPalettes);
  }, [selectedMaterial, selectedMakerData]);

  // Current palette colors
  const currentPaletteColors = useMemo(() => {
    const palette = availablePalettes.find(p => p.id === multicolorPalette);
    return palette?.colors || [];
  }, [availablePalettes, multicolorPalette]);

  // Reset palette when material changes
  useEffect(() => {
    if (availablePalettes.length > 0 && !availablePalettes.find(p => p.id === multicolorPalette)) {
      setMulticolorPalette(availablePalettes[0].id);
    }
  }, [availablePalettes, multicolorPalette]);

  // Reset multicolor colors when palette or count changes
  useEffect(() => {
    if (colorMode === 'multi') {
      const clamped = Math.min(multicolorCount, currentPaletteColors.length);
      setMulticolorColors(currentPaletteColors.slice(0, clamped));
    }
  }, [multicolorPalette, multicolorCount, currentPaletteColors, colorMode]);
  
  // Handle Resin ↔ Ultra pairing for Artistic products
  useEffect(() => {
    if (isArtistic) {
      if (selectedMaterial === 'Resin' && selectedQuality !== 'ultra') {
        setSelectedQuality('ultra');
      }
      if (selectedQuality === 'ultra' && selectedMaterial !== 'Resin' && availableMaterials.includes('Resin')) {
        setSelectedMaterial('Resin');
      }
      if (selectedQuality === 'premium' && selectedMaterial === 'Resin') {
        setSelectedMaterial(availableMaterials.includes('PLA') ? 'PLA' : availableMaterials[0]);
      }
    }
  }, [selectedMaterial, selectedQuality, isArtistic, availableMaterials]);
  
  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
    if (isArtistic && material === 'Resin') {
      setSelectedQuality('ultra');
    } else if (isArtistic && material !== 'Resin' && selectedQuality === 'ultra') {
      setSelectedQuality('premium');
    }
  };
  
  const handleQualityChange = (quality: 'standard' | 'premium' | 'ultra') => {
    setSelectedQuality(quality);
    if (isArtistic && quality === 'ultra' && selectedMaterial !== 'Resin' && availableMaterials.includes('Resin')) {
      setSelectedMaterial('Resin');
    } else if (isArtistic && quality === 'premium' && selectedMaterial === 'Resin') {
      setSelectedMaterial(availableMaterials.includes('PLA') ? 'PLA' : availableMaterials[0]);
    }
  };

  // Basic colors from shared materialsConfig (single source of truth for all product pages)
  const basicColors = useMemo(() => {
    return getBasicColorNames(selectedMaterial);
  }, [selectedMaterial]);

  // Derive optional colors from the selected maker
  const optionalColors = useMemo(() => {
    if (!selectedMakerData) return [];
    const basics = getBasicColorNames(selectedMaterial);
    const makerAdditional = selectedMakerData.additionalColorsByMaterial?.[selectedMaterial] || [];
    return makerAdditional.filter(c => !basics.includes(c));
  }, [selectedMaterial, selectedMakerData]);

  // Effective available colors = basicColors ∪ optionalColors (maker-dependent)
  const effectiveAvailableColors = useMemo(() => {
    return [...basicColors, ...optionalColors];
  }, [basicColors, optionalColors]);

  // Auto-reset color when material, maker, or color mode changes
  useEffect(() => {
    if (colorMode === 'single') {
      if (selectedColor && !effectiveAvailableColors.includes(selectedColor)) {
        setSelectedColor(basicColors[0] || null);
      } else if (!selectedColor && basicColors.length > 0) {
        setSelectedColor(basicColors[0]);
      }
    }
  }, [basicColors, effectiveAvailableColors, selectedColor, colorMode]);

  // Multi-color: flat 30% when in multi mode
  const effectiveMulticolorCount = (colorMode === 'multi' && !isResin) ? multicolorCount : 0;
  const multicolorSurchargeRate = getMulticolorSurcharge(effectiveMulticolorCount);
  
  // Calculate buyer price
  const buyerPrice = useMemo(() => {
    const calculated = calculateBuyerPrice({
      basePrice: product.price,
      material: selectedMaterial,
      quality: selectedQuality,
      isArtistic,
      multicolorCount: effectiveMulticolorCount,
    });
    const sizeFactor = showSizeOptions ? SIZE_PRICE_FACTORS[selectedSize] : 1;
    return Math.max(Math.round(calculated * sizeFactor), MIN_PRODUCT_PRICE);
  }, [product.price, selectedMaterial, selectedQuality, isArtistic, selectedSize, showSizeOptions, effectiveMulticolorCount]);

  // Price without multicolor (for calculating surcharge amount)
  const basePriceWithoutMulticolor = useMemo(() => {
    const calculated = calculateBuyerPrice({
      basePrice: product.price,
      material: selectedMaterial,
      quality: selectedQuality,
      isArtistic,
      multicolorCount: 0,
    });
    const sizeFactor = showSizeOptions ? SIZE_PRICE_FACTORS[selectedSize] : 1;
    return Math.max(Math.round(calculated * sizeFactor), MIN_PRODUCT_PRICE);
  }, [product.price, selectedMaterial, selectedQuality, isArtistic, selectedSize, showSizeOptions]);

  const multicolorSurchargeAmount = buyerPrice - basePriceWithoutMulticolor;
  
  const breakdown = useMemo(() => {
    return calculateFullBreakdown(buyerPrice, product.productType);
  }, [buyerPrice, product.productType]);
  
  const displayPrice = breakdown.buyerPrice;
  
  // Notify parent of price changes
  useEffect(() => {
    onPriceChange?.(buyerPrice);
    onConfigChange?.({ 
      selectedColor: colorMode === 'single' ? selectedColor : null, 
      selectedMaterial, 
      selectedQuality, 
      selectedSize,
      colorMode: isResin ? 'single' : colorMode,
      multicolorCount: (colorMode === 'multi' && !isResin) ? multicolorCount : undefined,
      multicolorPalette: (colorMode === 'multi' && !isResin) ? multicolorPalette : undefined,
      multicolorColors: (colorMode === 'multi' && !isResin) ? multicolorColors : undefined,
      colorMatchPreference: (colorMode === 'multi' && !isResin) ? colorMatchPreference : undefined,
      multicolorSurchargeAmount: (colorMode === 'multi' && !isResin) ? multicolorSurchargeAmount : undefined,
    });
  }, [displayPrice, selectedColor, selectedMaterial, selectedQuality, selectedSize, colorMode, multicolorCount, multicolorPalette, multicolorColors, colorMatchPreference, isResin, onPriceChange, onConfigChange, multicolorSurchargeAmount]);
  
  const getMaterialLabel = (material: string, index: number) => {
    if (index === 0) return 'Base';
    return null;
  };
  
  const getQualityLabel = (quality: string, index: number) => {
    if (index === 0) return 'Base';
    return null;
  };

  const handleMulticolorColorChange = (index: number, color: string) => {
    setMulticolorColors(prev => {
      const next = [...prev];
      next[index] = color;
      return next;
    });
  };
  
  return (
    <div className="space-y-5">
      {/* Product Type Badge (read-only) */}
      <div className="flex items-center gap-2">
        <Label className="text-muted-foreground text-sm">Product Type:</Label>
        <Badge variant="secondary" className="capitalize text-xs">
          {productTypeLabels[product.productType]}
        </Badge>
      </div>

      {/* Material Selector */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm">
          <Popover>
            <PopoverTrigger asChild>
              <button type="button" className="inline-flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors">
                <Layers className="h-4 w-4" />
                Material
                <span className="text-muted-foreground text-xs border border-muted-foreground rounded-full h-4 w-4 inline-flex items-center justify-center">ⓘ</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="max-w-xs text-xs z-[100]" side="top" align="start">
              <div className="space-y-1.5">
                {Object.entries(materialTooltips).map(([mat, desc]) => (
                  <p key={mat}><strong>{mat}:</strong> {desc}</p>
                ))}
              </div>
            </PopoverContent>
          </Popover>
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
          <Popover>
            <PopoverTrigger asChild>
              <button type="button" className="inline-flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors">
                <Sparkles className="h-4 w-4" />
                Quality
                <span className="text-muted-foreground text-xs border border-muted-foreground rounded-full h-4 w-4 inline-flex items-center justify-center">ⓘ</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="max-w-xs text-xs z-[100]" side="top" align="start">
              <div className="space-y-1">
                <p><strong>Standard:</strong> FDM, 0,32 height layer</p>
                <p><strong>Premium:</strong> FDM · 0.16 mm layer height</p>
                <p><strong>Ultra:</strong> Resin, 0,05 height layer</p>
              </div>
            </PopoverContent>
          </Popover>
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

      {/* Size Selector (not for gaming/repair, not for tailored) */}
      {showSizeOptions && !product.id?.startsWith('tailored') && (
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

      {/* TPU surcharge note */}
      {selectedMaterial === 'TPU' && (
        <p className="text-xs text-accent font-medium px-1">
          TPU Flexible adds a +20% surcharge over PLA Base.
        </p>
      )}

      {/* Color Mode Toggle (only for multicolor products with compatible material) */}
      {supportsMulticolor && (
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm">
            <Palette className="h-4 w-4" />
            Color mode
          </Label>
          {isResin ? (
            <div className="space-y-1">
              <Button variant="secondary" size="sm" className="h-8 text-xs" disabled>
                Single color
              </Button>
              <p className="text-xs text-muted-foreground">Multi-color is not available for Resin.</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                variant={colorMode === 'single' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setColorMode('single')}
                className="h-8 text-xs"
              >
                Single color
              </Button>
              <Button
                variant={colorMode === 'multi' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setColorMode('multi')}
                className="h-8 text-xs"
              >
                Multi-color
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Single Color Selector */}
      {colorMode === 'single' && (
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm">
            <Popover>
              <PopoverTrigger asChild>
                <button type="button" className="inline-flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors">
                  <Palette className="h-4 w-4" />
                  Color
                  <span className="text-muted-foreground text-xs border border-muted-foreground rounded-full h-4 w-4 inline-flex items-center justify-center">ⓘ</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="max-w-xs text-xs z-[100]" side="top" align="start">
                Color may vary slightly depending on manufacturing settings and the filament manufacturer.
              </PopoverContent>
            </Popover>
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
                            ? "border-secondary ring-2 ring-secondary/40 shadow-md"
                            : "border-border hover:ring-2 hover:ring-secondary/20"
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
                              ? "border-secondary ring-2 ring-secondary/40 shadow-md"
                              : "border-border hover:ring-2 hover:ring-secondary/20"
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
      )}

      {/* Multi-color Selector */}
      {colorMode === 'multi' && canShowMulticolor && (
        <div className="space-y-3 p-3 rounded-lg border border-secondary/30 bg-secondary/5">
          <Label className="flex items-center gap-2 text-sm font-semibold">
            <Palette className="h-4 w-4 text-secondary" />
            Multi-color Setup
          </Label>

          {/* Palette selector */}
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              {selectedMakerId ? 'Palettes available from this Maker' : 'Base palette (default)'} <PaletteInfoTooltip />
            </p>
            <div className="flex flex-wrap gap-2">
              {availablePalettes.map((palette) => {
                const displayColors = product.paletteDisplayColors?.[palette.id]
                  ?? palette.colors.slice(0, 4);
                const extraCount = palette.colors.length - displayColors.length;
                return (
                  <button
                    key={palette.id}
                    type="button"
                    onClick={() => setMulticolorPalette(palette.id)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-lg border transition-colors text-left",
                      multicolorPalette === palette.id
                        ? "border-secondary bg-secondary/10"
                        : "border-border hover:border-secondary/50"
                    )}
                  >
                    <div className="flex gap-0.5 shrink-0">
                      {displayColors.slice(0, 4).map((c) => (
                        <span
                          key={c}
                          className="h-4 w-4 rounded-full border border-border"
                          style={{ backgroundColor: colorHexMap[c] || multicolorHexMap[c] || '#CCC' }}
                          title={c}
                        />
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">{palette.label}</span>
                      {extraCount > 0 && (
                        <span className="text-[10px] text-muted-foreground">+{extraCount} more</span>
                      )}
                    </div>
                    {palette.required && <span className="text-[10px] opacity-60">(default)</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {!selectedMakerId && (
            <p className="text-xs text-muted-foreground italic">
              Want more color options? Select a Maker first.
            </p>
          )}

          {selectedMakerId && availablePalettes.length === 0 && (
            <p className="text-xs text-muted-foreground italic">
              This Maker doesn't offer multi-color for this product. Choose another Maker or switch to Single color.
            </p>
          )}

          <p className="text-xs text-muted-foreground italic">
            Multi-color depends on local maker availability.
          </p>
        </div>
      )}
    </div>
  );
}
