import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ralColors } from '@/data/ralColors';
import { getEquivalents } from '@/data/ralEquivalents';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

export default function RALEquivalents() {
  const [selectedCode, setSelectedCode] = useState('');
  const selectedColor = ralColors.find(c => c.code === selectedCode);
  const equivalents = selectedCode ? getEquivalents(selectedCode) : [];

  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-display-sm font-bold mb-2">
              RAL equivalents by filament manufacturer
            </h1>
            <p className="text-muted-foreground">
              Find approximate filament matches for any RAL Classic color.
            </p>
          </div>

          {/* RAL selector */}
          <div className="space-y-2">
            <Select value={selectedCode} onValueChange={setSelectedCode}>
              <SelectTrigger>
                <SelectValue placeholder="Search or select a RAL color…" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {ralColors.map((color) => (
                  <SelectItem key={color.code} value={color.code}>
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-3 rounded-full border border-border shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.code} — {color.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected chip */}
          {selectedColor && (
            <Badge variant="secondary" className="gap-1.5 py-1.5 px-3 text-sm">
              <span
                className="inline-block h-3.5 w-3.5 rounded-full border border-border shrink-0"
                style={{ backgroundColor: selectedColor.hex }}
              />
              {selectedColor.code} — {selectedColor.name}
            </Badge>
          )}

          {/* Results */}
          {selectedCode && equivalents.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-semibold text-foreground">
                Filament equivalents (approx.)
              </h2>
              <div className="space-y-2">
                {equivalents.map(({ brand, label, match }) => (
                  <div
                    key={brand}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="font-medium text-foreground">{label}</span>
                    <span>— ref.&nbsp;{match.ref}</span>
                  </div>
                ))}
              </div>

              {/* Protabula CTA */}
              <div className="pt-3 mt-3 border-t border-border">
                <p className="text-muted-foreground text-sm">
                  If you can't find an equivalence for your filament, use the{' '}
                  <a
                    href="https://protabula.com/en/ral-colors/picker?utm_source=chatgpt.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary font-medium hover:underline inline-flex items-center gap-1"
                  >
                    RAL Color Picker
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
