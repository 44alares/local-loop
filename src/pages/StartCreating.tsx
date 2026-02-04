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
import { Upload, Image, Camera, Settings, Calculator, Printer, Building2, Palette, CreditCard, CheckCircle2, FileText, AlertCircle } from 'lucide-react';
import { ralColors, RALColor } from '@/data/ralColors';
import { calculatePrintPrice, COMMISSION_RATES } from '@/lib/pricing';
import { Link } from 'react-router-dom';
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
  const [complexity, setComplexity] = useState('');

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
    return <Layout>
        <div className="container py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-secondary" />
            </div>
            <h1 className="text-display-sm font-bold mb-4">Design Submitted!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your design has been submitted for review. Our team will verify it within 24-48 hours and notify you once it's live.
            </p>
            <Button variant="hero" onClick={() => setSubmitted(false)}>
              Submit Another Design
            </Button>
          </div>
        </div>
      </Layout>;
  }
  return <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">For Designers</Badge>
            <h1 className="text-display font-bold mb-4">
              Start Creating
            </h1>
            <p className="text-xl text-muted-foreground">Upload your design and earn 8-16% royalty on every print. Make sure to include a real-scale proof photo.</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: Upload & Configuration */}
            <div className="lg:col-span-3 space-y-6">
              {/* File Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-secondary" />
                    Design File Upload
                  </CardTitle>
                  <CardDescription>
                    Supported formats: STL, 3MF
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-secondary transition-colors">
                    <input type="file" accept=".stl,.3mf" onChange={handleFileUpload} className="hidden" id="file-upload" />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      {uploadedFile ? <p className="font-medium text-secondary">{uploadedFile.name}</p> : <>
                          <p className="font-medium mb-1">Drop your STL/3MF here or click to browse</p>
                          <p className="text-sm text-muted-foreground">Maximum file size: 100MB</p>
                        </>}
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Image Gallery */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5 text-secondary" />
                    Image Gallery
                  </CardTitle>
                  <CardDescription>
                    Upload promotional images and required scale proof
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Slot 1: Render Image */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Slot 1: Render/Promotional Image (Optional)
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-secondary transition-colors">
                      <input type="file" accept="image/*" onChange={handleRenderUpload} className="hidden" id="render-upload" />
                      <label htmlFor="render-upload" className="cursor-pointer">
                        {renderImage ? <p className="font-medium text-secondary">{renderImage.name}</p> : <>
                            <Image className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm">Upload a render or promotional photo</p>
                          </>}
                      </label>
                    </div>
                  </div>

                  {/* Slot 2: Scale Proof (Mandatory) */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-accent" />
                      Slot 2: Real Scale Proof (Mandatory) *
                    </Label>
                    <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${scaleProofImage ? 'border-secondary bg-secondary/5' : 'border-accent/50 hover:border-accent'}`}>
                      <input type="file" accept="image/*" onChange={handleScaleProofUpload} className="hidden" id="scale-proof-upload" />
                      <label htmlFor="scale-proof-upload" className="cursor-pointer">
                        {scaleProofImage ? <div className="flex items-center justify-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-secondary" />
                            <p className="font-medium text-secondary">{scaleProofImage.name}</p>
                          </div> : <>
                            <AlertCircle className="h-8 w-8 mx-auto text-accent mb-2" />
                            <p className="text-sm font-medium mb-1">Upload a photo of the printed object</p>
                            <p className="text-xs text-muted-foreground">
                              Must include a standard object for scale (pen, coin, headphones, etc.)
                            </p>
                          </>}
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Print Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-secondary" />
                    Print Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Part Count</Label>
                      <Select value={partCount} onValueChange={setPartCount}>
                        <SelectTrigger>
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
                    <div className="space-y-2">
                      <Label>Requires Supports</Label>
                      <div className="flex items-center gap-2 h-10">
                        <Checkbox id="supports" checked={hasSupports} onCheckedChange={checked => setHasSupports(checked as boolean)} />
                        <Label htmlFor="supports" className="cursor-pointer">Yes, supports needed</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Recommended Material(s)</Label>
                    <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PLA">PLA - Standard ($25/kg)</SelectItem>
                        <SelectItem value="ABS">ABS - Heat Resistant ($28/kg)</SelectItem>
                        <SelectItem value="PETG">PETG - Durable ($30/kg)</SelectItem>
                        <SelectItem value="Resin">Resin - High Detail ($45/kg)</SelectItem>
                        <SelectItem value="Nylon">Nylon - Industrial ($50/kg)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Complexity</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Functional', 'Mixed', 'Artistic'].map(option => <button key={option} type="button" onClick={() => setComplexity(option)} className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${complexity === option ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border hover:border-secondary/50'}`}>
                          {option}
                        </button>)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Recommended RAL Color
                    </Label>
                    <div className="grid grid-cols-8 gap-2">
                      {ralColors.slice(0, 16).map(color => <button key={color.code} onClick={() => setSelectedColor(color)} className={`h-8 w-8 rounded-lg border-2 transition-all ${selectedColor?.code === color.code ? 'border-secondary scale-110' : 'border-transparent hover:scale-105'}`} style={{
                      backgroundColor: color.hex
                    }} title={`${color.code} - ${color.name}`} />)}
                    </div>
                    {selectedColor && <p className="text-sm text-muted-foreground">
                        Selected: {selectedColor.code} - {selectedColor.name}
                      </p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Estimated Weight (grams)</Label>
                      <Input id="weight" type="number" placeholder="e.g., 50" value={estimatedWeight} onChange={e => setEstimatedWeight(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Print Time (minutes)</Label>
                      <Input id="time" type="number" placeholder="e.g., 120" value={estimatedPrintTime} onChange={e => setEstimatedPrintTime(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Legal Section */}
              <Card className="border-accent/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    Legal & IP Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link to="/nda-terms" className="text-secondary underline hover:text-secondary/80 text-sm font-medium">
                    Read full Non-Disclosure Agreement & IP Terms →
                  </Link>

                  <div className="flex items-start gap-3">
                    <Checkbox id="nda" checked={ndaAccepted} onCheckedChange={checked => setNdaAccepted(checked as boolean)} />
                    <div className="space-y-1">
                      <Label htmlFor="nda" className="font-medium cursor-pointer">
                        I accept the NDA terms
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        I understand that Makers are bound by our Non-Disclosure Agreement and cannot commercialize my design files.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox id="original" checked={originalWorkCertified} onCheckedChange={checked => setOriginalWorkCertified(checked as boolean)} />
                    <div className="space-y-1">
                      <Label htmlFor="original" className="font-medium cursor-pointer">
                        I certify this is my original design
                      </Label>
                      <p className="text-sm text-muted-foreground">
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
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Price Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {estimatedPrice ? <>
                      <div className="text-center py-4">
                        <p className="text-4xl font-bold">${estimatedPrice.toFixed(2)}</p>
                        <p className="text-muted-foreground text-sm mt-1">Suggested retail price</p>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-border">
                        <p className="text-sm font-medium text-muted-foreground">Commission Breakdown:</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <Printer className="h-4 w-4 text-accent" />
                              Manufacturing Cost (75%)
                            </span>
                            <span>${(estimatedPrice * COMMISSION_RATES.MAKER).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <Palette className="h-4 w-4 text-primary" />
                              Designer Royalty (8%)
                            </span>
                            <span className="text-secondary font-medium">${(estimatedPrice * COMMISSION_RATES.DESIGNER).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-secondary" />
                              Platform Fee (14%)
                            </span>
                            <span>${(estimatedPrice * COMMISSION_RATES.PLATFORM).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-muted-foreground">
                            <span className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              Payment (3%)
                            </span>
                            <span>${(estimatedPrice * COMMISSION_RATES.PAYMENT_GATEWAY).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-secondary/10 rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground">Your royalty per sale</p>
                        <p className="text-2xl font-bold text-secondary">
                          ${(estimatedPrice * COMMISSION_RATES.DESIGNER).toFixed(2)}
                        </p>
                      </div>

                      <Button variant="hero" className="w-full" disabled={!canSubmit} onClick={() => setSubmitted(true)}>
                        Submit Design
                      </Button>

                      {!canSubmit && <p className="text-xs text-center text-muted-foreground">
                          Please complete all required fields and accept the terms
                        </p>}
                    </> : <div className="text-center py-8 text-muted-foreground">
                      <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Enter material, weight, and print time to see your price breakdown</p>
                    </div>}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>;
}