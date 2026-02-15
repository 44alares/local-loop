import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function DesignerTerms() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [hash]);

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

          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-8 w-8 text-secondary" />
            <h1 className="text-display-sm font-bold">
              MakeHug Terms (Platform-only)
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-10">
              These terms apply only to listings, orders, manufacturing, and payouts processed on MakeHug. Any agreements made outside MakeHug are separate and do not modify these platform terms unless MakeHug explicitly agrees in writing.
            </p>

            {/* ── Creator Terms ── */}
            <h2 className="text-2xl font-bold mt-10 mb-4">MakeHug Designer Terms (Platform-only)</h2>

            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Scope.</strong> These terms apply only to activity on MakeHug (listings, orders, manufacturing, and payouts). External contracts are separate and do not change MakeHug's obligations or payout rules unless MakeHug explicitly agrees in writing.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Ownership.</strong> You (the Designer) keep ownership of your designs and files.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Rights confirmation.</strong> You confirm you own the rights to upload the file, or you have sufficient permission to license it for manufacturing and sale as a physical product on MakeHug.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Originality &amp; third-party uploads (No re-uploads).</strong> You are expressly prohibited from uploading, listing, reselling, or monetizing files obtained from third-party repositories (such as Thingiverse, Printables, Cults3D, etc.) or from other individual designers, including files provided under open licenses (e.g., Creative Commons) or through membership/subscription programs (e.g., Patreon), for commercial exploitation on MakeHug.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Duplicate / substantially similar uploads + Generic Geometry Designs.</strong> You may not upload designs that are identical to, or substantially similar to, any design already available on the Platform. Potential copies, derivatives, or remixes may be identified through automated similarity checks and, if flagged, may be hidden, suspended, or removed; repeated violations may result in account suspension. Certain uploads may be classified as "Generic Geometry Designs" (designs primarily based on basic/common geometric forms). Generic Geometry Designs may be listed and sold, but are not eligible for exclusivity; comparable generic listings may be allowed provided they are not identical or near-identical to an existing listing (cosmetic-only changes do not qualify).
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Proof of authorship (audit right).</strong> MakeHug may request reasonable proof of authorship at any time. Such proof may include, but is not limited to: editable source files (e.g., CAD, STEP, F3D), version history, preliminary sketches, or screenshots documenting the design process. If not provided within a reasonable timeframe, MakeHug may suspend the listing and place payouts on hold during investigation.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">License to MakeHug (to operate the platform).</strong> You grant MakeHug a non-exclusive license to host, technically copy, convert formats as needed, generate previews, display, and provide the file only to the assigned Maker(s) for valid MakeHug orders, solely to manufacture the ordered quantity.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">File protection (default).</strong> Unless you choose otherwise, Makers and buyers may not redistribute, publish, resell, or share the file, and may not use it for other orders.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Royalties ("Royalty pool").</strong> For each sale/print on MakeHug, the royalty pool equals: (a) the fixed "Designer Fee" you set for that design, plus (b) a percentage of the physical product sale price. MakeHug pays royalties according to the selected license option and Annex I.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Removal & enforcement.</strong> MakeHug may suspend listings, withhold payouts, or reverse payouts when reasonably necessary to address fraud, refunds/chargebacks, rights disputes, or violations of these terms.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong className="text-foreground">Acceptance.</strong> You must actively accept these terms (checkbox) before continuing.
            </p>
<h2 id="license-types" className="text-xl font-bold mt-10 mb-4 scroll-mt-24">
              License Types:
            </h2>
            {/* ── License: Artistic ── */}
            <h2 id="license-artistic" className="text-xl font-bold mt-10 mb-4 scroll-mt-24">
              -Artistic — No Remixes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li><strong className="text-foreground">Category:</strong> Artistic only</li>
              <li><strong className="text-foreground">File use:</strong> File may be used only to manufacture MakeHug orders. No redistribution or reuse for other orders.</li>
              <li><strong className="text-foreground">Remixes on MakeHug:</strong> Not allowed</li>
            </ul>

            {/* ── License: Basic/Functional Delayed ── */}
            <h2 id="license-functional-delayed" className="text-xl font-bold mt-10 mb-4 scroll-mt-24">
              -Basic/Functional — Remixes after 6 months
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-3">
              <li><strong className="text-foreground">Category:</strong> Basic or Functional</li>
              <li><strong className="text-foreground">File use:</strong> File may be used only to manufacture MakeHug orders. No redistribution or reuse for other orders.</li>
              <li><strong className="text-foreground">Remixes on MakeHug:</strong> Disabled for the first 6 months, then allowed only if the remix qualifies as a Substantial Improvement (see Annex I).</li>
            </ul>
            <p className="text-muted-foreground mb-1 font-medium text-foreground">Revenue share (platform-only):</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Months 0–6: no remixes allowed.</li>
              <li>Months 6–12: 50% of the royalty pool goes to the Original Designer; 50% is split equally among eligible remix creators.</li>
              <li>After month 12: the royalty pool is split equally among all eligible actors (Original Designer + eligible remix creators).</li>
            </ul>

            {/* ── License: Basic/Functional Immediate ── */}
            <h2 id="license-functional-immediate" className="text-xl font-bold mt-10 mb-4 scroll-mt-24">
              -Basic/Functional — Remixes from day 1
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-3">
              <li><strong className="text-foreground">Category:</strong> Basic or Functional</li>
              <li><strong className="text-foreground">File use:</strong> File may be used only to manufacture MakeHug orders. No redistribution or reuse for other orders.</li>
              <li><strong className="text-foreground">Remixes on MakeHug:</strong> Allowed from day 1 only if the remix qualifies as a Substantial Improvement (see Annex I).</li>
            </ul>
            <p className="text-muted-foreground mb-1 font-medium text-foreground">Revenue share (platform-only):</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Months 0–12: 50% of the royalty pool goes to the Original Designer; 50% is split equally among eligible remix creators.</li>
              <li>After month 12: the royalty pool is split equally among all eligible actors (Original Designer + eligible remix creators).</li>
            </ul>

            {/* ── Annex I ── */}
            <h2 id="annex-1" className="text-2xl font-bold mt-12 mb-4 scroll-mt-24">
              Annex I — Remix Program & Substantial Improvement (Platform-only)
            </h2>

            <h3 className="text-lg font-bold mt-6 mb-3">A) Definitions</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li><strong className="text-foreground">Original:</strong> The original design/listing that remixes reference.</li>
              <li><strong className="text-foreground">Remix:</strong> A derived/adapted design published as a new listing on MakeHug and linked to an Original.</li>
              <li><strong className="text-foreground">Eligible actor:</strong> The Original Designer and each remix creator whose remix is approved as a Substantial Improvement.</li>
            </ul>

            <h3 className="text-lg font-bold mt-6 mb-3">B) Substantial Improvement (Eligibility)</h3>
            <p className="text-muted-foreground mb-3">
              A remix is eligible for revenue share only if it's a Substantial Improvement—meaning it genuinely moves the design forward, not just "gaming the system." Scaling/colouring/etc. are widely treated as minor changes, not real remixes.
            </p>
            <p className="text-muted-foreground mb-2 font-medium text-foreground">It must:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>Deliver a clear functional improvement (not purely cosmetic).</li>
              <li>Make meaningful design changes (geometry/fit/assembly/compatibility), not minor edits.</li>
              <li>Include proof at upload time:
                <ul className="list-disc pl-6 space-y-1 mt-1">
                  <li>A short changelog ("What changed?").</li>
                  <li>A short justification ("What problem does it solve?").</li>
                  <li>A comparison to the parent (screenshots/photos/measurements).</li>
                </ul>
              </li>
              <li>Be reasonably verifiable (e.g., stronger parts, better assembly, added compatibility, fewer parts, improved tolerances).</li>
            </ul>

            <p className="text-muted-foreground mb-2 font-medium text-foreground">Not a Substantial Improvement</p>
            <p className="text-muted-foreground mb-2">These do not qualify on their own:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              <li>Material swaps (e.g., "now in PETG/ASA/TPU") without a functional redesign.</li>
              <li>Resizing/scaling (including "size packs"), rotating, mirroring, renaming.</li>
              <li>Cosmetic-only changes: colors, logos, surface styling with no functional impact.</li>
              <li>"Fixing the mesh" (non‑manifold repairs, decimation/low‑poly) unless it results in a real, verifiable functional/printability improvement.</li>
              <li>Minor edits that don't change how it prints/works (tiny tweaks, moving holes 0.2 mm without evidence).</li>
            </ul>
            <p className="text-xs text-muted-foreground mb-4">(These categories are commonly called out as minor changes in remix discussions/guidelines.)</p>

            <p className="text-muted-foreground mb-2 font-medium text-foreground">Who decides</p>
            <p className="text-muted-foreground mb-6">
              Final eligibility is determined by the platform moderators (and/or the platform itself). They may remove revenue share eligibility if the improvement isn't clearly documented, verifiable, or substantial.
            </p>

            <h3 className="text-lg font-bold mt-6 mb-3">C) Attribution on MakeHug</h3>
            <p className="text-muted-foreground mb-6">
              Every remix listing must clearly display: "Remix of [Original name] by [Designer]" and include a "What changed" section.
            </p>

            <h3 className="text-lg font-bold mt-6 mb-3">D) Time windows and revenue share</h3>
            <p className="text-muted-foreground mb-6">
              Revenue share is calculated per sale/print within MakeHug using the "royalty pool" definition in the Designer Terms, and distributed according to the selected license option.
            </p>

            {/* ── Maker Manufacturing Terms ── */}
            <h2 className="text-2xl font-bold mt-12 mb-4">MakeHug Maker Manufacturing Terms (Platform-only)</h2>

            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Scope.</strong> These terms apply only to orders accepted and fulfilled on MakeHug. External contracts are separate and do not change MakeHug's platform rules unless MakeHug explicitly agrees in writing.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Order-limited license.</strong> For each accepted MakeHug order, you may download and use the provided STL/3MF only to prepare and manufacture the ordered quantity for that specific order.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">No redistribution / no reuse.</strong> You may not redistribute, publish, sell, or share the file (or derivatives) and may not reuse it for other orders or clients.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Security &amp; deletion.</strong> You must take reasonable steps to secure the file while you have it. Once the order is completed or cancelled and the dispute window has closed, you must permanently delete all digital copies of the Design from your computers, SD cards, and any cloud storage. Exceptions apply only where retention is required by law.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">No extra prints / no marketing use.</strong> You may not print additional copies for personal use, direct sale, gifts, display, marketing, or portfolio purposes without the Designer's express prior written consent.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Enforcement.</strong> Violations may result in suspension and loss of access to orders and payouts.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong className="text-foreground">Acceptance.</strong> You must actively accept these terms (checkbox) before proceeding.
            </p>

            {/* ── Indemnification ── */}
            <h2 className="text-2xl font-bold mt-12 mb-4">Indemnification</h2>
            <p className="text-muted-foreground mb-6">
              The User (whether Maker or Designer) agrees to indemnify, defend, and hold MakeHug harmless from and against any claim, loss, damage, liability, or expense (including reasonable legal fees) arising out of or relating to any breach of these intellectual property, confidentiality, and quality warranties.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
