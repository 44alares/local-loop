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

// Basic required colors
const basicColors = [
  { id: 'white', name: 'RAL 9003 - Signal White', hex: '#F4F8F4' },
  { id: 'black', name: 'RAL 9005 - Jet Black', hex: '#0A0A0D' },
  { id: 'grey', name: 'RAL 7035 - Light Grey', hex: '#C5C7C4' },
  { id: 'natural', name: 'Natural PLA', hex: '#E8DCC4' },
];

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
  const [basicColorsChecked, setBasicColorsChecked] = useState<Record<string, boolean>>({
    white: false,
    black: false,
    grey: false,
    natural: false,
  });
  const [additionalColors, setAdditionalColors] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [qualityAccepted, setQualityAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const allBasicColorsChecked = Object.values(basicColorsChecked).every(v => v);
  
  const canSubmit = 
    fullName && 
    email && 
    address && 
    city && 
    country && 
    zipcode && 
    machineType && 
    dailyHours && 
    allBasicColorsChecked && 
    ndaAccepted && 
    qualityAccepted;

  const handleBasicColorToggle = (colorId: string) => {
    setBasicColorsChecked(prev => ({
      ...prev,
      [colorId]: !prev[colorId]
    }));
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
              Become a verified maker and earn 75% of every sale. Complete the registration below to get started.
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
                <Label htmlFor="address">Full Address *</Label>
                <Input 
                  id="address" 
                  placeholder="123 Main Street, Apt 4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
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
                You must have all basic colors in stock to register
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Label>Basic Colors in Stock (All Required) *</Label>
                  {!allBasicColorsChecked && (
                    <Badge variant="outline" className="text-accent border-accent">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      All required
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {basicColors.map((color) => (
                    <div 
                      key={color.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                        basicColorsChecked[color.id] 
                          ? 'border-secondary bg-secondary/5' 
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <Checkbox 
                        id={color.id}
                        checked={basicColorsChecked[color.id]}
                        onCheckedChange={() => handleBasicColorToggle(color.id)}
                      />
                      <div 
                        className="h-6 w-6 rounded-md border border-border"
                        style={{ backgroundColor: color.hex }}
                      />
                      <Label htmlFor={color.id} className="cursor-pointer text-sm">
                        {color.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalColors">Additional RAL Colors (Optional)</Label>
                <Input 
                  id="additionalColors" 
                  placeholder="e.g., RAL 3020 - Traffic Red, RAL 5015 - Sky Blue"
                  value={additionalColors}
                  onChange={(e) => setAdditionalColors(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple colors with commas
                </p>
              </div>
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
              onClick={() => setSubmitted(true)}
            >
              Submit Application
            </Button>
            {!canSubmit && (
              <p className="text-sm text-center text-muted-foreground mt-3">
                Please complete all required fields, check all basic colors, and accept the terms
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
