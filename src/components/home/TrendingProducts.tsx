import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';

export function TrendingProducts() {
  // Get exactly 4 products, one from each category: Desktop, Functional, Artistic, Decoration
  const getProductFromCategory = (category: string) => {
    return mockProducts.find(p => p.category === category);
  };
  
  const trendingProducts = [
    getProductFromCategory('desktop'),
    getProductFromCategory('functional'),
    getProductFromCategory('artistic'),
    getProductFromCategory('decoration'),
  ].filter(Boolean);
  
  // If we don't have all 4 categories, fill with first available products
  while (trendingProducts.length < 4) {
    const nextProduct = mockProducts.find(p => !trendingProducts.includes(p));
    if (nextProduct) {
      trendingProducts.push(nextProduct);
    } else {
      break;
    }
  }
  
  return <section className="py-20 md:py-28 bg-cream-dark/30">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-display-sm font-bold mb-2">
              Trending Designs
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the newest designs from our community
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/shop">
              View All Designs
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => product && <ProductCard key={product.id} product={product} />)}
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {['Desktop', 'Functional', 'Artistic', 'Decoration'].map(tag => <Link key={tag} to={`/shop?category=${tag.toLowerCase()}`} className="px-4 py-2 rounded-full bg-background border border-border hover:border-secondary hover:text-secondary transition-colors text-sm font-medium">
              {tag}
            </Link>)}
        </div>
      </div>
    </section>;
}