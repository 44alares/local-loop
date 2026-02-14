import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Printer,
  User,
  MapPin,
  Settings,
  Palette,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Materials and their required basic colors
type MaterialType = 'PLA' | 'PETG' | 'ABS' | 'Nylon' | 'Resin';

const materialBasicColors: Record<MaterialType, { name: string; hex: string; ral: string }[]> = {
  PLA: [
    { name: 'White', hex: '#F4F8F4', ral: 'RAL 9010' },
    { name: 'Black', hex: '#0A0A0D', ral: 'RAL 9005' },
    { name: 'Grey', hex: '#C5C7C4', ral: 'RAL 7035' },
    { name: 'Red', hex: '#CC0605', ral: 'RAL 3020' },
    { name: 'Blue', hex: '#007CB0', ral: 'RAL 5015' },
    { name: 'Green', hex: '#57A639', ral: 'RAL 6018' },
  ],
  ABS: [
    { name: 'Black', hex: '#0A0A0D', ral: 'RAL 9005' },
    { name: 'White', hex: '#F4F8F4', ral: 'RAL 9010' },
    { name: 'Grey', hex: '#C5C7C4', ral: 'RAL 7035' },
  ],
  PETG: [
    { name: 'Black', hex: '#0A0A0D', ral: 'RAL 9005' },
    { name: 'White', hex: '#F4F8F4', ral: 'RAL 9010' },
    { name: 'Grey', hex: '#C5C7C4', ral: 'RAL 7035' },
  ],
  Resin: [
    { name: 'Grey', hex: '#C5C7C4', ral: 'RAL 7035' },
    { name: 'White', hex: '#F4F8F4', ral: 'RAL 9010' },
  ],
  Nylon: [
    { name: 'Black', hex: '#0A0A0D', ral: 'RAL 9005' },
    { name: 'Grey', hex: '#C5C7C4', ral: 'RAL 7035' },
    { name: 'White', hex: '#F4F8F4', ral: 'RAL 9010' },
  ],
};

const materials: MaterialType[] = ['PLA', 'PETG', 'ABS', 'Nylon', 'Resin'];

// RAL additional colors available per material (same set for all, labeled as RAL approx.)
import { ralColors } from '@/data/ralColors';

const machineTypes = ['FDM', 'Resin', 'Both'];

export default function JoinAsMaker() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [machineType, setMachineType] = useState('');
  const [machineCount, setMachineCount] = useState('1');
  const [dailyHours, setDailyHours] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<MaterialType[]>([]);
  const [additionalRalColors, setAdditionalRalColors] = useState<Record<MaterialType, string[]>>({
    PLA: [], PETG: [], ABS: [], Nylon: [], Resin: [],
  });
  // ndaAccepted removed — covered by makerTermsAccepted
  const [qualityAccepted, setQualityAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [makerTermsOpened, setMakerTermsOpened] = useState(false);
  const [makerTermsAccepted, setMakerTermsAccepted] = useState(false);
  const [makerTermsOpen, setMakerTermsOpen] = useState(false);

  // Collect all basic colors and RAL codes across selected materials
  const allBasicColors = selectedMaterials.flatMap(m => materialBasicColors[m]);
  const allBasicRalCodes = [...new Set(allBasicColors.map(c => c.ral))];

  const handleMaterialToggle = (mat: MaterialType) => {
    setSelectedMaterials(prev => {
      const next = prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat];
      // Clear additional colors for unchecked material
      if (!next.includes(mat)) {
        setAdditionalRalColors(ar => ({ ...ar, [mat]: [] }));
      }
      return next;
    });
  };
  
  const canSubmit = 
    fullName && 
    email && 
    city && 
    country && 
    zipcode && 
    selectedMaterials.length > 0 &&
    makerTermsAccepted && 
    qualityAccepted;

  const handleRemoveAdditionalColor = (mat: MaterialType, code: string) => {
    setAdditionalRalColors(prev => ({ ...prev, [mat]: prev[mat].filter(c => c !== code) }));
  };

  const handleAddAdditionalColor = (mat: MaterialType, code: string) => {
    if (!additionalRalColors[mat].includes(code)) {
      setAdditionalRalColors(prev => ({ ...prev, [mat]: [...prev[mat], code] }));
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="container py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-secondary" />
            </div>
            <h1 className="text-display-sm font-bold mb-4">Message Sent!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your email client should have opened with your message. If not, please send an email directly to hello@makehug.com
            </p>
            <Button variant="hero" onClick={() => setSubmitted(false)}>
              Send Another Message
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Printer className="h-3 w-3 mr-1" />
              For Makers
            </Badge>
            <h1 className="text-display font-bold mb-4">
              Join as Maker
            </h1>
            <p className="text-xl text-muted-foreground">
              Become a verified maker and earn the majority of every print. Complete the registration below to get started.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-accent" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input 
                    id="fullName" 
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                Location
              </CardTitle>
              <CardDescription>
                Your location is used to match you with nearby buyers for zero-KM delivery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Full Address (Optional)</Label>
                <Input 
                  id="address" 
                  placeholder="123 Main Street, Apt 4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Optional - helps with local pickup coordination</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input 
                    id="city" 
                    placeholder="Madrid"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input 
                    id="country" 
                    placeholder="Spain"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipcode">Zipcode *</Label>
                  <Input 
                    id="zipcode" 
                    placeholder="28001"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-accent" />
                Equipment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="machineType">Machine Type</Label>
                <Select value={machineType} onValueChange={setMachineType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your printer" />
                  </SelectTrigger>
                  <SelectContent>
                    {machineTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="machineCount">Number of Machines</Label>
                  <Input 
                    id="machineCount" 
                    type="number"
                    min="1"
                    max="20"
                    value={machineCount}
                    onChange={(e) => setMachineCount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dailyHours">Daily Availability (Hours/Day)</Label>
                  <Input 
                    id="dailyHours" 
                    type="number"
                    min="1"
                    max="24"
                    placeholder="8"
                    value={dailyHours}
                    onChange={(e) => setDailyHours(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Materials & Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-accent" />
                Materials & Colors
              </CardTitle>
              <CardDescription>
                Select your material first, then review the required basic colors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Material selection - multi-select checkboxes */}
              <div className="space-y-3">
                <Label>Material *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {materials.map((m) => (
                    <div
                      key={m}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                        selectedMaterials.includes(m)
                          ? 'border-secondary bg-secondary/5'
                          : 'border-border hover:border-muted-foreground'
                      }`}
                      onClick={() => handleMaterialToggle(m)}
                    >
                      <Checkbox
                        checked={selectedMaterials.includes(m)}
                        onCheckedChange={() => handleMaterialToggle(m)}
                      />
                      <Label className="cursor-pointer text-sm font-medium">{m}</Label>
                    </div>
                  ))}
                </div>
                {selectedMaterials.length === 0 && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Select at least one material.
                  </p>
                )}
              </div>

              {selectedMaterials.length > 0 && (
                <>
                  {/* Basic colors per material */}
                  {selectedMaterials.map((mat) => {
                    const matColors = materialBasicColors[mat];
                    return (
                      <div key={mat} className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Checkbox id={`basic-${mat}`} checked={true} disabled />
                          <Label htmlFor={`basic-${mat}`} className="font-medium">
                            {mat} — basic colors (required)
                          </Label>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-7">
                          {matColors.map((color) => (
                            <Badge key={`${mat}-${color.name}`} variant="secondary" className="gap-1.5 py-1 px-2.5">
                              <div className="h-3 w-3 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                              <div className="flex flex-col leading-tight">
                                <span>{color.name}</span>
                                <span className="text-[10px] text-white font-normal">{color.ral}</span>
                              </div>
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground ml-7">
                          Basic colors: {matColors.length} included
                        </p>
                      </div>
                    );
                  })}

                  {/* Additional RAL colors per material */}
                  {selectedMaterials.map((mat) => {
                    const matBasicCodes = materialBasicColors[mat].map(c => c.ral);
                    const matAdditional = additionalRalColors[mat];
                    return (
                      <div key={`additional-${mat}`} className="space-y-3">
                        <Label>{mat} — Additional colors (RAL approx.)</Label>
                        <Select onValueChange={(code) => handleAddAdditionalColor(mat, code)} value="">
                          <SelectTrigger>
                            <SelectValue placeholder={`Add RAL color for ${mat}…`} />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {ralColors
                              .filter(c => !matAdditional.includes(c.code) && !matBasicCodes.includes(c.code))
                              .map((color) => (
                                <SelectItem key={color.code} value={color.code}>
                                  <span className="flex items-center gap-2">
                                    <span className="inline-block h-3 w-3 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                                    {color.code} (approx.) – {color.name}
                                  </span>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        {matAdditional.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {matAdditional.map((code) => {
                              const c = ralColors.find(r => r.code === code);
                              return (
                                <Badge
                                  key={code}
                                  variant="outline"
                                  className="gap-1.5 py-1 px-2.5 cursor-pointer hover:bg-destructive/10 hover:border-destructive/30"
                                  onClick={() => handleRemoveAdditionalColor(mat, code)}
                                >
                                  <div className="h-3 w-3 rounded-full border border-border" style={{ backgroundColor: c?.hex }} />
                                  {c?.code} – {c?.name}
                                  <span className="text-muted-foreground ml-0.5">×</span>
                                </Badge>
                              );
                            })}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Additional colors: {matAdditional.length} selected
                        </p>
                      </div>
                    );
                  })}
                </>
              )}
            </CardContent>
          </Card>

          {/* Maker terms */}
          <Card className="border-accent/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                Maker terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Summary bullets */}
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Platform-only terms: applies only to MakeHug orders and payouts.</li>
                <li>Use STL/3MF only for the assigned order and quantity.</li>
                <li>No redistribution or reuse for other orders.</li>
                <li>Keep files secure and delete after completion/cancellation.</li>
                <li>Violations can lead to suspension and payout loss.</li>
              </ul>

              {/* Collapsible full terms */}
              <Collapsible open={makerTermsOpen} onOpenChange={(open) => {
                setMakerTermsOpen(open);
                if (open) setMakerTermsOpened(true);
              }}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full justify-between text-sm">
                    {makerTermsOpen ? 'Hide full terms' : 'Show full terms'}
                    {makerTermsOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-3 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground space-y-3 max-h-[400px] overflow-y-auto">
                    <p className="font-bold text-foreground">MakeHug Maker Manufacturing Terms (Platform-only)</p>
                    <p><strong className="text-foreground">Scope.</strong> These terms apply only to orders accepted and fulfilled on MakeHug. External contracts are separate and do not change MakeHug's platform rules unless MakeHug explicitly agrees in writing.</p>
                    <p><strong className="text-foreground">Order-limited license.</strong> For each accepted MakeHug order, you may download and use the provided STL/3MF only to prepare and manufacture the ordered quantity for that specific order.</p>
                    <p><strong className="text-foreground">No redistribution / no reuse.</strong> You may not redistribute, publish, sell, or share the file (or derivatives) and may not reuse it for other orders or clients.</p>
                    <p><strong className="text-foreground">Security &amp; deletion.</strong> You must take reasonable steps to secure the file while you have it. Once the order is completed or cancelled and the dispute window has closed, you must permanently delete all digital copies from your computers, SD cards, and any cloud storage. Exceptions apply only where retention is required by law.</p>
                    <p><strong className="text-foreground">No extra prints / no marketing use.</strong> You may not print additional copies for personal use, direct sale, gifts, display, marketing, or portfolio purposes without the Designer's express prior written consent.</p>
                    <p><strong className="text-foreground">Enforcement.</strong> Violations may result in suspension and loss of access to orders and payouts.</p>
                    <p><strong className="text-foreground">Acceptance.</strong> You must actively accept these terms (checkbox) before proceeding.</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="maker-terms"
                  checked={makerTermsAccepted}
                  onCheckedChange={(checked) => setMakerTermsAccepted(checked as boolean)}
                  disabled={!makerTermsOpened}
                />
                <div className="space-y-1">
                  <Label htmlFor="maker-terms" className={`font-medium cursor-pointer ${!makerTermsOpened ? 'text-muted-foreground/50' : ''}`}>
                    I agree to the Maker Manufacturing Terms (platform-only). *
                    {!makerTermsOpened && <span className="block text-xs text-muted-foreground mt-0.5">Open "Show full terms" first to enable this.</span>}
                  </Label>
                </div>
              </div>

              {/* Quality checkbox */}
              <div className="pt-2 border-t border-border space-y-4">

                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="quality" 
                    checked={qualityAccepted}
                    onCheckedChange={(checked) => setQualityAccepted(checked as boolean)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="quality" className="font-medium cursor-pointer">
                      I certify I meet the quality standards *
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      I confirm my equipment is properly calibrated (±0.2mm tolerance) and I will use materials consistent with the designer's "Real-Scale Proof".
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="pt-4">
            <Button 
              variant="hero-accent" 
              className="w-full" 
              size="xl"
              disabled={!canSubmit}
              onClick={() => {
                const bodyContent = `Name: ${fullName}\nEmail: ${email}\nAddress: ${address}\nCity: ${city}\nCountry: ${country}\nZipcode: ${zipcode}\nMachine Type: ${machineType}\nMachine Count: ${machineCount}\nDaily Hours: ${dailyHours}\nMaterials: ${selectedMaterials.join(', ')}\nBasic Colors: ${allBasicColors.map(c => c.name).join(', ')}\nAdditional Colors: ${JSON.stringify(Object.fromEntries(selectedMaterials.map(m => [m, additionalRalColors[m]])))}`;
                const mailtoLink = `mailto:hello@makehug.com?subject=${encodeURIComponent('join as maker')}&body=${encodeURIComponent(bodyContent)}`;
                window.location.href = mailtoLink;
                setSubmitted(true);
              }}
            >
              Submit Application
            </Button>
            {!canSubmit && (
              <p className="text-sm text-center text-muted-foreground mt-3">
                Please complete all required fields, select a material, and accept the terms
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
