import { Link } from 'react-router-dom';
import { Leaf, MapPin, Users, Heart } from 'lucide-react';
const footerLinks = {
  platform: [{
    label: 'Shop',
    href: '/shop'
  }, {
    label: 'Designers',
    href: '/designer'
  }, {
    label: 'Makers',
    href: '/maker'
  }, {
    label: 'Community',
    href: '/community'
  }],
  company: [{
    label: 'About Us',
    href: '/about'
  }, {
    label: 'Blog',
    href: '/community'
  }, {
    label: 'Careers',
    href: '/careers'
  }, {
    label: 'Press',
    href: '/press'
  }],
  support: [{
    label: 'FAQ',
    href: '/faq'
  }, {
    label: 'Help Center',
    href: '/help'
  }, {
    label: 'Contact',
    href: '/contact'
  }, {
    label: 'Shipping',
    href: '/shipping'
  }, {
    label: 'Returns',
    href: '/returns'
  }],
  legal: [{
    label: 'Terms',
    href: '/terms'
  }, {
    label: 'Privacy',
    href: '/privacy'
  }, {
    label: 'Cookies',
    href: '/cookies'
  }, {
    label: 'NDA Agreement',
    href: '/nda-terms'
  }]
};
const stats = [{
  icon: Leaf,
  label: 'CO₂ Saved',
  value: '12,450 kg'
}, {
  icon: MapPin,
  label: 'Cities',
  value: '150+'
}, {
  icon: Users,
  label: 'Makers',
  value: '2,300+'
}];
export function Footer() {
  return <footer className="border-t border-border bg-cream-dark/30">
      {/* Impact Stats */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {stats.map(stat => <div key={stat.label} className="flex items-center gap-4 p-6 rounded-xl bg-background shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <stat.icon className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>)}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-xl font-bold tracking-tight">MakeHug</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Made nearby. Picked up locally. Designed with care.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map(link => <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map(link => <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map(link => <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map(link => <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 MakeHug. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-accent fill-accent" /> for local economies
          </p>
        </div>
      </div>
    </footer>;
}