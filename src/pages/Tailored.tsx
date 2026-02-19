import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { tailoredProducts } from '@/data/tailoredProducts';
import { MiniPreview } from '@/components/tailored/MiniPreview';
import { ArrowRight, SlidersHorizontal, FileText, Printer } from 'lucide-react';

const howItWorks = [
  { icon: SlidersHorizontal, emoji: '🎛️', title: 'Customize', desc: 'Move the sliders until it fits perfectly' },
  { icon: FileText, emoji: '📐', title: 'Model generated', desc: 'Your exact file is prepared instantly' },
  { icon: Printer, emoji: '🖨️', title: 'A maker builds it', desc: 'Nearby local maker receives the order' },
];

export default function Tailored() {
  return (
    <Layout>
      {/* Demo Banner — reusing the same beta-mode notice from Layout */}

      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center max-w-3xl mx-auto space-y-6">
          <Badge className="animate-float bg-secondary text-secondary-foreground border-0 text-sm px-4 py-1">
            ✦ NEW ON MAKEHUG
          </Badge>
          <h1 className="text-display-sm md:text-display font-bold">
            Designed by you. Made near you.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Customize every detail — a local maker near you brings it to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="secondary" size="lg" asChild>
              <a href="#products">See models ↓</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/start-creating">Are you a designer? Upload your model</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Product Cards */}
      <section id="products" className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tailoredProducts.map(product => (
            <div
              key={product.id}
              className="rounded-xl bg-card border border-border overflow-hidden shadow-card card-hover"
            >
              {/* 2x2 Mini preview grid */}
              <div className="grid grid-cols-2 gap-0.5 p-1 bg-[hsl(0_0%_7%)]" style={{ minHeight: '240px' }}>
                {product.previewVariants.map((variant, i) => (
                  <MiniPreview
                    key={i}
                    productSlug={product.slug}
                    params={variant.params}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-sm text-muted-foreground">{product.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold">
                    From {product.price.toFixed(2)}
                    {product.setOf && <span className="text-xs text-muted-foreground font-normal ml-1">/ {product.setOf} units</span>}
                  </span>
                  <Button variant="secondary" size="sm" asChild>
                    <Link to={`/tailored/${product.slug}`}>
                      Customize <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-10">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {howItWorks.map((step, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="text-3xl text-center">{step.emoji}</div>
                <h3 className="font-semibold text-center">{step.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
