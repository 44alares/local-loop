import { Link } from 'react-router-dom';

const BANNER_HEIGHT = 'var(--beta-banner-h)';

export const BETA_BANNER_CSS_VAR = '--beta-banner-h';

export function BetaBanner() {
  return (
    <div
      className="sticky top-0 z-[60] w-full border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 py-2 px-4 text-center text-sm text-foreground"
    >
      🚧 MakeHug Beta: Currently in testing mode. All listings are demo placeholders. No real transactions are processed yet.{' '}
      <Link to="/contact" className="underline font-semibold hover:opacity-80 transition-opacity">
        Contact
      </Link>
    </div>
  );
}
