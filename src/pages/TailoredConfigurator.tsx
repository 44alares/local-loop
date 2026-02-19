import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ChevronRight, Info, MapPin, Star, Clock, Check, Leaf, Store, Search, Loader2, Truck, Heart, Share2, Shield, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTailoredProduct } from '@/data/tailoredProducts';
import { TailoredViewer } from '@/components/tailored/TailoredViewer';
import { RequestProductionModal } from '@/components/tailored/RequestProductionModal';
import { ProductConfigurator, ConfigState, BreakdownRows } from '@/components/product/ProductConfigurator';
import { calculateFullBreakdown, getShippingOptions } from '@/lib/pricing';
import { computeTailoredMultiplier } from '@/lib/tailoredPricing';
import { mockMakers, mockProducts } from '@/data/mockData';
import type { Product } from '@/types';

export default function TailoredConfigurator() {
  const { product: productSlug } = useParams<{ product: string }>();
  const tailoredProduct = getTailoredProduct(productSlug || '');

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMaker, setSelectedMaker] = useState<string | null>(null);
  const [locationSearch, setLocationSearch] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('direct-pickup');
  const [quantity, setQuantity] = useState(1);
  const [buyerPrice, setBuyerPrice] = useState(0);
  const [config, setConfig] = useState<ConfigState | null>(null);

  // Initialize params with defaults
  const [params, setParams] = useState<Record<string, number | boolean>>(() => {
    if (!tailoredProduct) return {};
    const defaults: Record<string, number | boolean> = {};
    tailoredProduct.params.forEach(p => {
      defaults[p.key] = p.type === 'toggle' ? p.default === 1 : p.default;
    });
    return defaults;
  });

  // Compute tailored base price from slider positions
  const tailoredBasePrice = useMemo(() => {
    if (!tailoredProduct) return 20;
    const multiplier = computeTailoredMultiplier(params, tailoredProduct.params);
    return Math.round(tailoredProduct.price * multiplier * 100) / 100;
  }, [params, tailoredProduct]);

  // Create a fake Product object for ProductConfigurator
  // ProductConfigurator will apply material/quality surcharges on top of this base price
  const fakeProduct = useMemo<Product>(() => {
    const base = mockProducts[0];
    return {
      ...base,
      id: tailoredProduct?.id || 'tailored',
      name: tailoredProduct?.name || '',
      description: tailoredProduct?.description || '',
      price: tailoredBasePrice,
      category: 'functional',
      productType: 'functional',
      materials: ['PLA', 'PETG'],
      supportedQualities: ['standard', 'premium'],
      supports_multicolor: false,
      personalizable: false,
    };
  }, [tailoredBasePrice, tailoredProduct]);

  const shippingOptions = getShippingOptions();
  const selectedShippingOption = shippingOptions.find(o => o.id === selectedShipping);
  const shippingCost = selectedShippingOption?.price || 0;

  const breakdown = useMemo(() => calculateFullBreakdown(buyerPrice || tailoredBasePrice, 'functional'), [buyerPrice, tailoredBasePrice]);
  const totalPrice = (breakdown.buyerPrice + shippingCost) * quantity;

  if (!tailoredProduct) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild variant="secondary">
            <Link to="/tailored">← Back to Tailored</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const updateParam = (key: string, value: number | boolean) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const sortedMakers = [...mockMakers].sort((a, b) => b.rating - a.rating);
  const maker = selectedMaker ? mockMakers.find(m => m.id === selectedMaker) : null;

  return (
    <Layout>
      <div className="container py-6 max-w-full overflow-x-hidden">
        {/* Back + Breadcrumb */}
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/tailored">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tailored
            </Link>
          </Button>
        </div>

        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">MakeHug</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/tailored" className="hover:text-foreground transition-colors">Tailored</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{tailoredProduct.name}</span>
        </nav>

        {/* Product Header */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{tailoredProduct.name}</h1>
            {tailoredProduct.setOf && (
              <Badge variant="secondary" className="text-xs">Set of {tailoredProduct.setOf} units</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{tailoredProduct.description}</p>
        </div>

        {/* 3D Viewer + Sliders Panel */}
        <div className="rounded-xl border border-border bg-card overflow-hidden mb-8">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-sm">Customize your measurements</h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-0">
            {/* Canvas — 60% */}
            <div className="lg:col-span-3 min-h-[360px] md:min-h-[480px] w-full max-w-full overflow-hidden">
              <TailoredViewer product={tailoredProduct} params={params} />
            </div>

            {/* Sliders — 40% */}
            <div className="lg:col-span-2 p-5 space-y-5 border-t lg:border-t-0 lg:border-l border-border">
              {tailoredProduct.params.map(p => (
                <div key={p.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{p.label}</Label>
                    {p.type === 'toggle' ? (
                      <Switch
                        checked={params[p.key] as boolean}
                        onCheckedChange={(checked) => updateParam(p.key, checked)}
                      />
                    ) : (
                      <span className="text-sm font-bold text-secondary">
                        {params[p.key]}{p.unit ? ` ${p.unit}` : ''}
                      </span>
                    )}
                  </div>

                  {p.type === 'slider' && (
                    <>
                      <Slider
                        min={p.min}
                        max={p.max}
                        step={p.step}
                        value={[params[p.key] as number]}
                        onValueChange={([v]) => updateParam(p.key, v)}
                        className="[&_[role=slider]]:bg-secondary [&_[role=slider]]:border-secondary [&_.relative>div]:bg-secondary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{p.min}{p.unit ? ` ${p.unit}` : ''}</span>
                        <span>{p.max}{p.unit ? ` ${p.unit}` : ''}</span>
                      </div>
                    </>
                  )}

                  {p.type === 'integer' && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateParam(p.key, Math.max(p.min, (params[p.key] as number) - 1))}
                        disabled={(params[p.key] as number) <= p.min}
                      >
                        −
                      </Button>
                      <span className="w-10 text-center font-semibold text-sm">{params[p.key]}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateParam(p.key, Math.min(p.max, (params[p.key] as number) + 1))}
                        disabled={(params[p.key] as number) >= p.max}
                      >
                        +
                      </Button>
                      <span className="text-xs text-muted-foreground ml-2">
                        {p.min}–{p.max}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {/* Parameter summary */}
              <div className="pt-3 border-t border-border space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Summary</p>
                {tailoredProduct.params.map(p => (
                  <div key={p.key} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{p.label}</span>
                    <span className="font-medium">
                      {p.type === 'toggle'
                        ? (params[p.key] ? 'Yes' : 'No')
                        : `${params[p.key]}${p.unit ? ` ${p.unit}` : ''}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reuse standard product detail layout below */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-6">
            {/* Now Price card */}
            <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 inline-flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">Now Price</span>
              <span className="text-2xl font-bold">{breakdown.buyerPrice.toFixed(2)}</span>
            </div>

            {/* Reuse ProductConfigurator from /shop — Material, Quality, Color selectors */}
            <ProductConfigurator
              product={fakeProduct}
              selectedMakerId={selectedMaker}
              onPriceChange={setBuyerPrice}
              onConfigChange={setConfig}
            />

            {/* Find a Maker */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4 text-secondary" />
                Find a Maker Near You
              </h3>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter your zipcode or city..."
                  value={locationSearch}
                  onChange={e => {
                    setLocationSearch(e.target.value);
                    if (searchSubmitted) {
                      setSearchSubmitted(false);
                      setSelectedMaker(null);
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && locationSearch.trim().length >= 3 && !isSearching) {
                      setIsSearching(true);
                      setSearchSubmitted(false);
                      setSelectedMaker(null);
                      setTimeout(() => { setIsSearching(false); setSearchSubmitted(true); }, 600);
                    }
                  }}
                  className="pl-9 pr-10 h-10 text-sm"
                />
                <button
                  type="button"
                  disabled={locationSearch.trim().length < 3 || isSearching}
                  onClick={() => {
                    setIsSearching(true);
                    setSearchSubmitted(false);
                    setSelectedMaker(null);
                    setTimeout(() => { setIsSearching(false); setSearchSubmitted(true); }, 600);
                  }}
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-md flex items-center justify-center transition-colors",
                    locationSearch.trim().length >= 3 && !isSearching
                      ? "text-secondary hover:bg-secondary/10 cursor-pointer"
                      : "text-muted-foreground/40 cursor-not-allowed"
                  )}
                >
                  {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </button>
              </div>

              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Leaf className="h-3 w-3 text-secondary" />
                Closest makers shown first for zero-KM delivery
              </p>

              {isSearching && (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching…
                </p>
              )}

              {searchSubmitted && !isSearching && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Select one</p>
                  {sortedMakers.slice(0, 3).map((makerItem, index) => (
                    <button
                      key={makerItem.id}
                      onClick={() => setSelectedMaker(makerItem.id)}
                      className={cn(
                        "w-full p-3 rounded-lg border-2 text-left transition-all",
                        selectedMaker === makerItem.id ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <img src={makerItem.avatar} alt={makerItem.name} className="h-10 w-10 rounded-full" />
                          {index === 0 && <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs">1</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm">{makerItem.name}</p>
                            {makerItem.verified && <Badge variant="secondary" className="text-xs h-5">Verified</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground">{index === 0 ? '0.5 km away' : index === 1 ? '0.8 km away' : '1.2 km away'}</p>
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
                        {selectedMaker === makerItem.id && <Check className="h-4 w-4 text-secondary shrink-0" />}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Delivery Options + Quantity — shown after maker selected (same as /shop) */}
            {maker && (
              <div className="space-y-4 animate-fade-in">
                {/* Quantity */}
                <div>
                  <h3 className="font-semibold text-sm mb-2">Quantity</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      -
                    </Button>
                    <span className="w-10 text-center font-medium text-sm">{quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                      +
                    </Button>
                  </div>
                </div>

                {/* Shipping Options — reused from /shop */}
                <div>
                  <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Delivery Option
                  </h3>
                  <div className="space-y-2">
                    {shippingOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedShipping(option.id)}
                        className={cn(
                          "w-full p-3 rounded-lg border-2 text-left transition-all flex items-center justify-between",
                          selectedShipping === option.id ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/50"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {option.id === 'direct-pickup' ? <MapPin className="h-4 w-4 text-secondary" /> : option.id === 'local-point' ? <Store className="h-4 w-4 text-accent" /> : <Truck className="h-4 w-4 text-muted-foreground" />}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">{option.name}</p>
                              {option.isRecommended && <Badge variant="secondary" className="text-xs h-5">Recommended</Badge>}
                            </div>
                            <p className="text-xs text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={cn("font-semibold text-sm", option.price === 0 && "text-secondary")}>
                            {option.price === 0 ? 'FREE' : option.price.toFixed(2)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Price Breakdown */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Info className="h-3.5 w-3.5 text-secondary" />
                  Fees & Payout Breakdown
                </div>
                <BreakdownRows breakdown={breakdown} productType="functional" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="lg"
                className="flex-1"
                onClick={() => setModalOpen(true)}
              >
                Request Production — {totalPrice.toFixed(2)}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
              <div className="text-center">
                <Shield className="h-5 w-5 mx-auto mb-1 text-secondary" />
                <p className="text-xs text-muted-foreground">Verified Makers</p>
              </div>
              <div className="text-center">
                <Leaf className="h-5 w-5 mx-auto mb-1 text-secondary" />
                <p className="text-xs text-muted-foreground">Zero-KM Delivery</p>
              </div>
              <div className="text-center">
                <Package className="h-5 w-5 mx-auto mb-1 text-secondary" />
                <p className="text-xs text-muted-foreground">Quality Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Production Modal */}
      <RequestProductionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={tailoredProduct}
        params={params}
        buyerPrice={buyerPrice || tailoredBasePrice}
      />
    </Layout>
  );
}
