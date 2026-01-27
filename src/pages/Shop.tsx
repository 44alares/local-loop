import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockProducts, categoryLabels, styleLabels } from '@/data/mockData';
import { Search, SlidersHorizontal, MapPin, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = Object.entries(categoryLabels);
const styles = Object.entries(styleLabels);
const materials = ['PLA', 'ABS', 'PETG', 'Resin', 'Nylon'];

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = mockProducts.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedStyle && product.style !== selectedStyle) return false;
    if (selectedMaterial && !product.materials.includes(selectedMaterial)) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const activeFiltersCount = [selectedCategory, selectedStyle, selectedMaterial].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedStyle(null);
    setSelectedMaterial(null);
    setSearchQuery('');
  };

  return (
    <Layout>
      <div className="bg-gradient-hero py-12 md:py-16">
        <div className="container">
          {/* Header */}
          <div className="max-w-2xl mb-8">
            <h1 className="text-display-sm font-bold mb-4">
              Shop Designs
            </h1>
            <p className="text-lg text-muted-foreground">
              Find designs you love, printed in your city. Support local makers. Zero-mile delivery.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Location Search */}
            <div className="relative flex-1 max-w-xs">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter your location..."
                className="pl-10 h-12"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant={showFilters ? "secondary" : "outline"}
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedCategory && (
                <Badge variant="secondary" className="gap-1">
                  {categoryLabels[selectedCategory]}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory(null)} />
                </Badge>
              )}
              {selectedStyle && (
                <Badge variant="secondary" className="gap-1">
                  {styleLabels[selectedStyle]}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedStyle(null)} />
                </Badge>
              )}
              {selectedMaterial && (
                <Badge variant="secondary" className="gap-1">
                  {selectedMaterial}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedMaterial(null)} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="border-b border-border bg-card animate-fade-in">
          <div className="container py-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <h3 className="font-semibold mb-3">Product Type</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(([value, label]) => (
                    <Button
                      key={value}
                      variant={selectedCategory === value ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(selectedCategory === value ? null : value)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div>
                <h3 className="font-semibold mb-3">Visual Style</h3>
                <div className="flex flex-wrap gap-2">
                  {styles.map(([value, label]) => (
                    <Button
                      key={value}
                      variant={selectedStyle === value ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStyle(selectedStyle === value ? null : value)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <h3 className="font-semibold mb-3">Material</h3>
                <div className="flex flex-wrap gap-2">
                  {materials.map((material) => (
                    <Button
                      key={material}
                      variant={selectedMaterial === material ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMaterial(selectedMaterial === material ? null : material)}
                    >
                      {material}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="container py-12">
        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          Showing {filteredProducts.length} design{filteredProducts.length !== 1 ? 's' : ''}
        </p>

        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl font-medium mb-2">No designs found</p>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
