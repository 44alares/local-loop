import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
export default function NDATerms() {
  return <Layout>
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
              Non-Disclosure Agreement & IP Terms
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              INTELLECTUAL PROPERTY AND QUALITY TERMS (ANNEX TO THE CONTRACT)
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">
              1. WARRANTY OF AUTHORSHIP AND ORIGINALITY (For the Designer)
            </h2>
            <p className="text-muted-foreground mb-4">
              By uploading any digital file ("Design") to the Platform, the Designer represents and warrants, under their sole responsibility, that:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">A. Own authorship:</strong> The Design is an original work created by the Designer.
              </li>
              <li>
                <strong className="text-foreground">B. Prohibition on reselling third-party works:</strong> The Designer is not uploading, listing, or distributing files obtained from third-party repositories (such as Thingiverse, Printables, Cults3D, etc.) or from other individual designers, including files provided under open licenses (e.g., Creative Commons) or through membership/subscription programs (e.g., Patreon), for commercial exploitation on this Platform. Reselling, re-uploading, or otherwise monetizing another party's work is strictly prohibited.
              </li>
              <li>
                <strong className="text-foreground">C. Prohibition on substantially similar designs (incl. Generic Geometry Designs):</strong> The Designer may not upload designs that are identical to, or substantially similar to, any design already available on the Platform. Potential copies, derivatives, or remixes may be identified through automated similarity checks and, if flagged, may be hidden, suspended, or removed; repeated violations may result in account suspension. Certain uploads may be classified as "Generic Geometry Designs" (designs primarily based on basic/common geometric forms). Generic Geometry Designs may be listed and sold, but are not eligible for exclusivity; comparable generic listings may be allowed provided they are not identical or near-identical to an existing listing (cosmetic-only changes do not qualify).
              </li>
              <li>
                <strong className="text-foreground">D. Right to audit:</strong> The Platform reserves the right to request proof of authorship at any time. Such proof may include, but is not limited to: editable source files (e.g., CAD, STEP, F3D), version history, preliminary sketches, or screenshots documenting the design process. Failure to provide such proof within 48 hours may result in account suspension and the withholding of funds.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">
              2. LIMITED USE AND CONFIDENTIALITY (For the Maker)
            </h2>
            <p className="text-muted-foreground mb-4">
              The Maker acts as a contract manufacturer and agrees to the following strict restrictions regarding any files received:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">A. Single-use license:</strong> The digital file provided may be used solely and exclusively to manufacture the exact number of units specified in the applicable Purchase Order.
              </li>
              <li>
                <strong className="text-foreground">B. No retention:</strong> Once the order is completed and the warranty period has ended (15 days), the Maker must permanently delete all digital copies of the Design from their computers, SD cards, and any cloud storage.
              </li>
              <li>
                <strong className="text-foreground">C. No personal or unauthorized use:</strong> The Maker may not print additional copies for personal use, direct sale, gifts, display, marketing, or portfolio purposes without the Designer's express prior written consent.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">
              3. PRICING AND QUALITY TRANSPARENCY
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
              <li>A. Price setting: The parties agree that the sale price is calculated automatically by the Platform's algorithm ("Fair Calculation") based on objective variables (material cost, machine time, support complexity). No bidding, manual repricing, or manipulation of manufacturing costs is permitted, in order to prevent unfair competition.<strong className="text-foreground">A. Price setting:</strong> The parties agree that the sale price is calculated automatically by the Platform's algorithm ("Fair Calculation") based on objective variables (material cost, machine time, support complexity, and the Designer's royalty). No bidding, manual repricing, or manipulation of manufacturing costs is permitted, in order to prevent unfair competition.
              </li>
              <li>
                <strong className="text-foreground">B. Quality certification:</strong> The Maker represents and warrants that their equipment is properly calibrated to meet standard dimensional tolerances (±0.2 mm) and that they will use materials consistent with those shown in the Designer's "Real-Scale Proof."
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4">
              4. INDEMNIFICATION
            </h2>
            <p className="text-muted-foreground">
              The User (whether Maker or Designer) agrees to indemnify, defend, and hold the Platform harmless from and against any claim, loss, damage, liability, or expense (including reasonable legal fees) arising out of or relating to any breach of these intellectual property and quality warranties.
            </p>
          </div>
        </div>
      </section>
    </Layout>;
}