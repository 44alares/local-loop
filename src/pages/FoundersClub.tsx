import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Crown, CheckCircle2, User, MapPin, Printer, Palette, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
const roles = [{
  id: 'maker',
  label: 'Maker'
}, {
  id: 'designer',
  label: 'Designer'
}, {
  id: 'buyer',
  label: 'Buyer'
}, {
  id: 'follower',
  label: 'Just following the project'
}];
const printingTypes = ['FDM', 'Resin', 'Both'];
const makerMaterials = ['PLA', 'PETG', 'Nylon', 'Resin'];
const capacityOptions = [{
  value: 'occasional',
  label: 'Occasional (1–2 prints/week)'
}, {
  value: 'regular',
  label: 'Regular (several prints/week)'
}, {
  value: 'high',
  label: 'High (daily)'
}];
const handoffRadiusOptions = ['1–3 km', '5 km', '10+ km'];
const designTypes = ['Basic', 'Functional', 'Artistic'];
const buyerInterests = ['Functional spare parts', 'Home accessories', 'Gaming accessories', 'Organization / mounts', 'Decoration', 'Figures / collectibles'];
const deliveryPreferences = ['In-person', 'Pickup point', 'Shipping'];
const payMoreOptions = ['Yes', 'No', 'Depends'];
export default function FoundersClub() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Required fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [country, setCountry] = useState('');
  const [zipcode, setZipcode] = useState('');

  // Maker optional fields
  const [printingType, setPrintingType] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [capacity, setCapacity] = useState('');
  const [canHandoff, setCanHandoff] = useState<boolean | null>(null);
  const [handoffRadius, setHandoffRadius] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');

  // Designer optional fields
  const [designType, setDesignType] = useState<string[]>([]);
  const [designerPortfolio, setDesignerPortfolio] = useState('');

  // Buyer optional fields
  const [buyerInterest, setBuyerInterest] = useState<string[]>([]);
  const [otherInterest, setOtherInterest] = useState('');
  const [deliveryPref, setDeliveryPref] = useState('');
  const [payMore, setPayMore] = useState('');
  const [payMoreDepends, setPayMoreDepends] = useState('');
  const toggleRole = (roleId: string) => {
    setSelectedRoles(prev => prev.includes(roleId) ? prev.filter(r => r !== roleId) : [...prev, roleId]);
  };
  const toggleArrayItem = (arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setArr(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };
  const isMaker = selectedRoles.includes('maker');
  const isDesigner = selectedRoles.includes('designer');
  const isBuyer = selectedRoles.includes('buyer');
  const canSubmit = name && email && selectedRoles.length > 0 && country && zipcode;
  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);

    // Build submission data
    const formData = {
      name,
      email,
      roles: selectedRoles,
      country,
      zipcode,
      // Maker data
      ...(isMaker && {
        printingType,
        materials,
        capacity,
        canHandoff,
        handoffRadius: canHandoff ? handoffRadius : null,
        portfolioLink
      }),
      // Designer data
      ...(isDesigner && {
        designType,
        designerPortfolio
      }),
      // Buyer data
      ...(isBuyer && {
        buyerInterest,
        otherInterest: buyerInterest.includes('Other') ? otherInterest : null,
        deliveryPref,
        payMore,
        payMoreDepends: payMore === 'Depends' ? payMoreDepends : null
      })
    };
    try {
      // For now, we'll just simulate the email send
      // In production, this would call an edge function
      console.log('Founders Club submission:', formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (submitted) {
    return <Layout>
        <div className="container py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-accent" />
            </div>
            <h1 className="text-display-sm font-bold mb-4">Thanks! We received your details.</h1>
            <p className="text-lg text-muted-foreground mb-8">
              You're now on the Founders Club list. We'll be in touch soon with updates on MakeHug's launch in your area.
            </p>
            <Button variant="hero-accent" asChild>
              <Link to="/">Return to Home</Link>
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
            <Badge variant="secondary" className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Crown className="h-3 w-3 mr-1" />
              Founders Club
            </Badge>
            <h1 className="text-display font-bold mb-4">
              Join the Founders Club
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Zero commitment signup to map country + ZIP/postal code and validate MakeHug's local viability. First 100 makers/designers: permanent Founder badge, and access to the beta testers council.<strong>First 100 makers/designers: 0% platform fee for 6 months</strong>, permanent Founder badge, 
              and access to the beta testers council.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Required Fields */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-accent" />
                Basic Information
              </CardTitle>
              <CardDescription>All fields in this section are required</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Role(s) *</Label>
                <p className="text-sm text-muted-foreground mb-2">Select all that apply</p>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map(role => <button key={role.id} type="button" onClick={() => toggleRole(role.id)} className={`p-3 rounded-lg border-2 text-left transition-all ${selectedRoles.includes(role.id) ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border hover:border-secondary/50'}`}>
                      <div className="flex items-center gap-2">
                        <Checkbox checked={selectedRoles.includes(role.id)} />
                        <span className="font-medium">{role.label}</span>
                      </div>
                    </button>)}
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input id="country" placeholder="Spain, Germany, USA..." value={country} onChange={e => setCountry(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipcode">ZIP / Postal Code *</Label>
                  <Input id="zipcode" placeholder="28001" value={zipcode} onChange={e => setZipcode(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Optional Fields Section */}
          {(isMaker || isDesigner || isBuyer) && <>
              <div className="flex items-center gap-4 py-4">
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground font-medium">Optional (to improve mapping)</span>
                <Separator className="flex-1" />
              </div>

              {/* Maker Fields */}
              {isMaker && <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Printer className="h-5 w-5 text-accent" />
                      Maker Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Printing type</Label>
                      <div className="flex gap-2">
                        {printingTypes.map(type => <button key={type} type="button" onClick={() => toggleArrayItem(printingType, setPrintingType, type)} className={`px-4 py-2 rounded-lg border text-sm transition-all ${printingType.includes(type) ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border hover:border-secondary/50'}`}>
                            {type}
                          </button>)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Materials you can work with</Label>
                      <div className="flex flex-wrap gap-2">
                        {makerMaterials.map(mat => <button key={mat} type="button" onClick={() => toggleArrayItem(materials, setMaterials, mat)} className={`px-4 py-2 rounded-lg border text-sm transition-all ${materials.includes(mat) ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border hover:border-secondary/50'}`}>
                            {mat}
                          </button>)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Approx. capacity</Label>
                      <Select value={capacity} onValueChange={setCapacity}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select capacity" />
                        </SelectTrigger>
                        <SelectContent>
                          {capacityOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Can you offer local handoff?</Label>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setCanHandoff(true)} className={`px-4 py-2 rounded-lg border text-sm transition-all ${canHandoff === true ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border hover:border-secondary/50'}`}>
                          Yes
                        </button>
                        <button type="button" onClick={() => {
                    setCanHandoff(false);
                    setHandoffRadius('');
                  }} className={`px-4 py-2 rounded-lg border text-sm transition-all ${canHandoff === false ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border hover:border-secondary/50'}`}>
                          No
                        </button>
                      </div>
                    </div>

                    {canHandoff && <div className="space-y-2">
                        <Label>Local handoff radius</Label>
                        <div className="flex gap-2">
                          {handoffRadiusOptions.map(radius => <button key={radius} type="button" onClick={() => setHandoffRadius(radius)} className={`px-4 py-2 rounded-lg border text-sm transition-all ${handoffRadius === radius ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border hover:border-secondary/50'}`}>
                              {radius}
                            </button>)}
                        </div>
                      </div>}

                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Profile/portfolio link</Label>
                      <Input id="portfolio" placeholder="Instagram / Etsy / Printables / website" value={portfolioLink} onChange={e => setPortfolioLink(e.target.value)} />
                    </div>
                  </CardContent>
                </Card>}

              {/* Designer Fields */}
              {isDesigner && <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-accent" />
                      Designer Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Design type</Label>
                      <div className="flex gap-2">
                        {designTypes.map(type => <button key={type} type="button" onClick={() => toggleArrayItem(designType, setDesignType, type)} className={`px-4 py-2 rounded-lg border text-sm transition-all ${designType.includes(type) ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border hover:border-secondary/50'}`}>
                            {type}
                          </button>)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="designerPortfolio">Portfolio link</Label>
                      <Input id="designerPortfolio" placeholder="Your portfolio URL" value={designerPortfolio} onChange={e => setDesignerPortfolio(e.target.value)} />
                    </div>
                  </CardContent>
                </Card>}

              {/* Buyer Fields */}
              {isBuyer && <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-accent" />
                      Buyer Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>What would you buy first?</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[...buyerInterests, 'Other'].map(interest => <button key={interest} type="button" onClick={() => toggleArrayItem(buyerInterest, setBuyerInterest, interest)} className={`p-2 rounded-lg border text-sm text-left transition-all ${buyerInterest.includes(interest) ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border hover:border-secondary/50'}`}>
                            {interest}
                          </button>)}
                      </div>
                      {buyerInterest.includes('Other') && <Input placeholder="Tell us more..." value={otherInterest} onChange={e => setOtherInterest(e.target.value)} className="mt-2" />}
                    </div>

                    <div className="space-y-2">
                      <Label>Delivery preference</Label>
                      <div className="flex gap-2">
                        {deliveryPreferences.map(pref => <button key={pref} type="button" onClick={() => setDeliveryPref(pref)} className={`px-4 py-2 rounded-lg border text-sm transition-all ${deliveryPref === pref ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border hover:border-secondary/50'}`}>
                            {pref}
                          </button>)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Would you pay a bit more for local production + standardized quality?</Label>
                      <div className="flex gap-2">
                        {payMoreOptions.map(opt => <button key={opt} type="button" onClick={() => setPayMore(opt)} className={`px-4 py-2 rounded-lg border text-sm transition-all ${payMore === opt ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border hover:border-secondary/50'}`}>
                            {opt}
                          </button>)}
                      </div>
                      {payMore === 'Depends' && <Textarea placeholder="What does it depend on?" value={payMoreDepends} onChange={e => setPayMoreDepends(e.target.value)} className="mt-2" />}
                    </div>
                  </CardContent>
                </Card>}
            </>}

          {/* Submit */}
          <div className="pt-4 space-y-3">
            <Button variant="hero-accent" className="w-full" size="xl" disabled={!canSubmit || isSubmitting} onClick={handleSubmit}>
              {isSubmitting ? 'Submitting...' : 'Join the Founders Club'}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              We'll use this only to map the beta network and contact you. You can unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </Layout>;
}