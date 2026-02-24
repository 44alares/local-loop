import { useState, useMemo } from 'react';
import StlPreview from '@/components/StlPreview';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Upload, Settings, Calculator, Printer, Building2, Palette, CreditCard, Info } from 'lucide-react';
import type { ProductType } from '@/types';

// ── Tooltip helper (supports JSX children for line breaks) ──
const InfoTooltip = ({ children, text }: { children?: React.ReactNode; text?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className="text-muted-foreground cursor-pointer">
          <span className="text-xs border border-muted-foreground rounded-full h-4 w-4 inline-flex items-center justify-center">ⓘ</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs text-xs z-[100]" side="top" align="start">
        {children ?? text}
      </PopoverContent>
    </Popover>
  );
};

// ── Internal multipliers (never shown in UI) ────────────────
const MATERIAL_MULTIPLIERS: Record<string, number> = {
  PLA: 1.00,
  PETG: 1.10,
  ABS: 1.15,
  TPU: 1.20,
  Nylon: 1.50,
  Resin: 1.80,
};

const PRODUCT_TYPE_MULTIPLIERS: Record<ProductType, number> = {
  basic: 1.00,
  functional: 1.05,
  artistic: 1.10,
};

const QUALITY_MULTIPLIERS: Record<string, number> = {
  standard: 1.00,
  premium: 1.15,
  ultra: 1.00, // Ultra is driven by Resin 1.80, no extra multiplier
};

// ── Breakdown row rendering config ──────────────────────────
const breakdownRowConfig = [
  {
    key: 'maker',
    label: 'Maker earns',
    icon: Printer,
    iconClass: 'text-accent',
    tooltip: 'This amount covers file and printer setup, supervision, support removal, basic post-processing, and quality checks before shipping.',
    rowClass: 'py-1.5 border-t border-border bg-accent/5 -mx-4 px-4',
    valueClass: 'font-bold text-accent text-sm',
    labelClass: 'font-medium text-xs',
  },
  {
    key: 'designer',
    label: 'Designer earns',
    icon: Palette,
    iconClass: 'text-muted-foreground',
    tooltip: 'Creative design license. It supports the designer and helps them keep creating new models.',
    rowClass: 'py-1',
    valueClass: 'text-xs text-muted-foreground',
    labelClass: 'text-muted-foreground text-xs',
  },
  {
    key: 'platform',
    label: 'Platform fee',
    icon: Building2,
    iconClass: 'text-muted-foreground',
    tooltip: 'Platform service: support and mediation if issues arise, order management, and coordination between the designer and the maker. It also covers platform maintenance and development.',
    rowClass: 'py-1',
    valueClass: 'text-xs text-muted-foreground',
    labelClass: 'text-muted-foreground text-xs',
  },
  {
    key: 'payment',
    label: 'Payment processing',
    icon: CreditCard,
    iconClass: 'text-muted-foreground',
    tooltip: 'Charged by the payment provider to process the transaction and help prevent fraud; calculated on the order total.',
    rowClass: 'py-1',
    valueClass: 'text-xs text-muted-foreground',
    labelClass: 'text-muted-foreground text-xs',
  },
] as const;

// ── Component ───────────────────────────────────────────────
export default function FeesAndPayoutBreakdown() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [productType, setProductType] = useState<ProductType>('basic');
  const [partCount, setPartCount] = useState('1');
  const [hasSupports, setHasSupports] = useState(false);
  const [estimatedWeight, setEstimatedWeight] = useState('');
  const [estimatedPrintTime, setEstimatedPrintTime] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('PLA');
  const [selectedQuality, setSelectedQuality] = useState<'standard' | 'premium' | 'ultra'>('standard');
  const [supportsMulticolor, setSupportsMulticolor] = useState(false);

  const availableMaterials = ['PLA', 'PETG', 'ABS', 'TPU', 'Nylon', 'Resin'];

  // ── Handlers with strict Ultra ↔ Resin coupling ──────────
  const handleMaterialChange = (mat: string) => {
    setSelectedMaterial(mat);
    if (mat === 'Resin') {
      setSelectedQuality('ultra');
    } else if (selectedQuality === 'ultra') {
      setSelectedQuality('premium');
    }
    if (mat === 'Resin' && supportsMulticolor) setSupportsMulticolor(false);
  };

  const handleQualityChange = (q: 'standard' | 'premium' | 'ultra') => {
    if (q === 'ultra') {
      // Selecting Ultra forces material to Resin
      setSelectedQuality('ultra');
      setSelectedMaterial('Resin');
      if (supportsMulticolor) setSupportsMulticolor(false);
      return;
    }
    setSelectedQuality(q);
    setSelectedQuality(q);
  };

  const handleProductTypeChange = (pt: ProductType) => {
    setProductType(pt);
  };

  // ── Surcharges ────────────────────────────────────────────
  const partCountNum = parseInt(partCount) || 1;
  const partCountSurcharge = partCountNum >= 4 ? 0.15 : partCountNum >= 3 ? 0.10 : partCountNum >= 2 ? 0.05 : 0;
  const supportsSurcharge = hasSupports ? 0.10 : 0;
  const totalSurcharge = partCountSurcharge + supportsSurcharge;

  // ── Pricing calculation (new baseline from Maker earns) ───
  const breakdown = useMemo(() => {
    const W = parseFloat(estimatedWeight);
    const T = parseFloat(estimatedPrintTime);
    if (!W || !T || W <= 0 || T <= 0) return null;

    // Baseline (Basic + Standard + PLA)
    const baseMakerEarns = (((W * 0.02) + ((T * 0.17) / 60)) * 4) + 6;
    const baseTotalPrice = baseMakerEarns / 0.75;
    const baseDesignerEarns = baseTotalPrice * 0.12;
    const basePaymentProcessing = baseTotalPrice * 0.03;
    // basePlatformFee = baseTotalPrice * 0.10 (implicit, used via total)

    // Combined multiplier
    const M =
      (PRODUCT_TYPE_MULTIPLIERS[productType] ?? 1) *
      (MATERIAL_MULTIPLIERS[selectedMaterial] ?? 1) *
      (QUALITY_MULTIPLIERS[selectedQuality] ?? 1);

    // Surcharges multiplier
    const S = (1 + totalSurcharge) * (supportsMulticolor ? 1.30 : 1);

    const totalM = M * S;

    // Final values in cents
    const totalCents = Math.round(baseTotalPrice * totalM * 100);
    const makerCents = Math.round(baseMakerEarns * totalM * 100);
    let designerCents = Math.round(baseDesignerEarns * totalM * 100);
    const paymentCents = Math.round(basePaymentProcessing * totalM * 100);

    // Platform fee is the balancing line
    let platformCents = totalCents - makerCents - designerCents - paymentCents;

    // Clamp: never negative
    if (platformCents < 0) {
      // Reduce designer minimally
      const deficit = -platformCents;
      designerCents = Math.max(0, designerCents - deficit);
      platformCents = totalCents - makerCents - designerCents - paymentCents;
    }

    return {
      total: totalCents / 100,
      maker: makerCents / 100,
      designer: designerCents / 100,
      platform: platformCents / 100,
      payment: paymentCents / 100,
    };
  }, [estimatedWeight, estimatedPrintTime, selectedMaterial, selectedQuality, totalSurcharge, supportsMulticolor, productType]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  const breakdownValues = breakdown
    ? { maker: breakdown.maker, designer: breakdown.designer, platform: breakdown.platform, payment: breakdown.payment }
    : null;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-10 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-3">Transparency</Badge>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">Fees &amp; Payout Breakdown</h1>
            <p className="text-muted-foreground">
              See how revenue is split between makers, designers, and the platform. Enter your print details to get a live estimate.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left: Configuration */}
            <div className="lg:col-span-3 space-y-5">

              {/* 1) Design File Upload */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Upload className="h-4 w-4 text-secondary" />
                    Design File Upload
                  </CardTitle>
                  <CardDescription className="text-xs">Supported formats: STL, 3MF</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-secondary transition-colors">
                    <input type="file" accept=".stl,.3mf" onChange={handleFileUpload} className="hidden" id="file-upload-fees" />
                    <label htmlFor="file-upload-fees" className="cursor-pointer">
                      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                      {uploadedFile ? (
                        <p className="font-medium text-secondary text-sm">{uploadedFile.name}</p>
                      ) : (
                        <>
                          <p className="font-medium text-sm mb-1">Drop your STL/3MF here or click to browse</p>
                          <p className="text-xs text-muted-foreground">Maximum file size: 100MB</p>
                        </>
                      )}
                    </label>
                  </div>
                  {uploadedFile && uploadedFile.name.toLowerCase().endsWith('.stl') && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs text-muted-foreground">Drag to rotate · Scroll to zoom</p>
                      <StlPreview file={uploadedFile} />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 2) Product Type */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Settings className="h-4 w-4 text-secondary" />
                    Product Type
                    <InfoTooltip>
                      <div className="space-y-1.5">
                        <p><strong>Basic:</strong> simple items that don't need precise fit, special materials, or extra strength/heat resistance (desk organizers, basic holders, non-critical accessories).</p>
                        <p><strong>Functional:</strong> parts where fit, tolerances, and durability matter (tools, replacements, brackets, mounts, adapters).</p>
                        <p><strong>Artistic:</strong> aesthetic/collectible pieces where surface finish and detail are the priority (figures, sculptures, display pieces).</p>
                        <p className="text-muted-foreground italic">Functional and Artistic objects always require manual team validation before publishing.</p>
                      </div>
                    </InfoTooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {(['basic', 'functional', 'artistic'] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleProductTypeChange(option)}
                        className={`p-2.5 rounded-lg border-2 text-sm font-medium capitalize transition-all ${
                          productType === option
                            ? 'border-secondary bg-secondary/10 text-secondary'
                            : 'border-border hover:border-secondary/50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {productType === 'basic' && "Simple items that don't need precise fit or special materials."}
                    {productType === 'functional' && 'Parts where fit, tolerances, and durability matter.'}
                    {productType === 'artistic' && 'Aesthetic/collectible pieces where surface finish and detail are the priority.'}
                  </p>
                </CardContent>
              </Card>

              {/* 3) Quality */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    Quality
                    <InfoTooltip>
                      <div className="space-y-1">
                        <p><strong>Standard:</strong> FDM, 0.32 height layer</p>
                        <p><strong>Premium:</strong> FDM · 0.16 mm layer height</p>
                        <p><strong>Ultra:</strong> Resin, 0.05 height layer</p>
                      </div>
                    </InfoTooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {(['standard', 'premium', 'ultra'] as const).map((q) => {
                      const isResin = selectedMaterial === 'Resin';
                      // When Resin: only Ultra available. When not Resin: Ultra disabled.
                      const disabled = isResin ? q !== 'ultra' : q === 'ultra';
                      if (isResin && q !== 'ultra') return null; // hide Standard/Premium when Resin
                      return (
                        <button
                          key={q}
                          type="button"
                          disabled={disabled}
                          onClick={() => !disabled && handleQualityChange(q)}
                          className={`p-2.5 rounded-lg border-2 text-sm font-medium capitalize transition-all ${
                            selectedQuality === q
                              ? 'border-secondary bg-secondary/10 text-secondary'
                              : disabled
                              ? 'border-border opacity-40 cursor-not-allowed'
                              : 'border-border hover:border-secondary/50'
                          }`}
                        >
                          {q}
                          {q === 'standard' && <span className="block text-[10px] text-muted-foreground font-normal">Base</span>}
                        </button>
                      );
                    })}
                  </div>
                  {selectedMaterial !== 'Resin' && (
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      Ultra is only available for Resin.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* 4) Print Settings (includes Material) */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Settings className="h-4 w-4 text-secondary" />
                    Print Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Material */}
                  <div className="space-y-1.5">
                    <Label className="text-sm">Material</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableMaterials.map((mat) => (
                        <button
                          key={mat}
                          type="button"
                          onClick={() => handleMaterialChange(mat)}
                          className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                            selectedMaterial === mat
                              ? 'border-secondary bg-secondary/5'
                              : 'border-border hover:border-muted-foreground'
                          }`}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="flex items-center gap-2 text-sm">
                        Part Count
                        <InfoTooltip text="Number of separate pieces required to assemble the object." />
                      </Label>
                      <Select value={partCount} onValueChange={setPartCount}>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select parts" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 piece</SelectItem>
                          <SelectItem value="2">2 pieces</SelectItem>
                          <SelectItem value="3">3 pieces</SelectItem>
                          <SelectItem value="4">4 pieces</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm">Requires Supports</Label>
                      <div className="flex items-center gap-2 h-9">
                        <Checkbox id="supports-fees" checked={hasSupports} onCheckedChange={(checked) => setHasSupports(checked as boolean)} />
                        <Label htmlFor="supports-fees" className="cursor-pointer text-sm">Yes, supports needed</Label>
                      </div>
                    </div>
                  </div>

                  {/* Multi-color toggle */}
                  {selectedMaterial !== 'Resin' && (
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                      <Checkbox
                        id="mc-fees"
                        checked={supportsMulticolor}
                        onCheckedChange={(checked) => setSupportsMulticolor(checked as boolean)}
                      />
                      <Label htmlFor="mc-fees" className="cursor-pointer text-sm font-medium">
                        Supports multicolor
                      </Label>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="weight-fees" className="flex items-center gap-2 text-sm">
                        Estimated Weight (grams)
                        <InfoTooltip text="Used to estimate material cost. Enter total grams across all parts (including a reasonable waste margin if needed)." />
                      </Label>
                      <Input
                        id="weight-fees"
                        type="number"
                        placeholder="e.g., 50"
                        value={estimatedWeight}
                        onChange={(e) => setEstimatedWeight(e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="time-fees" className="flex items-center gap-2 text-sm">
                        Print Time (minutes)
                        <InfoTooltip text="Estimated using the OrcaSlicer profile: 0.32mm standard @MyKliper. Your actual time may vary by printer/settings." />
                      </Label>
                      <Input
                        id="time-fees"
                        type="number"
                        placeholder="e.g., 120"
                        value={estimatedPrintTime}
                        onChange={(e) => setEstimatedPrintTime(e.target.value)}
                        className="h-9"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Live Breakdown */}
            <div className="lg:col-span-2">
              <Card className="sticky top-24">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calculator className="h-4 w-4" />
                    Payout Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {breakdown && breakdownValues ? (
                    <>
                      <div className="text-center py-3">
                        <p className="text-3xl font-bold">{breakdown.total.toFixed(2)}</p>
                        <p className="text-muted-foreground text-sm mt-1">Total price</p>
                      </div>

                      <div className="space-y-1.5 text-sm">
                        {breakdownRowConfig.map((row) => {
                          const IconComp = row.icon;
                          const value = breakdownValues[row.key as keyof typeof breakdownValues];
                          return (
                            <div key={row.key} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '8px' }} className={row.rowClass}>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <button type="button" className={`flex items-center gap-1.5 ${row.labelClass} cursor-pointer hover:text-foreground transition-colors`}>
                                    <IconComp className={`h-3 w-3 shrink-0 ${row.iconClass}`} />
                                    {row.label}
                                    <span className="text-muted-foreground text-xs border border-muted-foreground rounded-full h-3.5 w-3.5 inline-flex items-center justify-center shrink-0">ⓘ</span>
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent className="max-w-xs text-xs z-[100]" side="top" align="start">
                                  {row.tooltip}
                                </PopoverContent>
                              </Popover>
                              <span className={row.valueClass} style={{ flexShrink: 0, textAlign: 'right', whiteSpace: 'nowrap' }}>{value.toFixed(2)}</span>
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-xs text-muted-foreground text-center pt-2">
                        Values update live as you change inputs.
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <Calculator className="h-10 w-10 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Enter weight and print time to see the payout breakdown</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
