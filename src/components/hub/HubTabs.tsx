import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { label: 'Overview', href: '/hub' },
  { label: 'Group Buys', href: '/hub/group-buys' },
  { label: 'Deals', href: '/hub/deals' },
  { label: 'Suppliers', href: '/hub/suppliers' },
  { label: 'Resources', href: '/hub/resources' },
  { label: 'Community', href: '/hub/community' },
  { label: 'Membership', href: '/hub/membership' },
  { label: 'FAQ', href: '/hub/faq' },
];

export function HubTabs() {
  const { pathname } = useLocation();

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-16 z-40">
      <div className="container flex gap-1 overflow-x-auto py-1 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== '/hub' && pathname.startsWith(tab.href));
          return (
            <Link
              key={tab.href}
              to={tab.href}
              className={cn(
                'shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
