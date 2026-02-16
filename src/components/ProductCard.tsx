import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Clock } from 'lucide-react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getCheapestCombo } from '@/lib/cheapestCombo';

interface ProductCardProps {
  product: Product;
  className?: string;
  compact?: boolean;
}

export function ProductCard({ product, className, compact = false }: ProductCardProps) {
  const cheapest = useMemo(() => getCheapestCombo(product), [product]);
  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        "group block rounded-xl bg-card overflow-hidden shadow-card card-hover",
        className
      )}
    >
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden bg-muted",
        compact ? "aspect-[4/3]" : "aspect-square"
      )}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            // Handle wishlist
          }}
          className={cn(
            "absolute top-2 right-2 flex items-center justify-center rounded-full bg-background/90 backdrop-blur-sm shadow-md transition-all hover:bg-background hover:scale-110",
            compact ? "h-7 w-7" : "h-9 w-9"
          )}
        >
          <Heart className={cn(compact ? "h-3 w-3" : "h-4 w-4")} />
        </button>

        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center gap-1.5 text-white text-xs">
            <Clock className="h-3 w-3" />
            <span>{product.leadTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={cn(compact ? "p-3" : "p-4")}>
        {/* Category Badge */}
        <Badge variant="secondary" className="mb-1.5 text-xs capitalize h-5">
          {product.category}
        </Badge>

        {/* Title */}
        <h3 className={cn(
          "font-semibold mb-1 group-hover:text-secondary transition-colors",
          compact ? "text-sm line-clamp-2" : "text-base line-clamp-1"
        )}>
          {product.name}
        </h3>

        {/* Designer */}
        <div className="flex items-center gap-1.5 mb-2">
          <img
            src={product.designer.avatar}
            alt={product.designer.name}
            className={cn(compact ? "h-4 w-4" : "h-5 w-5", "rounded-full")}
          />
          <span className={cn("text-muted-foreground", compact ? "text-xs" : "text-sm")}>
            {product.designer.name}
          </span>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            <Star className={cn("fill-accent text-accent", compact ? "h-3 w-3" : "h-4 w-4")} />
            <span className={cn("font-medium", compact ? "text-xs" : "text-sm")}>{product.rating}</span>
          </div>
          <span className={cn("text-muted-foreground", compact ? "text-xs" : "text-sm")}>
            ({product.reviewCount})
          </span>
        </div>

        {/* Location & Makers - hide on compact */}
        {!compact && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3 w-3" />
            <span>{product.makerCount} makers available</span>
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className={cn("font-bold", compact ? "text-base" : "text-xl")}>${cheapest.displayPrice.toFixed(0)}</span>
            <span className={cn("text-muted-foreground ml-1", compact ? "text-xs" : "text-sm")}>{product.currency}</span>
          </div>
          {!compact && (
            <Button size="sm" variant="secondary">
              View Details
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}
