import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Clock } from 'lucide-react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        "group block rounded-xl bg-card overflow-hidden shadow-card card-hover",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
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
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm shadow-md transition-all hover:bg-background hover:scale-110"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 text-white text-sm">
            <Clock className="h-4 w-4" />
            <span>{product.leadTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        <Badge variant="secondary" className="mb-2 text-xs capitalize">
          {product.category}
        </Badge>

        {/* Title */}
        <h3 className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-secondary transition-colors">
          {product.name}
        </h3>

        {/* Designer */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={product.designer.avatar}
            alt={product.designer.name}
            className="h-5 w-5 rounded-full"
          />
          <span className="text-sm text-muted-foreground">
            {product.designer.name}
          </span>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Location & Makers */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4" />
          <span>{product.makerCount} makers available</span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold">${product.price}</span>
            <span className="text-sm text-muted-foreground ml-1">{product.currency}</span>
          </div>
          <Button size="sm" variant="secondary">
            View Details
          </Button>
        </div>
      </div>
    </Link>
  );
}
