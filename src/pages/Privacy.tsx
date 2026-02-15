import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function Privacy() {
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
            <Shield className="h-8 w-8 text-secondary" />
            <h1 className="text-display-sm font-bold">Privacy Policy</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-10">
            <strong>Effective date:</strong> February 15, 2026
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* 1. Overview */}
            <section>
              <h2 className="text-xl font-bold mt-0 mb-3">1. Overview</h2>
              <p className="text-muted-foreground">
                This Privacy Policy explains how we handle personal information when you visit our website, contact us through any of our forms, or—when available—create an account or place an order. It applies to everyone who interacts with MakeHug, regardless of where you are located. We have written it to comply with both the EU General Data Protection Regulation (GDPR) and applicable US state privacy laws (including the California Consumer Privacy Act and similar statutes).
              </p>
            </section>

            {/* 2. Who We Are / Contact */}
            <section>
              <h2 className="text-xl font-bold mb-3">2. Who We Are &amp; How to Reach Us</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Legal name:</strong> [Company / Legal name]</li>
                <li><strong className="text-foreground">Address:</strong> [Address]</li>
                <li><strong className="text-foreground">Email:</strong> [Contact email]</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                If you have any questions about this policy or about how your data is processed, you can write to us at the email address above.
              </p>
            </section>

            {/* 3. Personal Data We Collect */}
            <section>
              <h2 className="text-xl font-bold mb-3">3. Personal Data We Collect</h2>
              <p className="text-muted-foreground mb-3">
                We only collect what is necessary for the purposes described below. Depending on how you interact with us, this may include:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Contact data:</strong> Name, email address, and message content when you submit a contact or request form.
                </li>
                <li>
                  <strong className="text-foreground">Account and profile data:</strong> If and when we enable user accounts, we may collect a display name, email, and profile preferences.
                </li>
                <li>
                  <strong className="text-foreground">Transaction and order data:</strong> If and when we enable purchasing, we may collect billing details, shipping address, order history, and payment references (we never store full card numbers ourselves).
                </li>
                <li>
                  <strong className="text-foreground">Technical data:</strong> IP address, browser type and version, device identifiers, operating system, referral URL, pages visited, and server access logs. This data is collected automatically for security and operational purposes.
                </li>
              </ul>
            </section>

            {/* 4. Why We Use Your Data */}
            <section>
              <h2 className="text-xl font-bold mb-3">4. Why We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>To provide, maintain, and improve the website and any services we offer.</li>
                <li>To respond to your messages, requests, and support inquiries.</li>
                <li>To detect, prevent, and address security incidents or fraudulent activity.</li>
                <li>To comply with legal obligations (e.g., tax record-keeping, law-enforcement requests).</li>
                <li>To analyse aggregate, non-identifying usage patterns so we can make the site better.</li>
              </ul>
            </section>

            {/* 5. Legal Bases */}
            <section>
              <h2 className="text-xl font-bold mb-3">5. Legal Bases (GDPR)</h2>
              <p className="text-muted-foreground mb-3">
                Where EU/EEA data-protection law applies, we rely on the following legal bases:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Performance of a contract:</strong> Processing that is necessary to fulfil a service you requested (e.g., completing an order).</li>
                <li><strong className="text-foreground">Legitimate interests:</strong> Security monitoring, fraud prevention, and basic site analytics, where our interest does not override your rights.</li>
                <li><strong className="text-foreground">Consent:</strong> Where specifically required—for example, before placing non-essential cookies. You can withdraw consent at any time.</li>
                <li><strong className="text-foreground">Legal obligation:</strong> When we must retain or disclose data to comply with applicable law.</li>
              </ul>
            </section>

            {/* 6. Sharing & Service Providers */}
            <section>
              <h2 className="text-xl font-bold mb-3">6. Sharing &amp; Service Providers</h2>
              <p className="text-muted-foreground mb-3">
                We do not sell your personal information. We share data only with trusted service providers ("processors") who help us operate the site, and only to the extent necessary:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Hosting / infrastructure provider:</strong> [Hosting provider name]</li>
                <li><strong className="text-foreground">Email service provider:</strong> [Email provider name] (for transactional or support emails)</li>
                <li><strong className="text-foreground">Payment processor:</strong> [Payment processor name] (if/when payments are enabled)</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Each provider is contractually bound to process your data only on our instructions and to maintain appropriate security measures.
              </p>
            </section>

            {/* 7. International Transfers */}
            <section>
              <h2 className="text-xl font-bold mb-3">7. International Transfers</h2>
              <p className="text-muted-foreground">
                Some of our service providers may process data outside the EU/EEA, including in the United States. Where such transfers occur, we rely on appropriate safeguards recognised under applicable law—such as Standard Contractual Clauses approved by the European Commission, adequacy decisions, or equivalent mechanisms—to ensure your data remains protected.
              </p>
            </section>

            {/* 8. Data Retention */}
            <section>
              <h2 className="text-xl font-bold mb-3">8. Data Retention</h2>
              <p className="text-muted-foreground mb-3">
                We keep personal data only as long as reasonably necessary for the purposes described in this policy or as required by law. Indicative retention periods:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Contact form submissions: [X] months after the inquiry is resolved.</li>
                <li>Account data: for as long as your account is active, plus [X] months after deletion.</li>
                <li>Order and transaction records: [X] years to comply with tax and legal requirements.</li>
                <li>Server logs and technical data: up to [X] months for security and troubleshooting.</li>
              </ul>
            </section>

            {/* 9. Your Rights */}
            <section>
              <h2 className="text-xl font-bold mb-3">9. Your Rights</h2>

              <h3 className="text-lg font-semibold mt-4 mb-2">EU/EEA Residents</h3>
              <p className="text-muted-foreground mb-2">
                Under the GDPR you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Access the personal data we hold about you.</li>
                <li>Rectify inaccurate or incomplete data.</li>
                <li>Request erasure ("right to be forgotten") where there is no overriding legal reason to keep it.</li>
                <li>Restrict processing in certain circumstances.</li>
                <li>Data portability—receive your data in a structured, machine-readable format.</li>
                <li>Object to processing based on legitimate interests.</li>
                <li>Lodge a complaint with your local data-protection supervisory authority.</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">US Residents</h3>
              <p className="text-muted-foreground mb-2">
                Depending on your state of residence, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Know what personal information we have collected and how it is used.</li>
                <li>Request deletion of your personal information.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Opt out of the "sale" or "sharing" of personal information for cross-context behavioral advertising, where applicable.</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                <strong className="text-foreground">Current status:</strong> We do not sell personal information, and we do not share it for cross-context behavioral advertising. If this ever changes, we will provide clear opt-out mechanisms before doing so.
              </p>
            </section>

            {/* 10. Children */}
            <section>
              <h2 className="text-xl font-bold mb-3">10. Children</h2>
              <p className="text-muted-foreground">
                Our website is not directed at children under 13 years of age, and we do not knowingly collect their personal information. In the EU/EEA, users under 16 should obtain parental or guardian consent before providing personal data. If we learn that we have inadvertently collected data from a child without appropriate consent, we will delete it promptly.
              </p>
            </section>

            {/* 11. Changes to This Policy */}
            <section>
              <h2 className="text-xl font-bold mb-3">11. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we make material changes, we will revise the "Effective date" at the top of this page and, where appropriate, notify you through a prominent notice on our website. The updated policy takes effect on the date indicated.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}
