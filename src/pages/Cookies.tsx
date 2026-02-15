import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Cookies() {
  return (
    <Layout>
      <section className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <Cookie className="h-8 w-8 text-secondary" />
            <h1 className="text-display-sm font-bold">Cookie Policy</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-10">
            <strong>Effective date:</strong> February 15, 2026
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* 1. What Are Cookies */}
            <section>
              <h2 className="text-xl font-bold mt-0 mb-3">1. What Are Cookies?</h2>
              <p className="text-muted-foreground">
                Cookies are small text files that a website places on your device when you visit. They help the site remember your preferences, keep you logged in, and understand how people use the site. Some cookies are essential for the site to work; others are used for analytics or advertising purposes.
              </p>
            </section>

            {/* 2. How We Use Cookies */}
            <section>
              <h2 className="text-xl font-bold mb-3">2. How We Use Cookies</h2>
              <p className="text-muted-foreground">
                At present, MakeHug does <strong className="text-foreground">not</strong> use analytics, advertising, or marketing cookies or tracking pixels. We may use strictly necessary cookies only—for example, to maintain a secure session if you log in, or to remember a cookie-consent choice itself.
              </p>
            </section>

            {/* 3. Consent Principles */}
            <section>
              <h2 className="text-xl font-bold mb-3">3. Consent Principles (EU ePrivacy)</h2>
              <p className="text-muted-foreground">
                Under EU rules, non-essential cookies may not be placed on your device until you have given informed, specific consent. If we ever introduce analytics or marketing cookies in the future, we will ask for your permission first—broken down by purpose—so you can choose which categories to accept. Strictly necessary cookies do not require consent because the site cannot function properly without them.
              </p>
            </section>

            {/* 4. Cookie Categories */}
            <section>
              <h2 className="text-xl font-bold mb-3">4. Cookie Categories</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-semibold">Category</th>
                      <th className="text-left p-3 font-semibold">Purpose</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-t border-border">
                      <td className="p-3 font-medium text-foreground">Strictly necessary</td>
                      <td className="p-3">Security, session management, remembering consent choices.</td>
                      <td className="p-3"><Badge variant="secondary">May be used</Badge></td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3 font-medium text-foreground">Preferences</td>
                      <td className="p-3">Remembering language, display settings, and similar choices.</td>
                      <td className="p-3"><Badge variant="outline">Not currently used</Badge></td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3 font-medium text-foreground">Analytics</td>
                      <td className="p-3">Understanding how visitors navigate the site (page views, traffic sources).</td>
                      <td className="p-3"><Badge variant="outline">Not currently used</Badge></td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3 font-medium text-foreground">Marketing</td>
                      <td className="p-3">Serving relevant ads, measuring campaign effectiveness.</td>
                      <td className="p-3"><Badge variant="outline">Not currently used</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 5. How to Manage Cookies */}
            <section>
              <h2 className="text-xl font-bold mb-3">5. How to Manage Cookies</h2>
              <p className="text-muted-foreground mb-3">
                You can control or delete cookies through your browser settings at any time. Most browsers let you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>See which cookies are stored and delete them individually.</li>
                <li>Block all cookies or only third-party cookies.</li>
                <li>Set preferences on a per-site basis.</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Please note that blocking strictly necessary cookies may prevent parts of the site from working correctly.
              </p>
            </section>

            {/* 6. Cookie Settings (Future) */}
            <section>
              <h2 className="text-xl font-bold mb-3">6. Cookie Settings</h2>
              <p className="text-muted-foreground">
                Because we do not currently use any non-essential cookies, there is no cookie-settings panel to display. If we add analytics, preference, or marketing cookies in the future, we will introduce a consent banner and a settings panel on this page so you can review and update your choices at any time.
              </p>
            </section>

            {/* 7. Changes */}
            <section>
              <h2 className="text-xl font-bold mb-3">7. Changes to This Cookie Policy</h2>
              <p className="text-muted-foreground">
                We will update this page whenever our cookie usage changes. The "Effective date" at the top will always reflect the latest version. For significant changes—such as introducing a new cookie category—we will also update our consent mechanism accordingly.
              </p>
            </section>

            {/* 8. Contact */}
            <section>
              <h2 className="text-xl font-bold mb-3">8. Contact</h2>
              <p className="text-muted-foreground">
                If you have questions about our use of cookies, please refer to our{' '}
                <Link to="/privacy" className="text-secondary hover:underline">Privacy Policy</Link>{' '}
                or contact us at [Contact email].
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}
