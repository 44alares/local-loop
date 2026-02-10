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
import {
  Printer,
  User,
  MapPin,
  Settings,
  Palette,
  FileText,
  CheckCircle2,
  AlertCircle,
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

const machineTypes = [
  'FDM - Prusa i3 MK3S+',
  'FDM - Prusa MK4',
  'FDM - Creality Ender 3',
  'FDM - Creality CR-10',
  'FDM - Bambu Lab X1',
  'FDM - Bambu Lab P1S',
  'FDM - Voron 2.4',
  'SLA - Anycubic Photon',
  'SLA - Elegoo Mars',
  'SLA - Formlabs Form 3',
  'SLS - Sinterit Lisa',
  'Other',
];

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
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | ''>('');
  const [additionalRalColors, setAdditionalRalColors] = useState<string[]>([]);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [qualityAccepted, setQualityAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const basicColors = selectedMaterial ? materialBasicColors[selectedMaterial] : [];
  const basicRalCodes = basicColors.map(c => c.ral);

  const handleMaterialChange = (v: string) => {
    const mat = v as MaterialType;
    setSelectedMaterial(mat);
    // Remove any additional colors that are now basic for the new material
    const newBasicCodes = materialBasicColors[mat].map(c => c.ral);
    setAdditionalRalColors(prev => prev.filter(code => !newBasicCodes.includes(code)));
  };
  
  const canSubmit = 
    fullName && 
    email && 
    city && 
    country && 
    zipcode && 
    machineType && 
    dailyHours && 
    selectedMaterial &&
    ndaAccepted && 
    qualityAccepted;

  const handleRemoveAdditionalColor = (code: string) => {
    setAdditionalRalColors(prev => prev.filter(c => c !== code));
  };

  const handleAddAdditionalColor = (code: string) => {
    if (!additionalRalColors.includes(code)) {
      setAdditionalRalColors(prev => [...prev, code]);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="container py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-accent" />
            </div>
            <h1 className="text-display-sm font-bold mb-4">Application Submitted!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for applying to become a MakeHug Maker! Our team will review your application and verify your equipment within 48-72 hours.
            </p>
            <Button variant="hero-accent" asChild>
              <Link to="/">Return to Home</Link>
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
                <Label htmlFor="machineType">Machine Type *</Label>
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
                  <Label htmlFor="machineCount">Number of Machines *</Label>
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
                  <Label htmlFor="dailyHours">Daily Availability (Hours/Day) *</Label>
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
              {/* Material selection */}
              <div className="space-y-2">
                <Label>Material *</Label>
                <Select value={selectedMaterial} onValueChange={handleMaterialChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your material" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedMaterial && (
                <>
                  {/* Basic colors - mandatory, single toggle always ON */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Checkbox id="basic-colors-toggle" checked={true} disabled />
                      <Label htmlFor="basic-colors-toggle" className="font-medium">
                        Include basic colors (required)
                      </Label>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-7">
                      {basicColors.map((color) => (
                        <Badge key={color.name} variant="secondary" className="gap-1.5 py-1 px-2.5">
                          <div className="h-3 w-3 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                          <div className="flex flex-col leading-tight">
                            <span>{color.name}</span>
                            <span className="text-[10px] text-white font-normal">{color.ral}</span>
                          </div>
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground ml-7">
                      Basic colors: {basicColors.length} included
                    </p>
                  </div>

                  {/* Additional RAL colors */}
                  <div className="space-y-3">
                    <Label>Additional colors (RAL approx.)</Label>
                    <Select onValueChange={handleAddAdditionalColor} value="">
                      <SelectTrigger>
                        <SelectValue placeholder="Add additional RAL color…" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {ralColors
                          .filter(c => !additionalRalColors.includes(c.code) && !basicRalCodes.includes(c.code))
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
                    {additionalRalColors.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {additionalRalColors.map((code) => {
                          const c = ralColors.find(r => r.code === code);
                          return (
                            <Badge
                              key={code}
                              variant="outline"
                              className="gap-1.5 py-1 px-2.5 cursor-pointer hover:bg-destructive/10 hover:border-destructive/30"
                              onClick={() => handleRemoveAdditionalColor(code)}
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
                      Additional colors: {additionalRalColors.length} selected
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Legal Section */}
          <Card className="border-accent/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                Legal Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link 
                to="/nda-terms" 
                className="text-secondary underline hover:text-secondary/80 text-sm font-medium"
              >
                Read full Non-Disclosure Agreement →
              </Link>

              <div className="flex items-start gap-3">
                <Checkbox 
                  id="nda" 
                  checked={ndaAccepted}
                  onCheckedChange={(checked) => setNdaAccepted(checked as boolean)}
                />
                <div className="space-y-1">
                  <Label htmlFor="nda" className="font-medium cursor-pointer">
                    I accept the Non-Disclosure Agreement *
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I agree not to commercialize, share, or distribute any designer files I receive through MakeHug.
                  </p>
                </div>
              </div>

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
                // Log submission data (in production, would send email to alaresinnova@gmail.com)
                console.log('Maker application submitted:', {
                  fullName,
                  email,
                  address,
                  city,
                  country,
                  zipcode,
                  machineType,
                  machineCount,
                  dailyHours,
                  material: selectedMaterial,
                  basicColorsIncluded: true,
                  basicColors: basicColors.map(c => c.name),
                  additionalColorsRalApprox: additionalRalColors,
                });
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
