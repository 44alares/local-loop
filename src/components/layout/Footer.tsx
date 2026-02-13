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
    href: '/blog'
  }, {
    label: 'Press',
    href: '/press'
  }],
  support: [{
    label: 'FAQ',
    href: '/faq'
  }, {
    label: 'Contact',
    href: '/contact'
  }, {
    label: 'Shipping',
    href: '/shipping'
  }],
  legal: [{
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