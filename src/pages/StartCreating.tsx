import { useState } from 'react';
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
import { calculatePrintPrice } from '@/lib/pricing';
import { Link } from 'react-router-dom';

// Fixed fee ranges by complexity
const FIXED_FEE_RANGES = {
  Functional: { min: 1, max: 2 },
  Hybrid: { min: 1, max: 4 },
  Artistic: { min: 1, max: 6 },
};

export default function StartCreating() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [renderImage, setRenderImage] = useState<File | null>(null);
  const [scaleProofImage, setScaleProofImage] = useState<File | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedColor, setSelectedColor] = useState<RALColor | null>(null);
  const [partCount, setPartCount] = useState('1');
  const [hasSupports, setHasSupports] = useState(false);
  const [estimatedWeight, setEstimatedWeight] = useState('');
  const [estimatedPrintTime, setEstimatedPrintTime] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [originalWorkCertified, setOriginalWorkCertified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [complexity, setComplexity] = useState<'Functional' | 'Hybrid' | 'Artistic' | ''>('');
  const [fixedFee, setFixedFee] = useState(2);
  const [creatorTermsOpened, setCreatorTermsOpened] = useState(false);
  const [creatorTermsAccepted, setCreatorTermsAccepted] = useState(false);
  const [creatorTermsOpen, setCreatorTermsOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState('');

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

  const canSubmit = uploadedFile && scaleProofImage && ndaAccepted && originalWorkCertified && selectedMaterial;

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
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-2 text-sm">
                      Complexity
                      <span className="relative group">
                        <span className="text-muted-foreground cursor-help text-xs border border-muted-foreground rounded-full h-4 w-4 inline-flex items-center justify-center">ⓘ</span>
                        <span className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-popover border border-border rounded-lg shadow-lg text-xs text-left opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                          <strong>Functional object:</strong> utilitarian/spare/accessory focused on use, tolerances, fit<br/><br/>
                          <strong>Artistic object:</strong> mainly aesthetic/sculpture/decor<br/><br/>
                          <strong>Hybrid object:</strong> function + aesthetics<br/><br/>
                          <em className="text-accent">Hybrid and Artistic objects always require manual team validation before publishing.</em>
                        </span>
                      </span>
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Functional', 'Hybrid', 'Artistic'] as const).map((option) => (
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

                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-2 text-sm">
                      <Palette className="h-3 w-3" />
                      Recommended RAL Color
                    </Label>
                    <div className="grid grid-cols-8 gap-1.5">
                      {ralColors.slice(0, 16).map((color) => (
                        <button
                          key={color.code}
                          onClick={() => setSelectedColor(color)}
                          className={`h-7 w-7 rounded-lg border-2 transition-all ${
                            selectedColor?.code === color.code
                              ? 'border-secondary scale-110'
                              : 'border-transparent hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={`${color.code} - ${color.name}`}
                        />
                      ))}
                    </div>
                    {selectedColor && (
                      <p className="text-xs text-muted-foreground">
                        Selected: {selectedColor.code} - {selectedColor.name}
                      </p>
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
                            <SelectItem value="functional-delayed">Functional/Hybrid — Remixes after 6 months</SelectItem>
                            <SelectItem value="functional-immediate">Functional/Hybrid — Remixes from day 1</SelectItem>
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

                  {/* Original work + NDA kept */}
                  <div className="flex items-start gap-2 pt-2 border-t border-border">
                    <Checkbox id="nda" checked={ndaAccepted} onCheckedChange={(checked) => setNdaAccepted(checked as boolean)} />
                    <div className="space-y-0.5">
                      <Label htmlFor="nda" className="font-medium cursor-pointer text-sm">
                        I accept the NDA terms
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        I understand that Makers are bound by our Non-Disclosure Agreement and cannot commercialize my design files.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
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
