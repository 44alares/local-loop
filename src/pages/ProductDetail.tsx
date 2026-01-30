import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { mockProducts, mockMakers, mockReviews } from '@/data/mockData';
import { ralColors } from '@/data/ralColors';
import { calculatePriceBreakdown, getShippingOptions, COMMISSION_RATES } from '@/lib/pricing';
import { 
  ArrowLeft, Heart, Share2, Star, MapPin, Clock, 
  Package, Shield, Truck, ChevronRight, Check,
  Palette, Printer, Building2, CreditCard, Leaf, Store
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedMaker, setSelectedMaker] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedShipping, setSelectedShipping] = useState('direct-pickup');
  const [quantity, setQuantity] = useState(1);
  const [locationSearch, setLocationSearch] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(false);

  const maker = selectedMaker ? mockMakers.find((m) => m.id === selectedMaker) : null;
  const shippingOptions = getShippingOptions();
  const selectedShippingOption = shippingOptions.find(o => o.id === selectedShipping);

  // Calculate price breakdown with new commission rates
  const basePrice = product.price;
  const priceBreakdown = calculatePriceBreakdown(basePrice);
  const shippingCost = selectedShippingOption?.price || 0;
  const totalPrice = (basePrice + shippingCost) * quantity;

  // Sort makers by distance (mock: just shuffle for demo)
  const sortedMakers = [...mockMakers].sort((a, b) => {
    // In real app, would sort by distance from user location
    return a.rating > b.rating ? -1 : 1;
  });

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="capitalize">{product.category}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                      selectedImage === index ? "border-secondary" : "border-transparent"
                    )}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <Badge variant="secondary" className="mb-3 capitalize">
                {product.category}
              </Badge>
              <h1 className="text-display-sm font-bold mb-4">{product.name}</h1>
              
              {/* Designer */}
              <Link 
                to={`/designer/${product.designer.id}`}
                className="inline-flex items-center gap-3 group"
              >
                <img
                  src={product.designer.avatar}
                  alt={product.designer.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium group-hover:text-secondary transition-colors">
                    {product.designer.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{product.designer.location}</p>
                </div>
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {product.makerCount} makers available
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold">${product.price}</span>
                <span className="text-muted-foreground">{product.currency}</span>
              </div>
              
              {/* Price Breakdown - Updated Commission */}
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground mb-3">Your purchase supports:</p>
                <div className="flex items-center gap-2">
                  <Printer className="h-4 w-4 text-accent" />
                  <span>Maker: ${priceBreakdown.makerEarnings.toFixed(2)} (75%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-secondary" />
                  <span>Platform: ${priceBreakdown.platformFee.toFixed(2)} (14%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  <span>Designer: ${priceBreakdown.designerRoyalty.toFixed(2)} (8%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Payment: ${priceBreakdown.paymentGatewayFee.toFixed(2)} (3%)</span>
                </div>
              </div>
            </div>

            {/* Smart Maker Search with Geofencing */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                Find a Maker Near You
              </h3>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Enter your zipcode or city..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Leaf className="h-4 w-4 text-secondary" />
                Closest makers shown first for zero-KM delivery
              </p>

              {/* Maker Cards */}
              <div className="space-y-3">
                {sortedMakers.map((makerItem, index) => (
                  <button
                    key={makerItem.id}
                    onClick={() => {
                      setSelectedMaker(makerItem.id);
                      setSelectedMaterial(null);
                      setSelectedColor(null);
                    }}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all",
                      selectedMaker === makerItem.id 
                        ? "border-secondary bg-secondary/5" 
                        : "border-border hover:border-secondary/50"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={makerItem.avatar}
                          alt={makerItem.name}
                          className="h-12 w-12 rounded-full"
                        />
                        {index === 0 && (
                          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs">
                            1
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{makerItem.name}</p>
                          {makerItem.verified && (
                            <Badge variant="secondary" className="text-xs">Verified</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{makerItem.location}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            {makerItem.rating} ({makerItem.reviewCount})
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {makerItem.leadTime}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {makerItem.materials.map((mat) => (
                            <span key={mat} className="text-xs px-2 py-0.5 rounded-full bg-muted">
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>
                      {selectedMaker === makerItem.id && (
                        <Check className="h-5 w-5 text-secondary shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Material & Color Selection (if maker selected) */}
            {maker && (
              <div className="space-y-4 animate-fade-in">
                {/* Material */}
                <div>
                  <h3 className="font-semibold mb-3">Select Material</h3>
                  <div className="flex flex-wrap gap-2">
                    {maker.materials.map((material) => (
                      <Button
                        key={material}
                        variant={selectedMaterial === material ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMaterial(material)}
                      >
                        {material}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* RAL Color Selection */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Select RAL Color
                  </h3>
                  <div className="grid grid-cols-8 gap-2 mb-2">
                    {ralColors.slice(0, 16).map((color) => (
                      <button
                        key={color.code}
                        onClick={() => setSelectedColor(color.code)}
                        className={cn(
                          "h-8 w-8 rounded-lg border-2 transition-all",
                          selectedColor === color.code 
                            ? "border-secondary scale-110 shadow-lg" 
                            : "border-transparent hover:scale-105"
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={`${color.code} - ${color.name}`}
                      />
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {ralColors.find(c => c.code === selectedColor)?.code} - {ralColors.find(c => c.code === selectedColor)?.name}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="font-semibold mb-3">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Shipping Options - Zero-KM Priority */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Delivery Option
                  </h3>
                  <div className="space-y-2">
                    {shippingOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedShipping(option.id)}
                        className={cn(
                          "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between",
                          selectedShipping === option.id 
                            ? "border-secondary bg-secondary/5" 
                            : "border-border hover:border-secondary/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {option.id === 'direct-pickup' ? (
                            <MapPin className="h-5 w-5 text-secondary" />
                          ) : option.id === 'local-point' ? (
                            <Store className="h-5 w-5 text-accent" />
                          ) : (
                            <Truck className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{option.name}</p>
                              {option.isRecommended && (
                                <Badge variant="secondary" className="text-xs">Recommended</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={cn("font-semibold", option.price === 0 && "text-secondary")}>
                            {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* NDA Agreement for Makers */}
                <div className="p-4 rounded-xl border border-accent/50 bg-accent/5">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="nda" 
                      checked={ndaAccepted}
                      onCheckedChange={(checked) => setNdaAccepted(checked as boolean)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="nda" className="font-medium cursor-pointer">
                        IP Protection Agreement
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        The Maker agrees to a Non-Disclosure Agreement and cannot commercialize, share, or distribute the designer's files without explicit written permission.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="accent"
                size="xl"
                className="flex-1"
                disabled={!selectedMaker || !selectedMaterial || !selectedColor || !ndaAccepted}
              >
                Add to Cart — ${totalPrice.toFixed(2)}
              </Button>
              <Button variant="outline" size="xl">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="xl">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-secondary" />
                <p className="text-xs text-muted-foreground">Verified Makers</p>
              </div>
              <div className="text-center">
                <Leaf className="h-6 w-6 mx-auto mb-2 text-secondary" />
                <p className="text-xs text-muted-foreground">Zero-KM Delivery</p>
              </div>
              <div className="text-center">
                <Package className="h-6 w-6 mx-auto mb-2 text-secondary" />
                <p className="text-xs text-muted-foreground">Quality Guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Reviews */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          {/* Description */}
          <div>
            <h2 className="text-xl font-bold mb-4">About This Design</h2>
            <p className="text-muted-foreground mb-6">{product.description}</p>
            
            <h3 className="font-semibold mb-3">Specifications</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Dimensions</span>
                <span>{product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} {product.dimensions.unit}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Materials</span>
                <span>{product.materials.join(', ')}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Style</span>
                <span className="capitalize">{product.style}</span>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Customer Reviews</h2>
              <Button variant="outline" size="sm">Write a Review</Button>
            </div>
            
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="p-4 rounded-xl bg-card border border-border">
                  <div className="flex items-start gap-3">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.userName}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < review.rating ? "fill-accent text-accent" : "text-muted"
                            )}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          {review.date}
                        </span>
                      </div>
                      <p className="mt-2 text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
