import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { mockProducts, mockMakers, mockReviews } from '@/data/mockData';
import { getShippingOptions } from '@/lib/pricing';
import { ProductConfigurator, ConfigState } from '@/components/product/ProductConfigurator';
import { 
  ArrowLeft, Heart, Share2, Star, MapPin, Clock, 
  Package, Shield, Truck, ChevronRight, Check,
  Leaf, Store
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedMaker, setSelectedMaker] = useState<string | null>(null);
  const [selectedShipping, setSelectedShipping] = useState('direct-pickup');
  const [quantity, setQuantity] = useState(1);
  const [locationSearch, setLocationSearch] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [buyerPrice, setBuyerPrice] = useState(product.price);
  const [config, setConfig] = useState<ConfigState | null>(null);

  const maker = selectedMaker ? mockMakers.find((m) => m.id === selectedMaker) : null;
  const shippingOptions = getShippingOptions();
  const selectedShippingOption = shippingOptions.find(o => o.id === selectedShipping);

  const shippingCost = selectedShippingOption?.price || 0;
  const totalPrice = (buyerPrice + shippingCost) * quantity;

  // Sort makers by distance (mock: just shuffle for demo)
  const sortedMakers = [...mockMakers].sort((a, b) => {
    return a.rating > b.rating ? -1 : 1;
  });

  return (
    <Layout>
      <div className="container py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="capitalize">{product.category}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Images */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="aspect-square rounded-xl overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors",
                      selectedImage === index ? "border-secondary" : "border-transparent"
                    )}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            
            {/* About This Design */}
            <div className="pt-3">
              <h2 className="text-lg font-bold mb-2">About This Design</h2>
              <p className="text-sm text-muted-foreground">{product.description}</p>
              
              {/* AI Generated Image placeholder for Artistic products */}
              {product.category === 'artistic' && (
                <div className="mt-3 p-3 bg-muted/50 rounded-lg border border-dashed border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    AI-generated visualization coming soon
                  </p>
                </div>
              )}
            </div>

            {/* Specifications - Now directly below About This Design */}
            <div className="pt-3">
              <h3 className="text-lg font-bold mb-3">Specifications</h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-muted-foreground">Product Type</span>
                  <span className="capitalize font-medium">{product.productType}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span>{product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} {product.dimensions.unit}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-muted-foreground">Available Materials</span>
                  <span>{product.materials.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-muted-foreground">Style</span>
                  <span className="capitalize">{product.style}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <Badge variant="secondary" className="mb-2 capitalize text-xs">
                {product.category}
              </Badge>
              <h1 className="text-2xl font-bold mb-3">{product.name}</h1>
              
              {/* Designer */}
              <Link 
                to={`/designer/${product.designer.id}`}
                className="inline-flex items-center gap-2 group"
              >
                <img
                  src={product.designer.avatar}
                  alt={product.designer.name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium group-hover:text-secondary transition-colors">
                    {product.designer.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{product.designer.location}</p>
                </div>
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  {product.makerCount} makers
                </span>
              </div>
            </div>

            {/* Product Configurator - Material, Color, Quality with Live Pricing */}
            <ProductConfigurator 
              product={product}
              onPriceChange={setBuyerPrice}
              onConfigChange={setConfig}
            />

            {/* Smart Maker Search with Geofencing */}
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
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="pl-9 h-10 text-sm"
                />
              </div>
              
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Leaf className="h-3 w-3 text-secondary" />
                Closest makers shown first for zero-KM delivery
              </p>

              {/* Maker Cards */}
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
            </div>

            {/* Additional Options (if maker selected) */}
            {maker && (
              <div className="space-y-4 animate-fade-in">
                {/* Quantity */}
                <div>
                  <h3 className="font-semibold text-sm mb-2">Quantity</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="w-10 text-center font-medium text-sm">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Shipping Options - Zero-KM Priority */}
                <div>
                  <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Delivery Option
                  </h3>
                  <div className="space-y-2">
                    {shippingOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedShipping(option.id)}
                        className={cn(
                          "w-full p-3 rounded-lg border-2 text-left transition-all flex items-center justify-between",
                          selectedShipping === option.id 
                            ? "border-secondary bg-secondary/5" 
                            : "border-border hover:border-secondary/50"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {option.id === 'direct-pickup' ? (
                            <MapPin className="h-4 w-4 text-secondary" />
                          ) : option.id === 'local-point' ? (
                            <Store className="h-4 w-4 text-accent" />
                          ) : (
                            <Truck className="h-4 w-4 text-muted-foreground" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">{option.name}</p>
                              {option.isRecommended && (
                                <Badge variant="secondary" className="text-xs h-5">Recommended</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={cn("font-semibold text-sm", option.price === 0 && "text-secondary")}>
                            {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* NDA Agreement for Makers */}
                <div className="p-3 rounded-lg border border-accent/50 bg-accent/5">
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="nda" 
                      checked={ndaAccepted}
                      onCheckedChange={(checked) => setNdaAccepted(checked as boolean)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="nda" className="font-medium text-sm cursor-pointer">
                        IP Protection Agreement
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        The Maker agrees to a Non-Disclosure Agreement and cannot commercialize, share, or distribute the designer's files without explicit written permission.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="accent"
                size="lg"
                className="flex-1"
                disabled={!selectedMaker || !config?.selectedColor || !ndaAccepted}
              >
                Add to Cart — ${totalPrice.toFixed(2)}
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

        {/* Reviews Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Customer Reviews</h2>
            <Button variant="outline" size="sm">Write a Review</Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {mockReviews.map((review) => (
              <div key={review.id} className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-start gap-3 mb-2">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{review.userName}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3 w-3",
                              i < review.rating
                                ? "fill-accent text-accent"
                                : "fill-muted text-muted"
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
