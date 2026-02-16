import { useState } from 'react';
import StlPreview from '@/components/StlPreview';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Lightbulb,
  FileUp,
  ArrowRight,
  Upload,
  Calculator,
  Palette,
  Printer,
  Building2,
  CreditCard,
  CheckCircle2,
  MapPin,
  Star,
  Clock,
  Leaf,
  Check,
} from 'lucide-react';
import { ralColors, RALColor } from '@/data/ralColors';
import { calculatePrintPrice } from '@/lib/pricing';
import { mockMakers } from '@/data/mockData';
import { cn } from '@/lib/utils';

type FlowType = 'idea' | 'file' | null;

export default function PrintMyDesign() {
  const [selectedFlow, setSelectedFlow] = useState<FlowType>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedColor, setSelectedColor] = useState<RALColor | null>(null);
  const [estimatedWeight, setEstimatedWeight] = useState('');
  const [estimatedPrintTime, setEstimatedPrintTime] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [ideaSubmitted, setIdeaSubmitted] = useState(false);
  const [showMakers, setShowMakers] = useState(false);
  const [selectedMaker, setSelectedMaker] = useState<string | null>(null);

  const sortedMakers = [...mockMakers].sort((a, b) => (a.rating > b.rating ? -1 : 1));
  const calculateEstimate = () => {
    if (!estimatedWeight || !estimatedPrintTime || !selectedMaterial) return null;

    const price = calculatePrintPrice({
      weightGrams: parseFloat(estimatedWeight),
      printTimeMinutes: parseFloat(estimatedPrintTime),
      materialDensity: 1.24,
      materialCostPerKg: 25,
      laborRatePerHour: 15,
      material: selectedMaterial,
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

  if (ideaSubmitted) {
    return (
      <Layout>
        <div className="container py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-secondary" />
            </div>
            <h1 className="text-display-sm font-bold mb-4">Request Submitted!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              We've received your design idea. Our team of designers will review it and get back to you within 48 hours.
            </p>
            <Button variant="hero" onClick={() => { setIdeaSubmitted(false); setSelectedFlow(null); }}>
              Submit Another Request
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">Custom Production</Badge>
            <h1 className="text-display font-bold mb-4">
              Make My Design
            </h1>
            <p className="text-xl text-muted-foreground">
              Bring your ideas to life with local makers. Whether you have a concept or a ready file, we'll help you get it made.
            </p>
          </div>
        </div>
      </section>

      {/* Flow Selection */}
      {!selectedFlow && (
        <section className="container py-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Flow A: I have an idea */}
            <Card 
              className="cursor-pointer hover:border-secondary transition-colors group"
              onClick={() => setSelectedFlow('idea')}
            >
              <CardHeader className="text-center pb-4">
                <div className="h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Lightbulb className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">I Have an Idea</CardTitle>
                <CardDescription>
                  Describe what you need and we'll match you with a designer (to model it) and a maker (to produce it).
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <Button variant="outline" className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground">
                  Connect with a designer and a maker
                </p>
              </CardContent>
            </Card>

            {/* Flow B: I have a file */}
            <Card 
              className="cursor-pointer hover:border-accent transition-colors group"
              onClick={() => setSelectedFlow('file')}
            >
              <CardHeader className="text-center pb-4">
                <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <FileUp className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">I Have a File</CardTitle>
                <CardDescription>
                  Upload an STL file and get the final price based on material, print time, and complexity—then choose a nearby maker to produce it.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" className="group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  Upload File <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Flow A: Idea Form */}
      {selectedFlow === 'idea' && (
        <section className="container py-16">
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedFlow(null)}
              className="mb-6"
            >
              ← Back to options
            </Button>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-secondary" />
                  Describe Your Idea
                </CardTitle>
                <CardDescription>
                  Tell us about what you want to create. A designer will review and provide a quote.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" placeholder="Custom phone stand, replacement part, etc." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Describe Your Idea</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Please describe in detail what you want to create. Include dimensions, purpose, any reference images or links..."
                    rows={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budget">Estimated Budget (Optional)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-25">Under $25</SelectItem>
                      <SelectItem value="25-50">$25 - $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100-250">$100 - $250</SelectItem>
                      <SelectItem value="over-250">Over $250</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference Images (URLs)</Label>
                  <Textarea 
                    id="reference" 
                    placeholder="Paste any links to reference images or similar products..."
                    rows={2}
                  />
                </div>
                
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => setIdeaSubmitted(true)}
                >
                  Submit Request
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Flow B: File Upload & Pricing */}
      {selectedFlow === 'file' && (
        <section className="container py-16">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedFlow(null)}
              className="mb-6"
            >
              ← Back to options
            </Button>
            
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left: Upload & Configuration */}
              <div className="lg:col-span-3 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-accent" />
                      Upload Your File
                    </CardTitle>
                    <CardDescription>
                      Supported formats: STL
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent transition-colors">
                      <input
                        type="file"
                        accept=".stl"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <FileUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        {uploadedFile ? (
                          <p className="font-medium text-secondary">{uploadedFile.name}</p>
                        ) : (
                          <>
                            <p className="font-medium mb-1">Drop your file here or click to browse</p>
                            <p className="text-sm text-muted-foreground">Maximum file size: 25MB</p>
                          </>
                        )}
                      </label>
                    </div>
                    {uploadedFile && uploadedFile.name.toLowerCase().endsWith('.stl') ? (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs text-muted-foreground">Drag to rotate · Scroll to zoom</p>
                        <StlPreview file={uploadedFile} />
                      </div>
                    ) : uploadedFile ? (
                      <p className="mt-3 text-xs text-muted-foreground">3D preview is available for STL files in this beta.</p>
                    ) : null}
                  </CardContent>
                </Card>

                {/* Material Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Material & Specifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Material</Label>
                      <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                        <SelectTrigger>
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

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        RAL Color
                      </Label>
                      <div className="grid grid-cols-8 gap-2">
                        {ralColors.slice(0, 16).map((color) => (
                          <button
                            key={color.code}
                            onClick={() => setSelectedColor(color)}
                            className={`h-8 w-8 rounded-lg border-2 transition-all ${
                              selectedColor?.code === color.code 
                                ? 'border-secondary ring-2 ring-secondary/40' 
                                : 'border-transparent hover:ring-2 hover:ring-secondary/20'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={`${color.code} - ${color.name}`}
                          />
                        ))}
                      </div>
                      {selectedColor && (
                        <p className="text-sm text-muted-foreground">
                          Selected: {selectedColor.code} - {selectedColor.name}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Estimated Weight (grams)</Label>
                        <Input 
                          id="weight" 
                          type="number" 
                          placeholder="e.g., 50"
                          value={estimatedWeight}
                          onChange={(e) => setEstimatedWeight(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Print Time (minutes)</Label>
                        <Input 
                          id="time" 
                          type="number" 
                          placeholder="e.g., 120"
                          value={estimatedPrintTime}
                          onChange={(e) => setEstimatedPrintTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* IP Certification */}
                <Card className="border-accent/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id="ip-certification" 
                        checked={ndaAccepted}
                        onCheckedChange={(checked) => setNdaAccepted(checked as boolean)}
                      />
                      <div className="space-y-1">
                        <Label htmlFor="ip-certification" className="font-medium cursor-pointer">
                          Design Ownership Certification (Required)
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          I certify that I am the original designer or that I have express permission to print this design. I acknowledge that any intellectual property infringement is my sole responsibility.
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
                      Price Estimate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {estimatedPrice ? (
                      <>
                        <div className="text-center py-4">
                          <p className="text-4xl font-bold">${estimatedPrice.toFixed(2)}</p>
                          <p className="text-muted-foreground text-sm mt-1">Estimated total</p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-border">
                          <p className="text-sm font-medium text-muted-foreground">Fee Preview:</p>
                          {(() => {
                            const makerAmount = Math.round(estimatedPrice * 0.80 * 100) / 100;
                            const processingAmount = Math.round(estimatedPrice * 0.03 * 100) / 100;
                            const platformAmount = Math.round((estimatedPrice - makerAmount - processingAmount) * 100) / 100;
                            return (
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="flex items-center gap-2">
                                    <Printer className="h-4 w-4 text-accent" />
                                    Maker earns
                                  </span>
                                  <span className="font-medium">${makerAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between text-muted-foreground">
                                  <span className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Payment processing
                                  </span>
                                  <span>${processingAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-secondary" />
                                    Platform fee
                                  </span>
                                  <span>${platformAmount.toFixed(2)}</span>
                                </div>
                              </div>
                            );
                          })()}
                          <p className="text-xs text-muted-foreground mt-2">You'll see exact amounts before paying.</p>
                        </div>

                        {!showMakers ? (
                          <Button 
                            variant="hero" 
                            className="w-full" 
                            disabled={!uploadedFile || !ndaAccepted}
                            onClick={() => setShowMakers(true)}
                          >
                            Find Local Makers
                          </Button>
                        ) : (
                          <div className="space-y-3">
                            <h3 className="font-semibold text-sm flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-secondary" />
                              Select a Maker
                            </h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Leaf className="h-3 w-3 text-secondary" />
                              Closest makers shown first for zero-KM delivery
                            </p>
                            <div className="space-y-2">
                              {sortedMakers.slice(0, 3).map((makerItem, index) => (
                                <button
                                  key={makerItem.id}
                                  onClick={() => setSelectedMaker(makerItem.id)}
                                  className={cn(
                                    "w-full p-3 rounded-lg border-2 text-left transition-all",
                                    selectedMaker === makerItem.id 
                                      ? "border-secondary bg-secondary/5" 
                                      : "border-border hover:border-secondary/50"
                                  )}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="relative">
                                      <img
                                        src={makerItem.avatar}
                                        alt={makerItem.name}
                                        className="h-10 w-10 rounded-full"
                                      />
                                      {index === 0 && (
                                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs">
                                          1
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <p className="font-semibold text-sm">{makerItem.name}</p>
                                        {makerItem.verified && (
                                          <Badge variant="secondary" className="text-xs h-5">Verified</Badge>
                                        )}
                                      </div>
                                      <p className="text-xs text-muted-foreground">{makerItem.location}</p>
                                      <div className="flex items-center gap-2 mt-1 text-xs">
                                        <span className="flex items-center gap-1">
                                          <Star className="h-3 w-3 fill-accent text-accent" />
                                          {makerItem.rating}
                                        </span>
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                          <Clock className="h-3 w-3" />
                                          {makerItem.leadTime}
                                        </span>
                                      </div>
                                    </div>
                                    {selectedMaker === makerItem.id && (
                                      <Check className="h-4 w-4 text-secondary shrink-0" />
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                            <Button 
                              variant="hero" 
                              className="w-full"
                              disabled={!selectedMaker}
                            >
                              Confirm Order
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Enter material, weight, and print time to see your estimate</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
