import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/data/mockData';
import { categories, categoryLabels, styleLabels } from '@/data/categories';
import { Search, SlidersHorizontal, MapPin, X, Monitor, Gamepad2, Wrench, Cog, Palette, Baby, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const styles = Object.entries(styleLabels);
const materials = ['PLA', 'ABS', 'PETG', 'Resin', 'Nylon'];

// Map category icons
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  desktop: Monitor,
  gaming: Gamepad2,
  repair: Wrench,
  functional: Cog,
  decoration: Palette,
  kids: Baby,
  artistic: Sparkles,
};

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
      <div className="bg-gradient-hero py-8 md:py-12">
        <div className="container">
          {/* Header */}
          <div className="max-w-2xl mb-6">
            <h1 className="text-xl md:text-2xl font-bold mb-2">
              Shop Designs
            </h1>
            <p className="text-sm text-muted-foreground">
              Find designs you love, printed in your city. Support local makers. Zero-kilometer delivery.
            </p>
          </div>

          {/* Category Pills - scrollable on mobile */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
            {categories.map((cat) => {
              const IconComponent = categoryIcons[cat.id];
              return (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                  className="gap-1.5 shrink-0"
                >
                  {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
                  {cat.name}
                </Button>
              );
            })}
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10"
              />
            </div>

            {/* Location Search */}
            <div className="relative flex-1 max-w-xs">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter your location..."
                className="pl-9 h-10"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant={showFilters ? "secondary" : "outline"}
              size="default"
              onClick={() => setShowFilters(!showFilters)}
              className="relative h-10"
            >
              <SlidersHorizontal className="h-4 w-4 mr-1.5" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-1.5 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-xs text-muted-foreground">Active:</span>
              {selectedCategory && (
                <Badge variant="secondary" className="gap-1 text-xs h-6">
                  {categoryLabels[selectedCategory]}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory(null)} />
                </Badge>
              )}
              {selectedStyle && (
                <Badge variant="secondary" className="gap-1 text-xs h-6">
                  {styleLabels[selectedStyle]}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedStyle(null)} />
                </Badge>
              )}
              {selectedMaterial && (
                <Badge variant="secondary" className="gap-1 text-xs h-6">
                  {selectedMaterial}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedMaterial(null)} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 text-xs">
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="border-b border-border bg-card animate-fade-in">
          <div className="container py-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Style */}
              <div>
                <h3 className="font-semibold text-sm mb-2">Visual Style</h3>
                <div className="flex flex-wrap gap-1.5">
                  {styles.map(([value, label]) => (
                    <Button
                      key={value}
                      variant={selectedStyle === value ? "secondary" : "outline"}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setSelectedStyle(selectedStyle === value ? null : value)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <h3 className="font-semibold text-sm mb-2">Material</h3>
                <div className="flex flex-wrap gap-1.5">
                  {materials.map((material) => (
                    <Button
                      key={material}
                      variant={selectedMaterial === material ? "secondary" : "outline"}
                      size="sm"
                      className="h-7 text-xs"
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
      <div className="container py-8">
        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredProducts.length} design{filteredProducts.length !== 1 ? 's' : ''}
        </p>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact className="md:[&]:!p-4" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg font-medium mb-2">No designs found</p>
            <p className="text-muted-foreground text-sm mb-4">
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
