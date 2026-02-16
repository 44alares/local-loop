import { useState } from 'react';
import StlPreview from '@/components/StlPreview';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Upload, Image, Camera, Settings, Calculator, Printer, Building2, Palette, CreditCard, CheckCircle2, FileText, AlertCircle, Info, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { ralColors, RALColor } from '@/data/ralColors';
import { MATERIALS_CONFIG, type MaterialType } from '@/data/materialsConfig';
import { getPalettesForMaterial, multicolorHexMap, type PaletteId } from '@/data/multicolorPalettes';
import { PaletteInfoTooltip } from '@/components/PaletteInfoTooltip';
import { calculatePrintPrice } from '@/lib/pricing';
import { Link } from 'react-router-dom';

// Fixed fee ranges by complexity
const FIXED_FEE_RANGES = {
  Basic: { min: 1, max: 2 },
  Functional: { min: 1, max: 4 },
  Artistic: { min: 1, max: 6 },
};

export default function StartCreating() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [renderImage, setRenderImage] = useState<File | null>(null);
  const [scaleProofImage, setScaleProofImage] = useState<File | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedRalColors, setSelectedRalColors] = useState<string[]>([]);
  const [ralSearchQuery, setRalSearchQuery] = useState('');
  const [partCount, setPartCount] = useState('1');
  const [hasSupports, setHasSupports] = useState(false);
  const [estimatedWeight, setEstimatedWeight] = useState('');
  const [estimatedPrintTime, setEstimatedPrintTime] = useState('');
  // ndaAccepted removed — covered by creatorTermsAccepted
  const [originalWorkCertified, setOriginalWorkCertified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [complexity, setComplexity] = useState<'Basic' | 'Functional' | 'Artistic' | ''>('');
  const [fixedFee, setFixedFee] = useState(2);
  const [creatorTermsOpened, setCreatorTermsOpened] = useState(false);
  const [creatorTermsAccepted, setCreatorTermsAccepted] = useState(false);
  const [creatorTermsOpen, setCreatorTermsOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState('');
  // Multi-color design fields
  const [supportsMulticolor, setSupportsMulticolor] = useState(false);
  const [multicolorMethod, setMulticolorMethod] = useState<'automatic' | 'by-parts' | 'manual-layer'>('automatic');
  const [recommendedPalettes, setRecommendedPalettes] = useState<Record<string, boolean>>({ base: true, earth: false, accent: false });
  const [minColors, setMinColors] = useState(2);
  const [maxColors, setMaxColors] = useState(4);
  const [criticalColors, setCriticalColors] = useState('');
  // Display colors per palette (designer picks max 4 per palette)
  const [paletteDisplayColors, setPaletteDisplayColors] = useState<Record<string, string[]>>({});

  // Get fee range based on complexity
  const feeRange = complexity ? FIXED_FEE_RANGES[complexity] : { min: 1, max: 3 };

  // Calculate estimated price based on inputs
  const calculateEstimate = () => {
    if (!estimatedWeight || !estimatedPrintTime || !selectedMaterial) return null;
    const materialCosts: Record<string, number> = {
      'PLA': 25,
      'ABS': 28,
      'PETG': 30,
      'Resin': 45,
      'Nylon': 50
    };
    const price = calculatePrintPrice({
      weightGrams: parseFloat(estimatedWeight),
      printTimeMinutes: parseFloat(estimatedPrintTime),
      materialDensity: 1.24,
      materialCostPerKg: materialCosts[selectedMaterial] || 25,
      laborRatePerHour: 15
    });
    return price;
  };

  const estimatedPrice = calculateEstimate();

  // Part count surcharge
  const partCountNum = parseInt(partCount) || 1;
  const partCountSurcharge = partCountNum >= 4 ? 0.15 : partCountNum >= 3 ? 0.10 : partCountNum >= 2 ? 0.05 : 0;
  // Supports surcharge
  const supportsSurcharge = hasSupports ? 0.10 : 0;
  // Total surcharge (stacking)
  const totalSurcharge = partCountSurcharge + supportsSurcharge;
  
  // Apply surcharges to estimated price
  const adjustedPrice = estimatedPrice ? estimatedPrice * (1 + totalSurcharge) : null;

  // Calculate variable fee (internal 5% rule, but not displayed as %)
  const variableFee = adjustedPrice ? adjustedPrice * 0.05 : 0;
  const totalFees = fixedFee + variableFee;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleRenderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRenderImage(file);
    }
  };

  const handleScaleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScaleProofImage(file);
    }
  };

  const canSubmit = uploadedFile && scaleProofImage && creatorTermsAccepted && originalWorkCertified && selectedMaterial;

  if (submitted) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Design Submitted!</h1>
            <p className="text-muted-foreground mb-8">
              Your design has been submitted for review. Our team will verify it within 24-48 hours and notify you once it's live.
            </p>
            <Button variant="hero" onClick={() => setSubmitted(false)}>
              Submit Another Design
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-10 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-3">For Designers</Badge>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              Start Creating
            </h1>
            <p className="text-muted-foreground">
              Upload your design and earn royalties on every print. Make sure to include a real-scale proof photo.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Left: Upload & Configuration */}
            <div className="lg:col-span-3 space-y-5">
              {/* File Upload */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Upload className="h-4 w-4 text-secondary" />
                    Design File Upload
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Supported formats: STL, 3MF
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-accent font-medium mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    You must be registered to upload files.
                  </p>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-secondary transition-colors">
                    <input type="file" accept=".stl,.3mf" onChange={handleFileUpload} className="hidden" id="file-upload" />
                    <label htmlFor="file-upload" className="cursor-pointer">
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
                  {uploadedFile && uploadedFile.name.toLowerCase().endsWith('.stl') ? (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs text-muted-foreground">Drag to rotate · Scroll to zoom</p>
                      <StlPreview file={uploadedFile} />
                    </div>
                  ) : uploadedFile && !uploadedFile.name.toLowerCase().endsWith('.3mf') ? (
                    <p className="mt-3 text-xs text-muted-foreground">3D preview is available for STL files in this beta.</p>
                  ) : null}
                </CardContent>
              </Card>

              {/* Image Gallery */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Image className="h-4 w-4 text-secondary" />
                    Image Gallery
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Upload promotional images and required scale proof
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   {/* Slot 1: Real Scale Proof (Mandatory) */}
                   <div className="space-y-2">
                     <Label className="flex items-center gap-2 text-sm">
                       <Camera className="h-3 w-3 text-accent" />
                       Slot 1: Real Scale Proof (Mandatory) *
                     </Label>
                     <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${scaleProofImage ? 'border-secondary bg-secondary/5' : 'border-accent/50 hover:border-accent'}`}>
                       <input type="file" accept="image/*" onChange={handleScaleProofUpload} className="hidden" id="scale-proof-upload" />
                       <label htmlFor="scale-proof-upload" className="cursor-pointer">
                         {scaleProofImage ? (
                           <div className="flex items-center justify-center gap-2">
                             <CheckCircle2 className="h-4 w-4 text-secondary" />
                             <p className="font-medium text-secondary text-sm">{scaleProofImage.name}</p>
                           </div>
                         ) : (
                           <>
                             <AlertCircle className="h-6 w-6 mx-auto text-accent mb-1" />
                             <p className="text-xs font-medium mb-1">Upload a photo of the printed object</p>
                             <p className="text-xs text-muted-foreground">
                               Must include a standard object for scale (pen, coin, headphones, etc.)
                             </p>
                           </>
                         )}
                       </label>
                     </div>
                   </div>

                   {/* Slot 2: Render Image */}
                   <div className="space-y-2">
                     <Label className="flex items-center gap-2 text-sm">
                       <Camera className="h-3 w-3" />
                       Slot 2: Render/Promotional Image (Optional)
                     </Label>
                     <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-secondary transition-colors">
                       <input type="file" accept="image/*" onChange={handleRenderUpload} className="hidden" id="render-upload" />
                       <label htmlFor="render-upload" className="cursor-pointer">
                         {renderImage ? (
                           <p className="font-medium text-secondary text-sm">{renderImage.name}</p>
                         ) : (
                           <>
                             <Image className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
                             <p className="text-xs">Upload a render or promotional photo</p>
                           </>
                         )}
                       </label>
                     </div>
                   </div>
                 </CardContent>
              </Card>

              {/* Print Settings */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Settings className="h-4 w-4 text-secondary" />
                    Print Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-sm">Part Count</Label>
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
                        <Checkbox id="supports" checked={hasSupports} onCheckedChange={(checked) => setHasSupports(checked as boolean)} />
                        <Label htmlFor="supports" className="cursor-pointer text-sm">Yes, supports needed</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm">Recommended Material(s)</Label>
                    <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PLA">PLA - Standard</SelectItem>
                        <SelectItem value="ABS">ABS - Heat Resistant</SelectItem>
                        <SelectItem value="PETG">PETG - Durable</SelectItem>
                        <SelectItem value="Resin">Resin - High Detail</SelectItem>
                        <SelectItem value="Nylon">Nylon - Industrial</SelectItem>
                        <SelectItem value="TPU">TPU Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-2 text-sm">
                      Complexity
                      <span className="relative group">
                        <span className="text-muted-foreground cursor-help text-xs border border-muted-foreground rounded-full h-4 w-4 inline-flex items-center justify-center">ⓘ</span>
                        <span className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-popover border border-border rounded-lg shadow-lg text-xs text-left opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                          <strong>Basic:</strong> simple items that don't need precise fit, special materials, or extra strength/heat resistance (desk organizers, basic holders, non-critical accessories).<br/><br/>
                          <strong>Functional:</strong> parts where fit, tolerances, and durability matter (tools, replacements, brackets, mounts, adapters).<br/><br/>
                          <strong>Artistic:</strong> aesthetic/collectible pieces where surface finish and detail are the priority (figurines, sculptures, display pieces).<br/><br/>
                          <em className="text-accent">Functional and Artistic objects always require manual team validation before publishing.</em>
                        </span>
                      </span>
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Basic', 'Functional', 'Artistic'] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setComplexity(option);
                            setFixedFee(FIXED_FEE_RANGES[option].min);
                          }}
                          className={`p-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                            complexity === option
                              ? 'border-secondary bg-secondary/10 text-secondary'
                              : 'border-border hover:border-secondary/50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fixed Fee Slider - Only show when complexity is selected */}
                  {complexity && (
                    <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                      <Label className="text-sm">Fixed fee (EUR)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[fixedFee]}
                          onValueChange={(value) => setFixedFee(value[0])}
                          min={feeRange.min}
                          max={feeRange.max}
                          step={0.5}
                          className="flex-1"
                        />
                        <span className="font-bold text-secondary min-w-[60px] text-right">
                          €{fixedFee.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Fixed fee + variable fee based on the sale price.
                      </p>
                    </div>
                  )}

                  {/* Multi-color support */}
                  <div className="space-y-3 p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="supports-multicolor"
                        checked={supportsMulticolor}
                        onCheckedChange={(checked) => setSupportsMulticolor(checked as boolean)}
                      />
                      <Label htmlFor="supports-multicolor" className="cursor-pointer text-sm font-medium">
                        Supports multi-color (only PLA and PETG)
                      </Label>
                    </div>

                    {supportsMulticolor && (
                      <div className="space-y-3 ml-7">
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Multi-color method</Label>
                          <Select value={multicolorMethod} onValueChange={(v) => setMulticolorMethod(v as typeof multicolorMethod)}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="automatic">Automatic (AMS/MMU)</SelectItem>
                              <SelectItem value="by-parts">By-parts assembly</SelectItem>
                              <SelectItem value="manual-layer">Manual by-layer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground flex items-center gap-1">Available palettes <PaletteInfoTooltip /></Label>
                          <div className="flex flex-wrap gap-3">
                            {['base', 'earth', 'accent', 'matte'].map((p) => (
                              <div key={p} className="flex items-center gap-1.5">
                                <Checkbox
                                  checked={recommendedPalettes[p] ?? false}
                                  disabled={p === 'base'}
                                  onCheckedChange={(checked) => setRecommendedPalettes(prev => ({ ...prev, [p]: checked as boolean }))}
                                />
                                <Label className="text-xs capitalize cursor-pointer">{p}</Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Min colors</Label>
                            <Select value={String(minColors)} onValueChange={(v) => setMinColors(Number(v))}>
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[2, 3, 4].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Max colors</Label>
                            <Select value={String(maxColors)} onValueChange={(v) => setMaxColors(Math.max(Number(v), minColors))}>
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[2, 3, 4].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Critical colors (optional)</Label>
                          <Input
                            placeholder="e.g., Black body, Red accents"
                            value={criticalColors}
                            onChange={(e) => setCriticalColors(e.target.value)}
                            className="h-8 text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Material-specific basic colors + recommended colors */}
                  {selectedMaterial && MATERIALS_CONFIG[selectedMaterial as MaterialType] && (
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-sm">
                        <Palette className="h-3 w-3" />
                        Colors for {selectedMaterial}
                      </Label>
                      {/* Basic colors - always visible */}
                      <div className="space-y-1.5">
                        <p className="text-xs font-medium text-muted-foreground">Basic colors</p>
                        <div className="flex flex-wrap gap-1.5">
                          {MATERIALS_CONFIG[selectedMaterial as MaterialType].basicColors.map((color) => (
                            <Badge key={color.name} variant="secondary" className="gap-1.5 py-1 px-2">
                              <div className="h-3 w-3 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                              <span className="text-xs">{color.name}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {/* Recommended colors - collapsible */}
                      {MATERIALS_CONFIG[selectedMaterial as MaterialType].recommendedColors.length > 0 && (
                        <Collapsible>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-full justify-between text-xs h-7">
                              Recommended colors (optional)
                              <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {MATERIALS_CONFIG[selectedMaterial as MaterialType].recommendedColors.map((color) => (
                                <Badge key={color.name} variant="outline" className="gap-1.5 py-1 px-2">
                                  <div className="h-3 w-3 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                                  <span className="text-xs">{color.name}</span>
                                </Badge>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </div>
                  )}

                  {/* Recommended palettes */}
                  {selectedMaterial && MATERIALS_CONFIG[selectedMaterial as MaterialType]?.supportsMulticolor && (
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm">
                        <Palette className="h-3 w-3" />
                        Available palettes
                        <PaletteInfoTooltip />
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {getPalettesForMaterial(selectedMaterial).map((palette) => {
                          const colors = palette.colors;
                          const displayColors = paletteDisplayColors[palette.id] ?? colors.slice(0, 4);
                          const needsSelection = colors.length > 6;
                          const hasValidSelection = displayColors.length === 4;
                          return (
                            <button
                              key={palette.id}
                              type="button"
                              onClick={() => {
                                // Pre-fill color selection with palette colors
                                const ralMatch = ralColors.find(r => r.name.toLowerCase().includes(colors[0].toLowerCase()));
                                if (ralMatch && !selectedRalColors.includes(ralMatch.code)) {
                                  setSelectedRalColors(prev => [...prev, ralMatch.code]);
                                }
                              }}
                              className={`flex items-center gap-2 p-2.5 rounded-lg border transition-colors text-left ${
                                needsSelection && !hasValidSelection
                                  ? 'border-accent/50'
                                  : 'border-border hover:border-secondary'
                              }`}
                            >
                              <div className="flex gap-0.5 shrink-0">
                                {displayColors.slice(0, 4).map((c) => (
                                  <span
                                    key={c}
                                    className="h-5 w-5 rounded-full border border-border"
                                    style={{ backgroundColor: multicolorHexMap[c] || '#CCC' }}
                                  />
                                ))}
                              </div>
                              <div>
                                <p className="text-xs font-medium capitalize">{palette.label}</p>
                                <p className="text-[10px] text-muted-foreground">
                                  {colors.length} colors
                                  {colors.length > 4 && ` · showing ${Math.min(displayColors.length, 4)}`}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Display colors picker for palettes with >6 colors */}
                      {getPalettesForMaterial(selectedMaterial)
                        .filter((p) => p.colors.length > 6)
                        .map((palette) => {
                          const selected = paletteDisplayColors[palette.id] || [];
                          return (
                            <div key={`display-${palette.id}`} className="space-y-1.5 p-2.5 rounded-lg border border-accent/30 bg-accent/5">
                              <p className="text-xs font-medium">
                                Display colors for "{palette.label}" (choose exactly 4) *
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {palette.colors.map((c) => {
                                  const isSelected = selected.includes(c);
                                  return (
                                    <button
                                      key={c}
                                      type="button"
                                      onClick={() => {
                                        setPaletteDisplayColors((prev) => {
                                          const current = prev[palette.id] || [];
                                          if (isSelected) {
                                            return { ...prev, [palette.id]: current.filter((x) => x !== c) };
                                          }
                                          if (current.length >= 4) return prev;
                                          return { ...prev, [palette.id]: [...current, c] };
                                        });
                                      }}
                                      className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs transition-colors ${
                                        isSelected
                                          ? 'border-secondary bg-secondary/10 text-secondary'
                                          : 'border-border hover:border-secondary/50'
                                      }`}
                                    >
                                      <span
                                        className="h-3 w-3 rounded-full border border-border shrink-0"
                                        style={{ backgroundColor: multicolorHexMap[c] || '#CCC' }}
                                      />
                                      {c}
                                    </button>
                                  );
                                })}
                              </div>
                              <p className="text-[10px] text-muted-foreground">
                                {selected.length}/4 selected
                                {selected.length !== 4 && ' — exactly 4 required to publish'}
                              </p>
                            </div>
                          );
                        })}

                      {/* Display colors override for palettes with ≤6 colors (optional) */}
                      {getPalettesForMaterial(selectedMaterial)
                        .filter((p) => p.colors.length > 4 && p.colors.length <= 6)
                        .map((palette) => {
                          const selected = paletteDisplayColors[palette.id] || palette.colors.slice(0, 4);
                          const isCustom = !!paletteDisplayColors[palette.id];
                          return (
                            <div key={`display-opt-${palette.id}`} className="space-y-1.5 p-2.5 rounded-lg border border-border">
                              <p className="text-xs font-medium flex items-center gap-1.5">
                                Display colors for "{palette.label}" (optional override)
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {palette.colors.map((c) => {
                                  const isSelected = selected.includes(c);
                                  return (
                                    <button
                                      key={c}
                                      type="button"
                                      onClick={() => {
                                        setPaletteDisplayColors((prev) => {
                                          const current = prev[palette.id] || palette.colors.slice(0, 4);
                                          if (isSelected && current.length <= 1) return prev;
                                          if (isSelected) {
                                            return { ...prev, [palette.id]: current.filter((x) => x !== c) };
                                          }
                                          if (current.length >= 4) return prev;
                                          return { ...prev, [palette.id]: [...current, c] };
                                        });
                                      }}
                                      className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs transition-colors ${
                                        isSelected
                                          ? 'border-secondary bg-secondary/10 text-secondary'
                                          : 'border-border hover:border-secondary/50'
                                      }`}
                                    >
                                      <span
                                        className="h-3 w-3 rounded-full border border-border shrink-0"
                                        style={{ backgroundColor: multicolorHexMap[c] || '#CCC' }}
                                      />
                                      {c}
                                    </button>
                                  );
                                })}
                              </div>
                              <p className="text-[10px] text-muted-foreground">
                                Showing {selected.length} of {palette.colors.length} · first 4 used by default
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-2 text-sm">
                      <Palette className="h-3 w-3" />
                      Recommended RAL colors (approx.)
                    </Label>
                    <Select
                      onValueChange={(code) => {
                        if (!selectedRalColors.includes(code)) {
                          setSelectedRalColors(prev => [...prev, code]);
                        }
                      }}
                      value=""
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Add RAL color…" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {ralColors
                          .filter(c => !selectedRalColors.includes(c.code))
                          .filter(c => {
                            if (!ralSearchQuery) return true;
                            const q = ralSearchQuery.toLowerCase();
                            return c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
                          })
                          .map((color) => (
                            <SelectItem key={color.code} value={color.code}>
                              <span className="flex items-center gap-2">
                                <span className="inline-block h-3 w-3 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                                {color.code} – {color.name}
                              </span>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {selectedRalColors.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedRalColors.map((code) => {
                          const c = ralColors.find(r => r.code === code);
                          return (
                            <Badge
                              key={code}
                              variant="outline"
                              className="gap-1.5 py-1 px-2.5 cursor-pointer hover:bg-destructive/10 hover:border-destructive/30"
                              onClick={() => setSelectedRalColors(prev => prev.filter(x => x !== code))}
                            >
                              <div className="h-3 w-3 rounded-full border border-border" style={{ backgroundColor: c?.hex }} />
                              {c?.code} – {c?.name}
                              <span className="text-muted-foreground ml-0.5">×</span>
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="weight" className="text-sm">Estimated Weight (grams)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="e.g., 50"
                        value={estimatedWeight}
                        onChange={(e) => setEstimatedWeight(e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="time" className="text-sm">Print Time (minutes)</Label>
                      <Input
                        id="time"
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

              {/* Designer terms & license */}
              <Card className="border-accent/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-4 w-4 text-accent" />
                    Designer terms &amp; license
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Summary bullets */}
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Platform-only terms: applies only to MakeHug orders and payouts.</li>
                    <li>You keep ownership of your files.</li>
                    <li>Makers may use the file only to fulfill MakeHug orders.</li>
                    <li>No file redistribution by default.</li>
                    <li>Royalties = Designer Fee + % of sale price.</li>
                    <li>Remix rules depend on your selected license and Annex I.</li>
                  </ul>

                  {/* Collapsible full terms */}
                  <Collapsible open={creatorTermsOpen} onOpenChange={(open) => {
                    setCreatorTermsOpen(open);
                    if (open) setCreatorTermsOpened(true);
                  }}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full justify-between text-sm">
                        {creatorTermsOpen ? 'Hide full terms' : 'Show full terms'}
                        {creatorTermsOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="mt-3 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground space-y-3 max-h-[400px] overflow-y-auto">
                        <p className="font-bold text-foreground">MakeHug Creator Terms (Platform-only)</p>
                        <p><strong className="text-foreground">Scope.</strong> These terms apply only to activity on MakeHug (listings, orders, manufacturing, and payouts). External contracts are separate and do not change MakeHug's obligations or payout rules unless MakeHug explicitly agrees in writing.</p>
                        <p><strong className="text-foreground">Ownership.</strong> You (the Designer) keep ownership of your designs and files.</p>
                        <p><strong className="text-foreground">Rights confirmation.</strong> You confirm you own the rights to upload the file, or you have sufficient permission to license it for manufacturing and sale as a physical product on MakeHug.</p>
                        <p><strong className="text-foreground">Originality &amp; third-party uploads.</strong> You may upload a design to MakeHug if you are the original creator/rights holder (including designs you previously published on other platforms).
You may not upload, list, resell, or monetize files you didn’t create, including files taken from third‑party repositories, other designers, or subscription/membership sources, or files under licenses/terms that don’t allow this use. </p>
                        <p><strong className="text-foreground">Duplicate / substantially similar uploads.</strong> You may not upload designs identical or substantially similar to existing Platform listings. Flagged uploads may be hidden, suspended, or removed. "Generic Geometry Designs" may be listed but are not eligible for exclusivity.</p>
                        <p><strong className="text-foreground">Proof of authorship (audit right).</strong> MakeHug may request proof of authorship (CAD/STEP/F3D, version history, sketches). Failure to provide within a reasonable timeframe may result in listing suspension and payout hold.</p>
                        <p><strong className="text-foreground">License to MakeHug (to operate the platform).</strong> You grant MakeHug a non-exclusive license to host, technically copy, convert formats as needed, generate previews, display, and provide the file only to the assigned Maker(s) for valid MakeHug orders, solely to manufacture the ordered quantity.</p>
                        <p><strong className="text-foreground">File protection (default).</strong> Unless you choose otherwise, Makers and buyers may not redistribute, publish, resell, or share the file, and may not use it for other orders.</p>
                        <p><strong className="text-foreground">Royalties ("Royalty pool").</strong> For each sale/print on MakeHug, the royalty pool equals: (a) the fixed "Designer Fee" you set for that design, plus (b) a percentage of the physical product sale price. MakeHug pays royalties according to the selected license option and Annex I.</p>
                        <p><strong className="text-foreground">Removal &amp; enforcement.</strong> MakeHug may suspend listings, withhold payouts, or reverse payouts when reasonably necessary to address fraud, refunds/chargebacks, rights disputes, or violations of these terms.</p>
                        <p><strong className="text-foreground">Acceptance.</strong> You must actively accept these terms (checkbox) before continuing.</p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Checkbox */}
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="creator-terms"
                      checked={creatorTermsAccepted}
                      onCheckedChange={(checked) => setCreatorTermsAccepted(checked as boolean)}
                      disabled={!creatorTermsOpened}
                    />
                    <Label htmlFor="creator-terms" className={`cursor-pointer text-sm ${!creatorTermsOpened ? 'text-muted-foreground/50' : ''}`}>
                      I agree to the MakeHug Creator Terms (platform-only). *
                      {!creatorTermsOpened && <span className="block text-xs text-muted-foreground mt-0.5">Open "Show full terms" first to enable this.</span>}
                    </Label>
                  </div>

                  {/* License selector */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">License type</Label>
                      <Link to="/designer-terms" className="text-xs text-secondary hover:underline">What is this?</Link>
                    </div>
                    <Select value={selectedLicense} onValueChange={setSelectedLicense}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                      <SelectContent>
                        {complexity === 'Artistic' ? (
                          <SelectItem value="artistic-no-remixes">Artistic — No Remixes</SelectItem>
                        ) : (
                          <>
                            <SelectItem value="functional-delayed">Basic/Functional — Remixes after 6 months</SelectItem>
                            <SelectItem value="functional-immediate">Basic/Functional — Remixes from day 1</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>

                    {/* Info per selected license */}
                    {selectedLicense === 'artistic-no-remixes' && (
                      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 rounded p-2">
                        <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <div>
                          <span>Artistic designs have no remixes allowed. File used only for MakeHug orders.</span>
                          <Link to="/designer-terms#license-artistic" className="ml-1 text-secondary hover:underline inline-flex items-center gap-0.5">View full license text <ExternalLink className="h-3 w-3" /></Link>
                        </div>
                      </div>
                    )}
                    {selectedLicense === 'functional-delayed' && (
                      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 rounded p-2">
                        <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <div>
                          <span>No remixes for 6 months. After that, only Substantial Improvements qualify. Revenue share applies.</span>
                          <Link to="/designer-terms#license-functional-delayed" className="ml-1 text-secondary hover:underline inline-flex items-center gap-0.5">View full license text <ExternalLink className="h-3 w-3" /></Link>
                        </div>
                      </div>
                    )}
                    {selectedLicense === 'functional-immediate' && (
                      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 rounded p-2">
                        <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <div>
                          <span>Remixes allowed from day 1, only if they are Substantial Improvements. Revenue share applies immediately.</span>
                          <Link to="/designer-terms#license-functional-immediate" className="ml-1 text-secondary hover:underline inline-flex items-center gap-0.5">View full license text <ExternalLink className="h-3 w-3" /></Link>
                        </div>
                      </div>
                    )}
                    {selectedLicense && (
                      <Link to="/designer-terms#annex-1" className="text-xs text-secondary hover:underline inline-flex items-center gap-1">
                        View Annex I (Remix Program) <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                  </div>

                  {/* Original work certification */}
                  <div className="flex items-start gap-2 pt-2 border-t border-border">
                    <Checkbox id="original" checked={originalWorkCertified} onCheckedChange={(checked) => setOriginalWorkCertified(checked as boolean)} />
                    <div className="space-y-0.5">
                      <Label htmlFor="original" className="font-medium cursor-pointer text-sm">
                        I certify this is my original design
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        I confirm that I am the original creator of this design and have full rights to distribute it commercially.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Price Calculator */}
            <div className="lg:col-span-2">
              <Card className="sticky top-24">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calculator className="h-4 w-4" />
                    Fee Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {adjustedPrice && complexity ? (
                    <>
                      <div className="text-center py-3">
                        <p className="text-3xl font-bold">€{adjustedPrice.toFixed(2)}</p>
                        <p className="text-muted-foreground text-sm mt-1">Suggested retail price</p>
                      </div>

                      {totalSurcharge > 0 && (
                        <div className="space-y-1 text-sm bg-accent/5 rounded-lg p-3">
                          <p className="text-xs font-medium text-muted-foreground">Surcharges applied:</p>
                          {partCountSurcharge > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Part count ({partCountNum} parts)</span>
                              <span className="font-medium">+{(partCountSurcharge * 100).toFixed(0)}%</span>
                            </div>
                          )}
                          {supportsSurcharge > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Supports needed</span>
                              <span className="font-medium">+10%</span>
                            </div>
                          )}
                          <div className="flex justify-between text-xs border-t border-border pt-1">
                            <span className="font-medium">Total surcharge</span>
                            <span className="font-bold">+{(totalSurcharge * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 pt-3 border-t border-border">
                        <p className="text-sm font-medium text-muted-foreground">Fee Preview (amounts only):</p>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex items-center justify-between py-1">
                            <span className="text-muted-foreground">Fixed fee (EUR)</span>
                            <span className="font-medium">€{fixedFee.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between py-1">
                            <span className="text-muted-foreground">Variable fee</span>
                            <span className="font-medium">€{variableFee.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between py-1.5 border-t border-border">
                            <span className="font-medium">Estimated total fees</span>
                            <span className="font-bold text-secondary">€{totalFees.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-secondary/10 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground">Your royalty per print</p>
                        <p className="text-xl font-bold text-secondary">
                          €{totalFees.toFixed(2)}
                        </p>
                      </div>

                      <p className="text-xs text-muted-foreground text-center">
                        You'll see exact amounts before publishing.
                      </p>

                      <Button variant="hero" className="w-full" disabled={!canSubmit} onClick={() => setSubmitted(true)}>
                        Submit Design
                      </Button>

                      {!canSubmit && (
                        <p className="text-xs text-center text-muted-foreground">
                          Please complete all required fields and accept the terms
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <Calculator className="h-10 w-10 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Select complexity and enter material, weight, and print time to see your fee preview</p>
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
