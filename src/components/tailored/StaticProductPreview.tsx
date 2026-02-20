interface StaticProductPreviewProps {
  productSlug: string;
  params: Record<string, number | boolean>;
}

/**
 * Pure CSS/SVG static preview for tailored product cards on the listing page.
 * No WebGL / Canvas — avoids context limits.
 */
export function StaticProductPreview({ productSlug, params }: StaticProductPreviewProps) {
  if (productSlug === 'drawer-organizer') {
    const cols = (params.colDivisions as number) || 3;
    const rows = (params.rowDivisions as number) || 2;
    return (
      <div className="w-full h-[120px] flex items-center justify-center bg-[hsl(0_0%_7%)]">
        <div
          className="grid gap-0.5 p-2"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            width: '70%',
            height: '60%',
          }}
        >
          {Array.from({ length: cols * rows }).map((_, i) => (
            <div key={i} className="bg-muted-foreground/30 rounded-sm border border-muted-foreground/20" />
          ))}
        </div>
      </div>
    );
  }

  if (productSlug === 'shelf-bracket') {
    const reinforcement = params.reinforcement as boolean;
    return (
      <div className="w-full h-[120px] flex items-center justify-center bg-[hsl(0_0%_7%)]">
        <div className="relative" style={{ width: '50px', height: '50px' }}>
          <div className="absolute left-0 top-0 bg-muted-foreground/40 rounded-sm" style={{ width: '8px', height: '100%' }} />
          <div className="absolute left-0 top-0 bg-muted-foreground/40 rounded-sm" style={{ width: '100%', height: '8px' }} />
          {reinforcement && (
            <div
              className="absolute bg-muted-foreground/30"
              style={{ width: '2px', height: '60px', transformOrigin: 'top left', transform: 'rotate(-45deg)', left: '6px', top: '6px' }}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[120px] flex items-center justify-center bg-[hsl(0_0%_7%)] text-xs text-muted-foreground">
      Preview
    </div>
  );
}
